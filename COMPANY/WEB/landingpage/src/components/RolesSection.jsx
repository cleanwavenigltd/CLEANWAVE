import React from "react";
import { motion } from "framer-motion";
import { Users, Truck, Warehouse, Building2, Crown } from "lucide-react";

const roles = [
  {
    title: "Users",
    description:
      "Waste generators who request pickup services and contribute to the circular economy.",
    icon: Users,
  },
  {
    title: "Agents",
    description:
      "Local collectors who pick up waste and deliver it to Waste Banks for compensation.",
    icon: Truck,
  },
  {
    title: "Waste Banks",
    description:
      "Community-based facilities that sort, store, and prepare recyclables for bulk collection.",
    icon: Warehouse,
  },
  {
    title: "Aggregators",
    description:
      "Regional managers who oversee Agents and Waste Banks within local government areas.",
    icon: Building2,
  },
  {
    title: "Cleanwave",
    description:
      "The platform that connects all stakeholders, manages logistics, and ensures payments.",
    icon: Crown,
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function RolesSection() {
  return (
    <section className="py-20 bg-brand-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={itemVariants}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Our Roles
          </h2>
          <p className="text-lg text-brand-text/70 max-w-2xl mx-auto">
            Each stakeholder plays a crucial role in our ecosystem, creating
            value and sustainability.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {roles.map((role) => (
            <motion.div
              key={role.title}
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mb-6">
                <role.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-3">
                {role.title}
              </h3>
              <p className="text-brand-text/70 leading-relaxed">
                {role.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
