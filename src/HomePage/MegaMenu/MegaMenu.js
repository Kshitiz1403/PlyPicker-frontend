import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { PORT } from '../../App'
import capitalizeFirstLetter from '../../heplerFunctions/capitalizeFirstLetter'

const MegaMenu = () => {

    const isMobileOrTablet = useMediaQuery({
        query: '(max-width:768px)'
    })

    // Performs all network requests for categories, subcategories and grops
    useEffect(() => {
        getCategories()
        getSubCategories()
        getGroups()
    }, [])

    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [groups, setGroups] = useState([])
    const [brands, setBrands] = useState([])


    // Controls the visibility of the categories menu
    // By default, the menu is not shown
    const [showNavItem, setShowNavItem] = useState(false)

    // States to manage selected category. Initialized with the first category
    const [activeCategory, setActiveCategory] = useState(Object(categories[0])._id)

    // Gets the categories 
    const getCategories = async () => {
        try {
            const categoriesData = await (await axios.get(`${PORT}/categories`)).data
            setCategories(categoriesData)
        }
        catch (err) {
            console.error(err)
        }
    }

    // Gets the sub-categories
    const getSubCategories = async () => {
        try {
            const subCategoriesData = await (await axios.get(`${PORT}/subcategories`)).data
            setSubCategories(subCategoriesData)
        }
        catch (err) {
            console.error(err)
        }
    }

    // Gets the groups 
    const getGroups = async () => {
        try {
            const groupsData = await (await axios.get(`${PORT}/groups`)).data
            setGroups(groupsData)
        }
        catch (err) {
            console.error(err)
        }
    }

    // takes category id and search for all the products in that category and maintain an array of unique brands from them.
    useEffect(()=>{
        getBrands()
    }, [activeCategory])

    const getBrands = async () =>{
        try{
            const brandsData = await (await (axios.get(`${PORT}/products?category=${activeCategory}`))).data
            let arr = []
            brandsData.map(product => arr.push(capitalizeFirstLetter(product.Brand)))
            arr = [...new Set(arr)]
            setBrands(arr)
        }
        catch(err){
            console.error(err)
        }
    }

    // When clicked outside of the mini menu, it hides the menu
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowNavItem(false)
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const Triangle = () => <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '10px solid #F2F2F2' }}></div>

    const NavItem = (props) => {
        const [isShowed, setIsShowed] = useState(false)

        const mouseOverAction = () => {
            setShowNavItem(true)
            setIsShowed(true)
            setActiveCategory(props.id)
        }

        const navItemStyle = {
            marginRight: 50,
            textAlign: 'center',
            borderStyle: 'solid',
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderColor: '#F16512',
            cursor: 'pointer'
        }

        return (
            <>
                <div style={{ borderBottomWidth: isShowed ? 2 : 0, fontWeight: isShowed ? 'bold' : 'inherit', ...navItemStyle }} onMouseOver={mouseOverAction}  >
                    {capitalizeFirstLetter(props.title)}
                </div>
            </>
        )
    }

const MiniMenu = (props) => {

    // Creates an array of objects of subcategories which are the part of the selected category
    let subCatData = subCategories.filter(subCat => subCat.Category === activeCategory)

    // States to manage selected sub category. Initialised with the first sub category
    const [activeSubCat, setActiveSubCat] = useState(Object(subCategories[0])._id)

    const MiniMenuStyle = {
        containerStyle: {
            minHeight: 250,
            width: isMobileOrTablet ? '95%' : '70%',
            position: 'absolute',
            display: showNavItem ? 'flex' : 'none',
            boxShadow: '0px 5px 10px 1px rgba(0,0,0,0.39)',
            zIndex: 999999999999999
        }
    }

    const SubCategoryMenu = () => {
        const subCategoryStyle = {
            containerStyle: {
                display: 'flex',
                flexDirection: 'column',
                minWidth: "30%",
                backgroundColor: 'white',
                paddingLeft: 10,
                paddingTop:5,
                paddingBottom:5
            },
            itemStyle: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                cursor: 'pointer',
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 5,
                userSelect: 'none'
            }
        }

        return <div style={subCategoryStyle.containerStyle}>
            {subCatData.map(subCat => <Link style={{ textDecoration: 'none', color: 'inherit' }} key={subCat._id} to={`/products?category=${activeCategory}&subcategory=${activeSubCat}`}><div key={subCat._id}
                style={{ ...subCategoryStyle.itemStyle }} onMouseOver={() => setActiveSubCat(subCat._id)}>
                <div style={{ fontWeight: activeSubCat === subCat._id ? 'bold' : 'inherit' }}>{capitalizeFirstLetter(subCat.Sub_Category_name)}</div>
                {activeSubCat === subCat._id ? <Triangle /> : null}
            </div></Link>
            )}
        </div>
    }


    const GroupMenu = () => {
        const nestedCategoryStyle = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#F2F2F2',
                minWidth: "30%",
                padding: 5,
                paddingLeft:10
            }
        }

        // Creates an array of objects of groups which are the part of the selected category as well as the selected sub category
        let groupData = groups.filter(group => group.Category === activeCategory && group.Sub_Category === activeSubCat)

        const GroupItem = (props) => {
            const [isGroupItemVisible, setIsGroupItemVisible] = useState(false)
            return (
                <Link key={props._id}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to={`/products?category=${activeCategory}&subcategory=${activeSubCat}&group=${props._id}`}>
                    <div onMouseOver={() => setIsGroupItemVisible(true)} onMouseLeave={() => setIsGroupItemVisible(false)} style={{ cursor: 'pointer', padding: 5, userSelect: 'none', fontWeight: isGroupItemVisible ? 'bold' : 'inherit', color: isGroupItemVisible? '#F16512': 'inherit' }} key={props._id}>{capitalizeFirstLetter(props.Group_name)}</div>
                </Link>
            )
        }

        return (
            <div style={nestedCategoryStyle.container}>
                {groupData.map(group => <GroupItem key={group._id} _id={group._id} Group_name={group.Group_name} />)}
            </div>
        )
    }

    const PopularBrandsMenu = () => {
        const BrandItem = ({ brand }) => {
            const [activeBrandItem, setActiveBrandItem] = useState(false)

            return (
                <div style={{ width: isMobileOrTablet ? '100%' : '50%', padding: 5, color: activeBrandItem ? '#F16512' : 'black', cursor: 'pointer' }} onMouseOver={() => setActiveBrandItem(true)} onMouseLeave={() => setActiveBrandItem(false)}>{brand}</div>
            )
        }
        return (
            <div style={{ backgroundColor: 'white', width: isMobileOrTablet ? '33%' : 'inherit', padding: 5, paddingLeft: 10 }}>
                <div style={{ padding: 5, fontSize: '1.1rem', fontWeight: 'bold' }}>Popular Brands</div>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }}>
                    {brands.map(brand => <BrandItem key={brand} brand={brand} />)}
                </div>
            </div>
        )
    }

    return (
        <div style={{ ...MiniMenuStyle.containerStyle, }} ref={wrapperRef}>
            <SubCategoryMenu />
            <GroupMenu />
            <PopularBrandsMenu/>
        </div>
    )
}

    const NavBar = () => {
        const navBarStyle = {
            container: {
                height: 50,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }
        }
        return (
            <div>
                <div style={{ ...navBarStyle.container, overflowX: 'auto',  }} className='container'>
                    {categories.map(category => <Link key={category._id} style={{ textDecoration: 'none', color: 'inherit' }} to={`/products?category=${activeCategory}`}>
                        <NavItem key={category._id} id={category._id} image={category.category_image} title={category.name} /></Link>)}
                </div>
                <div style={{borderStyle: 'solid', borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0.5, borderColor: '#F2F2F2'
                }}></div>
                <div className='container' style={{ padding: 0 }}>
                    <MiniMenu title={activeCategory} />
                </div>

            </div>
        )
    }

    return (
        <NavBar />
    )
}

export default MegaMenu