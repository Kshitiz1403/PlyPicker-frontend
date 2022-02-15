import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { PORT } from '../../App'

const MegaMenu = () => {

    const isMobileOrTablet = useMediaQuery({
        query:'(max-width:768px)'
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
            paddingBottom: 10,
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
                    {props.title}
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
                width: isMobileOrTablet ? '90%' : 350,
                position: 'absolute',
                display: showNavItem ? 'flex' : 'none',
                boxShadow: '0px 5px 10px 1px rgba(0,0,0,0.39)',
                zIndex: 999999999999999
            }
        }

        const SubMenu = () => {
            const subCategoryStyle = {
                containerStyle: {
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: "50%",
                    backgroundColor: 'white',
                    paddingLeft: 5,
                },
                itemStyle: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingLeft: 3,
                    userSelect: 'none'
                }
            }

            return <div style={subCategoryStyle.containerStyle}>
                {subCatData.map(subCat => <div key={subCat._id} style={{ ...subCategoryStyle.itemStyle }} onMouseOver={() => setActiveSubCat(subCat._id)}>
                    <div style={{ fontWeight: activeSubCat === subCat._id ? 'bold' : 'inherit' }}>{subCat.Sub_Category_name}</div>
                    {activeSubCat === subCat._id ? <Triangle /> : null}
                </div>
                )}
            </div>
        }


        const NestedMenu = () => {
            const nestedCategoryStyle = {
                container: {
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#F2F2F2',
                    minWidth: "50%",
                    padding: 5
                }
            }

            // Creates an array of objects of groups which are the part of the selected category as well as the selected sub category
            let groupData = groups.filter(group => group.Category === activeCategory && group.Sub_Category === activeSubCat)

            return (
                <div style={nestedCategoryStyle.container}>
                    {groupData.map(group => <div style={{ cursor: 'pointer', padding: 3, userSelect: 'none' }} key={group._id}>{group.Group_name}</div>)}
                </div>
            )
        }

        return (
            <div style={{ ...MiniMenuStyle.containerStyle, }} ref={wrapperRef}>
                <SubMenu />
                <NestedMenu />
            </div>
        )
    }

    const navBarStyle = {
        container: {
            height: 50,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderStyle: 'solid',
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0.5,
            borderColor: '#F2F2F2'
        }
    }

    return (
        <div style={{paddingLeft:10}}>
            <div style={{ ...navBarStyle.container, overflowX: 'auto' }}>
                {categories.map(category => <NavItem key={category._id} id={category._id} image={category.category_image} title={category.name} />)}
            </div>
            <MiniMenu title={activeCategory} />
        </div>
    )
}

export default MegaMenu