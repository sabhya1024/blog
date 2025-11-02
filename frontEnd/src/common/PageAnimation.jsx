import React, { children } from 'react'
import { animate, AnimatePresence, motion } from 'framer-motion'


const PageAnimation = ({children, initial={opacity:0}, animate= {opacity:1}, transition={duration: 1}, keyValue, className }) => {
    return (
      <AnimatePresence>
        <motion.div
          key={keyValue}
          initial={initial}
          animate={animate}
          transition={transition}
          className={className}>
          {/* framework motion */}
          {children}
        </motion.div>
      </AnimatePresence>
    );
}

export default PageAnimation