import React from 'react'
import './widget.css'
import PeopleIcon from '@mui/icons-material/People';

const Widget = ({widgetData}) => {
  return (<>
  {widgetData.map((data) => {
      return (
        <div className='widget' key={data.id}>
          <div className='w-body'>
            <div className="w-number">
              {data.count}
            </div>
            <div className="w-name">
              {data.name}
            </div>
          </div>
          <div >
          <PeopleIcon className="w-icon"/>
          </div>
        </div>
      )
    })}
  </>
  )
}

export default Widget