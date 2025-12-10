import { SmartControlGrid } from "@/components/ui/smart-control-grid";
import { TechSpecs } from "@/components/ui/tech-specs";
import { PerformanceMetrics } from "@/components/ui/performance-metrics";
import { EvolutionRoadmap } from "@/components/ui/evolution-roadmap";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation hint */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-black/50 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-white font-semibold text-lg">
            FishFeed<span className="text-blue-400">ARD</span>
          </a>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#control" className="hover:text-white transition-colors">Control</a>
            <a href="#specs" className="hover:text-white transition-colors">Specs</a>
            <a href="#performance" className="hover:text-white transition-colors">Performance</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Component 1: Smart Control Bento Grid */}
        <section id="control">
          <SmartControlGrid />
        </section>

        {/* Component 2: Tech Specs - Under the Hood */}
        <section id="specs">
          <TechSpecs />
        </section>

        {/* Component 3: Performance Metrics */}
        <section id="performance">
          <PerformanceMetrics />
        </section>

        {/* Component 4: Evolution Roadmap */}
        <section id="roadmap">
          <EvolutionRoadmap />
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 bg-black border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-500 text-sm">
              FishFeed ARD — IoT-Powered Automated Fish Feeding System
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Built with NodeMCU ESP8266 • Designed for Reliability
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
