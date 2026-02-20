import { Navbar } from "@/components/layout/Navbar";
import { GalaxyBackground } from "@/components/ui/GalaxyBackground";
import { HorizontalSlider } from "@/components/ui/HorizontalSlider";
import { ItemCard } from "@/components/ui/ItemCard";
import { categoryItems } from "@/lib/mockData";
import { CreditCard, Shirt, CircleDot, Camera, Clock } from "lucide-react";
import { MarketplaceHero } from "@/components/ui/MarketplaceHero";

export default function Collections() {
  return (
    <div className="min-h-screen bg-transparent relative">
      <Navbar />
      <GalaxyBackground />
      <main className="pt-4 md:pt-16 relative z-10">
        <MarketplaceHero />

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <HorizontalSlider title="Trading Cards" icon={<CreditCard size={28} />} accentColor="#3B82F6">
              {categoryItems["trading-cards"].map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-[#0f1115]">
          <div className="container mx-auto px-4">
            <HorizontalSlider title="Signed Jerseys" icon={<Shirt size={28} />} accentColor="#F97316">
              {categoryItems["signed-jerseys"].map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <HorizontalSlider title="Match Balls" icon={<CircleDot size={28} />} accentColor="#22C55E">
              {categoryItems["match-balls"].map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-[#0f1115]">
          <div className="container mx-auto px-4">
            <HorizontalSlider title="Autographed Photos" icon={<Camera size={28} />} accentColor="#A855F7">
              {categoryItems["autographed-photos"].map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <HorizontalSlider title="Vintage Collectibles" icon={<Clock size={28} />} accentColor="#D97706">
              {categoryItems["vintage"].map((item) => (
                <ItemCard key={item.id} item={item} compact />
              ))}
            </HorizontalSlider>
          </div>
        </section>
      </main>
    </div>
  );
}
