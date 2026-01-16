import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import { X } from "lucide-react";

const spaces = [
  {
    id: 1,
    title: "Training Space",
    description:
      "Ideal for workshops, training sessions, and group activities.",
    image: "https://via.placeholder.com/400x300?text=Training+Space",
    prices: { hourly: 1000, weekly: 7000, monthly: 30000 },
  },
  {
    id: 2,
    title: "Co-Working Space",
    description:
      "Flexible desks for freelancers, entrepreneurs, and remote workers.",
    image: "https://via.placeholder.com/400x300?text=Co-Working+Space",
    prices: { hourly: 1000, weekly: 7000, monthly: 30000 },
  },
  {
    id: 3,
    title: "Corporate Meeting Room",
    description:
      "Professional space for meetings, presentations, and collaborations.",
    image: "https://via.placeholder.com/400x300?text=Meeting+Room",
    prices: { hourly: 1000, weekly: 7000, monthly: 30000 },
  },
];

export default function Coworking() {
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (space) => {
    setSelectedSpace(space);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSpace(null);
  };

  return (
    <section className="container mx-auto px-4 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SectionHeader title="Our Space Facilities" subtitle={null} />
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
          Our facilities provide innovative spaces for collaboration, learning,
          and innovation in sustainability.
        </p>
      </motion.div>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {spaces.map((space, index) => (
          <motion.div
            key={space.id}
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src={space.image}
              alt={space.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="font-semibold text-xl mb-2">{space.title}</h4>
              <p className="text-gray-600 mb-4">{space.description}</p>
              <div className="text-center">
                <p className="text-2xl font-bold text-brand-primary mb-4">
                  ₦{space.prices.monthly.toLocaleString()}/month
                </p>
                <button
                  onClick={() => openModal(space)}
                  className="btn-primary w-full"
                >
                  Order
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && selectedSpace && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedSpace.image}
                  alt={selectedSpace.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedSpace.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedSpace.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Hourly:</span>
                    <span className="font-semibold">
                      ₦{selectedSpace.prices.hourly.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekly:</span>
                    <span className="font-semibold">
                      ₦{selectedSpace.prices.weekly.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Monthly:</span>
                    <span className="font-bold text-brand-primary text-xl">
                      ₦{selectedSpace.prices.monthly.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button className="btn-primary w-full mt-6">Reserve Now</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
