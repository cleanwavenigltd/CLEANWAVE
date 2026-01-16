import React from "react";
import { motion } from "framer-motion";

export default function TeamMemberCard({ name, role, bio, image }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="w-24 h-24 bg-brand-primary rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={`${image}`}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-2xl font-bold text-white">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <h3 className="text-xl font-semibold text-brand-text text-center mb-2">
        {name}
      </h3>
      <p className="text-brand-primary font-medium text-center mb-3">{role}</p>
      <p className="text-brand-text/70 text-center leading-relaxed">{bio}</p>
    </motion.div>
  );
}
