import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Lazy-load the AppDownload block (non-critical for first paint)
const AppDownload = lazy(() => import("./AppDownload"));

const MotionLink = motion(Link);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="bg-brand-background section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5"></div>
      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-brand-primary max-w-5xl mx-auto leading-tight"
        >
          Transforming Waste into Value Across Nigeria
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl text-brand-text/80 max-w-4xl mx-auto leading-relaxed font-medium"
        >
          Cleanwave Recycling Nigeria Limited connects waste generators with
          local recyclers, creating jobs and building a sustainable circular
          economy.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg text-brand-text/70 max-w-3xl mx-auto leading-relaxed"
        >
          A structured, scalable recycling platform operating across Nigeria's
          local governments, empowering communities through waste management and
          economic opportunity.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col md:flex-row gap-6 justify-center"
        >
          <MotionLink
            to="/contact"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Pickup
          </MotionLink>
          <MotionLink
            to="/partners"
            className="inline-block border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-2xl hover:bg-brand-primary hover:text-white transition-all duration-300 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Partner With Us
          </MotionLink>
        </motion.div>

        {/* App Download Section (lazy-loaded to reduce initial JS) */}
        <Suspense
          fallback={<div style={{ minHeight: 200 }} aria-hidden="true" />}
        >
          <AppDownload />
        </Suspense>
      </motion.div>
    </section>
  );
}
