"use client";

import * as React from "react";
import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Store";

  return (
    <footer className="border-t border-black/10 px-5 sm:px-8 lg:px-12 pt-10 pb-6">
      <div className="max-w-[1280px] mx-auto">

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">

          <div className="col-span-2 sm:col-span-1">
            <p className="font-medium text-base mb-2">{appName}</p>
            <p className="text-sm text-gray-500 mb-4">Premium fashion, curated for you.</p>
            <div className="flex gap-2">
              {[
                { href: "#", icon: <Instagram size={16} strokeWidth={1.5} />, label: "Instagram" },
                { href: "#", icon: <MessageCircle size={16} strokeWidth={1.5} />, label: "WhatsApp" },
              ].map((s) => (
                <Link key={s.label} href={s.href} aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center border border-black/10 rounded-lg text-gray-400 hover:text-black transition-colors">
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {[
            { label: "Shop", links: [
              { label: "All products", href: "/products" },
              { label: "Watches", href: "/products?category=watches" },
              { label: "Footwear", href: "/products?category=footwears" },
              { label: "Sale", href: "/sale", className: "text-red-500" },
            ]},
            { label: "Company", links: [
              { label: "About", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
              { label: "FAQs", href: "/faq" },
            ]},
            { label: "Legal", links: [
              { label: "Privacy policy", href: "/privacy-policy" },
              { label: "Terms & conditions", href: "/terms" },
              { label: "Cookies", href: "/cookies" },
            ]},
          ].map((col) => (
            <div key={col.label}>
              <p className="text-xs font-medium mb-3">{col.label}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}
                      className={`text-sm text-gray-500 hover:text-black transition-colors ${(l as any).className || ""}`}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© {currentYear} {appName}. All rights reserved.</p>
          <div className="flex gap-2">
            {["VISA", "MC", "UPI", "GPay"].map((m) => (
              <span key={m} className="text-[11px] font-mono text-gray-400 border border-black/10 px-2 py-0.5 rounded">{m}</span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export { Footer };