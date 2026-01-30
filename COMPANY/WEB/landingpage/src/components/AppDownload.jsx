import React from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, Globe, QrCode } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
  },
};

export default function AppDownload() {
  return (
    <motion.div
      className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand-primary/10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h3 className="text-2xl md:text-3xl font-bold text-brand-primary mb-4">
          Access Cleanwave Anywhere
        </h3>
        <p className="text-brand-text/70 max-w-2xl mx-auto">
          Download our mobile app for on-the-go waste management or use our web
          platform for comprehensive access.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Mobile App Section */}
        <motion.div
          className="text-center md:text-left"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center md:justify-start mb-4">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mr-3">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-brand-text">
              Mobile App
            </h4>
          </div>

          <p className="text-brand-text/70 mb-6">
            Get instant waste pickup requests, track collections, and manage
            your recycling schedule on the go.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {/* QR Code Placeholder */}
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-brand-primary/20">
              <QrCode className="w-16 h-16 text-brand-primary/40 mx-auto mb-2" />
              <p className="text-sm text-brand-text/60">Scan to Download</p>
            </div>

            {/* Download Button */}
            <motion.a
              href="#"
              // className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4285F4] via-[#34A853] via-green-700 via-[#FBBC05] to-[#EA4335] text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] text-white rounded-xl hover:brightness-110 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              // className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-500 via-red-500 via-yellow-500 to-green-500 text-white rounded-xl hover:from-blue-700 hover:via-blue-600 hover:to-green-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download on Play Store
            </motion.a>
          </div>
        </motion.div>

        {/* Web App Section */}
        <motion.div
          className="text-center md:text-right"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center md:justify-end mb-4">
            <h4 className="text-xl font-semibold text-brand-text mr-3">
              Web Platform
            </h4>
            <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
          </div>

          <p className="text-brand-text/70 mb-6">
            Access comprehensive waste management tools, analytics, and partner
            management through our web platform.
          </p>

          <div className="flex justify-center md:justify-end">
            <motion.a
              href="web.cleanwave.green"
              onClick={() =>
                (window.location.href = "https://web.cleanwave.green")
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-brand-primary text-white rounded-xl hover:bg-brand-secondary transition-colors duration-300 font-medium shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="flex items-center gap-2">
                <Globe />
                Open Web App
              </button>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Additional Info */}
      <motion.div
        className="mt-8 pt-6 border-t border-brand-primary/10 text-center"
        variants={itemVariants}
      >
        <p className="text-sm text-brand-text/60">
          Available on Android devices. iOS version coming soon.
        </p>
      </motion.div>
    </motion.div>
  );
}
