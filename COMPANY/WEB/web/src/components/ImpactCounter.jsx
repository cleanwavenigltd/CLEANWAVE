import React, { memo } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useCounter, formatNumber } from "../utils/performanceHooks";

/**
 * Optimized ImpactCounter Component
 * PERFORMANCE OPTIMIZATIONS:
 * - Memoized to prevent re-renders
 * - Uses react-intersection-observer for viewport detection
 * - Counter animation only starts when visible (reduces CPU)
 * - Extracted reusable counter logic to custom hook
 */
const ImpactCounter = memo(
  ({ label, value, delay = 0 }) => {
    const { ref, inView } = useInView({
      threshold: 0.5,
      triggerOnce: true, // Animation runs only once to save resources
    });

    // Counter only animates when visible
    const count = useCounter(value, 2000, inView);
    const formattedCount = formatNumber(count);

    const variants = {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay },
      },
    };

    return (
      <motion.div
        ref={ref}
        className="card text-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
      >
        <div className="text-5xl font-bold text-brand-primary">
          {formattedCount}
          {value >= 1000 ? "+" : ""}
        </div>
        <div className="mt-4 text-brand-text/70 font-medium text-lg">
          {label}
        </div>
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
