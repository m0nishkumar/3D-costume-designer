import React from 'react'
import { Index } from './Canvas/Index'
import { Home } from './pages/Home'
import { Customizer } from './pages/Customizer'
export const Threejs = () => {
  return (
    <main className='relative h-[88.5vh]'> 
    <svg viewBox="0 0 500 200" style={{position:"absolute",zIndex:-1,fill:"#EDE9D5"}}>
  <path d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0"></path>
</svg>
      <Home />
      <Index />
      <Customizer />
    </main>
  )
}
