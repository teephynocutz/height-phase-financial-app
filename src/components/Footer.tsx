import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-padding max-w-7xl mx-auto py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-sm bg-gold flex items-center justify-center">
                <span className="font-display text-accent-foreground text-lg leading-none">H</span>
              </div>
              <span className="font-display text-xl tracking-tight">Heightphase</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
              Connecting you to better financial choices that benefit your future.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gold mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><Link to="/services" className="hover:text-gold transition-colors">Capital Investment</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Financial Advisory</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Partnership Programs</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Portfolio Management</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">Our Services</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li>info@heightphase.com</li>
              <li>+1 (800) 742-9100</li>
              <li>New York, NY</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Heightphase Advisory. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-primary-foreground/40">
            <span className="hover:text-gold transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
