import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Item } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Video, RefreshCw, DollarSign, Gavel } from "lucide-react";

interface CardStackProps {
  items: Item[];
}

export function CardStack({ items }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState<number | null>(null);

  const currentItem = items[currentIndex % items.length];
  const nextItem = items[(currentIndex + 1) % items.length];

  const x = useMotionValue(0);
  const scale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]);
  const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -100) {
      setExitX(-250);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setExitX(null);
        x.set(0);
      }, 200);
    } else if (info.offset.x > 100) {
      setExitX(250);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
        setExitX(null);
        x.set(0);
      }, 200);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[600px] flex items-center justify-center perspective-1000">
      <div className="relative w-full h-[500px]">
        <div className="absolute top-4 left-0 right-0 mx-auto w-[90%] h-full bg-[#1e2126] rounded-2xl border border-white/5 opacity-40 transform scale-95 translate-y-4">
           {nextItem && (
             <img src={nextItem.image} alt="" className="w-full h-full object-cover rounded-2xl opacity-30" />
           )}
        </div>

        <AnimatePresence>
          <motion.div
            key={currentItem.id}
            style={{ x, rotate, scale, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={exitX !== null ? { x: exitX, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 w-full h-full bg-[#22252b] rounded-2xl border border-white/10 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing group"
          >
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
              style={{
                boxShadow: '0 0 40px rgba(139,92,246,0.5), 0 0 80px rgba(59,130,246,0.4), 0 0 120px rgba(139,92,246,0.3)',
              }}
            />
            
            <div 
              className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none z-10 overflow-hidden"
              style={{
                background: 'linear-gradient(125deg, transparent 0%, rgba(139,92,246,0.15) 25%, rgba(59,130,246,0.15) 50%, rgba(6,182,212,0.15) 75%, transparent 100%)',
                backgroundSize: '200% 200%',
                animation: 'holographic-rainbow 4s ease-in-out infinite',
              }}
            />

            <div className="relative h-[65%] w-full bg-black">
              <img 
                src={currentItem.image} 
                alt={currentItem.title} 
                className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#22252b] to-transparent opacity-80" />
              
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.2) 50%, rgba(6,182,212,0.3) 100%)',
                }}
              />
              
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20">
                  {currentIndex + 1} / {items.length}
                </Badge>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[45%] p-6 flex flex-col justify-between bg-gradient-to-t from-[#22252b] via-[#22252b] to-transparent">
              <div>
                <div className="flex justify-between items-start mb-2">
                   <h2 className="text-2xl font-display font-bold text-white leading-tight max-w-[70%]">
                     {currentItem.title}
                   </h2>
                   <div className="text-right">
                     <p className="text-xs text-gray-500 uppercase">Value</p>
                     <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                       ${currentItem.price.toLocaleString()}
                     </p>
                   </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {currentItem.description}
                </p>

                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                    <ShieldCheck size={14} />
                    <span>Authenticated</span>
                  </div>
                  {currentItem.type === 'memorabilia' && (
                    <div className="flex items-center gap-1 text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                      <Video size={14} />
                      <span>Video Proof</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                 <Button className="bg-white text-black hover:bg-gray-200 flex flex-col h-auto py-2 gap-1 text-xs">
                   <DollarSign size={16} />
                   Buy
                 </Button>
                 {currentItem.isBidding ? (
                   <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 flex flex-col h-auto py-2 gap-1 text-xs animate-pulse">
                     <Gavel size={16} />
                     Bid
                   </Button>
                 ) : (
                   <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 flex flex-col h-auto py-2 gap-1 text-xs">
                     <RefreshCw size={16} />
                     Trade
                   </Button>
                 )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -bottom-12 left-0 right-0 text-center text-gray-500 text-sm animate-bounce">
        Swipe to explore
      </div>

      <style>{`
        @keyframes holographic-rainbow {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
      `}</style>
    </div>
  );
}
