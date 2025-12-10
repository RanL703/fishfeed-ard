import {
  Clock,
  Smartphone,
  Gauge,
  Wifi,
  Battery,
  Droplets,
  Calendar,
  Bell,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: Clock,
    name: "Automated Scheduling",
    description: "Set precise feeding times with Arduino-controlled servo motor. Feed your fish up to 6 times daily with customizable portions.",
    href: "/",
    cta: "Configure Schedule",
    background: (
      <img 
        className="absolute -right-20 -top-20 opacity-60" 
        src="https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&auto=format&fit=crop"
        alt="Clock background"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Smartphone,
    name: "Mobile App Control",
    description: "Control your fish feeder remotely via Bluetooth or WiFi. Manual feed, adjust schedules, and monitor from anywhere.",
    href: "/",
    cta: "Open App",
    background: (
      <img 
        className="absolute -right-20 -top-20 opacity-60" 
        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop"
        alt="Mobile app background"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Gauge,
    name: "Portion Control",
    description: "Precise food dispensing with sensor feedback. Prevent overfeeding and maintain optimal fish health with Arduino sensors.",
    href: "/",
    cta: "Set Portions",
    background: (
      <img 
        className="absolute -right-20 -top-20 opacity-60" 
        src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&auto=format&fit=crop"
        alt="Fish feeding background"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Battery,
    name: "Battery Backup",
    description: "Integrated power management with rechargeable battery. Never miss a feeding even during power outages.",
    href: "/",
    cta: "View Status",
    background: (
      <img 
        className="absolute -right-20 -top-20 opacity-60" 
        src="https://images.unsplash.com/photo-1609220309174-b0d1dfbee6d0?w=800&auto=format&fit=crop"
        alt="Battery background"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Bell,
    name: "Smart Notifications",
    description:
      "Get real-time alerts for feeding completion, low food levels, system errors, and battery status directly to your phone.",
    href: "/",
    cta: "Manage Alerts",
    background: (
      <img 
        className="absolute -right-20 -top-20 opacity-60" 
        src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&auto=format&fit=crop"
        alt="Notifications background"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function FishFeedDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
            <Wifi className="w-4 h-4" />
            Arduino-Powered Smart Feeder
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            FishFeed Arduino
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Intelligent fish feeding system powered by Arduino microcontroller. 
            Control feeding schedules, monitor food levels, and manage your aquarium from your smartphone.
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-3 mb-12">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Water Quality Monitor
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Optional pH and temperature sensors for complete aquarium monitoring (coming soon).
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Feeding History
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Track all feeding events with timestamps stored on Arduino EEPROM memory.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Wifi className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                IoT Connectivity
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              ESP8266/ESP32 WiFi module integration for remote monitoring and control.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-3">Hardware Components</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Arduino Uno/Nano • Servo Motor SG90 • ESP8266 WiFi Module • 
            LCD Display • RTC Module • Ultrasonic Sensor • Power Supply Unit
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              View Documentation
            </button>
            <button className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors border border-blue-500">
              Download Arduino Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
