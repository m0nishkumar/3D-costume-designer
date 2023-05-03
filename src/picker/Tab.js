import React from 'react'
import { state } from '../store/Index'

export const Tab = ({tab,key,handleClick,setStatee,statee}) => {
  return (
    <div className='' onClick={()=>{
      if(tab.name=="pant-shoe"){
        setStatee(!statee)
      }
      else{
        handleClick()
      }
    }}>
        <img src={tab.icon} className='h-[80px] w-[120px]' style={{
          height:(tab.name=="pant-shoe")?"130px":"85px",width:(tab.name=="pant-shoe")?"130px":"85px"
        }}/>
    </div>
  )
}
