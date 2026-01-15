import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-text text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/src/assets/logo.png"
                alt="Cleanwave Logo"
                className="h-12 w-12"
              />
              <div>
                <div className="font-bold text-xl text-brand-primary">
                  Cleanwave Recycling
                </div>
                <div className="text-sm text-white/60">
                  Nigeria Limited
                </div>
              </div>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Transforming waste into value across Nigeria through structured recycling solutions and community empowerment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-brand-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/60 hover:text-brand-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/60 hover:text-brand-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/60 hover:text-brand-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-white/60 hover:text-brand-primary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-white/60 hover:text-brand-primary transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-brand-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-brand-primary" />
                <span className="text-white/80">info@cleanwaverecycling.ng</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-brand-primary" />
                <span className="text-white/80">09032279037</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-brand-primary" />
                <span className="text-white/80">Kano, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © 2026 Cleanwave Recycling Nigeria Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
