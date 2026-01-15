import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-text mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-brand-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-brand-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-brand-text mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-brand-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors"
          placeholder="+234 XXX XXX XXXX"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-text mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 border border-brand-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors resize-none"
          placeholder="Tell us about your waste management needs or partnership inquiry..."
        />
      </div>
      <motion.button
        type="submit"
        className="w-full btn-primary"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Send Message
      </motion.button>
    </form>
  );
}
