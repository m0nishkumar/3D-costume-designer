import React, { useEffect } from 'react'
import formal_wear from './assets/formal_wear.png'
import party_wear from './assets/party_wear.png'
import semi1 from './assets/semi1.png'
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'

export const Cards_fashion = ({array_fas,combo_check}) => {
    const [turn,setTurn]=useState(180)
    const card_con=useRef()
    const [color,set_color]=useState();
    const [index, setIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (isHovering) {
          const interval = setInterval(() => {
            setIndex((index + 1) % images.length);
          }, 2500);
          return () => clearInterval(interval);
        }
      }, [isHovering, index]);
    
      const handleMouseEnter = () => {
        setIsHovering(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovering(false);
      };

    const images = array_fas.imageUrl

    const doubleClick=(event)=>{
        
        if(event.detail == 2){
            (turn==0)?setTurn(180):setTurn(0);
            console.log(turn)
            card_con.current.style.transform=`rotateY(${turn}deg)`;
        }
    }
  return (
    <div className='card-fas' onClick={doubleClick}>
<div className='card-content-fas relative h-[400px] w-[250px]'ref={card_con}>
<div className='card-front-fas items absolute bg-white shadow-2xl flex flex-col rounded-2xl overflow-hidden'
 style={{
    boxShadow:`0px 15px 10px -15px black, var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)`
}}>
   <div className='relative'>
    {console.log(array_fas.trends)}
    {(array_fas.trends)?
            <h1 className='absolute right-2 text-sm top-2 z-50 font-[500] p-1 px-2 flex flex-row items-center space-x-1 bg-white rounded-[13px]' style={{
                fontFamily:"poppins"
            }}><div>{(array_fas.trends =="Trending")?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
          :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd" />
        </svg>
        }</div><h1>{array_fas.trends}</h1></h1>:console.log("Hola")
    }

    {/* <img src={array_fas.imgURL} className='h-[300px] w-[250px] bg-slate-200 p-5 pb-0' /> */}
    <div className='relative bg-black'>
    <img
        className="fade-in h-[300px] w-[250px] bg-slate-200"
        src={images[index]}
        alt="slideshow"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div className='absolute left-2 top-[50%] text-gray-600'onClick={()=>{
  setIndex(((index==0)?index:index-1) % images.length);
}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg></div>

<div className='absolute right-2 top-[50%] text-gray-600' onClick={()=>{
  setIndex((index + 1) % images.length);
}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
</div>

<div className='absolute bottom-3 w-full flex flex-row items-center space-x-[7px] justify-center'>
{
  images.map((i,indexx)=>{
    return(
    <svg height="8" width="8">
  <circle cx="4" cy="4" r="3.3" stroke={(indexx==index)?"grey ":"#EAE8E1"} stroke-width="1" fill={(indexx==index)?"grey":"#EAE8E1"} /> 
</svg> 
    )
  })
}

</div>
      </div>
   </div>
<div className='flex flex-col p-2 pt-0 items-start' >
{/* style={{
        backgroundColor:(combo_check)?'rgb(' + (225-array_fas.combo[array_fas.combo.length-1]) + ',' + (225-array_fas.combo[array_fas.combo.length-1]*55) + ',' + (225-array_fas.combo[array_fas.combo.length-1]*55) + ')':'rgb(' + 226 + ',' + 232 + ',' + 240 + ')'
    }}  put this in above div */}
<h1 className='text-gray-500 text-sm' style={{
    fontFamily:"poppins"
}}>{array_fas.occasion} {array_fas.dress_type}</h1>
<div className='flex flex-row justify-between w-full'>
<h1 style={{
    fontFamily:"poppins"
}}>{array_fas.brand}</h1>
<h1 style={{
    fontFamily:"poppins"
}} className='font-bold'>₹{array_fas.mrp}</h1>
</div>
<div className='w-full flex flex-row justify-center'>
<button className='p-1 px-2 bg-black rounded-full m-2 text-white flex flex-row'><a href={""}>
        <div className='flex flex-row p-1 space-x-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{
        }}>  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span>Buy now</span></div></a></button>
</div>
</div>
</div>
<div className='card-back-fas absolute bg-white shadow-2xl w-[50px] h-[50px]'>
<h1>Gii</h1>
</div>
</div>
</div>
  )
}
