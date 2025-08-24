"use client"
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


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
             
          </SheetContent>
        </Sheet>
        </div>
  );
}