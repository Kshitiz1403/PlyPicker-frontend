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

    // Controls the visibility of the categories menu
    // By default, the menu is not shown
    const [showNavItem, setShowNavItem] = useState(false)

    // Stores the Navbar title. For eg. Wood. 
    // Responsible for controlling the categories for the menu
    // Defaults to the first item in the data object
    const [activeNavItem, setActiveNavItem] = useState(Object.keys(data)[0])    

    const navItems = Object.keys(data)

    const NavItem = (props) => {
        const [isShowed, setIsShowed] = useState(false)

        // function useOutsideAlerter(ref) {
        //     useEffect(() => {
        //         /**
        //          * Alert if clicked on outside of element
        //          */
        //         function handleClickOutside(event) {
        //             if (ref.current && !ref.current.contains(event.target)) {
        //                 alert("You clicked outside of me!");
        //             }
        //         }

        //         // Bind the event listener
        //         document.addEventListener("mousedown", handleClickOutside);
        //         return () => {
        //             // Unbind the event listener on clean up
        //             document.removeEventListener("mousedown", handleClickOutside);
        //         };
        //     }, [ref]);
        // }

        // const wrapperRef = useRef(null);
        // useOutsideAlerter(wrapperRef);


        const mouseOverAction = () => {
            setShowNavItem(true)
            setIsShowed(true)
            setActiveNavItem(props.title)
        }
        const mouseLeaveAction = () => {
            setShowNavItem(false)
            setIsShowed(false)
            setActiveNavItem(props.title)
        }

        const mouseClickAction = () => {
            setShowNavItem(!showNavItem)
            setIsShowed(!isShowed)
            setActiveNavItem(props.title)
        }

        const navItemStyle = {
            marginRight: 50,
            textAlign: 'center',
            marginLeft: 20,
            paddingBottom: 10,
            borderStyle: 'solid',
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderColor: '#F16512',
            cursor: 'pointer'
        }

        return (
            <div>
                <div style={{ borderBottomWidth: isShowed ? 2 : 0, ...navItemStyle }}
                    //  onMouseOver={mouseOverAction}
                    //   onMouseLeave={mouseLeaveAction}
                    onClick={mouseClickAction}
                >
                    {props.title}
                </div>
            </div>
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
                height: 250,
                backgroundColor: 'blue',
                top: 50,
                position: 'absolute',
                display: showNavItem ? 'flex' : 'none',
            }
        }

        const SubMenu = () => {
            const subCategoryStyle = {
                containerStyle: {
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: "25vmin"
                },
                itemStyle: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'red',
                    cursor: 'pointer'
                }
            }

            return <div style={subCategoryStyle.containerStyle}>
                {miniMenuData.map(item => <div key={item} style={subCategoryStyle.itemStyle} onClick={() => setActiveView(item)}>
                    <div>{item}</div>
                    <div>{activeView == item ? ">" : null}</div>
                </div>
                )}
            </div>
        }


        const NestedMenu = () => {
            const nestedCategoryStyle = {
                container: {
                    display: 'flex', flexDirection: 'column', backgroundColor: 'green', minWidth: "25vmin"
                }
            }
            let title = data[props.title][activeView]
            return (
                <div style={nestedCategoryStyle.container}>
                    {title.map(item => <div style={{ cursor: 'pointer' }} key={item}>{item}</div>)}
                </div>
            )
        }

        return (
            <div style={MiniMenuStyle.containerStyle}>
                <SubMenu />
                <NestedMenu />
            </div>
        )
    }

    const navBarStyle = {
        container: {
            height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', borderStyle: 'solid', borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0.5, borderColor: 'black'
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