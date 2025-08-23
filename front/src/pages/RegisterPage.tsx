"use client";
import SignUpForm from "@/components/sign-up-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function RegisterPage() {
  return (
    <>
      <div className="flex w-full flex-col gap-6 p-1">
        <Tabs defaultValue="sign-up">
          <TabsList>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
     
          <TabsContent value="sign-up" className="w-full">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )  
  ;
}
