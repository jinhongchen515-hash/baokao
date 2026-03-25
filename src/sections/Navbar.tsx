import { useEffect, useRef, useState } from "react";
import { GraduationCap, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "批次线", href: "#batch-lines" },
  { label: "AI 推荐", href: "#ai-predict" },
  { label: "院校查询", href: "#universities" },
  { label: "专业推荐", href: "#majors" },
  { label: "填报策略", href: "#strategies" },
  { label: "政策解读", href: "#policy" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "top-3 mx-3 md:mx-6 rounded-2xl glass-card shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-cyan-700 to-teal-600 dark:from-cyan-400 dark:to-teal-300 bg-clip-text text-transparent">
              厦门高考志愿指南
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-primary/5 transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="rounded-xl hover:bg-primary/10 cursor-pointer"
              aria-label="切换主题"
            >
              {dark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-xl cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="菜单"
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${mobileOpen ? "rotate-180" : ""}`}
              />
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 pt-2 flex flex-col gap-1 animate-accordion-down">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2.5 text-sm font-medium text-left text-muted-foreground hover:text-foreground rounded-lg hover:bg-primary/5 transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
