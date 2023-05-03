import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import { state } from '../store/Index'
import { fadeAnimation } from '../config/motion'
import { motion } from 'framer-motion'

export const Colorpicker = () => {
  const snap=useSnapshot(state)
  return (
    <motion.div className='absolute left-full ml-3' {...fadeAnimation}>
      <SketchPicker 
        color={(snap.shoe_active)?snap.color_shoe:(snap.pant_active)?snap.pant_color:snap.color}
        disableAlpha
        onChange={(color) => (snap.shoe_active)?(state.color_shoe = color.hex):(snap.pant_active)?(state.pant_color=color.hex):(state.color = color.hex)}
      />
    </motion.div>
  )
}
