import { motion } from "framer-motion";

export default function Services() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-3xl font-bold mb-4">Our Services</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2h-14a2 2 0 01-2 2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Traditional Homeopathy</h3>
            <p className="text-brand-muted text-sm">Natural remedies for holistic wellness using time-tested homeopathic principles.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 01-2-2H5a2 2 0 012-2zm14 0a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 01-2-2h-14a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-brand-muted text-sm">Conveniently located in Suryaraopet, Vijayawada.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 01-2-2H5a2 2 0 012-2zm14 0a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 01-2-2h-14a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Extended Hours</h3>
            <p className="text-brand-muted text-sm">Open Mon-Sat 11:00-19:00 for your convenience.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
