"use client"
import Image from "next/image";
import Link from "next/link";
import {motion, AnimatePresence} from "framer-motion"

const pageTransitionVariants = {
  hidden: { opacity: 0, x: 100 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export function PageSlideAnimator({children}) {
  return (
    <AnimatePresence mode="wait">
    <motion.div
      key={children?.key} // Unique key for each page
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={pageTransitionVariants}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
      className="page-container"
    >
      {children}
    </motion.div>
  </AnimatePresence>
  )
}

export function Loader() {
  return (
    <section className="bg-foreground text-background flex flex-col h-svh w-screen items-center .justify-center p-[20px] relative"> 
      <div className="flex-1 flex justify-center">
        <Image src="/icons/logo-colored.svg" alt="logo" width={120} height={100} />
      </div>   
      <Image className=".absolute .bottom-10" src="/icons/wordmark-colored.svg" alt="logo" width={100} height={100} />
    </section>
  );
}

export function Button({text="Button", variant="primary", type="link", href="/", disabled=false}) {
  return (
    <button disabled={disabled} className={`${variant == "primary" && disabled  ? "bg-[#A8CCD0] text-white"  : "bg-primaryColor text-white border border-secondary" } w-[273px] h-[48px] rounded-[40px] flex items-center justify-center gap-2`}>
          {text}
    </button>
  )
}

export function IconButton({text="Button", icon="", variant="primary", type="link", href=" ", disabled=false, onClick=undefined}) {
  return (
    <Link href={href ? href : undefined }>
      <button onClick={onClick ? () => onClick() : undefined} disabled={disabled} className={`${variant == "primary" && disabled  ? "bg-[#A8CCD0] text-white"  : "bg-primaryColor text-white border border-primaryColor " } w-[273px] h-[48px] rounded-[40px] flex items-center justify-center gap-2`}>
          {text} <span className={icon}></span>
      </button>
    </Link>
  )
}