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


export const TapWrapper = ({
                               link = undefined,
                               children,
                               keys = 'randomness',
                               customStyles = "",
                               clickAction = undefined,
                           }) => {
    if (link) {
        return (
            <motion.li
                variants={variants}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                className={`li `}
                key={keys}
            >
                <Link key={keys} href={link} className={`list-none ${customStyles}`}>
                    {children}
                </Link>
            </motion.li>
        );
    } else {
        return (
            <motion.li
                variants={variants}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                className={`li `}
                key={keys}
                onClick={(e, vars) => {
                    e.preventDefault();
                    Log("click action tap wrapper", clickAction, {vars})
                    clickAction && clickAction(vars)
                }}
            >
                <div key={keys} className={`list-none ${customStyles}`}>
                    {children}
                </div>
            </motion.li>
        )
    }


};
