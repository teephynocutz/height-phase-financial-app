import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Shield, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-skyline.jpg";
import Layout from "@/components/Layout";

const stats = [
  { value: "$2.4B+", label: "Assets Managed" },
  { value: "340+", label: "Partners Worldwide" },
  { value: "18", label: "Years of Excellence" },
  { value: "97%", label: "Client Retention" },
];

const services = [
  {
    icon: TrendingUp,
    title: "Capital Investment",
    desc: "Strategic capital allocation with data-driven insights to maximize your portfolio returns across global markets.",
  },
  {
    icon: Users,
    title: "Partnership Programs",
    desc: "Connect with vetted investment partners and co-investors for shared growth and diversified opportunities.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    desc: "Comprehensive risk assessment and mitigation strategies tailored to protect and grow your wealth.",
  },
];

export default function Home() {
  const heroRef = useReveal();
  const statsRef = useReveal();
  const servicesRef = useReveal();
  const ctaRef = useReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <img
            src={heroImage}
            alt="Financial district skyline at golden hour"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>

        <div ref={heroRef} className="relative z-10 section-padding max-w-7xl mx-auto w-full py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="reveal text-gold font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              Heightphase Advisory
            </p>
            <h1 className="reveal stagger-1 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-primary-foreground mb-6">
              Invest with clarity, grow with confidence
            </h1>
            <p className="reveal stagger-2 text-primary-foreground/70 text-lg sm:text-xl leading-relaxed max-w-lg mb-10">
              We connect you to the right financial opportunities — capital investment, partnerships, and advisory services built on trust and results.
            </p>
            <div className="reveal stagger-3 flex flex-wrap gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/contact">Start a Conversation</Link>
              </Button>
              <Button asChild variant="gold-outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary/60">
        <div ref={statsRef} className="section-padding max-w-7xl mx-auto py-14 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`reveal stagger-${i + 1} text-center lg:text-left`}>
                <p className="font-display text-3xl sm:text-4xl text-gold mb-1">{s.value}</p>
                <p className="text-primary-foreground/50 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-primary/60 md:py-28 lg:py-32">
        <div ref={servicesRef} className="section-padding max-w-7xl mx-auto">
          <div className="max-w-xl mb-14 md:mb-16">
            <p className="reveal text-gold font-semibold text-sm uppercase tracking-[0.2em] mb-3">What We Do</p>
            <h2 className="reveal text-gold/60 stagger-1 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-4">
              Financial services that move you forward
            </h2>
            <p className="reveal stagger-2 text-muted-foreground text-lg leading-relaxed">
              From strategic investments to long-term partnerships, we craft solutions around your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`reveal stagger-${i + 1} group p-8 rounded-xl bg-card border border-border/60 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300`}
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <s.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal stagger-4 mt-10 text-center">
            <Button asChild variant="ghost" className="text-gold hover:text-gold/80 gap-2">
              <Link to="/services">
                View all services <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-black/60 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div ref={ctaRef} className="relative section-padding max-w-7xl mx-auto py-20 md:py-28 text-center">
          <h2 className="reveal font-display text-3xl sm:text-4xl lg:text-5xl text-primary-foreground leading-[1.1] mb-5">
            Ready to take control of your financial future?
          </h2>
          <p className="reveal stagger-1 text-primary-foreground/60 text-lg max-w-xl mx-auto mb-10">
            Let's discuss how Heightphase can help you find the right investments and partnerships.
          </p>
          <div className="reveal stagger-2">
            <Button asChild variant="gold" size="xl">
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
