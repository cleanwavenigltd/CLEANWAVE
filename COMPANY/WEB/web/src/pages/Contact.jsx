import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import ContactForm from "../components/ContactForm";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <section className="container mx-auto px-4 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SectionHeader title="Contact Us" subtitle={null} />
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <motion.div
          className="card"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h4 className="font-semibold text-xl">
            Cleanwave Sustainability & Innovation Hub (SIH)
          </h4>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">Email: cleanwavenigltd@gmail.com</p>
            <p className="text-gray-600">Phone: 09032279037</p>
            <p className="text-gray-600">Location: Kano, Nigeria</p>
          </div>
          <div className="mt-6">
            <p className="text-gray-600 mb-2">Follow Us:</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-brand-primary hover:text-brand-primary/80"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-brand-primary hover:text-brand-primary/80"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-brand-primary hover:text-brand-primary/80"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            © 2026 Cleanwave SIH
          </div>
        </motion.div>
        <motion.div
          className="card"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
