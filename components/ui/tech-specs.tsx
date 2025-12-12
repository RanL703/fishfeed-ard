"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Clock, Radio, ChevronRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpecItemProps {
  label: string;
  value: string;
  unit?: string;
  icon: React.ReactNode;
  delay?: number;
}

const SpecItem: React.FC<SpecItemProps> = ({
  label,
  value,
  unit,
  icon,
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl",
        "bg-white/[0.02] border border-white/[0.05]",
        "transition-all duration-300",
        isHovered && "bg-white/[0.05] border-white/[0.1]"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          "bg-white/[0.05] border border-white/[0.08]",
          "transition-all duration-300",
          isHovered && "bg-white/[0.1]"
        )}
      >
        {icon}
      </div>

      {/* Label & Value */}
      <div className="flex-1">
        <p className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-1">
          {label}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-white text-lg font-mono font-semibold">
            {value}
          </span>
          {unit && <span className="text-gray-500 text-sm font-mono">{unit}</span>}
        </div>
      </div>

      {/* Indicator */}
      <motion.div
        animate={{ x: isHovered ? 0 : -4, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronRight className="w-4 h-4 text-white/30" />
      </motion.div>
    </motion.div>
  );
};

const CodeBlock: React.FC = () => {
  return (
    <div className="relative">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.05] rounded-t-xl">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-gray-500 text-xs font-mono ml-2">
          hardware_config.h
        </span>
      </div>

      {/* Code content */}
      <div className="p-4 bg-white/[0.02] rounded-b-xl font-mono text-sm overflow-x-auto">
        <pre className="text-gray-300">
          <code>
            <span className="text-purple-400">#define</span>{" "}
            <span className="text-blue-400">MCU</span>{" "}
            <span className="text-emerald-400">&quot;NodeMCU ESP8266&quot;</span>
            {"\n"}
            <span className="text-purple-400">#define</span>{" "}
            <span className="text-blue-400">RELAY_MODULE</span>{" "}
            <span className="text-yellow-400">5V</span>
            {"\n"}
            <span className="text-purple-400">#define</span>{" "}
            <span className="text-blue-400">MOTOR_TYPE</span>{" "}
            <span className="text-emerald-400">&quot;DC_MOTOR&quot;</span>
            {"\n"}
            <span className="text-purple-400">#define</span>{" "}
            <span className="text-blue-400">POWER_CONSUMPTION</span>{" "}
            <span className="text-yellow-400">5</span>{" "}
            <span className="text-gray-500">// Watts</span>
            {"\n"}
            <span className="text-purple-400">#define</span>{" "}
            <span className="text-blue-400">RESPONSE_TIME</span>{" "}
            <span className="text-yellow-400">2000</span>{" "}
            <span className="text-gray-500">// ms</span>
            {"\n\n"}
            <span className="text-gray-500">// WiFi Configuration</span>
            {"\n"}
            <span className="text-purple-400">const char</span>*{" "}
            <span className="text-blue-400">WIFI_RANGE</span> ={" "}
            <span className="text-emerald-400">&quot;20m_indoor&quot;</span>;
            {"\n"}
            <span className="text-purple-400">const float</span>{" "}
            <span className="text-blue-400">ACCURACY</span> ={" "}
            <span className="text-yellow-400">0.95</span>;{" "}
            <span className="text-gray-500">// ±5%</span>
          </code>
        </pre>
      </div>
    </div>
  );
};

const CircuitDiagram: React.FC = () => {
  return (
    <div className="relative h-full min-h-[300px] flex items-center justify-center">
      {/* Central MCU */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        viewport={{ once: true }}
        className="absolute w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 flex items-center justify-center"
      >
        <Cpu className="w-10 h-10 text-blue-400" />
        <div className="absolute -bottom-8 text-xs font-mono text-gray-400">
          ESP8266
        </div>
      </motion.div>

      {/* Connection lines */}
      {[
        { angle: -45, label: "RELAY", color: "from-yellow-500/50" },
        { angle: 45, label: "MOTOR", color: "from-emerald-500/50" },
        { angle: -135, label: "POWER", color: "from-red-500/50" },
        { angle: 135, label: "WiFi", color: "from-purple-500/50" },
      ].map((conn, i) => (
        <motion.div
          key={conn.label}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
          viewport={{ once: true }}
          className="absolute"
          style={{
            transform: `rotate(${conn.angle}deg) translateX(100px)`,
          }}
        >
          {/* Line */}
          <div
            className={cn(
              "absolute w-16 h-0.5 -left-16 top-1/2 -translate-y-1/2",
              "bg-gradient-to-r to-transparent",
              conn.color
            )}
          />
          {/* Node */}
          <div
            className={cn(
              "w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1]",
              "flex items-center justify-center"
            )}
            style={{ transform: `rotate(${-conn.angle}deg)` }}
          >
            <span className="text-[10px] font-mono text-gray-400">
              {conn.label}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Animated pulse rings */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-24 h-24 rounded-2xl border border-blue-500/20"
      />
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className="absolute w-24 h-24 rounded-2xl border border-blue-500/10"
      />
    </div>
  );
};

export const TechSpecs: React.FC = () => {
  const specs = [
    {
      label: "Microcontroller",
      value: "NodeMCU",
      unit: "ESP8266",
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
    },
    {
      label: "Actuation System",
      value: "DC Motor",
      unit: "+ Relay",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
    },
    {
      label: "Power Draw",
      value: "< 5",
      unit: "Watts",
      icon: <Radio className="w-5 h-5 text-emerald-400" />,
    },
    {
      label: "Response Latency",
      value: "~2",
      unit: "seconds",
      icon: <Clock className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <section id="tech-specs" className="relative w-full py-24 px-8 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />
      
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

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
            <Terminal className="w-4 h-4 text-emerald-400" />
            Hardware Specifications
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Under the Hood
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built on battle-tested embedded systems. Every component optimized
            for reliability and energy efficiency.
          </p>
        </motion.div>

        {/* Main Grid - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Specs List */}
          <div className="space-y-4">
            {specs.map((spec, index) => (
              <SpecItem key={spec.label} {...spec} delay={index * 0.1} />
            ))}

            {/* Code Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <CodeBlock />
            </motion.div>
          </div>

          {/* Right - Schematic Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={cn(
              "relative rounded-2xl overflow-hidden",
              "bg-white/[0.02] border border-white/[0.05]",
              "p-8"
            )}
          >
            <CircuitDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
