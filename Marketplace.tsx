import { Navbar } from "@/components/layout/Navbar";
import { GalaxyBackground } from "@/components/ui/GalaxyBackground";
import { SellerCard } from "@/components/ui/SellerCard";
import { ItemCard } from "@/components/ui/ItemCard";
import { HorizontalSlider } from "@/components/ui/HorizontalSlider";
import { MarketplaceHero } from "@/components/ui/MarketplaceHero";
import { mockSellers, categoryItems, mockStories, Story } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { 
  Search as SearchIcon, 
  Filter, 
  CreditCard, 
  Shirt, 
  CircleDot, 
  Camera,
  Clock,
  TrendingUp,
  Flame,
  Users,
  UserPlus,
  MessageCircle,
  ChevronRight,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Image, FileText, Bell, X } from "lucide-react";

export default function Marketplace() {
  const allItems = mockSellers.flatMap(s => s.items);
  const trendingItems = allItems.filter(i => (i.priceChange ?? 0) > 5);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <div className="min-h-screen bg-transparent pb-20 md:pb-0 relative">
      <Navbar />
      <GalaxyBackground />
      <div className="relative z-10">
        <main className="pt-4 md:pt-16">
        <MarketplaceHero />
        
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
            <div>
              <h2 className="text-xl md:text-3xl font-display font-bold text-white mb-1 md:mb-2">Explore Collections</h2>
              <p className="text-sm md:text-base text-[#CFCFCF]">Browse trending collectibles and rare finds.</p>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={14} />
                <Input 
                  placeholder="Search collectibles..." 
                  className="pl-9 bg-[#22252b] border-white/10 text-white text-sm focus:ring-[#AC0808] h-9 md:h-10"
                />
              </div>
              <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10 h-9 md:h-10">
                <Filter size={14} className="mr-1 md:mr-2" /> Filter
              </Button>
            </div>
          </div>

          {/* Stories Strip */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-6 bg-gradient-to-b from-[#AC0808] to-orange-600 rounded-full" />
            <h3 className="text-lg font-display font-bold text-white">Stories</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 min-w-[70px] group"
            >
              <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-gray-800 to-gray-700">
                <div className="w-16 h-16 rounded-full bg-[#15171a] flex items-center justify-center border-2 border-dashed border-gray-600 group-hover:border-[#AC0808] transition-colors">
                  <Plus size={24} className="text-gray-400 group-hover:text-[#AC0808] transition-colors" />
                </div>
              </div>
              <span className="text-[10px] font-medium text-gray-400 group-hover:text-white transition-colors">Add Story</span>
            </motion.button>
            {mockStories.map((story) => (
              <motion.button
                key={story.id}
                onClick={() => setSelectedStory(story)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 min-w-[70px] group"
              >
                <div className={`relative p-[3px] rounded-full ${story.viewed ? 'bg-gray-800' : 'bg-gradient-to-tr from-[#AC0808] to-orange-500 shadow-[0_0_15px_rgba(172,8,8,0.4)]'}`}>
                  <div className="w-16 h-16 rounded-full bg-[#15171a] flex items-center justify-center overflow-hidden border-2 border-[#050505]">
                    {story.image ? (
                      <img src={story.image} alt="" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    ) : (
                      <div className="text-gray-400 group-hover:text-white transition-colors">
                        {story.type === 'image' ? <Image size={16} /> : story.type === 'text' ? <FileText size={16} /> : <Bell size={16} />}
                      </div>
                    )}
                  </div>
                  {!story.viewed && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#AC0808] rounded-full border-2 border-[#050505] animate-pulse" />
                  )}
                </div>
                <span className="text-[10px] font-medium text-gray-400 truncate max-w-[60px] group-hover:text-white transition-colors">
                  {story.type === 'image' ? 'Photo' : story.type === 'text' ? 'Update' : 'News'}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Top Sellers Strip (restored) */}
          <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 items-center">
             <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full bg-[#1a1d22] border border-white/10">
               <Button size="sm" className="h-7 px-3 bg-[#AC0808] hover:bg-[#8a0606] text-white">View All Sellers</Button>
               <div className="flex items-center gap-1">
                 <Button variant="outline" size="icon" className="w-7 h-7 border-white/10 text-white hover:bg-white/10">
                   <UserPlus size={14} />
                 </Button>
                 <Button variant="outline" size="icon" className="w-7 h-7 border-white/10 text-white hover:bg-white/10">
                   <MessageCircle size={14} />
                 </Button>
               </div>
             </div>
             <div className="w-px h-12 bg-white/10 mx-2" />
             {mockSellers.map((seller) => (
               <div key={seller.id} className="flex-shrink-0 w-72 h-[450px]">
                 <SellerCard seller={seller} />
               </div>
             ))}
          </div>
        </div>

        <div className="container mx-auto px-4 pb-4 md:pb-8">
        </div>

        <section className="py-8 md:py-12 bg-gradient-to-r from-[#0f1115] via-[#12141a] to-[#181A1E] border-y border.white/5">
          <div className="container mx-auto px-4">
            <HorizontalSlider 
              title="Hot Right Now" 
              icon={<Flame size={28} />} 
              rightAction={
                <Link href="/collections" className="text-white hover:text-[#AC0808] transition-colors text-sm">
                  View All <ChevronRight size={16} className="inline ml-1" />
                </Link>
              }
            >
              {trendingItems.length > 0 
                ? trendingItems.map((item) => (
                    <ItemCard key={item.id} item={item} compact />
                  ))
                : allItems.slice(0, 8).map((item) => (
                    <ItemCard key={item.id} item={item} compact />
                  ))
              }
            </HorizontalSlider>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <HorizontalSlider 
              title="Trading Cards" 
              icon={<CreditCard size={28} />} 
              accentColor="#3B82F6"
              rightAction={
                <Link href="/collections" className="text-white hover:text-[#3B82F6] transition-colors text-sm">
                  View All <ChevronRight size={16} className="inline ml-1" />
                </Link>
              }
            >
              {categoryItems['trading-cards'].map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-[#0f1115]">
          <div className="container mx-auto px-4">
            <HorizontalSlider 
              title="Signed Jerseys" 
              icon={<Shirt size={28} />} 
              accentColor="#F97316"
              rightAction={
                <Link href="/collections" className="text-white hover:text-[#F97316] transition-colors text-sm">
                  View All <ChevronRight size={16} className="inline ml-1" />
                </Link>
              }
            >
              {categoryItems['signed-jerseys'].map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-gradient-to-r from-yellow-500/5 via-[#0f1115] to-[#181A1E] border-y border-yellow-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10">
             <div className="flex items-center gap-2 mb-1">
               <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-wider border border-yellow-500/20">Sponsored</span>
             </div>
            <HorizontalSlider 
              title="Premium Selections" 
              icon={<Sparkles size={28} />} 
              accentColor="#EAB308"
              rightAction={
                <Link href="/collections" className="text-white hover:text-[#EAB308] transition-colors text-sm">
                  View All <ChevronRight size={16} className="inline ml-1" />
                </Link>
              }
            >
              {allItems.slice(8, 14).map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <HorizontalSlider 
              title="Match Balls" 
              icon={<CircleDot size={28} />} 
              accentColor="#22C55E"
              rightAction={
                <Link href="/collections" className="text-white hover:text-[#22C55E] transition-colors text-sm">
                  View All <ChevronRight size={16} className="inline ml-1" />
                </Link>
              }
            >
              {categoryItems['match-balls'].map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-[#0f1115]">
          <div className="container mx-auto px-4">
            <HorizontalSlider 
              title="Autographed Photos" 
              icon={<Camera size={28} />} 
              accentColor="#A855F7"
              rightAction={
                <Link href="/collections" className="text-white hover:text-[#A855F7] transition-colors text-sm">
                  View All <ChevronRight size={16} className="inline ml-1" />
                </Link>
              }
            >
              {categoryItems['autographed-photos'].map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <HorizontalSlider 
              title="Vintage Collectibles" 
              icon={<Clock size={28} />} 
              accentColor="#D97706"
              rightAction={
                <Link href="/collections" className="text-white hover:text-[#D97706] transition-colors text-sm">
                  View All <ChevronRight size={16} className="inline ml-1" />
                </Link>
              }
            >
              {categoryItems['vintage'].map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>

        <AnimatePresence>
          {selectedStory && (
            <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
              <DialogContent className="bg-[#181A1E] border-white/10 text-white max-w-lg p-0 overflow-hidden">
                <div className="relative aspect-[9/16] max-h-[80vh] bg-gradient-to-br from-[#22252b] to-[#15171a]">
                  {selectedStory.image ? (
                    <img src={selectedStory.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <p className="text-xl md:text-2xl text-center font-medium leading-relaxed">
                        {selectedStory.content}
                      </p>
                    </div>
                  )}
                  
                  <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#AC0808] to-orange-600" />
                        <div>
                          <p className="text-sm font-medium">Vault Hunter</p>
                          <p className="text-xs text-gray-400">{selectedStory.timestamp}</p>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setSelectedStory(null)}
                        className="text-white hover:bg-white/20"
                      >
                        <X size={20} />
                      </Button>
                    </div>
                  </div>
  
                  {selectedStory.image && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-sm">{selectedStory.content}</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </main>
      </div>
    </div>
  );
}
