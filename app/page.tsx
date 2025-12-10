import { HeroSection } from "@/components/ui/hero-odyssey";
import { SmartControlGrid } from "@/components/ui/smart-control-grid";
import { TechSpecs } from "@/components/ui/tech-specs";
import { PerformanceMetrics } from "@/components/ui/performance-metrics";
import { EvolutionRoadmap } from "@/components/ui/evolution-roadmap";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-0 px-0 bg-black">
        {/* Hero Section */}
        <HeroSection />

        {/* Smart Control Section */}
        <SmartControlGrid />

        {/* Tech Specs Section */}
        <TechSpecs />

        {/* Performance Metrics Section */}
        <PerformanceMetrics />

        {/* Evolution Roadmap Section */}
        <EvolutionRoadmap />
      </main>
    </div>
  );
}
