"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, ShoppingBag, X, ArrowRight, Zap } from "lucide-react";
import Brand from "../utils/brand";

const NAV = [
  { name: "Home", href: "/" },
  { name: "Policies", href: "/terms" },
];

const HERO_THRESHOLD = 80;

// ─── Animated Hamburger ───────────────────────────────────────────────────────
function Hamburger({
  open,
  onClick,
  white,
}: {
  open: boolean;
  onClick: () => void;
  white: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative w-10 h-10 flex flex-col items-center justify-center gap-[5px]
        rounded-none transition-colors duration-200 shrink-0 group"
    >
      <span
        className={`block h-[2px] rounded-none transition-all duration-300 origin-center
          ${white ? "bg-white" : "bg-neutral-900"}
          ${open ? "w-5 rotate-45 translate-y-[3.5px]" : "w-5"}`}
      />
      {!open && (
        <span
          className={`absolute top-2 right-2 w-1 h-1 transition-all duration-200
            ${white ? "bg-primary" : "bg-primary"}`}
        />
      )}
      <span
        className={`block h-[2px] rounded-none transition-all duration-300 origin-center
          ${white ? "bg-white" : "bg-neutral-900"}
          ${open ? "w-5 -rotate-45 -translate-y-[3px]" : "w-3 self-start ml-[10px]"}`}
      />
    </button>
  );
}

// ─── Animated Nav Link ────────────────────────────────────────────────────────
function NavLink({
  href,
  active,
  isOverHero,
  children,
}: {
  href: string;
  active: boolean;
  isOverHero: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative px-3 py-1.5 text-[10px] font-black tracking-[0.18em] uppercase
        no-underline transition-colors duration-200 group
        ${isOverHero
          ? active ? "text-primary" : "text-white/60 hover:text-white"
          : active ? "text-white" : "text-white/50 hover:text-white"
        }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-3 h-[2px] bg-primary transition-all duration-300
          ${active ? "w-[calc(100%-24px)]" : "w-0 group-hover:w-[calc(100%-24px)]"}`}
      />
    </Link>
  );
}

// ─── Icon Button ──────────────────────────────────────────────────────────────
function IconBtn({
  onClick,
  href,
  label,
  children,
}: {
  onClick?: () => void;
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  const cls = `relative w-10 h-10 flex items-center justify-center
    transition-all duration-200 group text-white/60 hover:text-white`;

  if (href) {
    return (
      <Link href={href} aria-label={label} className={cls}>
        {children}
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0
          bg-primary transition-all duration-200 group-hover:w-4" />
      </Link>
    );
  }
  return (
    <button onClick={onClick} aria-label={label} className={cls}>
      {children}
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0
        bg-primary transition-all duration-200 group-hover:w-4" />
    </button>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isHomePage = pathname === "/";
  const isOverHero = isHomePage && !scrolled && !menuOpen && !searchOpen;

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > HERO_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openSearch = () => {
    setSearchOpen(true);
    setMenuOpen(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      {/* ── Search overlay ──────────────────────────────────────────────── */}
      <div
        aria-hidden={!searchOpen}
        onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
        className={`fixed inset-0 z-[60] flex flex-col justify-start
          transition-all duration-250 ease-out
          ${searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
        }}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.4), var(--color-primary, #e63), transparent)" }} />

        {/* Glass shimmer edge */}
        <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

        <div
          className={`w-full max-w-2xl mx-auto px-6 pt-24 transition-all duration-300
            ${searchOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-3 h-3 text-primary fill-primary" />
            <p className="text-[9px] font-black tracking-[0.4em] uppercase text-primary">
              Search
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <input
              ref={inputRef}
              type="search"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full bg-transparent text-[clamp(24px,6vw,44px)] font-black
                text-white placeholder:text-white/20 uppercase tracking-tight
                border-0 border-b border-white/20 focus:border-white/60
                outline-none pb-4 pr-12 transition-colors duration-200"
            />
            <button
              type="submit"
              aria-label="Search"
              className={`absolute right-0 bottom-4 flex items-center justify-center
                w-9 h-9 transition-all duration-200
                ${query.trim()
                  ? "text-primary hover:scale-110"
                  : "text-white/20 pointer-events-none"}`}
            >
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </form>

          <p className="mt-5 text-[9px] tracking-[0.25em] uppercase text-white/25 hidden sm:block">
            Press Enter to search · Esc to close
          </p>
        </div>

        <button
          onClick={() => setSearchOpen(false)}
          aria-label="Close search"
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
            text-white/30 hover:text-white transition-colors duration-200"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>

      {/* ── Mobile full-screen menu ──────────────────────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[55] flex flex-col
          transition-all duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)]
          ${menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"}`}
        style={{
          background: "rgba(5,5,10,0.75)",
          backdropFilter: "blur(60px) saturate(200%)",
          WebkitBackdropFilter: "blur(60px) saturate(200%)",
        }}
      >
        {/* Top glass edge */}
        <div className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />

        <div className="flex items-center justify-between px-4 h-[60px] shrink-0">
          <Hamburger open={menuOpen} onClick={() => setMenuOpen(false)} white={true} />
          <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
            <Brand className="h-6 w-auto brightness-0 invert" />
          </Link>
          <div className="flex items-center gap-0.5">
            <button
              onClick={openSearch}
              aria-label="Search"
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <Search className="w-[17px] h-[17px]" strokeWidth={2} />
            </button>
            <Link
              href="/cart"
              aria-label="Cart"
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-[17px] h-[17px]" strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div className="mx-4 h-px bg-white/10" />

        <nav className="flex-1 flex flex-col justify-center px-6 gap-0">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between group
                py-5 border-b border-white/8 last:border-0
                transition-all duration-200 no-underline`}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
            >
              <span
                className={`text-[clamp(30px,9vw,56px)] font-black tracking-tighter leading-none uppercase
                  transition-all duration-300
                  ${pathname === item.href ? "text-primary" : "text-white/40 group-hover:text-white"}
                  ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`}
                style={{ transitionDelay: menuOpen ? `${i * 55 + 80}ms` : "0ms" }}
              >
                {item.name}
              </span>
              <ArrowRight
                className={`w-5 h-5 shrink-0 transition-all duration-200
                  opacity-0 group-hover:opacity-100 group-hover:translate-x-1
                  ${pathname === item.href ? "text-primary" : "text-white/40"}`}
                strokeWidth={2.5}
              />
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-8 pt-4 shrink-0 flex items-center gap-2 border-t border-white/8">
          <Zap className="w-3 h-3 text-primary fill-primary shrink-0" />
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30">
            Free shipping on orders paid online
          </p>
        </div>
      </div>

      {/* ── Liquid Glass Header bar ──────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 mx-4 mt-3 rounded-2xl
          transition-all duration-500 ease-out `}
        style={{
          // Core liquid glass
          background: scrolled
            ? "rgba(0, 0, 0, 0.78)"
            : isOverHero
            ? "rgba(0, 0, 0, 0.78)"
            : "rgba(0, 0, 0, 0.78)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          // Glass border — top highlight + subtle edge
          border: "1px solid rgba(255,255,255,0.18)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          // Soft inner glow
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.04)"
            : "0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.03)",
          height: "56px",
        }}
      >
        {/* Specular highlight — top-left gleam */}
        <div
          className="absolute top-0 left-4 right-4 h-px rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.2) 70%, transparent 100%)",
          }}
        />

        {/* Liquid refraction blob — subtle animated shimmer */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute -top-6 -left-6 w-40 h-20 rounded-full opacity-[0.06]"
            style={{
              background: "radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, transparent 70%)",
              filter: "blur(8px)",
              animation: "glassShimmer 6s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative h-full max-w-[1280px] mx-auto px-3 sm:px-5 lg:px-8">
          <div className="h-full grid grid-cols-[1fr_auto_1fr] items-center">

            {/* LEFT */}
            <div className="flex items-center">
              <div className="md:hidden">
                <Hamburger
                  open={menuOpen}
                  onClick={() => setMenuOpen((p) => !p)}
                  white={true}
                />
              </div>
              <nav className="hidden md:flex items-center" aria-label="Main">
                {NAV.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    active={pathname === item.href}
                    isOverHero={isOverHero}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* CENTER – logo */}
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            >
              <Brand
                className={`w-auto brightness-0 invert transition-all duration-300
                  ${scrolled ? "h-5 md:h-5" : "h-6 md:h-7"}`}
              />
            </Link>

            {/* RIGHT */}
            <div className="flex items-center justify-end gap-0.5">
              <IconBtn onClick={openSearch} label="Search">
                <Search
                  className={`transition-all duration-300 ${scrolled ? "w-[16px] h-[16px]" : "w-[17px] h-[17px]"}`}
                  strokeWidth={2}
                />
              </IconBtn>
              <IconBtn href="/cart" label="Shopping cart">
                <ShoppingBag
                  className={`transition-all duration-300 ${scrolled ? "w-[16px] h-[16px]" : "w-[17px] h-[17px]"}`}
                  strokeWidth={2}
                />
              </IconBtn>
            </div>

          </div>
        </div>

        {/* Bottom edge diffusion */}
        <div
          className="absolute bottom-0 left-4 right-4 h-px pointer-events-none rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)",
          }}
        />
      </header>

      {/* Keyframes */}
      <style>{`
        @keyframes glassShimmer {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); opacity: 0.06; }
          50% { transform: translateX(160px) translateY(4px) scale(1.3); opacity: 0.03; }
        }
      `}</style>

      {/* Spacer for non-home pages */}
      <div className="h-[80px] bg-black" aria-hidden="true" />
    </>
  );
}