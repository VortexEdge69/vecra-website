"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MinecraftParticles from "@/components/MinecraftParticles";
import PricingCard from "@/components/PricingCard";
import VpsNotification from "@/components/VpsNotification";
import PricingTabs from "@/components/PricingTabs";
import VpsPricingCard from "@/components/VpsPricingCard";
import FeatureCard from "@/components/FeatureCard";
import FAQItem from "@/components/FAQItem";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { StarterIcon, UltraIcon, VpsStarterIcon, VpsProIcon, VpsUltraIcon } from "@/components/MinecraftIcons";
import { LightningBoltIcon, TerminalIcon, ShieldCheckIcon, GamepadIcon } from "@/components/FeatureIcons";
import { DISCORD_INVITE_LINK } from "@/lib/discord";

export default function Home() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVpsNotification = (email: string) => {
    console.log('VPS notification requested for email:', email);
    // This function is called when a user requests VPS notification
    // The actual email sending is handled by the API route
  };

  // VPS pricing duration selection
  const [selectedDuration, setSelectedDuration] = useState<"monthly" | "yearly" | "twoYear">("twoYear");

  // VPS Plans Configuration
  const vpsPlans = [
    {
      id: "vps-starter",
      name: "VPS Starter",
      specs: {
        cpu: "1 vCPU Core",
        ram: "2 GB RAM",
        storage: "25 GB SSD",
        bandwidth: "1 TB Bandwidth",
        ip: "1 IPv4 Address",
        support: "24/7 Support"
      },
      monthlyPrice: 399,
      yearlyPrice: 3830, // ₹319/mo equivalent
      twoYearPrice: 7176, // ₹299/mo equivalent
      isOutOfStock: false,
      isBestValue: false,
      icon: <VpsStarterIcon />
    },
    {
      id: "vps-basic",
      name: "VPS Basic",
      specs: {
        cpu: "2 vCPU Cores",
        ram: "4 GB RAM",
        storage: "50 GB SSD",
        bandwidth: "2 TB Bandwidth",
        ip: "1 IPv4 Address",
        support: "Priority Support"
      },
      monthlyPrice: 699,
      yearlyPrice: 6708, // ₹559/mo equivalent
      twoYearPrice: 11976, // ₹499/mo equivalent
      isOutOfStock: false,
      isBestValue: false,
      icon: <VpsProIcon />
    },
    {
      id: "vps-pro",
      name: "VPS Pro",
      specs: {
        cpu: "4 vCPU Cores",
        ram: "8 GB RAM",
        storage: "100 GB SSD",
        bandwidth: "4 TB Bandwidth",
        ip: "2 IPv4 Addresses",
        support: "Premium Support"
      },
      monthlyPrice: 949,
      yearlyPrice: 9588, // ₹799/mo equivalent
      twoYearPrice: 17976, // ₹749/mo equivalent
      isOutOfStock: false,
      isBestValue: true,
      icon: <VpsUltraIcon />
    },
    {
      id: "vps-enterprise",
      name: "VPS Enterprise",
      specs: {
        cpu: "8 vCPU Cores",
        ram: "16 GB RAM",
        storage: "200 GB SSD",
        bandwidth: "8 TB Bandwidth",
        ip: "3 IPv4 Addresses",
        support: "24/7 Dedicated Support"
      },
      monthlyPrice: 1399,
      yearlyPrice: 14388, // ₹1199/mo equivalent
      twoYearPrice: 26976, // ₹1124/mo equivalent
      isOutOfStock: false,
      isBestValue: false,
      icon: <VpsUltraIcon />
    }
  ];

  // Check if all plans are out of stock
  const allPlansOutOfStock = vpsPlans.every(plan => plan.isOutOfStock);

  return (
    <>

      {/* Compact Announcement Banner - Between navbar and hero */}
      <div className="pt-16 md:pt-20">
        <AnnouncementBanner />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center bg-black text-white px-6 pt-4 overflow-hidden">
        {/* Minecraft-style particles background */}
        <div className="absolute inset-0 z-0">
          <MinecraftParticles />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent z-10 pointer-events-none" />
        </div>
        
        {/* Minecraft Characters - Parallax Effect */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {/* Steve Character - Left Side */}
          <div 
            className="absolute left-[5%] top-[20%] w-24 h-24 md:w-32 md:h-32 opacity-60 animate-float-slow hidden md:block"
            style={{
              animation: 'float 8s infinite ease-in-out',
              transform: 'translateY(0px)',
            }}
          >
            <Image
              src="/assets/minecraft/steve.svg"
              alt="Minecraft Steve"
              width={128}
              height={128}
              className="w-full h-full"
            />
          </div>
          
          {/* Creeper Character - Right Side */}
          <div 
            className="absolute right-[10%] bottom-[15%] w-20 h-20 md:w-28 md:h-28 opacity-70 animate-float-medium hidden md:block"
            style={{
              animation: 'float 6s infinite ease-in-out reverse',
              transform: 'translateY(0px)',
              animationDelay: '1s',
            }}
          >
            <Image
              src="/assets/minecraft/creeper.svg"
              alt="Minecraft Creeper"
              width={112}
              height={112}
              className="w-full h-full"
            />
          </div>
          
          {/* Zombie Character - Bottom Left */}
          <div 
            className="absolute left-[15%] bottom-[10%] w-16 h-16 md:w-24 md:h-24 opacity-50 animate-float-fast hidden md:block"
            style={{
              animation: 'float 7s infinite ease-in-out',
              transform: 'translateY(0px)',
              animationDelay: '2s',
            }}
          >
            <Image
              src="/assets/minecraft/zombie.svg"
              alt="Minecraft Zombie"
              width={96}
              height={96}
              className="w-full h-full"
            />
          </div>
        </div>
        
        {/* Glassmorphic Card */}
        <div className="relative z-20 max-w-3xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-16 shadow-2xl text-center space-y-6 animate-fade-in">
          <Image
            src="/assets/vecrahost-logofull.svg"
            alt="VecraHost Logo"
            className="mx-auto w-28 h-auto"
            width={112}
            height={112}
            priority
          />
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Lag-Free Minecraft Servers <span className="text-accent">starting at just ₹149/month</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            No queues. No lag. Full control. Instant setup.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a
              href="#free-trial"
              className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition duration-300 text-lg"
              onClick={(e) => handleSmoothScroll(e, 'free-trial')}
            >
              Start Free Trial Now
            </a>
            <a
              href="#minecraft-hosting"
              className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-xl shadow-md hover:bg-[#005fcb] transition duration-300 text-lg"
              onClick={(e) => handleSmoothScroll(e, 'minecraft-hosting')}
            >
              Launch Your Server Now
            </a>
          </div>
        </div>
      </section>

      {/* Free Trial Section */}
      <section
        id="free-trial"
        className="w-full text-white py-16 px-6 my-12 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Try VecraHost For Free
            </h2>
            <p className="text-xl text-gray-300">
              Get a Minecraft server free for 24 hours. No strings attached.
            </p>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="text-green-400 w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Indian Node</span>
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Full Control Panel Access</span>
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Instant Setup</span>
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">No Credit Card Required</span>
                </li>
              </ul>
            </div>
            
            <div className="flex-shrink-0">
              <a
                href={DISCORD_INVITE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-green-700 transition duration-300"
              >
                Join our Discord server
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section
        id="comparison"
        className="w-full bg-transparent text-white py-16 px-6 flex flex-col items-center max-w-7xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          VecraHost vs Other Hosts
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl">
          See why players choose us over other Minecraft hosting providers
        </p>

        <div className="w-full max-w-5xl overflow-x-auto p-6 border border-blue-500/30 rounded-xl shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/10 text-left">
                <th className="p-4 rounded-tl-lg font-bold">Feature</th>
                <th className="p-4 text-blue-400 font-bold border-2 border-blue-500/30">
                  <div className="flex items-center">
                    <Image src="/assets/vecrahost-logo.svg" alt="VecraHost" width={24} height={24} className="h-6 mr-2" />
                    <span className="hidden md:inline">VecraHost</span>
                  </div>
                </th>
                <th className="p-4 rounded-tr-lg font-bold text-gray-400">Other Hosts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="hover:bg-white/5">
                <td className="p-4 font-bold">Queue Time</td>
                <td className="p-4 text-blue-400 font-bold border-x-2 border-blue-500/30">
                  <span>No Queue</span>
                </td>
                <td className="p-4 text-gray-400">Up to 30 minutes</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="p-4 font-bold">Server Control</td>
                <td className="p-4 text-blue-400 font-bold border-x-2 border-blue-500/30">
                  <span>Full Control Panel</span>
                </td>
                <td className="p-4 text-gray-400">Limited Access</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="p-4 font-bold">Uptime</td>
                <td className="p-4 text-blue-400 font-bold border-x-2 border-blue-500/30">
                  <span>99.9% Guaranteed</span>
                </td>
                <td className="p-4 text-gray-400">Variable</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="p-4 font-bold">Performance</td>
                <td className="p-4 text-blue-400 font-bold border-x-2 border-blue-500/30">
                  <span>High-End Hardware</span>
                </td>
                <td className="p-4 text-gray-400">Shared Resources</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="p-4 font-bold">Ping in India</td>
                <td className="p-4 text-blue-400 font-bold border-x-2 border-b-2 border-blue-500/30">
                  <span>&lt;50ms</span>
                </td>
                <td className="p-4 text-gray-400">100-300ms</td>
              </tr>
              <tr>
                <td className="p-0"></td>
                <td className="p-4 text-center">
                  <a
                    href="#minecraft-hosting"
                    onClick={(e) => handleSmoothScroll(e, "minecraft-hosting")}
                    className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition-colors"
                  >
                    Launch Your Server Now
                  </a>
                </td>
                <td className="p-0"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Minecraft Hosting Plans Section */}
      <section
        id="minecraft-hosting"
        className="w-full bg-transparent text-white py-24 px-6 flex flex-col items-center relative overflow-hidden"
      >
        {/* Minecraft Character - Pricing Section */}
        <div className="absolute left-[5%] bottom-[10%] w-20 h-20 md:w-28 md:h-28 opacity-40 animate-float-slow hidden md:block">
          <Image
            src="/assets/minecraft/steve.svg"
            alt="Minecraft Steve"
            width={112}
            height={112}
            className="w-full h-full"
          />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Minecraft Hosting Plans
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl relative z-10">
          Choose a plan that fits your server&apos;s power needs. All plans come with DDoS protection and instant setup.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          <PricingCard
            id="mc-starter"
            type="minecraft"
            title="Starter"
            price="₹149/mo"
            features={[
              "2 GB RAM",
              "1 vCPU",
              "SSD Storage",
              "Perfect for small servers or friends",
              "24/7 Support",
              "Instant Setup"
            ]}
            highlighted={true}
            icon={<StarterIcon />}
          />

          <PricingCard
            id="mc-pro"
            type="minecraft"
            title="Pro"
            price="₹249/mo"
            features={[
              "4 GB RAM",
              "2 vCPU",
              "SSD Storage",
              "For growing survival or SMP servers",
              "24/7 Support",
              "Instant Setup"
            ]}
            highlighted={false}
          />

          <PricingCard
            id="mc-elite"
            type="minecraft"
            title="Elite"
            price="₹399/mo"
            features={[
              "8 GB RAM",
              "4 vCPU",
              "SSD/NVMe Storage",
              "Ideal for modded or public servers",
              "24/7 Support",
              "Instant Setup"
            ]}
            highlighted={false}
            icon={<UltraIcon />}
          />
        </div>
        <div className="mt-6 w-full flex justify-center">
          <div className="justify-self-center self-start w-fit inline-flex flex-col bg-accent/10 border border-accent/40 rounded-xl p-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Didn’t find a plan that fits?</h3>
              <p className="text-lg md:text-2xl text-gray-200">We’ll tailor a custom Minecraft plan to your needs.</p>
            </div>
            <Link href="/custom-plan?type=minecraft" className="mt-3 inline-flex items-center justify-center text-center px-5 py-3 bg-accent text-white font-bold rounded-lg shadow-md hover:bg-[#005fcb] transition-colors">
              Request Custom Plan
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white">Trusted by 50+ players and powering 20+ active servers</span>
          </div>
        </div>

        <a
          href="#vps-hosting"
          onClick={(e) => handleSmoothScroll(e, "vps-hosting")}
          className="mt-12 inline-block px-6 py-3 bg-accent text-white font-semibold rounded-xl shadow-md hover:bg-[#005fcb] transition-colors duration-200"
        >
          Go to Minecraft Panel
        </a>
      </section>

      {/* VPS Hosting Plans Section */}
      <section
        id="vps-hosting"
        className="w-full bg-transparent text-white py-24 px-6 flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          VPS Hosting Plans
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl">
          Scalable virtual servers with full control, built for power users and projects that demand performance.
        </p>
        {/* Duration selector when plans are available */}
        {!allPlansOutOfStock && (
          <PricingTabs selectedDuration={selectedDuration} onDurationChange={setSelectedDuration} />
        )}

        {/* Show notification when all plans are out of stock */}
        {allPlansOutOfStock && (
          <VpsNotification onNotify={handleVpsNotification} />
        )}

        {/* VPS pricing: unified list for mobile/tablet; centered remainder on desktop */}
        {(() => {
          const items = [
            ...vpsPlans.map((plan) => ({ type: "plan" as const, plan })),
            { type: "cta" as const },
          ]

          // Mobile/tablet: single continuous grid
          const mobileList = (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:hidden max-w-7xl w-full">
              {items.map((item, idx) => (
                item.type === "plan" ? (
                  <VpsPricingCard key={item.plan.id} plan={item.plan} selectedDuration={selectedDuration} />
                ) : (
                  <div key={`cta-m-${idx}`} className="justify-self-center self-start w-fit inline-flex flex-col bg-accent/10 border border-accent/40 rounded-xl p-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Didn’t find a plan that fits?</h3>
                      <p className="text-lg md:text-2xl text-gray-200">We’ll tailor a custom VPS plan to your needs.</p>
                    </div>
                    <Link href="/custom-plan?type=vps" className="mt-3 inline-flex items-center justify-center text-center px-5 py-3 bg-accent text-white font-bold rounded-lg shadow-md hover:bg-[#005fcb] transition-colors">
                      Request Custom Plan
                    </Link>
                  </div>
                )
              ))}
            </div>
          )

          // Desktop: 3-column rows with centered last remainder row
          const fullRowsCount = Math.floor(items.length / 3)
          const remainder = items.length % 3
          const fullRowsItems = items.slice(0, fullRowsCount * 3)
          const lastRowItems = items.slice(fullRowsCount * 3)

          const desktopList = (
            <div className="hidden lg:block w-full max-w-7xl">
              {fullRowsCount > 0 && (
                <div className="grid grid-cols-3 gap-8">
                  {fullRowsItems.map((item, idx) => (
                    item.type === "plan" ? (
                      <VpsPricingCard key={item.plan.id} plan={item.plan} selectedDuration={selectedDuration} />
                    ) : (
                      <div key={`cta-${idx}`} className="justify-self-center self-start w-fit inline-flex flex-col bg-accent/10 border border-accent/40 rounded-xl p-4">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Didn’t find a plan that fits?</h3>
                          <p className="text-lg md:text-2xl text-gray-200">We’ll tailor a custom VPS plan to your needs.</p>
                        </div>
                        <Link href="/custom-plan?type=vps" className="mt-3 inline-flex items-center justify-center text-center px-5 py-3 bg-accent text-white font-bold rounded-lg shadow-md hover:bg-[#005fcb] transition-colors">
                          Request Custom Plan
                        </Link>
                      </div>
                    )
                  ))}
                </div>
              )}

              {remainder > 0 && (
                <div className={`grid gap-8 ${remainder === 1 ? "grid-cols-1" : "grid-cols-2"} w-fit mx-auto mt-8`}>
                  {lastRowItems.map((item, idx) => (
                    item.type === "plan" ? (
                      <VpsPricingCard key={item.plan.id} plan={item.plan} selectedDuration={selectedDuration} />
                    ) : (
                      <div key={`cta-last-${idx}`} className="justify-self-center self-start w-fit inline-flex flex-col bg-accent/10 border border-accent/40 rounded-xl p-4">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Didn’t find a plan that fits?</h3>
                          <p className="text-lg md:text-2xl text-gray-200">We’ll tailor a custom VPS plan to your needs.</p>
                        </div>
                        <Link href="/custom-plan?type=vps" className="mt-3 inline-flex items-center justify-center text-center px-5 py-3 bg-accent text-white font-bold rounded-lg shadow-md hover:bg-[#005fcb] transition-colors">
                          Request Custom Plan
                        </Link>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          )

          return (
            <>
              {mobileList}
              {desktopList}
            </>
          )
        })()}

        <a
          href="#vps-hosting"
          onClick={(e) => handleSmoothScroll(e, "vps-hosting")}
          className="mt-12 inline-block px-6 py-3 bg-accent text-white font-semibold rounded-xl shadow-md hover:bg-[#005fcb] transition-colors duration-200"
        >
          View VPS Plans
        </a>
      </section>

      {/* Why VecraHost? Features Section */}
      <section
        id="features"
        className="w-full bg-transparent text-white py-24 px-6 flex flex-col items-center relative overflow-hidden"
      >
        {/* Minecraft Character - Features Section */}
        <div className="absolute right-0 top-10 w-20 h-20 md:w-28 md:h-28 opacity-40 animate-float-medium hidden md:block">
          <Image
            src="/assets/minecraft/creeper.svg"
            alt="Minecraft Creeper"
            width={112}
            height={112}
            className="w-full h-full"
          />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Why Choose VecraHost?
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl">
          Here&apos;s what makes our hosting powerful, scalable, and gamer-friendly.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 w-full max-w-4xl">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 flex items-center">
            <div className="mr-3 text-green-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span>50+ Active Players</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 flex items-center">
            <div className="mr-3 text-green-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span>20+ Active Servers</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 flex items-center">
            <div className="mr-3 text-green-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span>99.9% Uptime</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 flex items-center">
            <div className="mr-3 text-green-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span>24/7 Support</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
          <FeatureCard
            icon={<LightningBoltIcon />}
            title="Instant Setup"
            description="Servers are deployed and ready to go within seconds of ordering."
          />

          <FeatureCard
            icon={<TerminalIcon />}
            title="Powerful Control Panels"
            description="Easily manage Minecraft or VPS servers with modern web UIs."
          />

          <FeatureCard
            icon={<ShieldCheckIcon />}
            title="DDoS Protection"
            description="All servers are protected with enterprise-level mitigation."
          />

          <FeatureCard
            icon={<GamepadIcon />}
            title="Optimized for Gamers"
            description="Low latency and high uptime, ideal for Minecraft and game servers."
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="w-full bg-transparent text-white py-24 px-6 flex flex-col items-center relative overflow-hidden"
      >
        {/* Parallax Background Effect */}
        <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
          <div className="absolute inset-0 w-full h-[200%] animate-parallax">
            <div className="grid grid-cols-6 gap-8 opacity-20">
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} className="w-full aspect-square bg-white/10 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Minecraft Character - Testimonials */}
        <div className="absolute right-[8%] top-[15%] w-16 h-16 md:w-24 md:h-24 opacity-30 animate-float-medium hidden md:block">
          <Image
            src="/assets/minecraft/zombie.svg"
            alt="Minecraft Zombie"
            width={96}
            height={96}
            className="w-full h-full"
          />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 relative z-10">
          What Our Users Say
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl relative z-10">
          Real feedback from real players and customers who trusted VecraHost.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white font-bold text-xl">
                R
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-white">Rohit</h4>
                <p className="text-sm text-gray-400">Minecraft Player</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 flex-grow">
              &quot;VecraHost is the smoothest server I&apos;ve ever played on. Zero lag and super fast support!&quot;
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-white">Akshay</h4>
                <p className="text-sm text-gray-400">VPS User</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 flex-grow">
              &quot;I host my modded Minecraft server here — no downtime, and full SFTP access is gold!&quot;
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-400 flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-white">Srinivas</h4>
                <p className="text-sm text-gray-400">Server Admin</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 flex-grow">
              &quot;The control panel is simple and powerful. Setup took just minutes. Highly recommend Vecra!&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Discord Community Section */}
      <section
        id="discord"
        className="w-full text-white py-16 px-6 my-12 max-w-7xl mx-auto relative overflow-hidden"
      >
        {/* Minecraft Character - Discord Section */}
        <div className="absolute left-[10%] top-[20%] w-16 h-16 md:w-24 md:h-24 opacity-30 animate-float-fast hidden md:block">
          <Image
            src="/assets/minecraft/creeper.svg"
            alt="Minecraft Creeper"
            width={96}
            height={96}
            className="w-full h-full transform rotate-12"
          />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 relative z-10">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Gaming Community
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl">
              Connect with other players, get support, and stay updated on the latest news and events. Our Discord server is the perfect place to find teammates and share your gaming experiences.
            </p>
            <a
              href={DISCORD_INVITE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-xl shadow-md hover:bg-[#005fcb] transition-colors duration-200"
            >
              Join our Discord server to get your server
            </a>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-xs">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-bold text-white">VecraHost</h4>
                  <p className="text-xs text-gray-400">Official Server</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span>Active Community</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="w-full bg-transparent text-white py-24 px-6 flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl">
          Got questions? We&apos;ve got answers.
        </p>

        <div className="max-w-3xl w-full">
          <FAQItem
            question="Is Minecraft hosting free?"
            answer="We offer limited-time free trials, but full hosting starts at ₹149/mo with full features."
          />
          <FAQItem
            question="Do you support Pocket Edition (Bedrock)?"
            answer="Yes! VecraHost fully supports crossplay between Java and Bedrock Editions."
          />
          <FAQItem
            question="When will VPS control panel be available?"
            answer="Our VPS panel is under development and expected to launch publicly within a few weeks."
          />
          <FAQItem
            question="Can I upgrade my plan anytime?"
            answer="Yes, you can upgrade or downgrade your plan anytime from your control panel."
          />
          <FAQItem
            question="Where do I access my Minecraft?"
            answer="Use the &apos;Go to Panel&apos; buttons above, or visit panel.vecrahost.in for Minecraft"
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-20 px-6 bg-white/5 backdrop-blur-md border-y border-white/10 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Launch Your Server?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl">
          Start hosting your Minecraft or VPS server in just a few clicks. Easy setup, great performance, gamer-approved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://panel.vecrahost.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-accent hover:bg-[#005fcb] text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            Get Started - Minecraft Hosting
          </a>
          <a
            href="#vps-hosting"
            onClick={(e) => handleSmoothScroll(e, 'vps-hosting')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg shadow-inner transition-colors duration-200"
          >
            View VPS Plans
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
