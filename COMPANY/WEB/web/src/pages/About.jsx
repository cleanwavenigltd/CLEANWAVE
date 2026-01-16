import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

const copy = `
ABOUT CLEANWAVE SUSTAINABILITY & INNOVATION HUB (SIH)
Cleanwave Sustainability & Innovation Hub (SIH) is a solution-driven
hub dedicated to tackling real challenges: waste management,
unemployment, climate pressure, and limited access to innovation
spaces while harnessing the energy of talented youth, creative
entrepreneurs, and strong communities. As the first sustainability hub
in Northern Nigeria, we are committed to building practical skills,
nurturing local innovation, supporting emerging enterprises, and
creating a shared space where people and ideas can grow into lasting
impact.

OUR VISION
To grow into a leading innovation and sustainability hub in Africa, where practical
skills, enterprise, and collaboration drive environmental responsibility and inclusive
economic opportunity.

OUR MISSION
To equip individuals, startups, institutions, and communities with
skills, workspace, guidance, and partnerships that transform ideas
into practical solutions, sustainable livelihoods, and measurable
social impact.
OUR CORE VALUES
Sustainability First: Environmental and social impact guide every decision.

Innovation, Technology &amp; Green Startups
Guide young innovators from thought to product. Through mentorship, workspace,
and networks, help startups build solutions that solve local problems and create
dignified jobs.
Inclusion & Equity: Youth, women, and underserved communities at the center.

Collaboration: Partnerships across sectors and disciplines.

Integrity & Accountability: Transparency in governance and impact.`;

export default function About() {
  return (
    <motion.section
      className="container mx-auto px-4 section-padding"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionHeader title="About Us" subtitle={null} />
      <motion.div
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {copy.split("\n\n").map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            className="mb-6"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
    </motion.section>
  );
}
