import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Users, Zap, Activity, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatCounterProps {
  value: string;
  label: string;
  trend?: string;
  icon: React.ReactNode;
}

function StatCounter({ value, label, trend, icon }: StatCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 hover:border-[#AC0808]/50 transition-all duration-300">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#AC0808]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#AC0808]">{icon}</span>
          {trend && (
            <span className="text-[10px] md:text-xs text-green-400 flex items-center gap-0.5">
              <ArrowUpRight size={10} />
              {trend}
            </span>
          )}
        </div>
        <p className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-1">{value}</p>
        <p className="text-xs md:text-sm text-gray-400">{label}</p>
      </div>
    </motion.div>
  );
}

function FloatingCard({ delay, x, y, rotation }: { delay: number; x: string; y: string; rotation: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        scale: [0.95, 1, 0.95],
        y: [-10, 10, -10],
        rotateY: [rotation - 5, rotation + 5, rotation - 5],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute w-16 h-24 md:w-24 md:h-36 lg:w-32 lg:h-48 rounded-xl overflow-hidden"
      style={{ 
        left: x, 
        top: y,
        transform: `perspective(1000px) rotateY(${rotation}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#AC0808]/40 via-[#ff4d4d]/20 to-transparent" />
      <div className="absolute inset-0 border-2 border-[#AC0808]/30 rounded-xl" />
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          backgroundSize: '200% 200%',
          animation: 'holographic 4s ease-in-out infinite',
        }}
      />
      <div className="absolute bottom-2 left-2 right-2">
        <div className="h-1 bg-white/20 rounded mb-1" />
        <div className="h-1 bg-white/10 rounded w-2/3" />
      </div>
    </motion.div>
  );
}

export function MarketplaceHero() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-28 bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#AC0808]/10 via-[#050505] to-[#050505]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(172,8,8,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 30%, rgba(255,77,77,0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(172,8,8,0.1) 0%, transparent 45%)
          `,
        }}
      />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#AC0808]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ff4d4d]/5 rounded-full blur-[80px]" />
      </div>

      <div className="hidden lg:block">
        <FloatingCard delay={0} x="5%" y="20%" rotation={-15} />
        <FloatingCard delay={1} x="85%" y="15%" rotation={15} />
        <FloatingCard delay={2} x="10%" y="60%" rotation={-10} />
        <FloatingCard delay={1.5} x="88%" y="55%" rotation={12} />
      </div>
      
      <div className="hidden md:block lg:hidden">
        <FloatingCard delay={0} x="3%" y="25%" rotation={-12} />
        <FloatingCard delay={1} x="85%" y="20%" rotation={12} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#AC0808]/10 border border-[#AC0808]/30 mb-6">
              <Activity size={14} className="text-[#AC0808]" />
              <span className="text-xs md:text-sm text-[#CFCFCF]">Real-Time Value Tracking</span>
              <span className="text-xs text-green-400">LIVE</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">
              Track. Trade.{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-[#AC0808] via-[#ff4d4d] to-[#AC0808] bg-clip-text text-transparent">
                  Collect.
                </span>
                <span 
                  className="absolute -inset-1 bg-gradient-to-r from-[#AC0808]/20 to-[#ff4d4d]/20 blur-lg opacity-50"
                  aria-hidden="true"
                />
              </span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-[#CFCFCF] max-w-2xl mx-auto mb-8">
              The data-driven marketplace for sports memorabilia. Monitor price movements, 
              discover trending collectibles, and trade with confidence.
            </p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-gray-300">
                <Zap size={12} className="inline mr-1 text-yellow-400" /> Market Volatility
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-gray-300">
                <TrendingUp size={12} className="inline mr-1 text-green-400" /> Price Movement: +12% this week
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-gray-300">
                <BarChart3 size={12} className="inline mr-1 text-blue-400" /> Athlete Stats Linked
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="lg" 
                className="bg-[#F5F5F5] text-[#181A1E] hover:bg-white font-bold px-6 md:px-8 h-11 md:h-12 text-sm md:text-base shadow-lg"
              >
                <TrendingUp size={16} className="mr-2" />
                Track Value
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 px-6 md:px-8 h-11 md:h-12 text-sm md:text-base"
              >
                Explore Market
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 max-w-5xl mx-auto">
          <StatCounter 
            value="15,000+" 
            label="Items Tracked" 
            trend="+8.2%"
            icon={<BarChart3 size={18} />}
          />
          <StatCounter 
            value="12" 
            label="Active Categories" 
            icon={<Activity size={18} />}
          />
          <StatCounter 
            value="+18.5%" 
            label="Avg. Price Movement" 
            trend="7d"
            icon={<TrendingUp size={18} />}
          />
          <StatCounter 
            value="5,200+" 
            label="Active Collectors" 
            trend="+15%"
            icon={<Users size={18} />}
          />
        </div>
      </div>
    </section>
  );
}
