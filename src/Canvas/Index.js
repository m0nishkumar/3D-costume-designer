import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment,Center, OrbitControls } from '@react-three/drei'
import { Backdrop } from './Backdrop'
import { CameraRig } from './CameraRig'
import { Shirt } from './Shirt'
import { state } from '../store/Index'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import axios from 'axios'
import { Shoe } from './Shoe'
import { Scene } from './Scene'
import { CameraRigP } from './CameraRigP'
import { CameraRigS } from './CamerRigS'

export const Index = () => {
  const snap=useSnapshot(state);

  useEffect(()=>{
    console.log("innnn")
    if(snap.pngg){
      const link=document.createElement('a')
      link.setAttribute('download','canvas.png')
      link.setAttribute(
        'href',document.querySelector('canvas')
        .toDataURL('image/png')
        .replace('image/png','image/octet-stream')
      )
      const u=document.querySelector('canvas')
      .toDataURL('image/png')
      .replace('image/png','image/octet-stream')
      console.log(u)
      axios.get("http://localhost:5000/related",{ params: { url: u } })
      link.click()
      state.pngg=false
      }
},[snap.pngg])



    return (
      <>
        {(snap.shoe_active)?<Canvas
        shadows
        camera={{ position: [0,0,0], fov: (snap.shoe_active)?100:25 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full max-w-full h-full transition-all ease-in"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
  
        <CameraRigS>

        
          <Center>
            
              <Shoe stat={true}/>

            
          </Center>
        </CameraRigS>
      </Canvas>
:(snap.pant_active)?
      <Canvas
        shadows
        camera={{ position: [0,0,0], fov: 100 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full max-w-full h-full transition-all ease-in"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
  
        <CameraRigP>

        
          <Center>
            {
             <Scene stat={true}/>
}
            
          </Center>
        </CameraRigP>
      </Canvas>: 
    <Canvas
    shadows
    camera={{ position: [0,0,0], fov:20 }}
    gl={{ preserveDrawingBuffer: true }}
    className="w-full max-w-full h-full transition-all ease-in"
  >
    <ambientLight intensity={0.5} />
    <Environment preset="city" />
    <CameraRig>
      <Center>

        <Shirt stat={false} />

      </Center>
    </CameraRig>
  </Canvas> 
      }
</>

    )
  }
