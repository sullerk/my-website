import { Link, useLocation } from "wouter";
import { Search, User, Home, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#181A1E]/95 backdrop-blur-md border-t border-white/10 md:top-0 md:bottom-auto md:border-t-0 md:border-b safe-area-inset-bottom">
      <div className="container mx-auto px-2 md:px-4 h-14 md:h-16 flex items-center justify-between md:justify-start md:gap-8">
        <Link href="/" className="hidden md:flex items-center gap-2 font-display font-bold text-xl text-white tracking-wider">
          <img src="/logo.jpeg" alt="Keepsake Memorabilia" className="h-8 w-auto rounded-sm" />
          <span>KEEPSAKE<span className="text-[#AC0808]">HUB</span></span>
        </Link>
        
        <div className="flex w-full md:w-auto justify-around md:justify-start md:gap-8">
          <Link href="/" className={cn(
            "flex flex-col md:flex-row items-center gap-0.5 md:gap-1 p-1.5 md:p-2 transition-colors min-w-[48px]",
            isActive("/") ? "text-[#AC0808]" : "text-gray-400 hover:text-white"
          )}>
            <Home size={20} strokeWidth={isActive("/") ? 2.5 : 2} className="md:w-6 md:h-6" />
            <span className="text-[10px] md:text-sm font-medium">Home</span>
          </Link>

          <Link href="/marketplace" className={cn(
            "flex flex-col md:flex-row items-center gap-0.5 md:gap-1 p-1.5 md:p-2 transition-colors min-w-[48px]",
            isActive("/marketplace") ? "text-[#AC0808]" : "text-gray-400 hover:text-white"
          )}>
            <Package size={20} strokeWidth={isActive("/marketplace") ? 2.5 : 2} className="md:w-6 md:h-6" />
            <span className="text-[10px] md:text-sm font-medium">Market</span>
          </Link>

          <Link href="/search" className={cn(
            "flex flex-col md:flex-row items-center gap-0.5 md:gap-1 p-1.5 md:p-2 transition-colors min-w-[48px]",
            isActive("/search") ? "text-[#AC0808]" : "text-gray-400 hover:text-white"
          )}>
            <Search size={20} strokeWidth={isActive("/search") ? 2.5 : 2} className="md:w-6 md:h-6" />
            <span className="text-[10px] md:text-sm font-medium">Search</span>
          </Link>

          <Link href="/seller/1" className={cn(
            "flex flex-col md:flex-row items-center gap-0.5 md:gap-1 p-1.5 md:p-2 transition-colors min-w-[48px]",
            location.startsWith("/seller") ? "text-[#AC0808]" : "text-gray-400 hover:text-white"
          )}>
            <User size={20} strokeWidth={location.startsWith("/seller") ? 2.5 : 2} className="md:w-6 md:h-6" />
            <span className="text-[10px] md:text-sm font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
