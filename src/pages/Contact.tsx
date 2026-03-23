import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

          
const contactInfo = [
  { icon: Mail, label: "Email", value: "info@heightphase.com" },
  { icon: Phone, label: "Phone", value: "+1 (608) 844-4141" },
  { icon: MapPin, label: "Office", value: "207 W Jefferson Street - Illinois House" },
];

export default function Contact() {
  const heroRef = useReveal();
  const formRef = useReveal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent",
        description: "We'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 lg:py-32">
        <div ref={heroRef} className="section-padding max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="reveal text-gold font-semibold text-sm uppercase tracking-[0.2em] mb-3">Contact</p>
            <h1 className="reveal stagger-1 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
              Let's start a conversation
            </h1>
            <p className="reveal stagger-2 text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl">
              Whether you're exploring investment options or ready to take the next step, our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-20 md:pb-28 lg:pb-32">
        <div ref={formRef} className="section-padding max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-8">
              {contactInfo.map((c, i) => (
                <div key={c.label} className={`reveal stagger-${i + 1} flex gap-4`}>
                  <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">{c.label}</p>
                    <p className="text-muted-foreground text-sm whitespace-pre-line">{c.value}</p>
                  </div>
                </div>
              ))}

              <div className="reveal stagger-4 pt-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Office hours: Monday – Friday, 9:00 AM – 6:00 PM EST.
                  <br />We typically respond within 24 hours.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="reveal stagger-2 p-8 lg:p-10 rounded-2xl bg-card border border-border/60 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">First Name</label>
                    <Input required placeholder="Marcus" className="h-11" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                    <Input required placeholder="Chen" className="h-11" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <Input required type="email" placeholder="marcus@example.com" className="h-11" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">How can we help?</label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="Tell us about your goals or questions..."
                    className="resize-none"
                  />
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full sm:w-auto" disabled={loading}>
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
