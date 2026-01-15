import React from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Location",
    details: ["Cleanwave Recycling Nigeria Limited", "Kano, Nigeria"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["09032279037"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@cleanwaverecycling.ng"],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
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

export default function Contact() {
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
            Contact Us
          </h1>
          <p className="text-lg text-brand-text/70 max-w-2xl mx-auto">
            Get in touch to learn more about our waste management solutions and partnership opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold text-brand-primary mb-6">
                Get In Touch
              </h2>
              <ContactForm />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-brand-primary mb-6">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white hover:bg-brand-secondary transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-lg mb-6"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-text mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, index) => (
                      <p key={index} className="text-brand-text/70">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
