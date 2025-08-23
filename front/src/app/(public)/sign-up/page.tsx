import RegisterPage from "@/pages/RegisterPage";
import Image from "next/image";


export default function SignUp() {
  return (
    <div className="flex flex-col w-full h-screen">
          <div className="flex flex-col md:flex-row h-screen">
            <Image
              src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg"
              alt="SingUp page"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <RegisterPage />
              </div>
            </div>
          </div>
        </div>
  )  
  ;
}

