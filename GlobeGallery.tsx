import { useEffect, useRef, useState, useMemo } from "react";
import { useAnimationFrame } from "framer-motion";
import { mockStories, mockSellers, categoryItems } from "@/lib/mockData";

type GlobeGalleryProps = {
  className?: string;
};

export function GlobeGallery({ className }: GlobeGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const angleY = useRef(0);
  const angleX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const images = useMemo(() => {
    const all = [
      ...mockStories.filter((s) => s.image).map((s) => s.image!),
      ...Object.values(categoryItems).flat().map((i) => i.image),
      ...mockSellers.flatMap((s) => s.items.map((i) => i.image)),
    ];
    const unique = Array.from(new Set(all));
    let filled = [...unique];
    while (filled.length < 400) filled = [...filled, ...unique];
    return filled;
  }, []);

  // Adjusted dimensions for balanced spherical look with clear spacing
  const ROWS = 14;
  const COLS = 22;
  const RADIUS = 500;
  const CARD_SIZE = 125;

  useAnimationFrame((time) => {
    if (!isDragging) {
      const driftY = 0.04;
      const driftX = Math.sin(time * 0.0003) * 0.06;
      
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
      
      angleY.current += driftY + velocity.current.x;
      angleX.current += driftX + velocity.current.y;
    }

    if (sphereRef.current) {
      sphereRef.current.style.transform = `rotateX(${angleX.current}deg) rotateY(${angleY.current}deg)`;
    }
  });

  const onMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    
    velocity.current.x = dx * 0.1;
    velocity.current.y = -dy * 0.1;
    
    angleY.current += velocity.current.x;
    angleX.current += velocity.current.y;
  };

  const tiles = useMemo(() => {
    const items = [];
    for (let r = 0; r < ROWS; r++) {
      const rowProgress = r / (ROWS - 1);
      const theta = (rowProgress - 0.5) * Math.PI;
      const y = Math.sin(theta) * RADIUS;
      const currentRadius = Math.cos(theta) * RADIUS;

      for (let c = 0; c < COLS; c++) {
        const idx = (r * COLS + c) % images.length;
        const phi = (c / COLS) * 2 * Math.PI; 
        items.push({ 
          id: `${r}-${c}`, 
          img: images[idx], 
          y, 
          phi, 
          radius: currentRadius,
          theta 
        });
      }
    }
    return items;
  }, [images, ROWS, COLS, RADIUS]);

  return (
    <div className={`w-full max-w-7xl mx-auto px-0 ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/7] bg-black rounded-[24px] overflow-hidden cursor-grab active:cursor-grabbing border border-white/5 flex items-center justify-center"
        onPointerDown={(e) => {
          setIsDragging(true);
          lastPos.current = { x: e.clientX, y: e.clientY };
          containerRef.current?.setPointerCapture(e.pointerId);
        }}
        onPointerMove={onMove}
        onPointerUp={(e) => {
          setIsDragging(false);
          containerRef.current?.releasePointerCapture(e.pointerId);
        }}
        onPointerLeave={() => setIsDragging(false)}
        style={{ perspective: "1800px" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.9)_100%)] z-20 pointer-events-none" />
        
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          <div 
            ref={sphereRef}
            className="relative will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {tiles.map((tile) => (
              <div
                key={tile.id}
                className="absolute"
                style={{
                  width: CARD_SIZE,
                  height: CARD_SIZE,
                  left: -CARD_SIZE / 2,
                  top: -CARD_SIZE / 2,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "visible",
                  transform: `translateY(${tile.y}px) rotateY(${tile.phi}rad) translateZ(${tile.radius}px) rotateY(${-tile.phi}rad) rotateX(${-tile.theta}rad)`,
                }}
              >
                <div className="w-full h-full p-2">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-xl relative">
                    <img src={tile.img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
