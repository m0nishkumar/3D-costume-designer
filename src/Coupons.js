import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Coupons = () => {
    const [coupons,setCoupons]=useState([]);
    const [coupon,setCoupon]=useState([]);
    const [state_catt,set_catt]=useState("");
    const [combo,set_combo]=useState("");
    const array_company=[];
    const [company_arr,set_company_arr]=useState([]);
    const [company,set_company]=useState("");
    const compnay_filter=(as)=>{
      setCoupon(coupons.filter((i)=>(i.brand==as)))
    }
    let arr=[];
    useEffect(()=>{
        axios.get("http://localhost:5000/post").then((res)=>{
          const removeDuplicatesFromArrayByProperty = (arr, prop) => arr.reduce((accumulator, currentValue) => {
            if(!accumulator.find(obj => obj[prop] === currentValue[prop])){
              accumulator.push(currentValue);
            }
            return accumulator;
          }, [])
          
          console.log(removeDuplicatesFromArrayByProperty(res.data,"code"))
            setCoupons(removeDuplicatesFromArrayByProperty(res.data,"code"))
            setCoupon(removeDuplicatesFromArrayByProperty(res.data,"code"))
            res.data.map((i)=>{
              if(!(array_company.includes(i.brand))){
                array_company.push(i.brand)
              }
            })
            set_company_arr(array_company)
            console.log(array_company)
        })
    },[])
  return (
    <div className='relative'>
                <svg viewBox="0 0 500 200" style={{position:"absolute",zIndex:-1,fill:"#002244"}}>
  <path d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0"></path>
</svg>
    <div className='select-bar flex flex-row justify-between items-center px-[50px] pt-8'>
    <div className='flex flex-row space-x-5'>
<select name="cars" id="cars" value={state_catt} onChange={(e)=>{
    set_catt(e.target.value);
    set_combo(false);
}} className='border-2 p-2 w-fit h-[38px] rounded-2xl bg-slate-100 px-3 border-none text-gray-800 shadow-xl'style={{
  fontFamily:"poppins"
}}>
    <option value="">Campanies</option>
    <option value="shirt">Shirts</option>
    <option value="pant">Pants</option>
    <option value="shoe">Shoes</option>
  </select>
  <select name="cars" id="cars" className='border-2 bg-slate-100 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-800 shadow-xl'value={state_catt} style={{
  fontFamily:"poppins"
}} onChange={(e)=>{
    combo(e);
}}>
    <option value="">Categories</option>
    <option value="party">Fashion</option>
    <option value="formal">Cosmetics</option>
    <option value="causal"></option>
    <option value="semi-formal"></option>
  </select>
  <select name="cars" id="cars" className='border-2 bg-slate-100 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-800 shadow-xl'style={{
  fontFamily:"poppins"
}}>
    <option value="volvo">Trendy</option>
    <option value="saab">Grocrey</option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>
  <select name="cars" id="cars" className='border-2 bg-slate-100 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-800 shadow-xl'style={{
  fontFamily:"poppins"
}}>
    <option value="volvo">Fashion</option>
    <option value="saab"></option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>

  </div>
    <div className='main_coupons'>
          <div className='flex flex-row items-center space-x-2'>
  <div className='flex flex-row items-center shadow-xl'>
    <input type="text" value={state_catt} onChange={(e)=>{
        set_catt(e.target.value)
    }} placeholder='Search for Coupons...' style={{
        fontFamily:"poppins"
    }} className='border-2 border-none p-[10px] w-[360px] bg-slate-100 text-gray-500 rounded-l-[4px] placeholder-slate-500'/>
    <select value={state_catt} onChange={(e)=>{
        set_catt(e.target.value)
    }} className=' p-1 w-fit h-[44px] bg-slate-100 text-gray-500 border-x-0 border-l-2 ' style={{
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

   <h1 className='pl-[56px] text-[27px] my-6 font-[500] text-white' style={{
    fontFamily:"poppins",textShadow:"3px 3px 10px #ababab"
   }}>2000+ ways to save: coupons for the savvy shopper from 600+ companies!</h1>
   <div className='px-[55px]'>
      <div className='flex flex-row overflow-x-scroll scroll-h space-x-3 example_scroll items-center' style={{
        fontFamily:"poppins"
      }}>
{
  company_arr.map((i)=>{
    return(
      <div className='gradient_css1 px-1  flex flex-col justify-center items-center shadow-2xl rounded-md' onClick={()=>{
        compnay_filter(i)
      }}>
        <h1 className="w-[160px] text-black h-[80px] flex flex-row justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
</svg>
{i}</h1>
      </div>
    )
  })
}
    </div>
   </div>
   <div className='flex flex-row justify-center mt-10 px-10'>
    <div className='grid grid-cols-3 gap-5'>
        {
            coupon.map((i)=>{
                return(
                    <div className='coupons flex flex-col justify-center items-center w-[450px] p-6 space-y-2 relative bg-slate-200 gradient_css shadow-md'>
                        <div className="border-l-2 border-black h-[100%] right-7 absolute border-dashed"></div>
                        <div className='w-10 h-11 bg-white absolute top-[37%] left-0 clip_css'></div>
                        <div className='w-10 h-11 bg-white absolute top-[37%] right-0 clip_css1'></div>
                        <div className='flex flex-row space-x-1'>

                        <h1 className='font-semibold text-[27px]' style={{
                            fontFamily:"poppins"
                        }}>{i.brand}</h1>
                        </div>

                        <div className='flex flex-row space-x-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
</svg>

                        <h1 className='' style={{
                            fontFamily:"poppins"
                        }}>COUPON CODE : <span className='font-semibold'>{i.code}</span></h1>
                        </div>
                        <h1 className=''style={{
                            fontFamily:"poppins"
                        }}>{i.for}</h1>
                    </div>
                )
            })
        }
    </div>
    </div>
    </div>
  )
}
