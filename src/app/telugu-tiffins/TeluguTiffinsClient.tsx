"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function TeluguTiffinsClient() {
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
              Use code: TELUGUTIFFINS7
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
              <span className="text-[10px] uppercase font-black tracking-widest text-brand-primary">Tiffin Delivery Service</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-[1.05] mb-8"
            >
              Fresh Tiffins Delivered Daily to Your Doorstep
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-brand-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            >
              Telugu Tiffins provides daily homemade tiffin delivery service in Kedareswarapeta and Siddhartha Nagar, Vijayawada. 
              Fresh, hygienic meals prepared with care for busy professionals and families.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contactus" className="btn-primary px-8 py-4 text-lg">
                Order Today
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/contactus" className="btn-secondary px-8 py-4 text-lg">
                View Menu
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Hero Animation - Hidden on Mobile */}
          <div className="hidden lg:block relative h-full min-h-[500px]">
            <div className="absolute inset-0 bg-brand-surface/30 border border-brand-border rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-32 h-32 mx-auto text-brand-primary/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-brand-muted text-lg">Delivery Coverage Map</p>
                <p className="text-brand-muted text-sm mt-2">Kedareswarapeta & Siddhartha Nagar</p>
              </div>
            </div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Daily Tiffin Delivery</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">Fresh homemade tiffins delivered every morning. Choose from variety of South Indian breakfast items including idli, dosa, vada, upma, and pongal.</p>
            </div>

            <div className="card-enterprise border-brand-primary/40">
              <div className="w-12 h-12 bg-white/5 border border-brand-border flex items-center justify-center mb-6 group-hover:border-brand-primary transition-colors">
                <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Kedareswarapeta & Siddhartha Nagar</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">Serving Kedareswarapeta and Siddhartha Nagar areas in Vijayawada. Daily delivery Monday through Sunday. Orders placed by 9 PM delivered next morning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 px-6 border-y border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Why Choose Telugu Tiffins</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Fresh Homemade Meals</h4>
                  <p className="text-brand-muted text-sm">Daily prepared fresh in our kitchen using quality ingredients. No preservatives, no shortcuts.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Hygienic Preparation</h4>
                  <p className="text-brand-muted text-sm">Strict hygiene standards maintained throughout cooking, packing, and delivery process.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Daily Service</h4>
                  <p className="text-brand-muted text-sm">Operating 7 days a week. Consistent delivery schedule so you never miss your morning meal.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Local Vijayawada Service</h4>
                  <p className="text-brand-muted text-sm">Based in Kedareswarapeta, Siddhartha Nagar. We know the area and deliver on time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-brand-surface border-y border-brand-border text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your Daily Tiffin Service</h2>
          <p className="text-brand-muted text-lg mb-10">Fresh homemade tiffins delivered to Kedareswarapeta and Siddhartha Nagar, Vijayawada.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/?text=Hi%20Telugu%20Tiffins%2C%20I%20would%20like%20to%20order%20daily%20tiffin%20delivery%20in%20Kedareswarapeta%2FSiddhartha%20Nagar.%20Can%20we%20discuss%20menu%20options%20and%20pricing?" className="btn-primary px-10 py-4 text-lg">
              WhatsApp Order
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