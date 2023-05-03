import react from 'react'
import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets-img";
import cartoon from '../assets/shoe-cartoon.png' 

export const Editortabs=[
    {
        name:"colorpicker",
        icon:swatch
    },{
        name:"filepicker",
        icon:fileIcon
    },{
        name:"aipicker",
        icon:ai
    }
];
export const FilterTabs = [
    {
      name: "logoShirt",
      icon: logoShirt,
    },
    {
      name: "stylishShirt",
      icon: stylishShirt,
    },
    {
      name: "pant-shoe",
      icon:cartoon
    }
  ];
  export const DecalTypes = {
    logo: {
      stateProperty: "logoDecal",
      filterTab: "logoShirt",
    },
    full: {
      stateProperty: "fullDecal",
      filterTab: "stylishShirt",
    },
  };