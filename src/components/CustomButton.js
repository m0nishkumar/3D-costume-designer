import React from 'react'
import { useSnapshot } from 'valtio';

import { state } from '../store/Index';
import { color } from 'framer-motion';

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);
  const getContrastingColor = (color) => {
    // Remove the '#' character if it exists
    const hex = color.replace("#", "");
  
    // Convert the hex string to RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Calculate the brightness of the color
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    // Return black or white depending on the brightness
    return brightness > 128 ? "black" : "white";
  };

  const generateStyle = (type) => {
    if(type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: "black"
      }
    } else if(type === "outline") {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 rounded-md ${customStyles}`}
      style={{color:getContrastingColor(snap.color),backgroundColor:snap.color}}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton