import Image from "next/image";

export function Loader() {
  return (
    <div className="bg-foreground text-background flex h-screen w-screen items-center justify-center p-[20px]">    
      <Image src="/icons/logo-white.svg" alt="logo" width={500} height={200} />
    </div>
  );
}
