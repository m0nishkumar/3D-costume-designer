import React from 'react'
import { Cards } from "./Cards";
import { Header } from "./Header";
import { useState } from 'react';
export const Shop = () => {
    const [category,setCategory]=useState("")
  return (
    <div className="shop">
      <Header set_cat={setCategory} state_cat={category}/>
      <Cards set_cat={setCategory} state_cat={category}/>
    </div>
  )
}
