import RegisterPage from "@/pages/RegisterPage";
import Image from "next/image";


export default function SignUp() {
  return (
    <div className="flex bg-[url('https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg')] md:bg-none flex-col md:flex-row w-full h-screen">
      
            <div className="flex items-center md:w-[35vw] justify-center md:mr-auto md:ml-auto">
                <RegisterPage />
            </div>
            <div className="flex flex-col md:flex-row h-screen">
              <Image
                src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg"
                alt="SingUp page"
                height={0}
                width={0}
                sizes="100vw"
                className="hidden ml-auto md:flex h-[100vh] w-[50vw]"
                />
            </div>

    
  </div>
    
  )  
  ;
}

