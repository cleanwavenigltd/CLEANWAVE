import React from "react";
import { motion } from "framer-motion";
import TeamMemberCard from "../components/TeamMemberCard";
// import { logo } from "../assets/logo.png";

const managementTeam = [
  {
    name: "Aminu Balarabe",
    role: "Founder & CEO",
    bio: "Visionary leader with 15+ years in waste management and sustainable development across Africa.",
    image: "https://via.placeholder.com/96x96?text=AB",
  },
  {
    name: "Amir",
    role: "Chief Operations Officer",
    bio: "Expert in logistics and supply chain management, specializing in circular economy solutions.",
    image: "http://localhost:5173/src/assets/logo.png", //"https://via.placeholder.com/96x96?text=SO",
  },
  {
    name: "Muhammad Aliyu Muazu",
    role: "Chief Technology Officer",
    bio: "Technology innovator focused on digital platforms for waste management and community engagement.",
    image: "http://localhost:5173/src/assets/logo.png",
  },
  {
    name: "Amir",
    role: "Chief Financial Officer",
    bio: "Financial strategist with experience in impact investing and sustainable business development.",
    image: "https://via.placeholder.com/96x96?text=GN",
  },
];

const boardMembers = [
  {
    name: "Amir",
    role: "Board Chair",
    bio: "Environmental policy expert and former government advisor on sustainability initiatives.",
    image: "https://via.placeholder.com/96x96?text=FI",
  },
  {
    name: "Prof. Ahmed Musa",
    role: "Board Member",
    bio: "Academic leader in environmental science and circular economy research.",
    image: "https://via.placeholder.com/96x96?text=AM",
  },
  {
    name: "Amir",
    role: "Board Member",
    bio: "Corporate sustainability director with multinational experience in waste management.",
    image: "https://via.placeholder.com/96x96?text=AO",
  },
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

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Team() {
  return (
    <div className="bg-brand-background min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
            Our Team
          </h1>
          <p className="text-lg text-brand-text/70 max-w-2xl mx-auto">
            Experienced professionals dedicated to building Nigeria's circular
            economy.
          </p>
        </motion.div>

        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-brand-primary text-center mb-12">
            Management Team
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {managementTeam.map((member) => {
              <TeamMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />;
            })}
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-brand-primary text-center mb-8">
            Board of Directors
          </h2>
          <p className="text-lg text-brand-text/70 text-center mb-12 max-w-2xl mx-auto">
            Our board provides strategic guidance and ensures governance
            excellence in our mission to transform waste management in Nigeria.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {boardMembers.map((member) => (
              <TeamMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
