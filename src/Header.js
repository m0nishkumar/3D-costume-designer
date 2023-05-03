import React, { useEffect } from 'react'
import logo from './assets/choosylogo.png'
import { useState } from 'react';
import ad5 from './assets/ad5.jpg'
import ad2 from './assets/ad2.jpg'
import ad9 from './assets/ad9.jpg'
import ad7 from './assets/ad7.jpg'

export const Header = ({state_cat,set_cat}) => {
    const [slide,setSilde]=useState([ad7,ad2]);
    const [index,setIndex]=useState(0)
    useEffect(()=>{
        const timer=setTimeout(
            () =>
              setIndex((prevIndex) =>
                prevIndex === slide.length - 1 ? 0 : prevIndex + 1
              ),
            5000
          );
          return () => clearTimeout(timer);
        }, [index]);
  return (
    <div class="Header">
<svg viewBox="0 0 500 200" style={{position:"absolute",zIndex:-1,fill:"#C8C8C8"}}>
  <path d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0"></path>
</svg>

    <div className="overflow-hidden" >
    <div className='whitespace-nowrap'style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
    {/*
    slide.map((i)=>{
        return(
            <div className='inline-block w-full px-[50px]'>
                <img src={i} className="w-full h-[250px] opacity-[0.82] rounded-2xl"/>
            </div>
        )
    })
    
*/}
</div></div>
<div className='select-bar flex flex-row justify-between items-center px-[50px] pt-4'>
    <div className='flex flex-row space-x-5'>
<select name="cars" id="cars" value={state_cat} onChange={(e)=>{
    set_cat(e.target.value)
}}className='border-2 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500'>
    <option value="">Beauty & Cosmetics</option>
    <option value="Shampoo">Shampoo</option>
    <option value="opel">Bath Soaps</option>
    <option value="audi">Fash Wash</option>
  </select>
  <select name="cars" id="cars" className='border-2 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500'>
    <option value="">Electroincs</option>
    <option value="saab"></option>
    <option value="opel">Fashion</option>
    <option value="audi"></option>
  </select>
  <select name="cars" id="cars" className='border-2 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500'>
    <option value="volvo">Grocrey</option>
    <option value="saab">Grocrey</option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>
  <select name="cars" id="cars" className='border-2 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500'>
    <option value="volvo">Fashion</option>
    <option value="saab"></option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>
  <select name="cars" id="cars" className='border-2 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500'>
    <option value="volvo">Stationary</option>
    <option value="saab"></option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>
  </div>

  <div className='flex flex-row items-center space-x-2'>
  <div className='flex flex-row items-center '>
    <input type="text" value={state_cat} onChange={(e)=>{
        set_cat(e.target.value)
    }} placeholder='Search for Products...' style={{
        fontFamily:"poppins"
    }} className='border-2 border-none p-[10px] w-[360px] text-gray-500 rounded-l-[8px] placeholder-slate-500'/>
    <select value={state_cat} onChange={(e)=>{
        set_cat(e.target.value)
    }} className=' p-1 w-fit h-[44px] text-gray-500 border-x-0 border-l-2' style={{
        fontFamily:"poppins"
    }}>
    <option value="volvo">All category</option>
    <option value="saab">Beauty & Cosmetics</option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-[44px] p-3 bg-blue-600 inline-block text-white rounded-r-[8px]">
  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
</svg>
</div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
  <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
</svg>

  </div>
</div>
    </div>
    
  )
}
