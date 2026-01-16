import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import Card from "../components/Card";
import CTA from "../components/CTA";
import ImpactCounter from "../components/ImpactCounter";
import { FOCUS_AREAS } from "../data/focusAreas";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <motion.section
        className="container mx-auto px-4 section-padding"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeader
          title="About Cleanwave Sustainability & Innovation Hub (SIH)"
          subtitle={null}
        />
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
          Cleanwave Sustainability & Innovation Hub (SIH) is a solution-driven
          hub dedicated to tackling real challenges: waste management,
          unemployment, climate pressure, and limited access to innovation
          spaces while harnessing the energy of talented youth, creative
          entrepreneurs, and strong communities. As the first sustainability hub
          in Northern Nigeria, we are committed to building practical skills,
          nurturing local innovation, supporting emerging enterprises, and
          creating a shared space where people and ideas can grow into lasting
          impact.
        </p>
        <div className="mt-8">
          <ul className="flex flex-wrap justify-center gap-4 text-brand-primary font-semibold">
            <li>GREEN SKILLS</li>
            <li>GUIDANCE</li>
            <li>SOLUTIONS</li>
            <li>IDEAS</li>
            <li>COLLABORATIONS</li>
          </ul>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="card">
            <h4 className="font-semibold text-xl text-brand-primary">VISION</h4>
            <p className="mt-2 text-gray-700">
              To grow into a leading innovation and sustainability hub in
              Africa, where practical skills, enterprise, and collaboration
              drive environmental responsibility and inclusive economic
              opportunity.
            </p>
          </div>
          <div className="card">
            <h4 className="font-semibold text-xl text-brand-primary">
              MISSION
            </h4>
            <p className="mt-2 text-gray-700">
              To equip individuals, startups, institutions, and communities with
              skills, workspace, guidance, and partnerships that transform ideas
              into practical solutions, sustainable livelihoods, and measurable
              social impact.
            </p>
          </div>
        </div>

        <motion.div
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, margin: "-50px" }}
        >
          <SectionHeader title="What We Stand For" subtitle="" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {FOCUS_AREAS.map((a, index) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                <Card title={a.title} icon={a.icon}>
                  {a.desc}
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href="/programs" className="btn-primary">
              Explore Our Programs
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, margin: "-50px" }}
        >
          <SectionHeader title="Impact Highlights" subtitle="" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <ImpactCounter label="Youth & Students" value={1200} />
            <ImpactCounter label="Schools & Communities" value={85} />
            <ImpactCounter label="Startups" value={45} />
            <ImpactCounter label="Green Jobs" value={300} />
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, margin: "-50px" }}
        >
          <CTA
            title="Partner With Us"
            description="Collaborate on projects, research, and programs that create impact."
            ctaText="Partner"
            ctaHref="/partners"
          />
        </motion.div>
      </motion.section>
    </div>
  );
}
