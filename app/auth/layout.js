"use client"
import { motion, AnimatePresence } from "framer-motion"

const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  
export default function AuthLayout({children}) {
    return (
        <AnimatePresence mode="wait">
          <motion.div
            key={children?.key}  // Unique key for each page transition
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariants}
            transition={{ duration: 0.5 }} // Adjust duration for fade speed
            className="fade-container"
          >
            {children}
          </motion.div>
        </AnimatePresence>
    )
}