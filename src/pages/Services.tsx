import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Shield,
  BarChart3,
  Briefcase,
  Globe,
  ArrowRight,
} from "lucide-react";
import patternImage from "@/assets/pattern-network.jpg";
import Layout from "@/components/Layout";

const services = [
  {
    icon: TrendingUp,
    title: "Capital Investment",
    desc: "We identify high-value investment opportunities across equities, real estate, and alternative assets. Our team provides end-to-end support from due diligence to execution.",
    features: ["Market analysis", "Portfolio construction", "Exit strategies"],
  },
  {
    icon: Users,
    title: "Partnership Programs",
    desc: "Leverage our network of vetted partners and co-investors. We match you with aligned stakeholders for joint ventures and strategic collaborations.",
    features: ["Partner matching", "Joint ventures", "Deal structuring"],
  },
  {
    icon: Shield,
    title: "Risk Management",
    desc: "Protect your wealth with our comprehensive risk assessment frameworks. We build resilient strategies that adapt to market volatility.",
    features: ["Stress testing", "Hedging strategies", "Compliance"],
  },
  {
    icon: BarChart3,
    title: "Portfolio Advisory",
    desc: "Ongoing guidance to optimize your existing investments. We monitor performance, rebalance allocations, and identify new opportunities as markets evolve.",
    features: ["Performance monitoring", "Rebalancing", "Tax optimization"],
  },
  {
    icon: Briefcase,
    title: "Wealth Planning",
    desc: "Holistic wealth management that considers your complete financial picture — from succession planning to philanthropic giving.",
    features: ["Estate planning", "Succession", "Philanthropic strategy"],
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    desc: "Access emerging markets and international ventures through our worldwide network. We navigate cross-border complexities so you can focus on growth.",
    features: ["Emerging markets", "Cross-border deals", "Currency management"],
  },
];

export default function Services() {
  const heroRef = useReveal();
  const gridRef = useReveal();
  const ctaRef = useReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={patternImage} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-background/95" />
        </div>
        <div ref={heroRef} className="relative section-padding max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="reveal text-gold font-semibold text-sm uppercase tracking-[0.2em] mb-3">Our Services</p>
            <h1 className="reveal stagger-1 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
              Comprehensive financial solutions
            </h1>
            <p className="reveal stagger-2 text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl">
              From capital deployment to global partnerships, we offer a full spectrum of services designed to grow, protect, and connect your investments.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div ref={gridRef} className="section-padding max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`reveal stagger-${Math.min(i + 1, 6)} group p-8 lg:p-10 rounded-xl bg-card border border-border/60 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300`}
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <s.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="flex flex-wrap gap-2">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div ref={ctaRef} className="section-padding max-w-7xl mx-auto py-20 md:py-28 text-center">
          <h2 className="reveal font-display text-3xl sm:text-4xl text-primary-foreground leading-[1.1] mb-5">
            Not sure where to start?
          </h2>
          <p className="reveal stagger-1 text-primary-foreground/60 text-lg max-w-lg mx-auto mb-10">
            Our advisors will help you identify the right services for your goals. No commitment, just clarity.
          </p>
          <div className="reveal stagger-2">
            <Button asChild variant="gold" size="xl">
              <Link to="/contact">
                Book a Free Consultation <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
