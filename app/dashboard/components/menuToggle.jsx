"use client"
import * as React from "react";
import {motion} from "framer-motion";
import category from "@/public/icons/category.svg";
import Image from "next/image";

const Path = props => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);

export const MenuToggle = ({toggle, isOpen}) => (
    <section>
        {!isOpen ? <button className={`button`}>
            <div onClick={() => toggle(true)} className={" bg-[#0F969C26] rounded-full w-fit h-fit p-4"}>
                <Image className={`z-[50]`} src={category} alt={"some grid icon thingy"}/>
            </div>
        </button> : <span onClick={() => toggle(false)} className={`button iconify lucide--x text-xl`}></span>
        }
    </section>
);
