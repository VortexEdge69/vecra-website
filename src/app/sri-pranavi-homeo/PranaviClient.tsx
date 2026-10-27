"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import HeroAnimation from "@/components/HeroAnimation";

export default function PranaviClient() {
  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      {/* 7-Day Preview Banner */}
      <section className="relative overflow-hidden border-b border-brand-border text-brand-text">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-brand-primary/10 text-brand-primary/80 text-sm font-medium px-3 py-1 rounded-md">
                7-DAY PREVIEW
              </div>
              <div className="text-sm font-medium text-brand-muted">
                Offer valid until Oct 31, 2026
              </div>
            </div>
            <div className="text-sm font-medium text-brand-muted">
              Use code: PRANAVI7
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-brand-border">
        <div className="relative inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-sm mb-8"
            >
              <span className="text-[10px] uppercase font-black tracking-widest text-brand-primary">Homeopathy Clinic</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-[1.05] mb-8"
            >
              Welcome to Sri Pranavi Homeo Clinic
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-brand-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            >
              Traditional homeopathy treatments for holistic wellness in Suryaraopet, Vijayawada.
              We provide natural, gentle remedies for your health journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contactus" className="btn-primary px-8 py-4 text-lg">
                Book a Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/contactus" className="btn-secondary px-8 py-4 text-lg">
                View Services
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Hero Animation - Hidden on Mobile */}
          <div className="hidden lg:block relative h-full min-h-[500px]">
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-brand-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-enterprise group">
              <div className="w-12 h-12 bg-white/5 border border-brand-border flex items-center justify-center mb-6 group-hover:border-brand-primary transition-colors">
                <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2h-14a2 2 0 01-2 2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Traditional Homeopathy</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">Natural remedies for holistic wellness using time-tested homeopathic principles. Our clinic specializes in personalized treatment plans.</p>
            </div>

            <div className="card-enterprise border-brand-primary/40">
              <div className="w-12 h-12 bg-white/5 border border-brand-border flex items-center justify-center mb-6 group-hover:border-brand-primary transition-colors">
                <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 01-2-2H5a2 2 0 012-2zm14 0a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 01-2-2h-14a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Suryaraopet Location</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">Conveniently located in Suryaraopet, Vijayawada with extended hours Mon-Sat 11:00-19:00.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 px-6 border-y border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Holistic Health Solutions</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Natural Healing Approach</h4>
                  <p className="text-brand-muted text-sm">Traditional homeopathic treatments focusing on natural, gentle remedies for your wellness journey.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Suryaraopet Location</h4>
                  <p className="text-brand-muted text-sm">Conveniently located in Suryaraopet, Vijayawada with extended hours Mon-Sat 11:00-19:00.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Extended Business Hours</h4>
                  <p className="text-brand-muted text-sm">Open Mon-Sat 11:00-19:00 for your convenience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-brand-surface border-y border-brand-border text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Experience Natural Healing</h2>
          <p className="text-brand-muted text-lg mb-10">Traditional homeopathic treatments for holistic wellness in Suryaraopet, Vijayawada.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/?text=Hi%20VecraHost%2C%20I%20would%20like%20to%20book%20a%20consultation%20for%20homeopathic%20treatment.%20Can%20we%20discuss%20my%20health%20concerns%20and%20treatment%20options?" className="btn-primary px-10 py-4 text-lg">
              WhatsApp Consultation
            </a>
            <Link href="/contactus" className="btn-secondary px-10 py-4 text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
