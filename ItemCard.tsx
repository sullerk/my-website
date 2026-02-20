import { motion } from "framer-motion";
import { Item, mockSellers } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ShieldCheck, Video, TrendingUp, TrendingDown, Activity, ArrowRightLeft, Camera, FileCheck, MessageSquare, LineChart, Gavel } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ItemCardProps {
  item: Item;
  featured?: boolean;
  compact?: boolean;
}

export function ItemCard({ item, featured = false, compact = false }: ItemCardProps) {
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState("");
  const [isBidOpen, setIsBidOpen] = useState(false);

  const handleBuy = () => {
    toast({
      title: "Purchase Successful!",
      description: `You have successfully purchased ${item.title} for $${item.price.toLocaleString()}.`,
      duration: 5000,
    });
  };

  const handleTrade = () => {
    toast({
      title: "Trade Request Sent",
      description: `A trade request for ${item.title} has been sent to the seller.`,
      duration: 5000,
    });
  };

  const handleTrackPrice = () => {
    toast({
      title: "Price Tracking Enabled",
      description: `You'll receive alerts when ${item.title}'s value changes.`,
      duration: 5000,
    });
  };

  const handlePlaceBid = () => {
    toast({
      title: "Bid Placed!",
      description: `Your bid of $${Number(bidAmount).toLocaleString()} for ${item.title} has been placed.`,
      duration: 5000,
    });
    setIsBidOpen(false);
    setBidAmount("");
  };

  const isPositive = (item.priceChange ?? 0) > 1;
  const isHolding = Math.abs(item.priceChange ?? 0) <= 1;
  const priceChangeAbs = Math.abs(item.priceChange ?? 0);

  // Glow Logic
  let glowColor = "rgba(172, 8, 8,"; // Red (Default)
  let accentColor = "from-red-600 to-orange-600";
  
  if (isPositive) {
    glowColor = "rgba(34, 197, 94,"; // Green
    accentColor = "from-green-600 to-emerald-600";
  } else if (isHolding) {
    glowColor = "rgba(234, 179, 8,"; // Yellow
    accentColor = "from-yellow-600 to-orange-600";
  }

  const cardHeight = compact 
    ? 'h-[280px] xs:h-[300px] sm:h-[340px] md:h-[380px]' 
    : featured 
      ? 'h-[380px] xs:h-[420px] sm:h-[460px] md:h-[500px]' 
      : 'h-[320px] xs:h-[360px] sm:h-[400px] md:h-[440px]';
  
  const cardWidth = compact 
    ? 'w-[200px] xs:w-[220px] sm:w-[260px] md:w-[300px]' 
    : 'w-[240px] xs:w-[280px] sm:w-[320px] md:w-[360px]';

  const [activeProof, setActiveProof] = useState<string | null>(null);

  const proofs = [
    { type: 'auth', icon: ShieldCheck, label: 'Authenticated', color: 'text-green-400' },
    { type: 'photo', icon: Camera, label: 'Photo Proof', color: 'text-blue-400' },
    { type: 'video', icon: Video, label: 'Video Proof', color: 'text-purple-400' },
    { type: 'coa', icon: FileCheck, label: 'COA', color: 'text-yellow-400' },
  ];

  const availableProofs = item.proofs || ['auth', 'photo'];

  return (
    <>
      <motion.div 
        className={`group relative overflow-hidden rounded-2xl flex-shrink-0 snap-start ${cardHeight} ${cardWidth}`}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-[#15171a]" />
        
        {/* Dynamic Glow */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `0 0 30px ${glowColor} 0.2), 0 0 60px ${glowColor} 0.1)`,
            border: `1px solid ${glowColor} 0.3)`
          }}
        />

        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/60 to-transparent opacity-90" />
        </div>

        <div className={`absolute inset-0 z-10 ${compact ? 'p-3 sm:p-4' : 'p-4 sm:p-5'} flex flex-col`}>
          <div className="flex justify-between items-start mb-auto">
            <Badge 
              className={`bg-gradient-to-r ${accentColor} text-white border-none uppercase tracking-wider text-[9px] sm:text-[10px] shadow-lg px-2 py-1 font-semibold`}
            >
              {item.type}
            </Badge>
          </div>

          <div className="mt-auto transform transition-transform duration-300 translate-y-0 group-hover:translate-y-[-4px]">
            <h3 className={`text-white font-display font-bold leading-tight mb-1.5 ${compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} line-clamp-2`}>
              {item.title}
            </h3>
            
            {/* Product Proof Icons */}
            <div className="flex items-center gap-2 mb-3">
              {proofs.filter(p => availableProofs.includes(p.type as any)).map((proof) => (
                <div 
                  key={proof.type}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProof(proof.type);
                  }}
                  className={`p-1.5 rounded-full bg-black/40 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors ${proof.color}`}
                  title={proof.label}
                >
                  <proof.icon size={12} />
                </div>
              ))}
            </div>

            <div className={`bg-[#181A1E]/80 backdrop-blur-md rounded-xl ${compact ? 'p-2.5 sm:p-3' : 'p-3 sm:p-4'} border border-white/5`}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className={`text-white font-bold font-display ${compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>
                    ${item.price.toLocaleString()}
                  </p>
                </div>
                <div 
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isPositive ? 'bg-green-500/10 text-green-400' : isHolding ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}
                >
                  {isPositive ? <TrendingUp size={12} /> : isHolding ? <Activity size={12} /> : <TrendingDown size={12} />}
                  <span className="text-xs font-bold">{priceChangeAbs}%</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 mt-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
               <Button 
                size="sm" 
                className={`flex-1 bg-gradient-to-r ${accentColor} text-white text-xs`}
                onClick={handleBuy}
              >
                Buy Now
              </Button>
              <div className="flex gap-1">
                <Button 
                  size="icon"
                  variant="outline"
                  className="w-8 h-8 border-white/20 text-white hover:bg-white/10"
                  onClick={handleTrade}
                  title="Trade"
                >
                  <ArrowRightLeft size={14} />
                </Button>
                <Button 
                  size="icon"
                  variant="outline"
                  className="w-8 h-8 border-white/20 text-white hover:bg-white/10"
                  onClick={handleTrackPrice}
                  title="Track Price"
                >
                  <LineChart size={14} />
                </Button>
                 {item.isBidding && (
                  <Button 
                    size="icon"
                    variant="outline"
                    className="w-8 h-8 border-white/20 text-white hover:bg-white/10"
                    onClick={() => setIsBidOpen(true)}
                    title="Place Bid"
                  >
                    <Gavel size={14} />
                  </Button>
                )}
                <Button 
                  size="icon"
                  variant="outline"
                  className="w-8 h-8 border-white/20 text-white hover:bg-white/10"
                  onClick={() => toast({ title: "Added to Favorites", description: "Item saved to your wishlist." })}
                  title="Favorite"
                >
                  <Heart size={14} />
                </Button>
                 <Button 
                  size="icon"
                  variant="outline"
                  className="w-8 h-8 border-white/20 text-white hover:bg-white/10"
                  onClick={() => toast({ title: "Shared", description: "Link copied to clipboard." })}
                  title="Share"
                >
                  <Share2 size={14} />
                </Button>
                {(() => {
                  const owner = mockSellers.find(s => s.items.some(i => i.id === item.id));
                  return owner ? (
                    <Link href={`/seller/${owner.id}`}>
                      <Button 
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 border-white/20 text-white hover:bg-white/10"
                        title="Message Seller"
                      >
                        <MessageSquare size={14} />
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      size="icon"
                      variant="outline"
                      className="w-8 h-8 border-white/20 text-white hover:bg-white/10"
                      onClick={() => toast({ title: "Open Messages", description: "Go to seller profile to message." })}
                      title="Message"
                    >
                      <MessageSquare size={14} />
                    </Button>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Dialog open={!!activeProof} onOpenChange={() => setActiveProof(null)}>
        <DialogContent className="bg-[#181A1E] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>{proofs.find(p => p.type === activeProof)?.label}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-black/90 rounded-lg flex flex-col items-center justify-center border border-white/10 relative overflow-hidden group">
            {activeProof === 'video' ? (
              <>
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80')] bg-cover bg-center opacity-40" />
                 <div className="z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Video size={32} className="text-white fill-white" />
                 </div>
                 <p className="z-10 mt-4 text-white font-medium">Watch Verification Video</p>
                 <p className="z-10 text-xs text-gray-400">0:45 • Uploaded by Authenticator</p>
              </>
            ) : (
              <>
                <Camera size={48} className="text-gray-600 mb-2" />
                <p className="text-gray-500">High-Res Photo Gallery</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
