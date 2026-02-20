import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { GalaxyBackground } from "@/components/ui/GalaxyBackground";
import { SellerCard } from "@/components/ui/SellerCard";
import { mockSellers, mockDiscussions } from "@/lib/mockData";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Trophy, 
  Globe,
  Users,
  Star,
  Sparkles,
  TrendingUp,
  Zap,
  ShieldCheck,
  Package,
  Puzzle,
  BarChart3,
  Search,
  CheckCircle2,
  MessageSquare,
  MessageCircle,
  ThumbsUp
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HorizontalSlider } from "@/components/ui/HorizontalSlider";
import { GlobeGallery } from "@/components/ui/GlobeGallery";

// --- Components ---

function LiveTicker() {
  const tickerItems = [
    { label: "MJ '98 Jersey", value: "+12.5%", color: "text-green-400" },
    { label: "LeBron Rookie Auto", value: "Sold $52k", color: "text-white" },
    { label: "Brady TB12 Helmet", value: "+5.2%", color: "text-green-400" },
    { label: "Kobe '09 Finals Ball", value: "Sold $18.5k", color: "text-white" },
    { label: "Mantle '52 Topps", value: "Trending", color: "text-yellow-400" },
    { label: "Ohtani Signed Bat", value: "+8.4%", color: "text-green-400" },
    { label: "Messi WC Kit", value: "Sold $85k", color: "text-white" },
  ];

  return (
    <div className="w-full bg-[#AC0808] border-y border-red-900 overflow-hidden py-2 relative z-20">
      <div className="flex animate-marquee whitespace-nowrap gap-12">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-medium text-white/90">
            <span className="opacity-70 uppercase tracking-wider">{item.label}</span>
            <span className={`font-bold ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingCard({ delay, x, y, rotation, src }: { delay: number; x: string; y: string; rotation: number; src: string }) {
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
      className="absolute w-24 h-36 md:w-32 md:h-48 lg:w-40 lg:h-56 rounded-xl overflow-hidden"
      style={{ 
        left: x, 
        top: y,
        transform: `perspective(1000px) rotateY(${rotation}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#AC0808]/20 via-[#ff4d4d]/10 to-transparent backdrop-blur-sm border border-white/10" />
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
          backgroundSize: '200% 200%',
          animation: 'holographic 4s ease-in-out infinite',
        }}
      />
    </motion.div>
  );
}

function CinematicHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex flex-col items-center justify-center bg-transparent">
      {/* Floating Cards Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingCard delay={0} x="10%" y="20%" rotation={-15} src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=600&fit=crop" />
        <FloatingCard delay={2} x="80%" y="15%" rotation={15} src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=600&fit=crop" />
        <FloatingCard delay={4} x="15%" y="70%" rotation={-10} src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=400&h=600&fit=crop" />
        <FloatingCard delay={1.5} x="85%" y="65%" rotation={12} src="https://images.unsplash.com/photo-1505842465776-3acb1841c736?w=400&h=600&fit=crop" />
      </div>

      {/* Spotlight Effect */}
      <motion.div 
        style={{ opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-medium text-gray-300 uppercase tracking-widest">The Vault is Open</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[1.1] mb-6 px-4">
            Track, Analyze & Trade <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0808] via-[#ff4d4d] to-[#AC0808] animate-gradient-x">
              Sports Memorabilia
            </span> <br className="hidden md:block" />
            Like Digital Assets
          </h1>
          
          <p className="text-base md:text-xl text-gray-400 max-w-xl mx-auto font-light leading-relaxed px-6">
            Real-time price tracking, verified collectors, and a global marketplace for premium sports collectibles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-md justify-center px-6"
        >
          <Link href="/marketplace">
            <Button size="lg" className="w-full sm:w-auto bg-[#AC0808] text-white hover:bg-[#8a0606] font-bold px-8 h-12 md:h-14 rounded-full text-base md:text-lg shadow-[0_0_20px_rgba(172,8,8,0.4)] hover:shadow-[0_0_30px_rgba(172,8,8,0.6)] transition-all hover:scale-105">
              Explore Market <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="/collections">
             <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/10 text-white hover:bg-white/5 h-12 md:h-14 rounded-full text-base md:text-lg px-8">
               View Collections
             </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CommunitySection() {
  // Adapt mock data to component structure
  const rawDiscussions = mockDiscussions || [];
  const discussions = rawDiscussions.length > 0 ? rawDiscussions.slice(0, 3).map(d => ({
      id: d.id,
      title: d.title,
      author: { name: d.author, avatar: d.avatar },
      replies: d.replies,
      likes: Math.floor(Math.random() * 200) + 20,
      category: "Community"
  })) : [
    {
      id: '1',
      title: "The future of card grading: AI vs Human",
      author: { name: "Collector99", avatar: "https://i.pravatar.cc/150?u=1" },
      replies: 45,
      likes: 120,
      category: "General"
    },
    {
      id: '2',
      title: "Is the '90s insert market overheating?",
      author: { name: "VintageKing", avatar: "https://i.pravatar.cc/150?u=2" },
      replies: 32,
      likes: 85,
      category: "Market Watch"
    },
    {
      id: '3',
      title: "Showoff: My new mantlepiece display",
      author: { name: "SportsFan", avatar: "https://i.pravatar.cc/150?u=3" },
      replies: 18,
      likes: 210,
      category: "Showcase"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare size={24} className="text-[#AC0808]" />
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white">Community Insights</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <input type="file" accept="image/*,video/*" className="w-full md:w-1/2 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white/10 file:text-white file:hover:bg-white/20 bg-[#15171a] border border-white/10 rounded-lg p-2 text-white" />
            <Button className="bg-[#AC0808] hover:bg-[#8a0606]">Upload</Button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-10">
           <div className="flex items-center gap-3">
             <MessageSquare size={24} className="text-[#AC0808]" />
             <h2 className="text-2xl md:text-4xl font-display font-bold text-white">Community Insights</h2>
           </div>
           <Button variant="ghost" className="text-gray-400 hover:text-white">View All Discussions <ArrowRight size={16} className="ml-2" /></Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {discussions.map((d) => (
             <div key={d.id} className="group p-6 rounded-2xl bg-[#15171a] border border-white/5 hover:border-red-500/20 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={d.author.avatar} alt={d.author.name} className="w-10 h-10 rounded-full border border-white/10" />
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">{d.author.name}</div>
                      <div className="text-xs text-gray-500">{d.category}</div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 leading-snug">
                  {d.title}
                </h3>
                
                <div className="flex items-center gap-6 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    <span>{d.replies}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp size={16} />
                    <span>{d.likes}</span>
                  </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const partners = ["PSA", "Beckett", "JSA", "SGC", "CGC"];
  
  return (
    <section className="py-10 border-y border-white/5 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-white" size={24} />
            <span className="text-sm font-medium text-gray-300 uppercase tracking-widest">Guaranteed Authenticity</span>
          </div>
          <div className="h-px w-full md:w-auto md:h-8 bg-white/10 md:flex-1" />
          <div className="flex flex-wrap justify-center gap-8 grayscale hover:grayscale-0 transition-all duration-500">
            {partners.map(p => (
              <span key={p} className="text-lg font-display font-bold text-gray-400">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DomeGallerySection() {
  return (
    <section className="py-12 md:py-20 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center gap-3">
          <Globe size={20} className="text-[#AC0808] md:w-[24px] md:h-[24px]" />
          <h2 className="text-xl md:text-3xl font-display font-bold text-white uppercase tracking-tight">Global Dome Gallery</h2>
        </div>
      </div>
      <div className="w-full px-0">
        <GlobeGallery />
      </div>
    </section>
  );
}

function CollectionsSection() {
  const collections = mockSellers.map((s) => ({
    id: s.id,
    title: s.name,
    subtitle: s.handle,
    cover: s.items[0]?.image,
    count: s.items.length,
    avatar: s.avatar,
    verified: s.verified,
  }));

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <HorizontalSlider title="Featured Collections" icon={<Star size={24} />} accentColor="#EAB308">
          {collections.map((c) => (
            <div key={c.id} className="snap-start flex-shrink-0 w-[260px] xs:w-[280px] sm:w-[320px]">
              <div className="group relative rounded-2xl overflow-hidden bg-[#1a1d22] border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={c.cover} 
                    alt={c.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
                    {c.count} ITEMS
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={c.avatar} alt={c.title} className="w-9 h-9 rounded-full border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm truncate group-hover:text-red-400 transition-colors">
                        {c.title}
                      </h4>
                      <p className="text-gray-500 text-xs truncate">{c.subtitle}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Collection</span>
                    <Button size="sm" variant="ghost" className="h-6 text-[10px] px-2 text-white hover:bg-white/10">
                      View Gallery
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "$2.5B+", label: "Total Volume", icon: <TrendingUp size={24} /> },
    { value: "10K+", label: "Active Collectors", icon: <Users size={24} /> },
    { value: "50K+", label: "Items Listed", icon: <Package size={24} /> },
    { value: "99.9%", label: "Secure Trades", icon: <ShieldCheck size={24} /> },
  ];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden border-y border-white/5 bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-4 p-3 rounded-full bg-white/5 text-[#AC0808] border border-white/10">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailedHowItWorks() {
  const concepts = [
    {
      icon: <BarChart3 className="w-6 h-6 md:w-9 md:h-9" />,
      title: "Price Movement Algorithm",
      description: "Track real-time market trends with our proprietary price analysis. See exactly how your assets perform over time.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Trophy className="w-6 h-6 md:w-9 md:h-9" />,
      title: "Player Stats Integration",
      description: "Athlete performance data directly affects collectible values. Stay ahead with live sports analytics.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Package className="w-6 h-6 md:w-9 md:h-9" />,
      title: "Buy / Sell / Trade / Hold",
      description: "Manage your collection like a portfolio. Make strategic decisions based on market momentum.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Puzzle className="w-6 h-6 md:w-9 md:h-9" />,
      title: "Multi-Category Collections",
      description: "From trading cards to signed jerseys, match balls to vintage photos. All asset classes in one place.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="w-6 h-6 md:w-9 md:h-9" />,
      title: "Community & Network",
      description: "Connect with collectors, businesses, and sellers worldwide. Build your reputation in the market.",
      gradient: "from-[#AC0808] to-red-500",
    }
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#AC0808]/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <Zap size={14} className="text-yellow-400" />
            <span className="text-sm text-gray-300">Platform Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 md:mb-6">How It Works</h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            A revolutionary platform that treats collectibles as tradeable assets with real market dynamics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {concepts.map((concept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative p-6 md:p-8 rounded-3xl bg-[#15171a] border border-white/5 group-hover:border-red-500/30 transition-all duration-300 h-full hover:translate-y-[-4px] hover:shadow-[0_10px_30px_rgba(172,8,8,0.1)] flex flex-col items-start">
                <div className={`w-12 h-12 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br ${concept.gradient} mb-5 md:mb-6 text-white shadow-lg shrink-0`}>
                  {concept.icon}
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-red-400 transition-colors">{concept.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{concept.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-br from-[#AC0808]/40 to-transparent" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Ready to Start Your Portfolio?
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Join thousands of collectors trading securely on the world's premier sports memorabilia marketplace.
          </p>
          <Link href="/marketplace">
            <Button size="lg" className="bg-white text-[#AC0808] hover:bg-gray-100 font-bold px-8 h-12 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-red-500/30 text-white relative">
      <Navbar />
      <GalaxyBackground />
      <div className="relative z-10">
        <CinematicHero />
        <LiveTicker />
        <TrustSection />
        <DomeGallerySection />
        <StatsSection />
        <DetailedHowItWorks />
        <CommunitySection />
        <CTASection />
      </div>
    </div>
  );
}
