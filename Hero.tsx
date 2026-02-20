import { motion } from "framer-motion";
import { heroImage } from "@/lib/mockData";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#181A1E]/30 via-[#181A1E]/70 to-[#181A1E]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tight">
            KEEPSAKE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0808] to-[#ff4d4d]">HUB</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 font-light">
            A modern way to track, showcase, and trade sports memorabilia.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href="/marketplace">
              <Button 
                size="lg" 
                className="bg-white text-[#181A1E] hover:bg-gray-200 font-bold px-8 py-6 text-lg rounded-full"
              >
                Explore Sellers
              </Button>
            </Link>
            <Link href="/search">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 hover:text-white font-medium px-8 py-6 text-lg rounded-full backdrop-blur-sm"
              >
                Start Portfolio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
