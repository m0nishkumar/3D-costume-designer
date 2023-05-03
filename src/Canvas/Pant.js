import React, { useEffect } from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import {Decal,OrbitControls,useGLTF,useTexture} from '@react-three/drei'
import { state } from '../store/Index'
import { useRef } from 'react'
import { useState } from 'react'
import html2canvas from 'html2canvas';


export const Pant = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');
    const pant = useGLTF('/pant.glb');
    const pant1 = useGLTF('/black_pants.glb');
    const pant2 = useGLTF('/blue_jeans_pants.glb');

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
    const [rot,setRot]=useState(true);
  const shirt=useRef();

  

    useFrame((state, delta) => easing.dampC(pant2.materials.default.color, snap.color, 0.25, delta));

    console.log(pant2.nodes)
    console.log(nodes)
  
    const stateString = JSON.stringify(snap);
  
    return (
      <group key={stateString}>
<mesh
    castShadow
    geometry={pant2.nodes["default_default_0"].geometry}
    material={pant2.materials.default}
    material-roughness={1}
    dispose={null}
  >
  </mesh>
      </group>
    )
  }
