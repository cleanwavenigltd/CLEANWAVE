import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

const NavItem = ({ to, children }) => (
  <motion.div
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-3 rounded-lg font-medium transition-colors ${
          isActive
            ? "bg-brand-primary/10 text-brand-primary"
            : "text-brand-text/80 hover:text-brand-primary"
        }`
      }
    >
      {children}
    </NavLink>
  </motion.div>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-brand-primary/10 shadow-lg"
          : "bg-brand-background/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <img
            src="/src/assets/logo.png"
            alt="Cleanwave Logo"
            className="h-12 w-12"
          />
          <div>
            <div className="font-bold text-xl text-brand-primary">
              Cleanwave Recycling
            </div>
            <div className="text-sm text-brand-text/60">
              Nigeria Limited
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/team">Team</NavItem>
          <NavItem to="/partners">Partners</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
            className="p-3 text-brand-text/80 hover:text-brand-primary"
          >
            <Menu />
          </button>
        </div>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden border-t"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 text-brand-text/80 hover:text-brand-primary font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/team"
              onClick={() => setOpen(false)}
              className="py-3 text-brand-text/80 hover:text-brand-primary font-medium transition-colors"
            >
              Team
            </Link>
            <Link
              to="/partners"
              onClick={() => setOpen(false)}
              className="py-3 text-brand-text/80 hover:text-brand-primary font-medium transition-colors"
            >
              Partners
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="py-3 text-brand-text/80 hover:text-brand-primary font-medium transition-colors"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
