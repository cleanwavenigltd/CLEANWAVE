import React, { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCounter, formatNumber } from "../utils/performanceHooks";

/**
 * Optimized ImpactCounter Component
 * PERFORMANCE OPTIMIZATIONS:
 * - Memoized to prevent re-renders
 * - Uses react-intersection-observer (more efficient than manual IntersectionObserver)
 * - Counter animation only starts when element is visible
 * - Extracted reusable counter logic to custom hook
 */
const ImpactCounter = memo(
  ({ label, value, delay = 0 }) => {
    const { ref, inView } = useInView({
      threshold: 0.5,
      triggerOnce: true, // Animation runs only once
    });
    // Counter only animates when visible
    const count = useCounter(value, 2000, inView);
    const formattedCount = formatNumber(count);

    const variants = {
      hidden: { opacity: 0, scale: 0.95, y: 8 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay },
      },
    };

    return (
      <motion.div
        ref={ref}
        className="bg-white p-6 rounded-2xl shadow-lg text-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
      >
        <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
          {formattedCount}
          {value >= 1000 ? "+" : ""}
        </div>
        <div className="text-brand-text/70 font-medium">{label}</div>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    // Skip re-render if props are the same
    return (
      prevProps.label === nextProps.label &&
      prevProps.value === nextProps.value &&
      prevProps.delay === nextProps.delay
    );
  },
);

ImpactCounter.displayName = "ImpactCounter";

export default ImpactCounter;
