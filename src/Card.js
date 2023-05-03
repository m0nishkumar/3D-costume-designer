import React from 'react'
import shampo from './assets/shampo.png'
import bg from './assets/bg.png'
import badge from './assets/ba.png'
import recom from './assets/recom.png'
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


export const Card = ({ arrayy, set_cat, state_cat }) => {
    const card_con = useRef()
    const card_ = useRef()
    const [turn, setTurn] = useState(180)
    const [review_s, set_review] = useState()
    const [compare, set_compare] = useState()
    const [coupons, set_coupons] = useState()
    const [fetch, set_fetch] = useState("")
    const [ingre_model, set_ingre_model] = useState(false)
    const amazon = []
    for (let index = 1; index <= arrayy.amazon_rating; index++) {
        amazon.push(index)
    }
    const amazon_out = []
    const res = 5 - arrayy.amazon_rating
    for (let index = 1; index <= res; index++) {
        amazon_out.push(index)
    }
    const value = []
    for (let index = 1; index <= arrayy.value_for_money; index++) {
        value.push(index)
    }
    const value_out = []
    const ress = 5 - arrayy.value_for_money
    for (let index = 1; index <= ress; index++) {
        value_out.push(index)
    }
    const result = []
    console.log(arrayy.table.cons.length);
    console.log(arrayy.table.pros.length);
    if (arrayy.table.cons.length > arrayy.table.pros.length) {
        for (let index = 0; index < arrayy.table.cons.length - arrayy.table.pros.length; index++) {
            arrayy.table.pros.push("")
        }
    }
    else {
        for (let index = 0; index < arrayy.table.pros.length - arrayy.table.cons.length; index++) {
            arrayy.table.cons.push("")
        }
    }
    console.log(arrayy.table.cons)
    const final_table = arrayy.table.cons.forEach((element, index) => {
        result.push(
            <tr>
                <td>{arrayy.table.pros[index]}</td>
                <td>{element}</td>
            </tr>
        )
    })
    const doubleClick = (event) => {

        if (event.detail == 2) {
            (turn == 0) ? setTurn(180) : setTurn(0);
            console.log(turn)
            card_con.current.style.transform = `rotateY(${turn}deg)`;
        }
    }
    const function_review = async (i) => {
        set_compare()
        set_coupons()
        set_fetch("in")
        const review_server = await axios.get("http://localhost:5000/review", { params: { url: i } })
        set_review(review_server.data)
        set_fetch("")

    }

    const function_coupon = async () => {
        set_compare()
        set_coupons("Coming Going")
        set_review()
    }

    const function_compare = async (i) => {
        console.log(i)
        set_review()
        set_coupons()
        set_fetch("in")
        const review_server = await axios.get("http://localhost:5000/compare", { params: { compare: i } })
        const ar = review_server.data;
        console.log(ar)
        set_fetch("")
        var items = Object.keys(ar).map(
            (key) => { return [key, parseInt(ar[key].slice(1, ar[key].length))] });

        items.sort(
            (first, second) => { return first[1] - second[1]}
        );
    let array_not=[]
        items.map((i)=>{
            if(i[1]==0){
                i[1]=items[2][1]+1
                array_not.push(i[0])
            }
        })
        items.sort(
            (first, second) => { return first[1] - second[1]}
        );
        console.log(items)
        console.log(array_not)

        var keys = items.map(
            (e) => { return e[0] });

        set_compare([review_server.data,keys])
        console.log(keys)

    }


    return (
        <div className="scale-[.90]">
            <div className="card" onClick={doubleClick}>
                <div className="card__content" ref={card_con}>
                    <div className="card__front rounded- relative z_axis bg-slate-100 shadow-2xl space-y-1 rounded-3xl" style={{
                        boxShadow: (arrayy.health_rating>85)?"0 8px 10px -8px green":(arrayy.health_rating<55)?"0 8px 10px -8px red":""
                    }}>
                       { (ingre_model)? <div>
                        <div className='m-2' style={{
                            fontFamily:"poppins"
                        }}>
                        <h1 className='text-2xl font-semibold'>🌿Ingredients List:</h1>
                        <p>(Hover the mouse over the ingredients for short Description)</p>
                        </div>
                        <div className='flex flex-row space-x-1 items-start' >
                        <img src="https://incidecoder-assets.storage.googleapis.com/assets/img/star_icky.png"/>
                        <p className=''>-refers to undesirable or <span className='font-semibold'>potentially harmful ingredients.</span></p>
                        </div>
                        <div className='flex flex-row space-x-1 items-start'>
                        <img src="https://incidecoder-assets.storage.googleapis.com/assets/img/star_goodie.png"/>
                        <p className=''>-refers to desirable or <span className='font-semibold'>healthy ingredients.</span></p>
                        <p className=''></p>
                        </div>
                        <div className='flex flex-row flex-wrap space-x-3 items-center justify-start mt-2'>
                        {(arrayy.ing)?ReactHtmlParser(arrayy.ing):<p className='w-full m-auto text-lg font-semibold' style={{
                            fontFamily:"poppins"
                        }}>Ingredients not Available 😓</p>}
                            
                                                </div>
                        </div>:console.log("model is down")}
                        {(arrayy.health_rating>85 && ingre_model==false) ?
                            <div className="z-10">
                                <img src={recom} height="105px" width="105px" className="absolute top-3 right-0 z_axis3" /></div> : <></>
                        }
                        {(arrayy?.market && ingre_model==false) ?
                            <h1 className='absolute left-4 text-sm top-4 font-[500] shadow-md flex flex-row items-center justify-center p-2 px-3 bg-white rounded-[13px]' style={{
                                fontFamily: "poppins"
                            }}><div className='flex flex-row items-center justify-center'><div className='text-[14px]'>{(arrayy?.market=="Trending")?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                          </svg>:((`${arrayy?.market}`).includes("Seller")==true)?<p>🏆</p>:<p>👑</p>
                          }</div><h1>{arrayy?.market}</h1></div></h1> : console.log("Hola")
                        }
                        {(ingre_model==true) ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={()=>{
                            set_ingre_model(false)
                        }} className="w-6 h-6 absolute top-4 left-4">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                      </svg>:<></>
                        }
                         { (ingre_model==false)?
                         <div className='flex flex-col items-center'>
                         <div className='w-full h-fit flex flex-row items-center justify-center relative z_axis'>
                            <img src={require(`./assets/${arrayy.imgURL}.png`)} className="z_axis3 z-10" height="200px" width="200px" />
                            <img src={bg} className="absolute z_axis3" height="200px" width="200px" />
                            </div>
                       <div className='leading-7'> 
                       <h3 className="uppercase font-semibold text-[35px]" style={{
                        }} >{arrayy.prod_name}</h3>
                        {(arrayy.subtitle)?
                            <h3 className="" style={{
                                fontFamily:"poppins"
                            }}>({arrayy.subtitle})</h3>:<></>
                        }</div>
                        
                        <div className='flex flex-col justify-start items-start z_axis2'>

                            {/* {
            arrayy.ing.map((i)=>{
                return(
                    <div className='z_axis flex flex-row '>
                        <h3 className="text-[24px] z_axis1" style={{
                            fontFamily:"poppins"
                        }}>Ingredients:</h3>
                        <div className="z_axis1 flex flex-row  flex-wrap items-center justify-start" >
                            
                        {
                            i.good.map((l)=>{
                                return(
                                    <p className="card__subtitle bg-green-500 m-1">{l}</p>
                                )
                            })
                        }

                        {
                            i.bad.map((l)=>{
                                return(
                                    <p className="card__subtitle bg-red-500 m-1">{l}</p>
                                )
                            })
                        }
                    </div>
                    </div>
                    
                )
            })
        } */}
                            <h1 className='font-[500] text-[20px] text-red-600 w-full m-auto' style={{
                                fontFamily: "poppins"
                            }} onClick={()=>{
                                set_ingre_model(true)
                            }}>🌿Ingredients List</h1>
                            <div className='flex flex-row space-x-2 z_axis2'>
                                <h4 className='text-[21px]' style={{
                                    fontFamily: "poppins"
                                }}>Key<span className="text-slate-100">l</span>Benefits:</h4>
                                <div className='flex flex-row space-x-2 flex-wrap justify-start items-start' style={{
                                    fontFamily: "poppins"
                                }}>
                                    {
                                        arrayy.table.pros.slice(0, 2).map((i) => {
                                            return (
                                                <div>
                                                    <div className='flex flex-row'><p>*</p><h3 className='text-[20px] font-[500] text-green-600 text-left'>{i}</h3></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <h5 className="text-[20px] z_axis1 font-semibold" style={{
                            fontFamily: "poppins"
                        }}><span className='font-[500]'>Best suited : </span>{arrayy.suited}</h5>
                        <div className='flex flex-col flex-start w-fit space-y-1 z_axis2'>
                            <div className='flex flex-row items-center justify-center space-x-1 w-fit'>
                                <h5 className='' style={{
                                    fontFamily: "poppins"
                                }}>💊Healthy Chart :</h5>
                                <div className='relative'>
                                    <div className=" h-[10px] absolute z-10  rounded-r-xl" style={{
                                        width: `calc(210/100*${arrayy.health_rating}px)`, backgroundColor: (arrayy.health_rating > 80) ? "green" : (arrayy.health_rating < 81 && arrayy.health_rating > 50)?"#50C878":"red"
                                    }}>

                                    </div>
                                    <div className='w-[210px] h-[10px] bg-slate-300 overflow-hidden'></div>
                                </div>
                            </div>
                            <div className='flex flex-row '>
                                <h5 style={{
                                    fontFamily: "poppins"
                                }}>🌟Amazon Review:</h5>
                                {
                                    amazon.map((i) => {
                                        return (
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )
                                    })}{
                                    amazon_out.map((i) => {
                                        return (
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                </svg>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className='flex flex-row '>
                                <h5 style={{
                                    fontFamily: "poppins"
                                }}>💸Value for Money:</h5>
                                {
                                    value.map((i) => {
                                        return (
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )
                                    })}{
                                    value_out.map((i) => {
                                        return (
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                </svg>
                                            </div>)
                                    })
                                }

                            </div>
                            <h1 className="z_axis2 font-bold text-[23px]">₹{arrayy.price - (arrayy.discount / 100 * arrayy.price)}<span className='text-[18px] font-[500] line-through'> ₹{arrayy.price}</span><span className='text-[17px] font-light'> ({arrayy.discount}% Choosy Off)</span></h1>
                        </div>
                        <button className='p-2 px-3 bg-black rounded-2xl m-2 text-white flex f*lex-row'><a href={arrayy.amazon_aff}>
                            <div className='flex flex-row p-1 space-x-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span style={{
                                fontFamily: "poppins"
                            }}>Buy now</span></div></a></button>
                    </div>:<></>}
                    </div>

                    <div className="card__back bg-slate-100 space-y-2" style={{
                        fontFamily: "poppins"
                    }}>
                        <div className='w-fit flex flex-col justify-start items-start'>

                            <h2 className="text-[22px] font-[600]">Description:</h2>
                            <p className="text-start ">{arrayy.desc}</p>
                        </div>
                        <table id="tab">
                            <tr>
                                <th>Pros</th>
                                <th>Cons</th>
                            </tr>
                            {
                                result.map((i) => {
                                    return (
                                        i
                                    )
                                })
                            }

                        </table>
                        <div className='flex flex-row space-x-2'>
                            <button onClick={() => {
                                function_review(arrayy.priceURL)
                            }}><div style={{
                                fontFamily: "poppins"
                            }} className='flex flex-row space-x-0 bg-slate-200 p-1 rounded-xl shadow-xl items-center'>
                                    <p>Price Tracker</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                    </svg>
                                </div></button>

                            <button className='p-1 rounded-xl shadow-xl bg-slate-200' onClick={() => {
                                function_compare(arrayy.compare)
                                console.log(arrayy.compare)
                            }}><div className='flex flex-row space-x-0 items-center'><p>Compare Price</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                            </svg>
                                </div>
                            </button>

                            <button className='p-1 rounded-xl shadow-xl bg-slate-200' onClick={() => {
                                function_coupon()
                            }}><div className='flex flex-row space-x-0  items-center'><p>Get Coupons</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                                    </svg>

                                </div>
                            </button>
                        </div>
                        {(review_s) ? (< div className='flex flex-col justify-start items-start space-y-1' style={{ fontFamily: "poppins" }}>
                            <div className='flex flex-row justify-between w-full'>
                            <p className='font-semibold text-[20px]'>Price Tracker:</p>
                            <div className='flex flex-row items-center space-x-1'>
                                <div className='h-2 w-2 bg-red-500 rounded-full'></div>
                                <p>Live</p>
                                </div>
                            </div>
                            <div className='flex flex-row justify-around'>
                                <p className='font-semibold text-[19px]'><span className='font-[400] text-lg'>Current Price:</span>  ₹{review_s[0]}</p>
                            <p className='font-semibold text-[19px]'><span className='font-[400] text-lg'>Lowest Price:</span>  <span className='text-green-600'>₹{review_s[1]}</span></p>
                            <p className='font-semibold text-[19px]'><span className='font-[400] text-lg'>Highest Price:</span> <span className='text-red-600'> ₹{review_s[2]}</span></p>
                        </div>
                            <p className='text-start'><span className='text-lg font-[600]'>Is this the best time to buy?</span><br /><span>{review_s[3]}</span></p></div>) : <></>
                        }
                        {(fetch)?<div><p>Fetching data from web...</p></div>:<></>
                        }
                        
                        {(compare) ? (
                            <div className='flex flex-col items-start justify-start space-y-1'>
                                <div className='flex flex-row justify-between items-center w-full'>
                                <h1 className='font-semibold text-lg'>Compare Price:</h1>
                                <div className='flex flex-row items-center space-x-1'>
                                <div className='h-2 w-2 bg-red-500 rounded-full'></div>
                                <p>Live</p>
                                </div>
                                </div>
                                <div className=" flex flex-row space-x-1 items-center justify-start font-semibold" style={{
                                    fontFamily: "poppins"
                                }}>
                                    <img src={require(`./assets/${compare[1][0].slice(1, compare[1][0].length)}-logo.png`)} className='rounded-full h-[50px] w-[50px] ' />
                                    <p className='flex flex-row space-x-1'><p>{compare[1][0]} : {compare[0][compare[1][0]]}</p> <span className='font-normal text-green-600'>{(compare[0][compare[1][0]]!="₹0")?<p>(Best Deal comparitively!🤩)</p>:<p>Not available</p>}</span> </p>
                                </div>
                                <div className='flex flex-row items-center space-x-1 font-semibold' style={{
                                    fontFamily: "poppins"
                                }}>                    <img src={require(`./assets/${compare[1][1].slice(1,compare[1][1].length)}-logo.png`)} className='rounded-full h-[50px] w-[50px] ' />
                                    <p className='flex flex-row space-x-1'><p>{compare[1][1]} : {compare[0][compare[1][1]]}</p> {(compare[0][compare[1][1]]!="₹0")?<p><span className='font-normal'>(<span className='font-semibold text-red-500'> +₹{compare[0][compare[1][1]].slice(1, compare[0][compare[1][1]].length) - compare[0][compare[1][0]].slice(1, compare[0][compare[1][0]].length)}</span> higher than {compare[1][0]})</span></p>:<p> (Not available)</p>}</p>
                                </div>
                                <div className='flex flex-row items-center space-x-1 font-semibold' style={{
                                    fontFamily: "poppins"
                                }}>
                                    <img src={require(`./assets/${compare[1][2].slice(1, compare[1][2].length)}-logo.png`)} className='rounded-full h-[50px] w-[50px] ' />
                                    <p className='flex flex-row space-x-1'><p>{compare[1][2]} : {compare[0][compare[1][2]]}</p> {(compare[0][compare[1][2]]!="₹0")?<p><span className='font-normal '>(<span className='font-semibold text-red-500'>+₹{compare[0][compare[1][2]].slice(1, compare[0][compare[1][2]].length) - compare[0][compare[1][0]].slice(1, compare[0][compare[1][0]].length)}</span> higher than {compare[1][0]})</span></p>:<p> (Not available)</p>}</p>
                                </div>
                            </div>
                        ) : <p></p>
                        }
                        {(coupons) ? (
                            <div className='flex flex-col items-start'>
                                <h1 className='text-[20px]'>Related Coupons:</h1>
                                <div className='flex flex-row justify-center items-center space-x-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                                    </svg>
                                    <div className='flex flex-col justify-center items-center w-[370px] p-2 space-y-2 relative bg-slate-200 gradient_css2 shadow-md'>
                                        <div className="border-l-2 border-black h-[100%] right-7 absolute border-dashed"></div>
                                        <div className='w-[40px] h-[40px] bg-slate-100 absolute top-[28%] left-0 clip_css'></div>
                                        <div className='flex flex-row space-x-1'>
                                            <h1 className='font-semibold text-[23px]' style={{
                                                fontFamily: "poppins"
                                            }}>Myntra</h1>
                                        </div>

                                        <div className='flex flex-row space-x-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                                            </svg>

                                            <h1 className='' style={{
                                                fontFamily: "poppins"
                                            }}>COUPON CODE : <span className='font-semibold'>Myntra500</span></h1>
                                        </div>
                                        <h1 className='' style={{
                                            fontFamily: "poppins"
                                        }}>₹500 off on any product above 500 (Valid only for New users)</h1>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                    </svg>


                                </div>
                            </div>
                        ) : <></>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

