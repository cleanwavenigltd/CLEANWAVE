import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  User,
  Truck,
  Warehouse,
  DollarSign,
  Building,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "User Requests Pickup",
    description:
      "Waste generators request collection through our platform or app.",
    icon: User,
  },
  {
    id: 2,
    title: "Agent Assigned",
    description:
      "A local agent in the same local government area is assigned to collect the waste.",
    icon: Truck,
  },
  {
    id: 3,
    title: "Waste Collected & Delivered",
    description:
      "Agent collects waste and delivers it to the nearest Waste Bank for sorting and storage.",
    icon: Warehouse,
  },
  {
    id: 4,
    title: "Payment Processed",
    description:
      "User and Agent receive payment after successful drop-off at the Waste Bank.",
    icon: DollarSign,
  },
  {
    id: 5,
    title: "Bulk Collection",
    description:
      "When Waste Bank is full, Cleanwave collects recyclables and compensates the Waste Bank.",
    icon: Building,
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

export default function ProcessSteps() {
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
            How Cleanwave Works
          </h2>
          <p className="text-lg text-brand-text/70 max-w-2xl mx-auto">
            Our streamlined process connects waste generators with local
            recyclers, creating value at every step.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5  transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 text-brand-secondary" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-brand-text mb-2">
                  {step.title}
                </h3>
                <p className="text-brand-text/70 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
