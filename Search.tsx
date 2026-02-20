import { Navbar } from "@/components/layout/Navbar";
import { GalaxyBackground } from "@/components/ui/GalaxyBackground";
import { mockSellers } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { SellerCard } from "@/components/ui/SellerCard";
import { useState } from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSellers = mockSellers.filter(seller => 
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    seller.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent pb-20 md:pb-0 relative">
      <Navbar />
      <GalaxyBackground />
      
      <main className="container mx-auto px-4 py-8 md:pt-24 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Find Your Next <span className="text-[#AC0808]">Holy Grail</span>
          </h1>
          
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <Input 
              placeholder="Search sellers by name or handle..." 
              className="pl-12 h-14 bg-[#22252b] border-white/10 text-white focus:ring-[#AC0808] text-lg rounded-full shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {searchTerm && (
          <div className="mb-8">
             <h2 className="text-xl text-gray-400 mb-4">Results for "{searchTerm}"</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredSellers.map((seller) => (
                 <SellerCard key={seller.id} seller={seller} />
               ))}
               {filteredSellers.length === 0 && (
                 <div className="col-span-full text-center py-12 text-gray-500">
                   No sellers found. Try a different search term.
                 </div>
               )}
             </div>
          </div>
        )}

        {!searchTerm && (
          <div>
            <h2 className="text-xl text-gray-400 mb-4">Recommended Sellers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSellers.slice(0, 3).map((seller) => (
                <SellerCard key={seller.id} seller={seller} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
