"use client"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Settings, BarChart3, Terminal, LogOutIcon} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { MenuSm } from "./sm-menu"
import { useRouter } from 'next/navigation';
import { logout } from "@/utils/auth";
import Link from "next/link"
import { useUserInfoQuery } from "@/hooks/queries/use-user-info"
import { AvatarImprovisedImg } from "./menu/avatar-img"

export function MenuHeader() {
  
  const router = useRouter();

   const { data, isLoading } = useUserInfoQuery();

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      router.push('/'); 
    }
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <header className="border-b bg-card">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center space-x-2 sm:space-x-8">
          <h1 className="text-xl sm:text-2xl font-bold"> 
            <Link href="/v1/dashboard" className="cursor-pointer" >HC</Link>
          </h1>
          

          <nav className="hidden sm:flex items-center space-x-6">
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

          <MenuSm />
          
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6 justify-center items-center bg-secondary text-primary sm:h-8 sm:w-8">
              <AvatarImprovisedImg data={data} />
            </Avatar>
            <div className="hidden sm:block text-xs">
              <div className="font-medium">{data?.first_name?.toUpperCase()}</div>
              <div className="text-muted-foreground">{data?.role?.toUpperCase()}</div>
            </div>
          </div>
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
          >
            <LogOutIcon />
          </Button>
        </div>
      </div>
    </header>
  )
}
