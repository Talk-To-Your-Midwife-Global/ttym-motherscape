import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <Image src="/icons/logo-svg.svg" alt="logo" width={500} height={200} />
      <div className="mt-4">
        <p>Coming soon...</p>
      </div>
    </div>
  );
}
