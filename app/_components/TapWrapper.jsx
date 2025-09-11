"use client"
import * as React from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {Log} from "@/app/_lib/utils";

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: {stiffness: 1000, velocity: -100}
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: {stiffness: 1000}
        }
    }
};


export const TapWrapper = ({i, link, children, keys = 'randomness', customStyles = "", clickAction = undefined,}) => {
    return (
        <motion.li
            variants={variants}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.95}}
            className={`li `}
            key={keys}
            onClick={(e) => {
                e.preventDefault();
                Log("click action tap wrapper", clickAction)
                clickAction && clickAction()
            }}
        >
            <Link key={keys} href={link || '#'} className={`list-none ${customStyles}`}>
                {children}
            </Link>
        </motion.li>
    );
};
