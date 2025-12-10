"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  Mic,
  Gauge,
  Camera,
  Sun,
  Brain,
  ChevronRight,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "complete" | "current" | "upcoming";
  quarter?: string;
  features?: string[];
  delay?: number;
  isLast?: boolean;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({
  icon,
  title,
  description,
  status,
  quarter,
  features,
  delay = 0,
  isLast = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    complete: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      glow: "bg-emerald-500",
      text: "text-emerald-400",
      line: "from-emerald-500/50",
    },
    current: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      glow: "bg-blue-500",
      text: "text-blue-400",
      line: "from-blue-500/50",
    },
    upcoming: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      glow: "bg-purple-500",
      text: "text-purple-400",
      line: "from-purple-500/30",
    },
  };

  const colors = statusColors[status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative flex gap-6"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-[calc(100%-2rem)]">
          <div
            className={cn(
              "w-full h-full bg-gradient-to-b to-transparent",
              colors.line
            )}
          />
          {/* Animated pulse */}
          {status === "current" && (
            <motion.div
              animate={{ y: [0, 100], opacity: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-8 rounded-full bg-blue-500/50 blur-sm"
            />
          )}
        </div>
      )}

      {/* Node */}
      <div className="relative flex-shrink-0">
        {/* Glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-xl opacity-30 transition-opacity duration-500",
            colors.glow,
            isHovered && "opacity-50"
          )}
        />
        {/* Circle */}
        <motion.div
          animate={
            status === "current" ? { scale: [1, 1.1, 1] } : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
          className={cn(
            "relative w-12 h-12 rounded-full flex items-center justify-center",
            colors.bg,
            "border-2",
            colors.border
          )}
        >
          {status === "complete" ? (
            <CheckCircle className={cn("w-5 h-5", colors.text)} />
          ) : status === "current" ? (
            <Clock className={cn("w-5 h-5", colors.text)} />
          ) : (
            <Sparkles className={cn("w-5 h-5", colors.text)} />
          )}
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "flex-1 p-6 rounded-2xl mb-8",
          "bg-white/[0.02] border border-white/[0.05]",
          "transition-all duration-300",
          isHovered && "bg-white/[0.04] border-white/[0.1]"
        )}
      >
        {/* Status badge */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider",
              colors.bg,
              colors.text,
              "border",
              colors.border
            )}
          >
            {status === "complete"
              ? "Shipped"
              : status === "current"
              ? "In Progress"
              : quarter || "Upcoming"}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              "bg-white/[0.05] border border-white/[0.08]"
            )}
          >
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Features list */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <span
                key={index}
                className={cn(
                  "px-3 py-1 text-xs rounded-full",
                  "bg-white/[0.03] text-gray-400 border border-white/[0.05]"
                )}
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Arrow */}
        <motion.div
          animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.3 }}
          className="absolute top-6 right-6"
        >
          <ChevronRight className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const EvolutionRoadmap: React.FC = () => {
  const roadmapItems = [
    {
      icon: <Wifi className="w-4 h-4 text-emerald-400" />,
      title: "IoT Remote Control",
      description:
        "Full wireless control via Blynk and ThingSpeak platforms. Monitor and manage your feeder from anywhere with internet access.",
      status: "complete" as const,
      features: ["WiFi Enabled", "Mobile Dashboard", "Real-time Status"],
    },
    {
      icon: <Mic className="w-4 h-4 text-emerald-400" />,
      title: "Voice Activation",
      description:
        "Hands-free control integrated with Google Assistant and Amazon Alexa through IFTTT automation recipes.",
      status: "complete" as const,
      features: ["Google Assistant", "Alexa", ">95% Accuracy"],
    },
    {
      icon: <Gauge className="w-4 h-4 text-blue-400" />,
      title: "Smart Feed Sensors",
      description:
        "Ultrasonic sensors to monitor food levels in real-time. Get automatic low-food alerts before you run out.",
      status: "current" as const,
      features: ["Level Detection", "Push Alerts", "Usage Analytics"],
    },
    {
      icon: <Camera className="w-4 h-4 text-purple-400" />,
      title: "Camera Module",
      description:
        "ESP32-CAM integration for real-time video monitoring. Watch your fish feed from anywhere in the world.",
      status: "upcoming" as const,
      quarter: "Q2 2025",
      features: ["Live Stream", "Snapshot Capture", "Cloud Storage"],
    },
    {
      icon: <Sun className="w-4 h-4 text-purple-400" />,
      title: "Solar Power Option",
      description:
        "Self-sustaining power for outdoor ponds and remote installations. Zero grid dependency with intelligent power management.",
      status: "upcoming" as const,
      quarter: "Q3 2025",
      features: ["Solar Panel", "Battery Backup", "Outdoor Ready"],
    },
    {
      icon: <Brain className="w-4 h-4 text-purple-400" />,
      title: "AI Portion Control",
      description:
        "Machine learning algorithms that adapt feeding portions based on fish activity, temperature, and historical patterns.",
      status: "upcoming" as const,
      quarter: "Q4 2025",
      features: ["Adaptive Learning", "Fish Recognition", "Optimal Feeding"],
    },
  ];

  return (
    <section className="relative w-full py-24 px-8 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-sm font-medium text-gray-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Product Evolution
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Roadmap
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From IoT basics to AI-powered intelligence. Here&apos;s what we&apos;ve built
            and where we&apos;re heading.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {roadmapItems.map((item, index) => (
            <RoadmapItem
              key={item.title}
              {...item}
              delay={index * 0.1}
              isLast={index === roadmapItems.length - 1}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            Want to influence our roadmap?
          </p>
          <button
            className={cn(
              "px-6 py-3 rounded-full font-medium text-sm",
              "bg-white/[0.05] text-white border border-white/[0.1]",
              "hover:bg-white/[0.1] hover:border-white/[0.2]",
              "transition-all duration-300"
            )}
          >
            Share Feedback
          </button>
        </motion.div>
      </div>
    </section>
  );
};

/*
═══════════════════════════════════════════════════════════════════════════════
IMAGE GENERATION PROMPT - Roadmap Feature Icons
═══════════════════════════════════════════════════════════════════════════════

PROMPT FOR AI IMAGE GENERATION:

"Set of three futuristic icons in glass-morphism style against pure black 
background, arranged horizontally with space between them:

ICON 1 - SOLAR: 
Stylized sun with geometric rays, rendered as frosted glass with soft yellow 
(#FBBF24) to orange (#F59E0B) gradient fill. Subtle inner light glow. Thin 
white highlight on top edge suggesting glass reflection.

ICON 2 - AI EYE:
Minimalist eye shape with circular iris containing neural network pattern. 
Frosted glass material with cyan (#06B6D4) to blue (#3B82F6) gradient. 
Scanning line animation effect (horizontal light beam across the eye).

ICON 3 - SENSORS:
Three horizontal bars with rounded ends (representing ultrasonic waves) 
emanating from a small circle. Frosted glass with emerald (#10B981) to 
teal (#14B8A6) gradient. Subtle pulse/ripple effect around the waves.

All icons:
- 200x200px each
- Frosted glass material with 50% translucency
- Soft drop shadow (black, 20% opacity, 20px blur)
- Thin white (10% opacity) border
- Subtle background blur effect behind each icon
- Floating slightly above a dark reflective surface

Style: Glass-morphism, iOS-style icons, futuristic, premium feel"

STYLE KEYWORDS: Glass morphism, frosted glass, icon design, futuristic UI, 
dark mode icons, gradient fills, translucent materials, premium iconography

═══════════════════════════════════════════════════════════════════════════════
*/

export default EvolutionRoadmap;
