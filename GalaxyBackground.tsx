import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  alpha: number;
  initialAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  angle: number;
  radius: number;
  orbitSpeed: number;
}

export const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    const config = {
      starCount: width < 768 ? 400 : 800,
      speed: 2.0, // Speed of zoom out
      baseRadius: width < 768 ? 100 : 200,
      colors: ["255, 50, 50", "50, 255, 50", "255, 165, 0", "255, 255, 255"] // Red, Green, Orange, White
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    let mouseX = 0;
    let mouseY = 0;
    let interacting = false;
    let pointerX = width / 2;
    let pointerY = height / 2;
    let flareX = width / 2;
    let flareY = height / 2;
    let flareR = 0;
    let flareAlpha = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.05;
      mouseY = (e.clientY - height / 2) * 0.05;
    };
    const setPointer = (x: number, y: number) => {
      pointerX = x;
      pointerY = y;
      mouseX = (x - width / 2) * 0.08;
      mouseY = (y - height / 2) * 0.08;
      flareX = x;
      flareY = y;
    };
    const onPointerDown = (e: PointerEvent) => {
      interacting = true;
      setPointer(e.clientX, e.clientY);
      flareAlpha = 0.6;
    };
    const onPointerMove = (e: PointerEvent) => {
      setPointer(e.clientX, e.clientY);
    };
    const onPointerUp = () => {
      interacting = false;
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      interacting = true;
      setPointer(t.clientX, t.clientY);
      flareAlpha = 0.6;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      setPointer(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      interacting = false;
    };
    const initStars = () => {
      stars = [];
      const { starCount } = config;

      for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * width * 2;
        const y = (Math.random() - 0.5) * height * 2;
        const z = Math.random() * 2000; // Depth 0 to 2000

        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const alpha = 0.5 + Math.random() * 0.5;

        stars.push({
          x, y, z,
          size: Math.random() * 5 + 3.4,
          color,
          alpha,
          initialAlpha: alpha,
          twinkleSpeed: 0.02 + Math.random() * 0.03,
          twinklePhase: Math.random() * Math.PI * 2,
          angle: 0,
          radius: 0,
          orbitSpeed: 0
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 470;

      time += 0.05; // Speed up time for twinkle effect

      // Sort stars by Z for depth
      // Actually for this effect (glow), sorting might not be strictly necessary if blending is additive,
      // but standard painter's algorithm is safer.

      // Update positions
      stars.forEach(star => {
        const zoom = config.speed * (interacting ? 1.8 : 1);
        star.z += zoom;
        
        if (star.z > 2000) {
            star.z -= 2000;
            // Optionally respawn x/y to prevent patterns, but just wrapping z is smoother for continuous flow
        }
        
        // Twinkle
        star.alpha = star.initialAlpha * (0.6 + 0.4 * Math.sin(time * star.twinkleSpeed + star.twinklePhase));
      });

      // Draw
      stars.forEach(star => {
        // Use 3D projection logic
        const scale = fov / (fov + star.z);
        const parallax = interacting ? 0.12 : 0.05;
        const screenX = cx + star.x * scale + (mouseX * scale * parallax);
        const screenY = cy + star.y * scale + (mouseY * scale * parallax);
        
        if (scale > 0 && star.z < 2000) {
          const currentSize = star.size * scale;

          // Only draw if visible
          if (screenX > -50 && screenX < width + 50 && screenY > -50 && screenY < height + 50) {
             ctx.beginPath();
             ctx.arc(screenX, screenY, currentSize, 0, Math.PI * 2);
             
             // Glow effect
             ctx.shadowBlur = 50 * scale;
             ctx.shadowColor = `rgba(${star.color}, ${star.alpha})`;
             ctx.fillStyle = `rgba(${star.color}, ${star.alpha})`;
             
             ctx.fill();
             
             // Reset shadow for performance if needed, but we want everything to glow
             // If performance is bad, batch glowing stars
          }
        }
      });
      
      if (interacting) {
        flareR = Math.min(flareR + 12, 280);
      } else {
        flareR = Math.max(flareR - 10, 0);
        flareAlpha = Math.max(flareAlpha - 0.02, 0);
      }
      if (flareR > 0 && flareAlpha > 0) {
        const g = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, flareR);
        g.addColorStop(0, `rgba(255,255,255,${flareAlpha})`);
        g.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      // Reset shadow
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerdown", onPointerDown as any, { passive: true } as any);
    window.addEventListener("pointermove", onPointerMove as any, { passive: true } as any);
    window.addEventListener("pointerup", onPointerUp as any, { passive: true } as any);
    window.addEventListener("touchstart", onTouchStart as any, { passive: true } as any);
    window.addEventListener("touchmove", onTouchMove as any, { passive: true } as any);
    window.addEventListener("touchend", onTouchEnd as any, { passive: true } as any);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", onPointerDown as any);
      window.removeEventListener("pointermove", onPointerMove as any);
      window.removeEventListener("pointerup", onPointerUp as any);
      window.removeEventListener("touchstart", onTouchStart as any);
      window.removeEventListener("touchmove", onTouchMove as any);
      window.removeEventListener("touchend", onTouchEnd as any);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none bg-[#050505]"
      style={{ zIndex: 0 }}
    />
  );
};
