import Image from "next/image";
import LoginPage from "../pages/LoginPage"

export default function Home() {
  
  return (
   <div className="flex bg-[url('https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg')] md:bg-none flex-col md:flex-row w-full h-screen">
      <div className="flex flex-col md:flex-row h-screen">
        <Image
          src="https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg"
          alt="Home page"
          height={0}
          width={0}
          sizes="100vw"
          className="hidden md:flex h-auto w-full"
        />
      </div>
        <div className="flex items-center justify-center md:mr-auto md:ml-auto">
            <LoginPage />
        </div>
    </div>
  )  
  ;
}
