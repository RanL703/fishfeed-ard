"use client";
import React from "react";
import { HeroSection } from "@/components/ui/hero-odyssey";
import {
  Clock,
  Smartphone,
  Gauge,
  Bell,
  Battery,
} from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const fishFeedFeatures = [
  {
    Icon: Clock,
    name: "Automated Scheduling",
    description: "Set precise feeding times with Arduino-controlled servo motor.",
    href: "/fishfeed-demo",
    cta: "Learn more",
    background: (
      <img 
        className="absolute -right-20 -top-20 opacity-60" 
        src="https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&auto=format&fit=crop"
        alt="Clock"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Smartphone,
    name: "Mobile Control",
    description: "Control your fish feeder remotely via Bluetooth or WiFi.",
    href: "/fishfeed-demo",
    cta: "Learn more",
    background: (
      <img 
        className="absolute -right-20 -top-20 opacity-60" 
        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop"
        alt="Mobile"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Gauge,
    name: "Portion Control",
    description: "Precise food dispensing with sensor feedback.",
    href: "/fishfeed-demo",
    cta: "Learn more",
    background: (
      <img 
        className="absolute -right-20 -top-20 opacity-60" 
        src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&auto=format&fit=crop"
        alt="Fish"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Battery,
    name: "Battery Backup",
    description: "Never miss a feeding during power outages.",
    href: "/fishfeed-demo",
    cta: "Learn more",
    background: (
      <img 
        className="absolute -right-20 -top-20 opacity-60" 
        src="https://images.unsplash.com/photo-1609220309174-b0d1dfbee6d0?w=800&auto=format&fit=crop"
        alt="Battery"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Bell,
    name: "Smart Alerts",
    description: "Get real-time notifications for feeding events and system status.",
    href: "/fishfeed-demo",
    cta: "Learn more",
    background: (
      <img 
        className="absolute -right-20 -top-20 opacity-60" 
        src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&auto=format&fit=crop"
        alt="Alerts"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="flex w-full h-screen justify-center items-center">
        <HeroSection />
      </div>
      
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            FishFeed Arduino Features
          </h2>
          <p className="text-gray-400 text-lg">
            Smart aquarium automation with Arduino and mobile app integration
          </p>
        </div>
        
        <BentoGrid className="lg:grid-rows-3">
          {fishFeedFeatures.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
