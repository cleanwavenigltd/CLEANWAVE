import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ImpactCounter({ label, value }) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const animateValue = (start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue(0, value, 2000);
            controls.start("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${label.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [value, controls]);

  const formatValue = (val) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toString();
  };

  return (
    <motion.div
      id={`counter-${label.replace(/\s+/g, '-').toLowerCase()}`}
      className="bg-white p-6 rounded-2xl shadow-lg text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
      }}
    >
      <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
        {formatValue(count)}
      </div>
      <div className="text-brand-text/70 font-medium">
        {label}
      </div>
    </motion.div>
  );
}
