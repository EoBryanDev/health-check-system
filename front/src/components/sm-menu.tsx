"use client"
import { BarChart3, Menu, Settings, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useState } from "react";
import { AvatarImprovisedImg } from "./menu/avatar-img";
import { useUserInfoQuery } from "@/hooks/queries/use-user-info";


export function MenuSm() {
  const { data, isLoading } = useUserInfoQuery();
  const [open, setOpen] = useState(false)


  if (isLoading) {
    return <></>;
  }
    
  return (
    <div className="flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="sm:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>   
            <div className="px-5">
              <>
                <div className="flex justify-between space-y-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                       <AvatarImprovisedImg data={data} />
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">{data?.first_name?.toUpperCase()} {" | "} <span> {data?.role.toLowerCase()}</span></h3> 
                      <span className="text-muted-foreground block text-xs">
                        {data?.email?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                </div>
              </>
            </div>

            <div className="py-3 px-25">
              <Separator />
            </div>

            <nav className="flex flex-col items-start space-x-6 ml-6 gap-8">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <Link href="/v1/configs" className="text-xs cursor-pointer" onClick={() => setOpen(false)}>CONFIGURATION</Link>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <Link href="/v1/services" className="text-xs cursor-pointer" onClick={() => setOpen(false)}>MONITORING</Link>
              </div>
              <div className="flex items-center space-x-2">
                <Terminal className="h-5 w-5" />
                <Link href="/v1/command-center" className="text-xs cursor-pointer" onClick={() => setOpen(false)}>COMMAND CENTER</Link>
              </div>
          </nav>
             
          </SheetContent>
        </Sheet>
        </div>
  );
}