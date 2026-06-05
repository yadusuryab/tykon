"use client";

import * as React from "react";
import Link from "next/link";
import { Instagram, MessageCircle, ArrowUpRight, Zap, Heart, Globe, Shield, Truck } from "lucide-react";
import Brand from "../utils/brand";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setCategories(data))
      .catch(() => {});
  }, []);

  const dynamicCategories = categories.slice(0, 5).map((c) => ({
    label: c.name || "Category",
    href: `/products?category=${c.slug?.current || c.slug || "category"}`,
  }));

  const fallbackCategories = [
    { label: "Watches",  href: "/products?category=watches" },
    { label: "Footwear", href: "/products?category=footwears" },
  ];

  const shopCategories = dynamicCategories.length > 0 ? dynamicCategories : fallbackCategories;

  const links = {
    help:    [{ label: "Contact Us", href: "/contact" }],
    company: [{ label: "About Us",   href: "/about"   }],
    legal: [
      { label: "Privacy Policy",    href: "/privacy-policy" },
      { label: "Terms & Conditions",href: "/terms" },
      { label: "Cookies",           href: "/cookies" },
    ],
    social: {
      instagram: process.env.NEXT_PUBLIC_INSTA    || "#",
      whatsapp:  process.env.NEXT_PUBLIC_WHATSAPP || "#",
    },
  };

  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Store";

  return (
    <>
      <style jsx>{`
        @keyframes footerMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .f-marquee {
          display: inline-flex;
          animation: footerMarquee 28s linear infinite;
          white-space: nowrap;
        }
        .f-marquee:hover { animation-play-state: paused; }

        .f-link {
          position: relative;
          display: inline-block;
          color: rgba(255,255,255,0.4);
          font-size: 12px;
          letter-spacing: 0.03em;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .f-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #ef4444, #f97316);
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        
        .f-link:hover { 
          color: white; 
        }
        .f-link:hover::before { 
          width: 100%; 
        }

        .f-label {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 700;
          background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 16px;
          display: inline-block;
        }

        .wordmark-line {
          font-size: clamp(48px, 14vw, 140px);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.2));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          user-select: none;
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        
        .wordmark-line:hover {
          background: linear-gradient(135deg, rgba(239,68,68,0.8), rgba(255,255,255,0.4));
          -webkit-background-clip: text;
          background-clip: text;
        }

        .feature-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-card:hover {
          transform: translateY(-2px);
          border-color: rgba(239, 68, 68, 0.3) !important;
        }
        
        .feature-card:hover .feature-icon {
          animation: floatIcon 0.6s ease infinite;
        }
        
        .social-icon {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .social-icon:hover {
          transform: scale(1.05) translateY(-2px);
        }
      `}</style>

      <footer className="bg-black relative overflow-hidden">
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Top decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        {/* ── Features bar ── */}
        <div className="border-b border-white/5 py-6">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck, label: "Free Shipping", desc: "On orders over ₹999" },
                { icon: Shield, label: "Secure Payment", desc: "100% safe checkout" },
                { icon: Globe, label: "Global Delivery", desc: "Worldwide shipping" },
                { icon: Heart, label: "24/7 Support", desc: "Always here to help" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="feature-card flex flex-col items-center text-center p-3 rounded-lg border border-white/5 bg-white/5"
                >
                  <item.icon className="feature-icon w-5 h-5 text-red-500 mb-2" strokeWidth={1.5} />
                  <span className="text-white text-xs font-bold tracking-wide mb-1">{item.label}</span>
                  <span className="text-white/30 text-[10px]">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Marquee strip ── */}
        <div className="overflow-hidden border-b select-none py-3 bg-red-500/5"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="f-marquee">
            {[
              "Free shipping over ₹999",
              "New arrivals every Friday",
              "Easy 30-day returns",
              "Premium collections, curated for you",
              "Secure checkout · 100% safe",
              "🔥 Limited time offers",
              "Free shipping over ₹999",
              "New arrivals every Friday",
              "Easy 30-day returns",
              "Premium collections, curated for you",
              "Secure checkout · 100% safe",
              "🔥 Limited time offers",
            ].map((t, i) => (
              <React.Fragment key={i}>
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold"
                  style={{ color: "rgba(255,255,255,0.25)", paddingLeft: "4px", paddingRight: "4px" }}>
                  {t}
                </span>
                <Zap className="w-2.5 h-2.5 fill-current mx-5 inline-block align-middle text-red-500" />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16">

          {/* ── Top row: Brand + tagline + social ── */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-16 pb-12 border-b border-white/5">

            {/* Left section */}
            <div className="max-w-md">
              <Link href="/" className="block mb-6 w-fit hover:opacity-80 transition-opacity">
                <Brand className="h-8 w-auto brightness-0 invert" />
              </Link>

              <p className="text-[13px] leading-relaxed mb-6 text-white/40">
                Redefining modern fashion with premium quality and exceptional design. 
                Your style, our passion.
              </p>

              {/* Newsletter signup */}
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-3">
                  Subscribe to our newsletter
                </p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm
                      placeholder:text-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-xs font-bold
                      transition-all duration-200 hover:scale-105"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {[
                  { href: links.social.instagram, icon: <Instagram size={16} strokeWidth={1.5} />, label: "Instagram" },
                  { href: links.social.whatsapp,  icon: <MessageCircle size={16} strokeWidth={1.5} />, label: "WhatsApp" },
                ].map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="social-icon w-9 h-9 flex items-center justify-center rounded-full
                      bg-white/5 border border-white/10 text-white/50 hover:border-red-500/50
                      hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Offer CTA — redesigned */}
            <Link
              href="/offer"
              className="group relative flex flex-col gap-3 px-8 py-6 rounded-2xl overflow-hidden
                transition-all duration-300 hover:scale-[1.02]"
              style={{
                border: "1px solid rgba(239, 68, 68, 0.2)",
                background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(0,0,0,0.4))",
                maxWidth: "320px",
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Accent corner */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-red-500/20 to-transparent rounded-bl-2xl" />
              
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 bg-red-500/20 rounded-full">
                  <span className="text-[8px] font-black tracking-[0.2em] uppercase text-red-500">
                    Limited Offer
                  </span>
                </div>
              </div>
              
              <div>
                <p className="font-black uppercase tracking-tight leading-tight text-white text-lg">
                  Buy One,{" "}
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    Get One Free
                  </span>
                </p>
                <p className="text-xs text-white/40 mt-2">
                  Any 2 pairs for just <span className="font-bold text-white">₹1,499</span>
                </p>
              </div>
              
              <div className="flex items-center gap-2 mt-2 text-xs font-bold uppercase tracking-wide text-red-500">
                Shop now
                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </div>

          {/* ── Link columns ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-16">

            {/* Help */}
            <div>
              <span className="f-label">Help</span>
              <ul className="space-y-3">
                {links.help.map((l) => (
                  <li key={l.href}><Link href={l.href} className="f-link">{l.label}</Link></li>
                ))}
                <li><Link href="/faq" className="f-link">FAQs</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <span className="f-label">Company</span>
              <ul className="space-y-3">
                {links.company.map((l) => (
                  <li key={l.href}><Link href={l.href} className="f-link">{l.label}</Link></li>
                ))}
                <li><Link href="/blog" className="f-link">Blog</Link></li>
              </ul>
            </div>

            {/* Shop */}
            <div>
              <span className="f-label">Shop</span>
              <ul className="space-y-3">
                {shopCategories.map((l) => (
                  <li key={l.href}><Link href={l.href} className="f-link">{l.label}</Link></li>
                ))}
                <li><Link href="/products" className="f-link">All Products</Link></li>
                <li><Link href="/sale" className="f-link text-red-500">Sale 🔥</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <span className="f-label">Contact</span>
              <ul className="space-y-3">
                <li><a href="mailto:support@tykon.com" className="f-link">support@tykon.com</a></li>
                <li><a href="tel:+911234567890" className="f-link">+91 123 456 7890</a></li>
                <li className="text-white/20 text-[11px]">Mon-Fri, 9AM-6PM IST</li>
              </ul>
            </div>
          </div>

          {/* ── Big editorial wordmark ── */}
          <div className="mb-12 -mx-2 overflow-hidden select-none text-center lg:text-left">
            <p className="wordmark-line px-2">{appName}</p>
          </div>

          {/* ── Bottom bar ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">

            {/* Copyright */}
            <p className="text-[11px] tracking-wide text-white/20">
              © {currentYear} {appName}. All rights reserved.
            </p>

            {/* Legal links */}
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {links.legal.map((l) => (
                <Link key={l.href} href={l.href} className="text-[11px] text-white/30 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Payment methods */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] tracking-wide text-white/20">Secure payments</span>
              <div className="flex gap-1">
                {['VISA', 'MC', 'UPI', 'GPay'].map((method) => (
                  <span key={method} className="text-[8px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Made by */}
            <Link
              href="https://instagram.com/getshopigo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium tracking-wide transition-all duration-200
                text-white/30 hover:text-red-500 flex items-center gap-1"
            >
              Made with <Heart size={10} className="text-red-500 fill-red-500" /> by Shopigo
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export { Footer };