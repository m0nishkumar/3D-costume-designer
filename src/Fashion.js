import React, { useEffect, useRef, useState } from 'react'
import Modal from './assets/modal.png'
import comp1 from './assets/compliment1.jpg'
import comp2 from './assets/compliment2.jpg'
import comp3 from './assets/compliment3.jpg'
import model_cover from './assets/model_cover.png'
import quotes from './assets/quotes.svg'
import like1 from './assets/like1.jpg'
import like2 from './assets/like2.jpg'
import like3 from './assets/like3.jpg'
import like4 from './assets/like4.jpg'
import like_rain from './assets/heart_rain.png'
import like_button from './assets/like_button.png'
import party_wear from './assets/party_wear.png'
import formal_wear from './assets/formal_wear.png'
import causal_wear from './assets/causal_wear.png'
import hoodies from './assets/hoodies.png'
import semi1 from './assets/semi1.png'
import semi2 from './assets/semi2.png'
import hoodies1 from './assets/hoodies1.png'
import hoodies2 from './assets/hoodies2.png'
import cas1 from './assets/cas1.png'
import shoe1 from './assets/shoe1.png'
import formal3 from './assets/formal3.png'
import formal_shoe1 from './assets/formal_shoe1.png'
import denim1 from './assets/denim1.png'
import party_shoe from './assets/party-shoe.png'
import { Cards_fashion } from './Cards_fashion'
import pw_p_1 from './assets/pw-p-1.png'
import pw_s_1 from './assets/pw-s-1.png'
import pw_w_1 from './assets/pw-w-1.png'
import pw_c_1 from './assets/pw-c-1.png'
import axios from 'axios'
import { Canvas } from '@react-three/fiber'
import { Center, Environment, OrbitControls } from '@react-three/drei'
import { CameraRig } from './Canvas/CameraRig'
import { Shirt } from './Canvas/Shirt'
import { Shirts } from './Canvas/Shirt-fashion'
import { CameraRigF } from './Canvas/CamerRigF'

export const Fashion = () => {
    const[state_catt,set_catt]=useState("shirt");
    const[combo_arr,set_combo_arr]=useState();
    const[combo_state,set_combo]=useState(false);
    const combo_fas={}
    const [final_arr,set_arr]=useState([]);
    const [fashion_data,setfashion_data]=useState([]);
    const [custom_dress,setCustom_dress]=useState(false);
    const [custom,set_custom]=useState("stripes")

    function importAll(r) {
        return r.keys().map(r);
      }
      
      const images = importAll(require.context('C:/startup/choosy/src/assets/stripes', false, /\.(png|jpe?g|svg|avif|webp)$/));
      const images1 = importAll(require.context('C:/startup/choosy/src/assets/design', false, /\.(png|jpe?g|svg|avif|webp)$/));
      const images2 = importAll(require.context('C:/startup/choosy/src/assets/pattern', false, /\.(png|jpe?g|svg|avif|webp)$/));

      const dict_custom={
        "stripes":images,"design":images1,"pattern":images2
      }
    useEffect(()=>{
        axios.get("http://localhost:5000/fashion-data",{
            params:{
                list:array_fas
            }
        }).then((res)=>{
            console.log(res.data)
            const q=res.data
            const combinedList = res.data.map((item, index) => ({ ...item, ...array_fas[index] }));
            setfashion_data(combinedList)
            console.log(array_fas)
            set_arr(combinedList?.filter((i)=>i.product==state_catt))
        })
        
    },[])

    const numbers={
        "one":1,
        "two":2,
        "three":3
    }
const combo= (e)=>{

    fashion_data.filter((i)=>i.combo.slice(0,-1)==e.target.value).map((j)=>{
            (Object.keys(numbers).find(key => numbers[key] ==j.combo[j.combo.length-1]) in combo_fas)?
            combo_fas[Object.keys(numbers).find(key => numbers[key] ==j.combo[j.combo.length-1])].push(j)
            :combo_fas[Object.keys(numbers).find(key => numbers[key] ==j.combo[j.combo.length-1])]=[j]
        })
        set_combo_arr(combo_fas)
        set_combo(true)
        
    }

    useEffect(()=>{
        set_arr(fashion_data?.filter((i)=>i.product==state_catt))
    },[state_catt])

    const array_fas=[{product:"shirt",trends:"Popular",combo:"party1",Genre:"Party Wear",link:"https://www.myntra.com/shirts/tommy-hilfiger/tommy-hilfiger-men-pure-cotton-slim-fit-dobby-opaque-casual-shirt/21826274/buy"},
    {product:"pant",trends:"",combo:"party1",Genre:"Party Wear",link:"https://www.myntra.com/jeans/levis/levis-men-blue-512-tapered-fit-heavy-fade-stretchable-jeans/18074866/buy"},
    {product:"shoe",trends:"Trending",combo:"party1",Genre:"Party Wear",link:"https://www.myntra.com/casual-shoes/us-polo-assn/us-polo-assn-men-off-white-madryn-2o-sneakers/15761644/buy"},
    {product:"watch",trends:"Trending",combo:"party1",Genre:"Party Wear",link:"https://www.myntra.com/watches/titan/titan-men-black-analogue-watch/12870712/buy"},
    {product:"sunglass",trends:"",combo:"party1",Genre:"Party Wear",link:"https://www.myntra.com/sunglasses/hrx-by-hrithik-roshan/hrx-by-hrithik-roshan-men-aviator-sunglasses-mfb-pn-cy-59946/2311888/buy"},

    {product:"shirt",trends:"Trending",combo:"party2",Genre:"Party Wear",link:"https://www.myntra.com/jackets/high-star/high-star-men-black-solid-denim-jacket/11275832/buy"},
    {product:"pant",trends:"",combo:"party2",Genre:"Party Wear",link:"https://www.myntra.com/jeans/wrogn/wrogn-men-blue-slim-fit-mid-rise-clean-look-stretchable-jeans/6832333/buy"},
    {product:"shoe",trends:"",combo:"party2",Genre:"Party Wear",link:"https://www.myntra.com/casual-shoes/mozafia/mozafia-men-canvas-mid-top-lace-up-sneakers/21907914/buy"},
    {product:"watch",trends:"Trending",combo:"party2",Genre:"Party Wear",link:"https://www.myntra.com/watches/roadster/roadster-men-black-analogue-watch-pn-lb-80300/2211771/buy"},
    {product:"sunglass",trends:"",combo:"party2",Genre:"Party Wear",link:"https://www.myntra.com/sunglasses/voyage/voyage-unisex-black-lens--white-wayfarer-sunglasses-with-uv-protected-lens/17838038/buy"},


    {product:"shirt",trends:"Popular",combo:"party3",Genre:"Party Wear",link:"https://www.myntra.com/jackets/roadster/roadster-men-navy-blue-washed-denim-jacket/12288724/buy"},
    {product:"pant",trends:"",combo:"party3",Genre:"Party Wear",link:"https://www.myntra.com/jeans/urbano-fashion/urbano-fashion-men-black-slim-fit-mid-rise-clean-look-stretchable-jeans/13823708/buy"},
    {product:"shoe",trends:"Trending",combo:"party3",Genre:"Party Wear",link:"https://www.myntra.com/casual-shoes/mast--harbour/mast--harbour-men-white-striped-sneakers/17097806/buy"},
    {product:"watch",trends:"Trending",combo:"party3",Genre:"Party Wear",link:"https://www.myntra.com/watches/mast--harbour/mast--harbour-unisex-navy-blue-analogue-watch-mfb-pn-wth-s9642g/2211654/buy"},
    {product:"sunglass",trends:"",combo:"party3",Genre:"Party Wear",link:"https://www.myntra.com/sunglasses/royal-son/royal-son-unisex-black-polarized--uv-protected-wayfarer-sunglasses-chi00121-c1/15108888/buy"}]
  return (
    <div className="relative">
        <h1 className='outline_text absolute w-[100%] flex flex-row justify-end text-[500px]'>Woah</h1>
        <svg viewBox="0 0 500 200" style={{position:"absolute",zIndex:-1,fill:"#EDE9D5"}}>
  <path d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0"></path>
</svg>
        <div className='fashion-header flex flex-row justify-around'>
        <div class="header_left flex flex-col justify-end">
        <h5 className='mx-2 my-5'>TRENDY COLLECTION'S🔥</h5>
        <div className='leading-[75px] p-0'>
            <h1 className='text-[90px]' style={{
                fontFamily:'poppins'
            }}>DRESSES TO <br/> BE NOTICED<span className='text-2xl'>
                ■</span></h1>
        </div>
        <div className='border-l-4 border-gray-300 px-1 mx-2 my-[40px]'>
            <h3 className='text-xl text-gray-700' style={{
                fontFamily:"poppins"
            }}>Anyone can beat you but no one can beat your outfit as long <br/> as you wear our outfits</h3>
            </div>
    <div className='flex flex-row space-x-3 items-center'>
        <div className='flex flex-row items-center bg-black mx-2 text-white text-lg rounded-[50px] p-4 px-7 w-fit space-x-1'>
            <button className=''>Discover Trends</button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7 ">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
</svg>
</div>

<div className='flex flex-row space-x-1'>
    <div className='flex flex-row items-center'>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-10 h-10">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
</svg>
<h5 className='mx-2' style={{
    fontFamily:"poppins"
}}>What's Trending ?</h5> 
</div>
            </div>
        </div>
<div className='flex flex-row space-x-1 mt-7 justify-start ' style={{
    fontFamily:"Rajdhani"
}}>
    <div className='p-2'>
        <h1 className="font-bold text-[25px]" style={{
            fontFamily:"Nova Square"
        }}>David gandy</h1>
        <h2 style={{
            fontFamily:"poppins",fontWeight:"100"
        }}>Fashion Model</h2>
    </div>
    
<div className='relative ' >
    <img src={model_cover} className="h-[200px] w-[150px]"/>
    <p className='absolute top-3 left-7'>⚡</p>
</div>
<div className='p-2 flex flex-col space-y-2 justify-start items-start'>
<img src={quotes} className=" quotes h-[30px]"/>
<h1 className='font-normal text-[25px]' style={{
    fontFamily:"Teko"
}}  >I just love Choosy!</h1>
<div className='w-[300px]'>
<p className="text-[28px] text-bold" style={{
    fontFamily:"Tangerine"
}}>They pick the best fashion item in the market it saves tons of time</p>
    </div>
    <div className='flex flex-row items-center space-x-1'>
    <p>4.9</p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-400">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
</svg>
<div className='relative'>
        <div className='h-1 bg-green-400 rounded-md z-20 absolute' style={{
            width:"calc(140*0.98px)"
        }}></div>
    <div className='h-1 w-[150px] bg-slate-300 rounded-md'></div>

    </div>
    <p>Overall rating</p>
    </div>
    
</div>
</div>
        </div>
        <div className='header_right'>
            <div className='relative'>
            <img src={like_rain}className="absolute h-[100px] w-[100px] bottom-0 left-[75px]"/>
            <div className='flex flex-col items-end absolute top-[23%] right-0 ' >
                <img src={comp1} className="h-10 w-10 rounded-full z-0"/>
                <h2 className='message_bg p-2'>You have great taste in clothes😍</h2>
            </div>
            <img src={Modal} className="z-10"/>
            <div className='flex flex-col  absolute bottom-[35%] left-0 ' >
                <img src={comp2} className="h-10 w-10 rounded-full z-0"/>
                <h2 className='message_bg p-2'>You look great! Love your outfit❤️</h2>
            </div>
            <div className='flex flex-col  absolute top-[70%] right-0 items-end' >
                <img src={comp3} className="h-10 w-10 rounded-full z-0"/>
                <h2 className='message_bg p-2'>You’re rocking that outfit like a boss!</h2>
            </div>
            </div>
            <div>
                <div className='relative h-[80px] flex flex-row items-start justify-center space-x-2'>
                   <img src={like_button} className="w-[30px] h-[30px]"/>
                <div className='flex flex-row space-x-[-20px] top-0'>
                    <img src={comp1} className="h-[60px] w-[60px] rounded-full ring-2 ring-white"/>
                    <img src={comp2} className="h-[60px] w-[60px] rounded-full ring-2 ring-white"/>
                    <img src={comp3} className="h-[60px] w-[60px] rounded-full ring-2 ring-white"/>
                    <img src={like1} className="h-[60px] w-[60px] rounded-full ring-2 ring-white"/>
                    <img src={like2} className="h-[60px] w-[60px] rounded-full ring-2 ring-white"/>
                    <img src={like3} className="h-[60px] w-[60px] rounded-full ring-2 ring-white"/>
                    <img src={like4} className="h-[60px] w-[60px] rounded-full ring-2 ring-white"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className='px-[110px]'>
        <div className='w-full rounded-[60px] flex flex-row justify-around  items-center p-10 pb-5 pr-0' style={{
            backgroundImage:"linear-gradient(to bottom right,#242c33,#424b53)"
        }}>
            <div className='college_wear h-[100%] w-[220px] flex flex-col justify-center' style={{
                    fontFamily:"poppins"
                }}>
                    <div className='flex flex-row'>
                <img src={party_wear} className="h-[200px] w-[80px] "/>
                <div className="h-[200px] w-[80px] ">
                    <img src={denim1} className="h-[100px] w-[170px]"/>
                    <img src={cas1} className="h-[100px] w-[120px]"/>
                </div>
                </div>
                <h1 className='font-semibold text-xl text-white'>Party wear</h1>
                <p className="text-gray-400 text-sm">Get the Best hand-picked party wear in the market</p>
            </div>
            <div className='college_wear h-[100%] w-[220px]'style={{
                    fontFamily:"poppins"
                }}>
                <div className='flex flex-row relative'>
                <img src={hoodies} className="h-[200px] w-[80px] "/>
                <div className="h-[200px] w-[80px] ">
                    <img src={hoodies2} className="h-[90px]"/>
                    <img src={hoodies1} className="h-[110px]"/>
                </div>
                </div>
                <h1 className='font-semibold text-xl text-white'>Causal wear</h1>
                <p className='text-gray-400 text-sm'>Get the Best hand-picked party wear in the market</p>
            </div>
            <div className='college_wear h-[100%] w-[220px]'style={{
                    fontFamily:"poppins"
                }}>
                    <div className='flex flex-row'>
                <img src={causal_wear} className="h-[200px] w-[80px] "/>
                <div className="h-[200px] w-[80px] ">
                    <img src={semi1}/>
                    <img src={shoe1}/>
                </div>
                </div>
                <h1 className='font-semibold text-xl text-white'>Semi-formal wear</h1>
                <p className='text-gray-400 text-sm'>Get the Best hand-picked party wear in the market</p>
            </div>
            <div className='college_wear h-[100%] w-[220px] relative 'style={{
                    fontFamily:"poppins"
                }}>
             <div className='flex flex-row'>
                <img src={formal_wear} className="h-[200px] w-[80px] "/>
                <div className="h-[200px] w-[80px]">
                    <img src={formal3} className="h-[100px] w-[80px]"/>
                    <img src={formal_shoe1}/>
                </div>
                </div>
                <h1 className='font-semibold text-xl text-white'>Formal wear</h1>
                <p className='text-gray-400 text-sm'>Get the Best hand-picked party wear in the market</p>
            </div>
        </div>
    </div>
{(custom_dress)?<div>
    <div className='select-bar flex flex-row justify-between items-center px-[50px] pt-4'>
    <div className='flex flex-row space-x-5'>
<select name="cars" id="cars" value={custom} onChange={(e)=>{
    set_custom(e.target.value);
}} className='border-2 p-2 w-fit h-[38px] rounded-2xl bg-slate-100 px-3 border-none text-gray-500 shadow-xl'>
    <option value="stripes">Stripe T-shirts</option>
    <option value="design">Design T-shirts</option>
    <option value="pattern">Pattern T-shirts</option>
  </select>

  <select name="cars" id="cars" className='border-2 bg-slate-100 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500 shadow-xl'value={state_catt} onChange={(e)=>{
    combo(e);
}}>
    <option value="">Combos</option>
    <option value="party">Party combo</option>
    <option value="formal">Formal combo</option>
    <option value="causal">Causal combo</option>
    <option value="semi-formal">Semi-formal combo</option>
  </select>

  <select name="cars" id="cars" className='border-2 bg-slate-100 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500 shadow-xl'>
    <option value="volvo">Fashion</option>
    <option value="saab"></option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>
  <select name="cars" id="cars" className='border-2 bg-slate-100 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500 shadow-xl'>
    <option value="volvo">Stationary</option>
    <option value="saab"></option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>
  </div>

  <div className='flex flex-row items-center space-x-2'>
  <div className='flex flex-row items-center shadow-xl'>
    <input type="text" value={state_catt} onChange={(e)=>{
        set_catt(e.target.value)
    }} placeholder='Search for Products...' style={{
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6"onClick={()=>{
    setCustom_dress(!custom_dress)
  }}>
  <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
</svg>

  </div>
</div>
<h1 className='p-[50px] py-3 font-semibold text-2xl' style={{
    fontFamily:"poppins"
}}>Trendy {custom} T-shirt  Collections!</h1>
</div>:
<div className='select-bar flex flex-row justify-between items-center px-[50px] pt-4'>
<div className='flex flex-row space-x-5'>
<select name="cars" id="cars" value={state_catt} onChange={(e)=>{
    set_catt(e.target.value);
    set_combo(false);
}} className='border-2 p-2 w-fit h-[38px] rounded-2xl bg-slate-100 px-3 border-none text-gray-500 shadow-xl'>
    <option value="">Collections</option>
    <option value="shirt">Shirts</option>
    <option value="pant">Pants</option>
    <option value="shoe">Shoes</option>
  </select>
  <select name="cars" id="cars" className='border-2 bg-slate-100 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500 shadow-xl'value={state_catt} onChange={(e)=>{
    combo(e);
}}>
    <option value="">Combos</option>
    <option value="party">Party combo</option>
    <option value="formal">Formal combo</option>
    <option value="causal">Causal combo</option>
    <option value="semi-formal">Semi-formal combo</option>
  </select>
  <select name="cars" id="cars" className='border-2 bg-slate-100 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500 shadow-xl'>
    <option value="volvo">Grocrey</option>
    <option value="saab">Grocrey</option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>
  <select name="cars" id="cars" className='border-2 bg-slate-100 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500 shadow-xl'>
    <option value="volvo">Fashion</option>
    <option value="saab"></option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>
  <select name="cars" id="cars" className='border-2 bg-slate-100 p-1 w-fit h-[38px] rounded-2xl px-2 border-none text-gray-500 shadow-xl'>
    <option value="volvo">Stationary</option>
    <option value="saab"></option>
    <option value="opel">Fashion</option>
    <option value="audi">Grocrey</option>
  </select>
  </div>
     <div className='flex flex-row items-center space-x-2'>
  <div className='flex flex-row items-center shadow-xl'>
    <input type="text" value={state_catt} onChange={(e)=>{
        set_catt(e.target.value)
    }} placeholder='Search for Products...' style={{
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6" onClick={()=>{
    setCustom_dress(!custom_dress)
  }}>
  <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
</svg>

  </div>
</div>
}
{(!custom_dress)?<div className='grid p-[50px] grid-cols-5 place-content-center gap-y-[90px] gap-10'>
{
    (combo_state==false)?
    final_arr?.map((i)=>{
        console.log(i)
        return(
            <Cards_fashion array_fas={i} combo_check={combo_state}/>
        )
    })
    :
    Object.keys(combo_arr)
    ?.map((i)=>{
        return(
        combo_arr[i].map((j)=>{
            console.log(j)
            return(
            <Cards_fashion array_fas={j} combo_check={combo_state}/>
            )
        }))
    })
}

</div>:
<div className='flex flex-row flex-wrap justify-around items-center gap-[50px] p-5'>
{
    dict_custom[custom].map((i)=>{
        return(
            <div style={{
                boxShadow:`0px 15px 10px -15px black, var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)`
            }} className="shadow-2xl rounded-2xl overflow-hidden relative">
    {
            <h1 className='absolute right-2 text-sm top-2 z-100 font-[500] p-1 px-2 flex flex-row items-center space-x-1 bg-white rounded-[13px]' style={{
                fontFamily:"poppins"
            }}><div className="z-50"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 z-50">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
          </div><h1>Trending</h1></h1>
    }
<div className='h-[310px] w-[250px] bg-slate-200'  >
    <Canvas
        shadows
        camera={{ position: [0,0,0], fov:17 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-[100%] h-[100%] transition-all ease-in"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />

        <CameraRigF>
          <Center>
           <Shirts mat={i}/>
          </Center>
        </CameraRigF>
      </Canvas> 
</div>
<div className='flex flex-col p-2 pt-0 items-start' >
{/* style={{
        backgroundColor:(combo_check)?'rgb(' + (225-array_fas.combo[array_fas.combo.length-1]) + ',' + (225-array_fas.combo[array_fas.combo.length-1]*55) + ',' + (225-array_fas.combo[array_fas.combo.length-1]*55) + ')':'rgb(' + 226 + ',' + 232 + ',' + 240 + ')'
    }}  put this in above div */}
<h1 className='text-gray-500 text-sm' style={{
    fontFamily:"poppins"
}}>Casual Tshirt</h1>
<div className='flex flex-row justify-between w-full'>
<h1 style={{
    fontFamily:"poppins"
}}>Choosy</h1>
<h1 style={{
    fontFamily:"poppins"
}} className='font-bold'>₹800</h1>
</div>
<div className='w-full flex flex-row justify-center'>
<button className='p-1 px-2 bg-black rounded-full m-2 text-white flex flex-row'><a href={""}>
        <div className='flex flex-row p-1 space-x-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{
        }}>  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span>Buy now</span></div></a></button>
</div>
</div>

</div>

        )
    })
}

</div>
}
    </div>
  )
}
