import { Link } from "wouter";
import { Seller } from "@/lib/mockData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, MapPin, MessageCircle, UserPlus, Trophy } from "lucide-react";

interface SellerCardProps {
  seller: Seller;
}

export function SellerCard({ seller }: SellerCardProps) {
  // Generate random location/stats for the UI if not in mock data
  const location = "New York, USA"; 
  const memberSince = "Dec 2024";

  return (
    <Link href={`/seller/${seller.id}`} className="block group h-full">
      <div className="relative h-full flex flex-col bg-[#1a1d22] rounded-3xl overflow-hidden border border-white/5 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20 hover:-translate-y-1 group-hover:border-white/10">
        
        {/* Banner Area */}
        <div className="h-28 bg-gradient-to-r from-[#1a0505] to-[#3a0a0a] relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
             {/* Abstract Shapes/Glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#AC0808] opacity-20 blur-[50px] rounded-full translate-x-10 -translate-y-10 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 opacity-10 blur-[40px] rounded-full -translate-x-5 translate-y-5 pointer-events-none"></div>
        </div>

        {/* Profile Content */}
        <div className="px-5 pb-5 flex-1 flex flex-col relative">
            
            {/* Floating Avatar */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="p-1.5 bg-[#1a1d22] rounded-full relative">
                    <Avatar className="w-24 h-24 border-2 border-[#1a1d22] shadow-lg">
                        <AvatarImage src={seller.avatar} alt={seller.name} className="object-cover" />
                        <AvatarFallback className="bg-red-900/20 text-red-500 font-bold text-2xl">{seller.name[0]}</AvatarFallback>
                    </Avatar>
                    {seller.verified && (
                        <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-[#1a1d22] shadow-sm">
                            <ShieldCheck size={12} fill="currentColor" className="text-white" />
                        </div>
                    )}
                    <div 
                      className="absolute bottom-1 left-1 w-6 h-6 rounded-full border-2 border-[#1a1d22] shadow-sm"
                      style={{ 
                        background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #22c55e, #f59e0b, #ef4444, #7c3aed)',
                        filter: 'saturate(1.2) brightness(1.1)'
                      }}
                      title="Hologram sticker"
                    />
                </div>
            </div>

            {/* Spacer for Avatar */}
            <div className="mt-14 text-center">
                <h3 className="text-xl font-display font-bold text-white mb-1 flex items-center justify-center gap-2">
                    {seller.name}
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-white/20 bg-white/5">
                      Hologram
                    </Badge>
                </h3>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-3">
                    <span className="font-medium text-[#AC0808]">{seller.handle}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <div className="flex items-center gap-1">
                        <MapPin size={10} />
                        <span>{location}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-5 px-2">
                    {seller.bio || "Specializing in high-end graded basketball slabs and vintage finds."}
                </p>

                {/* Stats Row */}
                <div className="flex items-center justify-center divide-x divide-white/10 border-y border-white/5 py-3 mb-5 bg-white/[0.02] rounded-xl">
                    <div className="px-4 text-center">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Sales</div>
                        <div className="text-sm font-bold text-white">{seller.totalSales?.toLocaleString() || "124"}</div>
                    </div>
                    <div className="px-4 text-center">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Rating</div>
                        <div className="text-sm font-bold text-white flex items-center gap-1">
                            {seller.rating} <Star size={10} className="fill-[#EAB308] text-[#EAB308]" />
                        </div>
                    </div>
                    <div className="px-4 text-center">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Member</div>
                        <div className="text-sm font-bold text-white">{memberSince}</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <Button 
                        className="bg-gradient-to-r from-[#AC0808] to-orange-600 hover:from-[#8a0606] hover:to-orange-700 text-white border-0 shadow-lg shadow-red-900/20"
                        size="sm"
                    >
                        <UserPlus size={16} className="mr-2" /> Follow
                    </Button>
                    <Button 
                        variant="outline" 
                        className="border-white/10 text-white hover:bg-white/5 hover:text-white"
                        size="sm"
                    >
                        <MessageCircle size={16} className="mr-2" /> Message
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </Link>
  );
}
