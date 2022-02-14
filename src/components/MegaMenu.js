import React, { useEffect, useState, useRef } from 'react'
const MegaMenu = () => {

    const data = {
        "Wood":
        {
            "plywood": ["century", "greenply", "blueply", "redply"],
            "Blackwood": ["somewood", "Another wood", "yet another wood"]
        }
        ,
        "Flooring": {
            "aFlooring": [1, 2, 3, 4],
            "bFlooring": [3, 4, 54, 6]
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

    // Controls the visibility of the categories menu
    // By default, the menu is not shown
    const [showNavItem, setShowNavItem] = useState(false)

    // Stores the Navbar title. For eg. Wood. 
    // Responsible for controlling the categories for the menu
    // Defaults to the first item in the data object
    const [activeNavItem, setActiveNavItem] = useState(Object.keys(data)[0])

    const navItems = Object.keys(data)

    const Triangle = () => {
        return (
            <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '10px solid #F2F2F2' }}>
            </div>
        )
    }

    const NavItem = (props) => {
        const [isShowed, setIsShowed] = useState(false)

        const mouseOverAction = () => {
            setShowNavItem(true)
            setIsShowed(true)
            setActiveNavItem(props.title)
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
                <div style={{ borderBottomWidth: isShowed ? 2 : 0, ...navItemStyle }} onMouseOver={mouseOverAction}>
                    {props.title}
                </div>
            </>
        )
    }

    const MiniMenu = (props) => {
        // Array of keys for the selected category. 
        // For eg. => Selected catgeory = wood, miniMenuData = [plywood, blackwood]
        let miniMenuData = Object.keys(data[props.title])

        // The selected sub category for the selected category
        // For eg. plywood
        const [activeView, setActiveView] = useState(Object.keys(data[activeNavItem])[0])

        const MiniMenuStyle = {
            containerStyle: {
                minHeight: 250,
                position: 'absolute',
                display: showNavItem ? 'flex' : 'none',
                boxShadow: '0px 5px 10px 1px rgba(0,0,0,0.39)'
            }
        }

        const SubMenu = () => {
            const subCategoryStyle = {
                containerStyle: {
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: "25vmin",
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
                    userSelect:'none'
                }
            }

            return <div style={subCategoryStyle.containerStyle}>
                {miniMenuData.map(item => <div key={item} style={{ ...subCategoryStyle.itemStyle }} onMouseOver={() => setActiveView(item)}>
                    <div style={{ fontWeight: activeView === item ? 'bold' : 'inherit' }}>{item}</div>
                    {activeView === item ? <Triangle /> : null}
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
                    minWidth: "25vmin",
                    padding: 5
                }
            }
            let title = data[props.title][activeView]
            return (
                <div style={nestedCategoryStyle.container}>
                    {title.map(item => <div style={{ cursor: 'pointer', padding: 3, userSelect:'none' }} key={item}>{item}</div>)}
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
        <div>
            <div style={navBarStyle.container}>
                {navItems.map(item => <NavItem key={item} title={item} />)
                }
            </div>
            <MiniMenu title={activeNavItem} />
        </div>
    )
}

export default MegaMenu