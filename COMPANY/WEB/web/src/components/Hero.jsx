import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

const slides = [
  {
    title: "CO-WORKING SPACE",
    subtitle: "Portable Co-Working Space",
    bullets: ["Connect", "Create", "Collaborate"],
  },
  {
    title: "PROGRAMS & TRAINING",
    subtitle: "Learning & Growth Programs",
    bullets: ["Skills", "Innovation", "Opportunity"],
  },
  {
    title: "STARTUP SUPPORT",
    subtitle: "Enterprise & Innovation",
    bullets: ["Mentor", "Build", "Launch"],
  },
  {
    title: "COMMUNITY ACTION",
    subtitle: "Environment & Community",
    bullets: ["Protect", "Engage", "Transform"],
  },
  {
    title: "RESEARCH & POLICY",
    subtitle: "Knowledge & Solutions",
    bullets: ["Study", "Advise", "Impact"],
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

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
          key={slide.title}
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-brand-primary max-w-5xl mx-auto leading-tight text-gradient"
        >
          {slide.title}
        </motion.h1>
        <motion.p
          key={slide.subtitle}
          variants={itemVariants}
          className="mt-8 text-xl text-brand-text/80 max-w-4xl mx-auto leading-relaxed"
        >
          {slide.subtitle}
        </motion.p>
        <motion.ul
          key={`bullets-${currentSlide}`}
          variants={itemVariants}
          className="mt-6 flex justify-center gap-8 text-lg text-brand-text/70"
        >
          {slide.bullets.map((bullet, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
              {bullet}
            </li>
          ))}
        </motion.ul>
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col md:flex-row gap-6 justify-center"
        >
          <motion.a
            href="/programs"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join a Program
          </motion.a>
          <motion.a
            href="/coworking"
            className="inline-block border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-2xl hover:bg-brand-primary hover:text-white transition-all duration-300 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reserve a Space
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
