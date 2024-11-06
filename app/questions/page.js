import Image from "next/image"

import character from "../../public/images/character-1.svg"
import cloud from "../../public/images/cloud-vector.svg"
import flowersOne from "../../public/images/flowers-1.svg"
import flowersTwo from "../../public/images/flowers-2.svg"
import flowersFour from "../../public/images/flowers-4.svg"
import flowersFive from "../../public/images/flowers-5.svg"
import miniCloudOne from "../../public/images/mini-cloud-one.svg"
import miniCloudTwo from "../../public/images/mini-cloud-two.svg"


import { Button, IconButton } from "../components"



export default function Page() {
    return (
        <section>
            <section className="relative h-[160px]">
                <Image className="absolute top-[130px] left-5" src={flowersFive} alt="flowers" />
                <Image className="absolute top-[70px] left-[150px]" src={flowersOne} alt="flowers" />
                <Image className="absolute top-[110px] left-[300px]" src={flowersTwo} alt="flowers" />
                <Image className="absolute top-[180px] left-[360px]" src={flowersFour} alt="flowers" />
            </section>
            <section className="relative flex items-center justify-center h-[300px] p-10" >
                <Image className="absolute" src={cloud} alt="cloud with message in it" />
                <p className="w-4/5 font-bold text-mainText">Hello, Welcome to talk to your Midwife, <span className="text-pink">this is your global midwife and I&apos;m at your cervix</span></p>
            </section>
            <section className="relative">
                <Image className="absolute -top-[40px] left-[140px]" src={miniCloudTwo} alt="mini cloud" />
                <Image className="absolute -top-[10px] left-[120px]" src={miniCloudOne} alt="mini cloud" />
                <Image className="relative -left-10" src={character} alt="midwife with a tab in hand" />
            </section>
            <div className="fixed bottom-20 w-fit left-[20%] flex items-center justify-center">
                <IconButton text="Continue" icon="iconify lucide--arrow-right" />
            </div>
        </section>
    )
}