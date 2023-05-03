import React from 'react'
import CustomButton from '../components/CustomButton'
import { fadeAnimation } from '../config/motion'
import { motion } from 'framer-motion'
export const Dallepicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <motion.div className="aipicker-container" {...fadeAnimation}>
      <textarea 
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton 
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton 
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />

            <CustomButton 
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </motion.div>
  )
}
