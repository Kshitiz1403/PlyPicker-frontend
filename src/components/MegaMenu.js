import React, { useState } from 'react'

const MegaMenu = () => {
    const [showNavItem, setShowNavItem] = useState(true)
    const [activeNavItem, setActiveNavItem] = useState('Wood')

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


    const navItems = Object.keys(data)

    const NavItem = (props) => {
        const [isShowed, setIsShowed] = useState(false)

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
                <div style={{ borderBottomWidth: isShowed ? 2 : 0, ...navItemStyle }} onMouseOver={mouseOverAction} onMouseLeave={mouseLeaveAction}>
                    {props.title}
                    <MiniMenu title={props.title} />
                </div>
            </div>

        )
    }

    const MiniMenu = (props) => {
        const [isActive, setIsActive] = useState(false)

        let miniMenuData = Object.keys(data[props.title])
        const [activeView, setActiveView] = useState("plywood")
        // console.log(miniMenuData.map(item=> data[props.title][item]))
        return (
            <div style={{ display: showNavItem ? 'flex' : 'none', height: 250, width: '60%', backgroundColor: 'blue', position: 'absolute', top: 50 }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '25%' }}>

                    {miniMenuData.map(item => <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'red', cursor: 'pointer' }}>
                        <div>{item}</div>
                        <div>{">"}</div>
                    </div>
                    )}

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '25%' }}>
                    <SubMenu title={data[props.title][activeView]} />
                </div>
            </div>
        )
    }

    const SubMenu = (props) => {
        let arr = props.title
        console.log(arr)
        return (<>
        {arr}

            {/* {arr.forEach(element => {
            <div>{element}</div>
        })} */}
        </>
        )
    }

    return (
        <div>
            <div style={{ width: '100%', height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', borderStyle: 'solid', borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0.5, borderColor: 'black' }}
            >
                {navItems.map(item => {
                    // console.log(Object.keys(data[item]))
                    return (<NavItem title={item} />)
                }

                )}
            </div>
            <MiniMenu title={activeNavItem} />
        </div>
    )
}

export default MegaMenu