"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Target, Activity, Wifi, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  maxValue: number;
  label: string;
  unit: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  delay?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  maxValue,
  label,
  unit,
  icon,
  color,
  glowColor,
  delay = 0,
}) => {
  const [isInView, setIsInView] = useState(false);
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45

  const progress = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    if (isInView) {
      progress.set(percentage);
    }
  }, [isInView, percentage, progress]);

  const strokeDashoffset = useTransform(
    progress,
    [0, 100],
    [circumference, 0]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsInView(true)}
      className="relative flex flex-col items-center"
    >
      {/* Glow effect */}
      <div
        className={cn(
          "absolute w-32 h-32 rounded-full blur-2xl opacity-20",
          glowColor
        )}
      />

      {/* SVG Ring */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          {/* Progress ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon}
          <span className="text-white text-2xl font-bold font-mono mt-1">
            {value}
          </span>
          <span className="text-gray-500 text-xs font-mono">{unit}</span>
        </div>
      </div>

      {/* Label */}
      <p className="mt-4 text-gray-400 text-sm text-center">{label}</p>
    </motion.div>
  );
};

interface BarMetricProps {
  label: string;
  value: number;
  maxValue: number;
  displayValue: string;
  color: string;
  delay?: number;
}

const BarMetric: React.FC<BarMetricProps> = ({
  label,
  value,
  maxValue,
  displayValue,
  color,
  delay = 0,
}) => {
  const percentage = (value / maxValue) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-sm">{label}</span>
        <span className="text-white font-mono font-semibold">{displayValue}</span>
      </div>
      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </motion.div>
  );
};

const ParticleField: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ x: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random values only on client side to avoid hydration mismatch
    setParticles(
      [...Array(20)].map(() => ({
        x: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/30"
          initial={{
            x: particle.x + "%",
            y: "100%",
            opacity: 0,
          }}
          animate={{
            y: "-10%",
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export const PerformanceMetrics: React.FC = () => {
  const circularMetrics = [
    {
      value: 95,
      maxValue: 100,
      label: "Feed Accuracy",
      unit: "±5%",
      icon: <Target className="w-5 h-5 text-emerald-400" />,
      color: "#10B981",
      glowColor: "bg-emerald-500",
    },
    {
      value: 100,
      maxValue: 100,
      label: "System Uptime",
      unit: "7-Day Test",
      icon: <Activity className="w-5 h-5 text-blue-400" />,
      color: "#3B82F6",
      glowColor: "bg-blue-500",
    },
    {
      value: 20,
      maxValue: 30,
      label: "Wireless Range",
      unit: "meters",
      icon: <Wifi className="w-5 h-5 text-purple-400" />,
      color: "#8B5CF6",
      glowColor: "bg-purple-500",
    },
  ];

  const barMetrics = [
    {
      label: "Voice Command Success Rate",
      value: 95,
      maxValue: 100,
      displayValue: ">95%",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      label: "Motor Response Latency",
      value: 98,
      maxValue: 100,
      displayValue: "~2 sec",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      label: "Energy Efficiency",
      value: 95,
      maxValue: 100,
      displayValue: "<5W",
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="relative w-full py-24 px-8 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />
      <ParticleField />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-sm font-medium text-gray-300">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Lab Tested & Verified
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Performance Metrics
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every metric validated through rigorous 7-day stress testing.
            Built for reliability you can count on.
          </p>
        </motion.div>

        {/* Circular Progress Rings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {circularMetrics.map((metric, index) => (
            <CircularProgress key={metric.label} {...metric} delay={index * 0.15} />
          ))}
        </div>

        {/* Bar Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={cn(
            "p-8 rounded-2xl",
            "bg-white/[0.02] border border-white/[0.05]"
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barMetrics.map((metric, index) => (
              <BarMetric key={metric.label} {...metric} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Stats highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { stat: "±5%", label: "Dispensing Accuracy" },
            { stat: "100%", label: "Reliability Score" },
            { stat: "20m", label: "Indoor Range" },
            { stat: "<5W", label: "Power Draw" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={cn(
                "text-center p-4 rounded-xl",
                "bg-white/[0.02] border border-white/[0.05]"
              )}
            >
              <p className="text-2xl md:text-3xl font-bold font-mono text-white">
                {item.stat}
              </p>
              <p className="text-gray-500 text-xs mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/*
═══════════════════════════════════════════════════════════════════════════════
IMAGE GENERATION PROMPT - Performance & Data Visualization
═══════════════════════════════════════════════════════════════════════════════

PROMPT FOR AI IMAGE GENERATION:

"Abstract data visualization artwork representing precision and flow. Thousands 
of small glowing particles forming smooth flowing streams against a pure black 
background. Particles transitioning from cyan (#00E5FF) to purple (#8B5CF6) to 
pink (#EC4899) as they flow.

The particle streams form abstract shapes suggesting:
1. A circular target/crosshair pattern (representing accuracy)
2. Wave patterns (representing consistent flow)
3. Connecting network nodes (representing reliability)

Style: Minimalist, high contrast, procedural art aesthetic. Particles have 
motion blur trails suggesting movement. Some particles larger and brighter 
as focal points. Subtle depth of field with particles in foreground slightly 
blurred.

Background: Pure black (#000000) with very subtle dark blue gradient in center.
Lighting: Self-illuminated particles, no external light source.
Resolution: 8K, suitable for hero background image."

STYLE KEYWORDS: Particle system, data visualization, abstract art, flow field, 
generative art, dark mode, neon particles, precision aesthetics

═══════════════════════════════════════════════════════════════════════════════
*/

export default PerformanceMetrics;
