import React, { useState, memo, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * Optimized ContactForm Component
 * PERFORMANCE OPTIMIZATIONS:
 * - Memoized to prevent re-renders on parent updates
 * - useCallback for event handlers to maintain referential equality
 * - Local form state to avoid prop drilling
 * - No inline function definitions in JSX
 */
const ContactForm = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // PERFORMANCE: Memoized handler prevents function recreation
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // PERFORMANCE: Memoized submit handler
  const handleSubmit = useCallback(
    (e) => {
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
    },
    [formData],
  );

  const inputClassName =
    "w-full px-4 py-3 border border-brand-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors";

  const labelClassName = "block text-sm font-medium text-brand-text mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClassName}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClassName}
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className={labelClassName}>
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputClassName}
          placeholder="+234 XXX XXX XXXX"
        />
      </div>
      <div>
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={inputClassName + " resize-none"}
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
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label htmlFor="name" className={labelClassName}>
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className={inputClassName}
//             placeholder="Your full name"
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className={labelClassName}>
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//               required
//               className={inputClassName}
//               placeholder="your.email@example.com"
//           />
//         </div>
//       </div>
//       <div>
//         <label htmlFor="phone" className={labelClassName}>
//           Phone Number
//         </label>
//         <input
//           type="tel"
//           id="phone"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className={inputClassName}
//           placeholder="+234 XXX XXX XXXX"
//         />
//       </div>
//       <div>
//         <label htmlFor="message" className={labelClassName}>
//           Message
//         </label>
//         <textarea
//           id="message"
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           required
//           rows={5}
//           className={inputClassName + " resize-none"}
//           placeholder="Tell us about your waste management needs or partnership inquiry..."
//         />
//       </div>
//       <motion.button
//         type="submit"
//         className="w-full btn-primary"
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         Send Message
//       </motion.button>
//     </form>
//   );
// }
