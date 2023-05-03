import React from 'react'
import { proxy } from 'valtio'


export const state=proxy(
    {
        intro:true,
        color:"#282828",
        isLogoTexture:true,
        isFullTexture:false,
        isFullTextureS:false,
        isFullTextureP:false,
        logoDecal:'./threejs.png',
        fullDecal:'./image.jpg',
        pngg:false,
        color_shoe:"#CD5C5C",
        shoe_active:false,
        pant_active:false,
        pant_color:"#6F8FAF",
        shirt_active:true,
        fullDecalS:'./threejs.png',
        fullDecalP:'./threejs.png',
    }
)
