import { useEffect, useRef, useState } from "react";

/**
 * Performance Hook: Animates counting from 0 to target value
 * Optimization: Uses requestAnimationFrame for smooth 60fps animation
 * Only animates when element is in viewport (using ref-based tracking)
 * Prevents unnecessary re-renders with useRef tracking
 */
export const useCounter = (target, duration = 2000, isVisible = false) => {
  const [count, setCount] = useState(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [target, duration, isVisible]);

  return count;
};

/**
 * Formats large numbers with K, M, B suffixes
 * Performance: Pure function, zero re-render cost
 */
export const formatNumber = (value) => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};
