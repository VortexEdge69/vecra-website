import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-center"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-brand-primary mb-4">
        Sun Homeo Care
      </h1>
      <p className="text-brand-muted text-lg mb-8">
        Traditional homeopathy clinic in Maruthi Nagar, Eluru Road, Vijayawada.
        Mon-Sat hours. Natural, gentle remedies for holistic wellness.
      </p>
      <div className="flex gap-4">
        <Link href="/contactus" className="btn-primary px-8 py-4 text-lg">
          Book a Consultation
        </Link>
        <Link href="/contactus" className="btn-secondary px-8 py-4 text-lg">
          View Services
        </Link>
      </div>
    </motion.div>
  );
}
