import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import CTA from "../components/CTA";

const ctas = [
  {
    title: "Join a training",
    description: "Enroll in our skills and certification programs.",
    ctaText: "Join Training",
    ctaHref: "/programs",
  },
  {
    title: "Use the co-working space",
    description: "Reserve a desk or meeting room.",
    ctaText: "Reserve Space",
    ctaHref: "/coworking",
  },
  {
    title: "Volunteer or intern",
    description: "Opportunities for volunteering and internships.",
    ctaText: "Volunteer",
    ctaHref: "/contact",
  },
  {
    title: "Sponsor a program",
    description: "Support our initiatives through sponsorship.",
    ctaText: "Sponsor",
    ctaHref: "/partners",
  },
  {
    title: "Partner on research",
    description: "Collaborate on research projects.",
    ctaText: "Partner",
    ctaHref: "/partners",
  },
  {
    title: "Support a community project",
    description: "Contribute to community action days.",
    ctaText: "Support",
    ctaHref: "/contact",
  },
];

export default function GetInvolved() {
  return (
    <section className="container mx-auto px-4 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SectionHeader title="Get Involved" subtitle={null} />
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {ctas.map((cta, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <CTA
              title={cta.title}
              description={cta.description}
              ctaText={cta.ctaText}
              ctaHref={cta.ctaHref}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
