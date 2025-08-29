"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema, TSignInSchema } from "@/schemas/sign-in-form.schema";
import { useLogin } from "@/hooks/mutations/use-login";
import Link from "next/link";
import { Separator } from "./ui/separator";


const SignInForm = () => {
  const userLogin = useLogin()
  const sign_in_form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: TSignInSchema) => {
        try {

          await userLogin.mutateAsync(values);
          toast.success("Login done successfully! Wait to be redirected!");
          
          sign_in_form.reset
        } catch (error) {
          toast.error("There was not possible login!");
        }
        
  
    
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-4xl">Health Check System</CardTitle>
          <CardDescription>Here you will be always know what is your system health. 
            Made to intuitive manage, you can run checking, see the historic and control your system future. </CardDescription>
        </CardHeader>
        <div className="py-3 px-25">
          <Separator />
        </div>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to continue</CardDescription>
        </CardHeader>
        <Form {...sign_in_form}>
          <form
            onSubmit={sign_in_form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CardContent className="grid gap-6">
              <FormField
                control={sign_in_form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your e-mail" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_in_form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your password"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
                <p className="text-right">
                  Have you not signed up yet? {" "}
                  <Link className="text-chart-2" href="/sign-up">
                     Create your account now!
                  </Link>
                </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Enter
              </Button>
             
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignInForm;
