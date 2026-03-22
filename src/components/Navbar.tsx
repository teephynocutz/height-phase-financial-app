import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="section-padding max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-sm bg-gold flex items-center justify-center">
            <span className="font-display text-accent-foreground text-lg leading-none">H</span>
          </div>
          <span className="font-display text-xl tracking-tight">Heightphase</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gold ${
                  pathname === item.path ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden md:inline-flex h-10 px-6 items-center justify-center rounded-md bg-gold text-accent-foreground text-sm font-semibold shadow-md shadow-gold/20 hover:bg-gold/90 transition-all duration-200 active:scale-[0.97]"
        >
          Get in Touch
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border animate-in slide-in-from-top-2 duration-200">
          <ul className="section-padding py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`block text-base font-medium py-2 transition-colors ${
                    pathname === item.path ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 px-6 items-center justify-center rounded-md bg-gold text-accent-foreground text-sm font-semibold"
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
