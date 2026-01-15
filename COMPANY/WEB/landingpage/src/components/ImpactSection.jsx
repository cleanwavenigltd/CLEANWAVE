import React from "react";
import { motion } from "framer-motion";
import ImpactCounter from "./ImpactCounter";

const impacts = [
  { label: "Tons of Waste Collected", value: 2500 },
  { label: "Jobs Created", value: 1200 },
  { label: "Communities Served", value: 150 },
  { label: "Circular Economy Contribution (₦)", value: 50000000 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ImpactSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={itemVariants}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-brand-text/70 max-w-2xl mx-auto">
            Measurable results in waste management, job creation, and sustainable development.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {impacts.map((impact, index) => (
            <motion.div key={impact.label} variants={itemVariants}>
              <ImpactCounter label={impact.label} value={impact.value} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
