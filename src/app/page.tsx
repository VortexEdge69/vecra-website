"use client";
import Image from "next/image";
import MinecraftParticles from "@/components/MinecraftParticles";
import PricingCard from "@/components/PricingCard";
import VpsNotification from "@/components/VpsNotification";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQItem from "@/components/FAQItem";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { StarterIcon, UltraIcon, VpsStarterIcon, VpsProIcon, VpsUltraIcon } from "@/components/MinecraftIcons";
import { LightningBoltIcon, TerminalIcon, ShieldCheckIcon, GamepadIcon } from "@/components/FeatureIcons";

export default function Home() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVpsNotification = (email: string) => {
    // Here you can add logic to store the email for later contact
    console.log("VPS notification requested for:", email);
  };

  return (
    <>
      {/* Compact Announcement Banner - Between navbar and hero */}
      <div className="pt-16 md:pt-20">
        <AnnouncementBanner />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center bg-black text-white px-6 pt-4">
        {/* Minecraft-style particles background */}
        <div className="absolute inset-0 z-0">
          <MinecraftParticles />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent z-10 pointer-events-none" />
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
            VecraHost — <span className="text-accent">Game. Host. Rule.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            High-performance Minecraft and VPS hosting made for gamers.
          </p>
          <a
            href="#minecraft-hosting"
            className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-xl shadow-md hover:bg-[#005fcb] transition duration-300 mt-4"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Minecraft Hosting Plans Section */}
      <section
        id="minecraft-hosting"
        className="w-full bg-transparent text-white py-24 px-6 flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Minecraft Hosting Plans
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl">
          Choose a plan that fits your server&apos;s power needs. All plans come with DDoS protection and instant setup.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          <PricingCard
            id="mc-10-day"
            type="minecraft"
            title="10-Day Plan"
            price="₹69"
            features={[
              "1 GB RAM",
              "10 player slots",
              "SSD Storage",
              "Full SFTP Access",
              "24/7 Support",
              "Instant Setup",
              "Only for 10 days"
            ]}
            highlighted={true}
            icon={<StarterIcon />}
          />

          <PricingCard
            id="mc-starter"
            type="minecraft"
            title="Starter"
            price="₹149/mo"
            features={[
              "1 GB RAM",
              "10 player slots",
              "SSD Storage",
              "Full SFTP Access",
              "24/7 Support",
              "Instant Setup"
            ]}
            highlighted={false}
            icon={<StarterIcon />}
          />

          <PricingCard
            id="mc-ultra"
            type="minecraft"
            title="Ultra"
            price="₹349/mo"
            features={[
              "3 GB RAM",
              "Unlimited slots",
              "Advanced Mods",
              "Premium Support",
              "Custom Domain",
              "API Access"
            ]}
            highlighted={false}
            icon={<UltraIcon />}
          />
        </div>

        <a
          href="https://panel.vecrahost.in"
          target="_blank"
          rel="noopener noreferrer"
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

        {/* VPS Notification */}
        <VpsNotification onNotify={handleVpsNotification} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full opacity-50">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="text-accent text-4xl">
                <VpsStarterIcon />
              </div>
              <h3 className="text-2xl font-semibold">VPS Starter</h3>
              <p className="text-4xl font-bold text-accent">₹399/mo</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  1 vCPU Core
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  2 GB RAM
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  25 GB SSD
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  1 IPv4 Address
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Root Access
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 Support
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button
                disabled
                className="block text-center w-full py-3 px-4 bg-gray-600 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
              >
                Out of Stock
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="text-accent text-4xl">
                <VpsProIcon />
              </div>
              <h3 className="text-2xl font-semibold">VPS Pro</h3>
              <p className="text-4xl font-bold text-accent">₹699/mo</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  2 vCPU Cores
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  4 GB RAM
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  50 GB SSD
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  DDoS Protection
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Web Terminal Access
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority Support
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button
                disabled
                className="block text-center w-full py-3 px-4 bg-gray-600 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
              >
                Out of Stock
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="text-accent text-4xl">
                <VpsUltraIcon />
              </div>
              <h3 className="text-2xl font-semibold">VPS Ultra</h3>
              <p className="text-4xl font-bold text-accent">₹999/mo</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  4 vCPU Cores
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  8 GB RAM
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  100 GB SSD
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dedicated Resources
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Premium Support
                </li>
                <li className="flex items-center">
                  <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  API Access
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button
                disabled
                className="block text-center w-full py-3 px-4 bg-gray-600 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
              >
                Out of Stock
              </button>
            </div>
          </div>
        </div>

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
        className="w-full bg-transparent text-white py-24 px-6 flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Why Choose VecraHost?
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl">
          Here&apos;s what makes our hosting powerful, scalable, and gamer-friendly.
        </p>

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
        className="w-full bg-transparent text-white py-24 px-6 flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl">
          Real feedback from real players and customers who trusted VecraHost.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
          <TestimonialCard
            avatar=""
            name="Rohit"
            role="Minecraft Player"
            quote="VecraHost is the smoothest server I've ever played on. Zero lag and super fast support!"
          />

          <TestimonialCard
            avatar=""
            name="Akshay"
            role="VPS User"
            quote="I host my modded Minecraft server here — no downtime, and full SFTP access is gold!"
          />

          <TestimonialCard
            avatar=""
            name="Srinivas"
            role="Server Admin"
            quote="The control panel is simple and powerful. Setup took just minutes. Highly recommend Vecra!"
          />
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
            question="Where do I access my Minecraft or VPS panel?"
            answer="Use the &apos;Go to Panel&apos; buttons above, or visit panel.vecrahost.in for Minecraft and dashboard.vecrahost.in for users."
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
