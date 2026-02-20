import { useRef, useState, useEffect, ReactNode, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalSliderProps {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
  showArrows?: boolean;
  accentColor?: string;
  rightAction?: ReactNode;
}

export function HorizontalSlider({ 
  children, 
  title, 
  icon,
  showArrows = true,
  accentColor = "#AC0808",
  rightAction
}: HorizontalSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        ref.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [children, checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollRef.current) {
        scrollRef.current.style.cursor = 'grab';
      }
    }
  };

  return (
    <div className="relative group/slider">
      <div className="absolute inset-0 -z-10 rounded-2xl overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(800px at 20% 0%, rgba(109,40,217,0.18), transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>
      <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          {icon && (
            <div 
              className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl border transition-colors duration-300"
              style={{
                backgroundColor: `${accentColor}1A`, // 10% opacity
                borderColor: `${accentColor}33`, // 20% opacity
                boxShadow: `0 0 15px ${accentColor}33`
              }}
            >
              <span 
                className="[&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6 md:[&>svg]:w-7 md:[&>svg]:h-7 transition-colors duration-300"
                style={{ 
                  color: accentColor,
                  filter: `drop-shadow(0 0 8px ${accentColor}80)`
                }}
              >
                {icon}
              </span>
            </div>
          )}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white">
            {title}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          {rightAction}
          {showArrows && (
          <div className="flex gap-2">
            <motion.button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${
                canScrollLeft 
                  ? 'bg-white/10 text-white border-white/20' 
                  : 'bg-white/5 text-gray-600 border-white/10 cursor-not-allowed'
              }`}
              style={canScrollLeft ? { 
                borderColor: `${accentColor}40` 
              } : {}}
              onMouseEnter={(e) => {
                if (canScrollLeft) {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.borderColor = accentColor;
                }
              }}
              onMouseLeave={(e) => {
                if (canScrollLeft) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${
                canScrollRight 
                  ? 'bg-white/10 text-white border-white/20' 
                  : 'bg-white/5 text-gray-600 border-white/10 cursor-not-allowed'
              }`}
              style={canScrollRight ? { 
                borderColor: `${accentColor}40` 
              } : {}}
              onMouseEnter={(e) => {
                if (canScrollRight) {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.borderColor = accentColor;
                }
              }}
              onMouseLeave={(e) => {
                if (canScrollRight) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        )}
        </div>
      </div>

      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 sm:pb-6 scroll-smooth snap-x snap-mandatory touch-pan-x select-none"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            WebkitOverflowScrolling: 'touch',
            cursor: 'grab',
          }}
        >
          {children}
        </div>

        <div className="hidden sm:block absolute right-0 top-0 bottom-6 w-16 sm:w-24 bg-gradient-to-l from-[#181A1E] to-transparent pointer-events-none z-10" />
        <div className="hidden sm:block absolute left-0 top-0 bottom-6 w-16 sm:w-24 bg-gradient-to-r from-[#181A1E] to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
