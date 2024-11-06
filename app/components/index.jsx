import Image from "next/image";


export function Loader() {
  return (
    <div className="bg-foreground text-background flex h-screen w-screen items-center justify-center p-[20px]">    
      <Image src="/icons/logo-white.svg" alt="logo" width={500} height={200} />
    </div>
  );
}

export function Button({text="Button", variant="primary", type="link", href="/"}) {
  return (
    <button className={`${variant == "primary" ? "bg-secondary text-white" : "bg-background text-secondary border border-secondary" }  w-[273px] h-[48px] rounded-[40px]`}>
        {text}
    </button>
  )
}

export function IconButton({text="Button", icon="", variant="primary", type="link", href="/"}) {
  return (
    <button className={`${variant == "primary" ? "bg-secondary text-white" : "bg-background text-secondary border border-secondary" } w-[273px] h-[48px] rounded-[40px] flex items-center justify-center gap-2`}>
        {text} <span className={icon}></span>
    </button>
  )
}