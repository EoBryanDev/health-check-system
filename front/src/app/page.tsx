import Image from "next/image";
import LoginPage from "../pages/LoginPage"
import { Card } from "@/components/ui/card";

export default function Home() {
  
  return (
   <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col md:flex-row h-screen">
        <Image
          src="https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg"
          alt="Home page"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* Adicionei um contêiner para centralizar o LoginPage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <LoginPage />
          </div>
        </div>
      </div>
    </div>
  )  
  ;
}
