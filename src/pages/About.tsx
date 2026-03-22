import { useReveal } from "@/hooks/use-reveal";
import { Target, Eye, Gem } from "lucide-react";
import teamImage from "@/assets/team-meeting.jpg";
import Layout from "@/components/Layout";

const values = [
  { icon: Target, title: "Precision", desc: "Every recommendation backed by rigorous analysis and deep market understanding." },
  { icon: Eye, title: "Transparency", desc: "Full visibility into strategy, fees, and performance — no hidden agendas." },
  { icon: Gem, title: "Long-term Value", desc: "We optimize for sustainable growth, not short-term gains that don't last." },
];

const timeline = [
  { year: "2008", event: "Founded in New York with a focus on emerging market investments." },
  { year: "2013", event: "Expanded partnerships across Europe and Southeast Asia." },
  { year: "2018", event: "Surpassed $1B in managed assets with 200+ active partners." },
  { year: "2024", event: "Launched our digital advisory platform for global reach." },
];

export default function About() {
  const heroRef = useReveal();
  const valuesRef = useReveal();
  const timelineRef = useReveal();
  const imageRef = useReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 lg:py-32">
        <div ref={heroRef} className="section-padding max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="reveal text-gold font-semibold text-sm uppercase tracking-[0.2em] mb-3">About Us</p>
            <h1 className="reveal stagger-1 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
              Built on trust, driven by results
            </h1>
            <p className="reveal stagger-2 text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl">
              Heightphase Advisory was founded on a simple belief: everyone deserves access to informed, strategic financial guidance. We bridge the gap between opportunity and action.
            </p>
          </div>
        </div>
      </section>

      {/* Image + Text */}
      <section className="pb-20 md:pb-28">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div ref={imageRef}>
              <div className="reveal rounded-2xl overflow-hidden shadow-2xl shadow-charcoal/10">
                <img
                  src={teamImage}
                  alt="Heightphase advisory team in discussion"
                  className="w-full h-auto object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </div>
            </div>
            <div ref={valuesRef}>
              <h2 className="reveal font-display text-3xl sm:text-4xl leading-[1.1] mb-8">
                What sets us apart
              </h2>
              <div className="space-y-8">
                {values.map((v, i) => (
                  <div key={v.title} className={`reveal stagger-${i + 1} flex gap-5`}>
                    <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <v.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{v.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-primary py-20 md:py-28">
        <div ref={timelineRef} className="section-padding max-w-7xl mx-auto">
          <h2 className="reveal font-display text-3xl sm:text-4xl text-primary-foreground mb-14 text-center">
            Our journey
          </h2>
          <div className="max-w-2xl mx-auto space-y-0">
            {timeline.map((t, i) => (
              <div
                key={t.year}
                className={`reveal stagger-${i + 1} flex gap-6 pb-10 last:pb-0 relative`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-gold shrink-0 mt-1.5" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-primary-foreground/15 mt-2" />
                  )}
                </div>
                <div>
                  <p className="text-gold font-semibold text-sm mb-1">{t.year}</p>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
