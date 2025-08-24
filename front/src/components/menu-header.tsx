import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Settings, BarChart3, Terminal, Menu } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function MenuHeader() {
  return (
    <header className="border-b bg-card">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-8">
          <h1 className="text-xl sm:text-2xl font-bold">HC</h1>

          <nav className="hidden sm:flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="text-xs">CONFIGURATION</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">MONITORING</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Terminal className="h-4 w-4" />
              <span className="text-xs">COMMAND CENTER</span>
            </Button>
          </nav>

          <Button variant="ghost" size="sm" className="sm:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* User Profile and Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
              <AvatarFallback className="text-xs">AD</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-xs">
              <div className="font-medium">ADMIN</div>
              <div className="text-muted-foreground">SUPERVISOR</div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
