import React from 'react'
import Submenu from '../sub-menu/Submenu'
import './navmenu.css'

const Navmenu = (props) => {
    return (props.data.map((data) => {
        return (
            <div className='nav-container'>
                <div className="item" key={data.id}>
                    {data.icon}
                    {data.counter && <div className="counter">{data.counter}</div>}
                </div>
                <Submenu />
            </div>

        )
    })
    )
}

export default Navmenu