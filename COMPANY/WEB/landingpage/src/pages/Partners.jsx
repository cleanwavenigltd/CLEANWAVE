import React from "react";
import { motion } from "framer-motion";
import { Building, Shield, Users } from "lucide-react";

const partnerCategories = [
  {
    title: "Corporate Partners",
    description: "Leading companies committed to sustainable waste management and circular economy initiatives.",
    icon: Building,
    partners: [
      "Nigerian Breweries PLC",
      "Dangote Industries Limited",
      "Unilever Nigeria PLC",
      "Nestlé Nigeria PLC",
      "Procter & Gamble Nigeria",
    ],
  },
  {
    title: "Government & Development Partners",
    description: "Public sector entities and international development organizations supporting our mission.",
    icon: Shield,
    partners: [
      "Federal Ministry of Environment",
      "World Bank Nigeria",
      "UNDP Nigeria",
      "African Development Bank",
      "State Governments",
    ],
  },
  {
    title: "Community Stakeholders",
    description: "Local communities, NGOs, and grassroots organizations working alongside us.",
    icon: Users,
    partners: [
      "Local Government Associations",
      "Environmental NGOs",
      "Community Development Groups",
      "Waste Picker Cooperatives",
      "Youth Environmental Clubs",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function Partners() {
  return (
    <div className="bg-brand-background min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={itemVariants}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
            Partners & Stakeholders
          </h1>
          <p className="text-lg text-brand-text/70 max-w-2xl mx-auto">
            Building strong alliances to scale sustainable waste management across Nigeria.
          </p>
        </motion.div>

        <motion.div
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {partnerCategories.map((category) => (
            <motion.section
              key={category.title}
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mr-4">
                  <category.icon className="w-10 h-6  text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-primary">
                    {category.title}
                  </h2>
                  <p className="text-brand-text/70 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.partners.map((partner) => (
                  <div
                    key={partner}
                    className="bg-brand-background p-4 rounded-lg border border-brand-secondary/20"
                  >
                    <p className="font-medium text-brand-text">{partner}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          variants={itemVariants}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-brand-primary mb-4">
            Interested in Partnership?
          </h3>
          <p className="text-lg text-brand-text/70 mb-8 max-w-xl mx-auto">
            Join our network of stakeholders working to transform Nigeria's waste management landscape.
          </p>
          <a
            href="/contact"
            className="inline-block bg-brand-primary text-white px-8 py-4 rounded-2xl font-medium hover:bg-brand-secondary transition-colors duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
}
