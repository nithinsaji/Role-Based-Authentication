import React from 'react'
import { NavLink } from 'react-router-dom'

const List = (props) => {
  return ( props.data.map((data) =>{
    return (
      <li title={data.name} key={data.id}>
          <NavLink end  to={data.link} style={{ textDecoration: "none" }} >
            {data.icon}
            <span>{data.name}</span>
        </NavLink>
        </li>
    )
    })
  )
}

export default List