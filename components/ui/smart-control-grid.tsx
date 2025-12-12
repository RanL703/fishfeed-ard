"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Mic, Hand, Wifi, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  glowColor: string;
  delay?: number;
}

const ControlCard: React.FC<ControlCardProps> = ({
  icon,
  title,
  description,
  tags,
  gradient,
  glowColor,
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-2xl opacity-0 blur-xl transition-opacity duration-500",
          glowColor,
          isHovered && "opacity-40"
        )}
      />

      <div
        className={cn(
          "relative flex flex-col h-full p-6 rounded-2xl overflow-hidden",
          "bg-white/[0.03] backdrop-blur-xl",
          "border border-white/[0.08]",
          "transition-all duration-500",
          isHovered && "bg-white/[0.06] border-white/[0.15]"
        )}
      >
        {/* Background gradient */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-500",
            gradient,
            isHovered && "opacity-100"
          )}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
              "bg-white/[0.08] backdrop-blur-sm border border-white/[0.1]"
            )}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={cn(
                  "px-3 py-1 text-xs font-mono rounded-full",
                  "bg-white/[0.05] text-gray-300 border border-white/[0.08]",
                  "transition-all duration-300",
                  isHovered && "bg-white/[0.1] border-white/[0.15]"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow indicator */}
        <motion.div
          animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.5 }}
          className="absolute bottom-6 right-6"
        >
          <ChevronRight className="w-5 h-5 text-white/50" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const SmartControlGrid: React.FC = () => {
  const controls = [
    {
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      title: "Mobile App Control",
      description:
        "Full remote access with real-time dashboard. Schedule feeds, monitor status, and adjust portions from anywhere in the world.",
      tags: ["ThingSpeak", "Real-time"],
      gradient: "bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/5",
      glowColor: "bg-blue-500",
    },
    {
      icon: <Mic className="w-6 h-6 text-purple-400" />,
      title: "Voice Activation",
      description:
        "Hands-free control with >95% success rate. Simply speak to feed your fish instantly without touching your phone.",
      tags: ["Google Assistant", "Alexa"],
      gradient: "bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/5",
      glowColor: "bg-purple-500",
    },
    {
      icon: <Hand className="w-6 h-6 text-emerald-400" />,
      title: "Physical Button",
      description:
        "One-touch manual override for instant feeding. Perfect for guests or when you want direct tactile control.",
      tags: ["Feed Now", "Override", "Tactile"],
      gradient: "bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/5",
      glowColor: "bg-emerald-500",
    },
  ];

  return (
    <section id="smart-control" className="relative w-full py-24 px-8 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-sm font-medium text-gray-300">
            <Wifi className="w-4 h-4 text-blue-400" />
            Zero Human Dependency
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Smart Control
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three intuitive ways to control your automated fish feeder.
            IoT-driven dispensing that works on your terms.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {controls.map((control, index) => (
            <ControlCard key={control.title} {...control} delay={index * 0.1} />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </section>
  );
};

/*
═══════════════════════════════════════════════════════════════════════════════
IMAGE GENERATION PROMPT - Smart Control Visual
═══════════════════════════════════════════════════════════════════════════════

PROMPT FOR AI IMAGE GENERATION:

"Sleek 3D render of a modern smartphone floating at a slight angle, displaying 
a dark mode IoT dashboard interface with glowing cyan/blue data visualizations 
and control buttons. Next to it, a Google Home Mini speaker and an Amazon Echo 
Dot rendered in matte white with subtle ambient lighting. The devices are 
arranged on an invisible reflective surface. Background is pure black (#000000) 
with subtle blue and purple gradient light rays emanating from behind the 
devices. Cinematic lighting with soft rim light on the edges. Ultra-realistic 
materials with glass and metal textures. 8K resolution, octane render, 
volumetric lighting, depth of field blur on edges."

STYLE KEYWORDS: Raycast aesthetic, dark mode, high contrast, neon accents, 
floating 3D objects, glass morphism, tech product photography, futuristic UI

═══════════════════════════════════════════════════════════════════════════════
*/

export default SmartControlGrid;
