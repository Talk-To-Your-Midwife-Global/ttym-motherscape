"use client"
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {motion, sync, useCycle} from "framer-motion";
import {MenuToggle} from "@/app/dashboard/components/menuToggle";
import {Navigation} from "@/app/dashboard/components/navigation";
import {useDimensions} from "@/app/dashboard/components/use-dimensions";

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

export const SideNav = ({accessToken}) => {
    const [isOpen, toggleOpen] = useState(false);
    const containerRef = useRef(null);
    const {height} = useDimensions(containerRef);

    // Hide side nav when use click anywhere else on the screen
    useEffect(() => {
        const handleClickAnywhere = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                toggleOpen(false)
            }
        }

        document.addEventListener("click", handleClickAnywhere)

        return () => {
            document.removeEventListener("click", handleClickAnywhere)
        }

    }, [isOpen])

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            <motion.div className="background" variants={sidebar}/>
            <Navigation accessToken={accessToken}/>
            <MenuToggle toggle={toggleOpen} isOpen={isOpen}/>
        </motion.nav>
    );
};
