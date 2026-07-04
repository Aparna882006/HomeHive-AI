import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const LINKS = {
  Product:      [{ label: "Browse rooms", href: "/explore" }, { label: "AI match", href: "/ai-match" }, { label: "How it works", href: "/#how-it-works" }, { label: "Pricing", href: "#" }],
  "For owners": [{ label: "List a room", href: "/signup" }, { label: "Owner dashboard", href: "/dashboard" }, { label: "Verification", href: "#" }],
  Support:      [{ label: "Help centre", href: "#" }, { label: "Contact us", href: "#" }, { label: "Privacy policy", href: "#" }, { label: "Terms of use", href: "#" }],
};
const SOCIALS = [
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
];

export default function Footer() {
  return (
    <footer style={{ background: "#263238" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-extrabold text-sm"
                style={{ background: "linear-gradient(135deg,#2E8B3C,#4ab55e)" }}
              >
                H
              </div>
              <span className="font-extrabold text-white text-[15px] tracking-tight">
                HomeHive <span style={{ color: "#4ab55e" }}>AI</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "#90A4AE" }}>
              Find your perfect space and community with AI-powered flatmate matching.
            </p>

            {/* Socials */}
            <div className="flex gap-2.5">
              {SOCIALS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,255,255,.08)", color: "#90A4AE" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#2E8B3C"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.color = "#90A4AE"; }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4
                className="text-[10px] font-bold uppercase tracking-[.12em] mb-4"
                style={{ color: "#90A4AE" }}
              >
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "#90A4AE" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#90A4AE")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,.08)" }}
        >
          <p className="text-xs" style={{ color: "#546E7A" }}>
            © 2025 HomeHive AI. All rights reserved.
          </p>
          <a
            href="mailto:hello@homehive.ai"
            className="flex items-center gap-2 text-xs transition-colors"
            style={{ color: "#546E7A" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#546E7A")}
          >
            <Mail size={12} /> hello@homehive.ai
          </a>
        </div>
      </div>
    </footer>
  );
}