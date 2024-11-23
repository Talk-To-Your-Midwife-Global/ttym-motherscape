import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import sarah from "@/public/images/sarah.png";
import {montserrat} from "@/app/fonts";

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i, children }) => {
    const style = { border: `2px solid ${colors[i]}` };
    return (
        <motion.li
            variants={variants}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.95}}
            className={`li`}
        >
            {!children ? <section className={`flex .gap-3 relative`}>
                <div className={`overflow-hidden w-[35px] h-[40px] relative text-primaryColor`}>
                    <Image src={i.icon} alt={"some icon"} width={20} height={30}/>
                </div>
                <section className={`text-primaryText flex w-[200px]`}>
                    <div className={``}>
                        <div className={`flex gap-2`}>
                            <h2 className={`font-semibold text-sm`}>{i.text}</h2>
                        </div>
                        <h3 className={`text-[10px] font-light ${montserrat.className}`}>{i.subText}</h3>
                    </div>
                </section>

                <section className={`flex-1 .justify-self-end .justify-items-end flex`}>
                    <span className={`iconify lucide--chevron-right text-primaryText`}></span>
                </section>
            </section>:
            children }
        </motion.li>
    );
};
