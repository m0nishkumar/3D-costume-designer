import React, { useEffect } from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import {Decal,OrbitControls,useGLTF,useTexture} from '@react-three/drei'
import { state } from '../store/Index'
import { useRef } from 'react'
import { useState } from 'react'
import html2canvas from 'html2canvas';


export const Shirt = ({stat,mat}) => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');
    const pant = useGLTF('/pant.glb');
    const pant1 = useGLTF('/black_pants.glb');
    const pant2 = useGLTF('/blue_jeans_pants.glb');

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
    const [rot,setRot]=useState(stat);

  const shirt=useRef();

  

    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
    useFrame(()=>((snap.shirt_active)?shirt.current.rotation.y+=0.01:<></>))
    console.log(pant2.materials)
    console.log(materials)
  
    const stateString = JSON.stringify(snap);
  
    return (
      <group key={stateString}>
        <mesh ref={shirt}
          castShadow
          geometry={nodes.T_Shirt_male.geometry}
          material={materials.lambert1}
          material-roughness={1}
          dispose={null}
          onClick={()=>{
            setRot(!rot)
          }}
        >
          {snap.isFullTexture && (
            <Decal 
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture}
            />
          )}
  
          {snap.isLogoTexture && (
            <Decal 
              position={[0, 0.04, 0.15]}
              rotation={[0, 0, 0]}
              scale={0.15}
              map={logoTexture}
              map-anisotropy={16}
              depthTest={false}
              depthWrite={true}
            />
          )}
        </mesh>
{/* <mesh
    castShadow
    geometry={pant2.nodes["default_default_0"].geometry}
    material={pant2.materials.default}
    material-roughness={1}
    dispose={null}
  >

  </mesh> */}
      </group>
    )
  }
