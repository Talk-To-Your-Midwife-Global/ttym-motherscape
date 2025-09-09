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


export const TapWrapper = ({i, clickAction = undefined, link, children}) => {
    return (
        <motion.li
            variants={variants}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.95}}
            className={`li`}
            onClick={() => {
                Log(clickAction)
                clickAction && clickAction()
            }}
        >
            <Link href={link || '#'} className={"list-none"}>
                {children}
            </Link>
        </motion.li>
    );
};
