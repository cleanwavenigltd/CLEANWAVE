import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import Card from "../components/Card";
import { Users, Award, Lightbulb, Briefcase, Calendar } from "lucide-react";

const programs = [
  {
    title: "Green Skills & Certifications",
    desc: "Practical training that equips young people with abilities in recycling, eco-design, energy awareness, and sustainable trades that can become real livelihoods.",
    icon: <Users />,
  },
  {
    title: "Schools Climate & Creativity Clubs",
    desc: "Interactive programs for primary and secondary schools that blend environmental awareness with innovation challenges and fun projects.",
    icon: <Award />,
  },
  {
    title: "Innovation Labs & Bootcamps",
    desc: "Short, intensive programs where participants experiment, design prototypes, and receive guidance from mentors and industry voices.",
    icon: <Lightbulb />,
  },
  {
    title: "Research & Community Dialogues",
    desc: "The hub creates spaces for studies, town conversations, and policy talks so solutions reflect the true needs of the people.",
    icon: <Briefcase />,
  },
  {
    title: "Community Action Days",
    desc: "Neighborhood cleanups, awareness walks, and practical demonstrations that show communities how small steps create big change.",
    icon: <Calendar />,
  },
  {
    title: "Startup Incubation & Acceleration",
    desc: "Guidance, workspace, networks, and coaching for early-stage businesses solving social, environmental, and local economic problems.",
    icon: <Users />,
  },
  {
    title: "Conferences & Exhibitions",
    desc: "Events that bring together innovators, institutions, government, and citizens to showcase solutions and spark partnerships.",
    icon: <Calendar />,
  },
];

export default function Programs() {
  return (
    <section className="container mx-auto px-4 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SectionHeader title="Programs" subtitle={null} />
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {programs.map((program, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card title={program.title} icon={program.icon}>
              {program.desc}
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a href="/contact" className="btn-primary mr-4">
          Apply as an intern/Volunteer
        </a>
        <a
          href="/partners"
          className="inline-block border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-2xl hover:bg-brand-primary hover:text-white transition-all duration-300 font-medium"
        >
          Partner With Us
        </a>
      </div>
    </section>
  );
}
