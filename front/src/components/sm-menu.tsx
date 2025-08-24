"use client"
import { BarChart3, Menu, Settings, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";


export function MenuSm() {
    
  return (
    <div className="flex items-center gap-3">
        <Sheet>
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
                      
                      <AvatarFallback>
                          AD {/* trocar para info do usuario depois*/}
                        {/* {session?.user?.name?.split(" ")[0]?.[0]}
                        {session?.user?.name?.split(" ")[1]?.[0]} */}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">ADMIN {/* trocar para info do usuario depois*/}</h3>
                      <span className="text-muted-foreground block text-xs">
                        teste@teste.com.br {/* trocar para info do usuario depois*/}
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
                <Link href="/v1/configs" className="text-xs cursor-pointer">CONFIGURATION</Link>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <Link href="/v1/services" className="text-xs cursor-pointer">MONITORING</Link>
              </div>
              <div className="flex items-center space-x-2">
                <Terminal className="h-5 w-5" />
                <Link href="/v1/command-center" className="text-xs cursor-pointer">COMMAND CENTER</Link>
              </div>
          </nav>
             
          </SheetContent>
        </Sheet>
        </div>
  );
}