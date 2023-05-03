import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Fashion } from './Fashion'
import { Navigation } from './Navigation'
import { Shop } from './Shop'
import { Coupons } from './Coupons'
import { Threejs } from './Threejs'

export const Navi_manage = () => {
  return (
    <div>

        <Navigation/>
        <Routes>
            <Route path="/home" element=""></Route>
            <Route path="/choose" element={<Shop/>}></Route>
            <Route path='/aboutus' element=""></Route>
            <Route path='/fashion' element={<Fashion/>}></Route>
            <Route path='/coupons' element={<Coupons/>}></Route>
            <Route path="/custom" element={<Threejs/>}></Route>
        </Routes>
    </div>
  )
}
