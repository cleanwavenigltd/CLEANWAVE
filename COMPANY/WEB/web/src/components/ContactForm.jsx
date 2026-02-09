import React, { useState, memo, useCallback } from "react";

/**
 * Optimized ContactForm Component
 * PERFORMANCE OPTIMIZATIONS:
 * - Memoized to prevent re-renders on parent updates
 * - useCallback for event handlers to maintain referential equality
 * - Local form state to avoid prop drilling
 * - Simplified styling with Tailwind
 */
const ContactForm = memo(() => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // PERFORMANCE: Memoized handler prevents function recreation
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  // PERFORMANCE: Memoized submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      alert(
        "This is a frontend-only demo. Form data:\n" +
          JSON.stringify(form, null, 2),
      );
      // Reset form
      setForm({ name: "", email: "", message: "" });
    },
    [form],
  );

  const inputClassName =
    "border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-text placeholder-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors w-full";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        required
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full name"
        className={inputClassName}
      />
      <input
        required
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        className={inputClassName}
      />
      <textarea
        required
        name="message"
        value={form.message}
        onChange={handleChange}
        rows={5}
        placeholder="Message"
        className={inputClassName + " resize-none"}
      />
      <div>
        <button
          type="submit"
          className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md w-full"
        >
          Send Message
        </button>
      </div>
    </form>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
