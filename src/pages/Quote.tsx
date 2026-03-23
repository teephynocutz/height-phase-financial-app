"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import {
  DollarSign,
  CreditCard,
  Home,
  Briefcase,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle2,
  Loader2,
  TrendingUp,
  User,
  Mail,
  Phone,
  MapPin,
  IdCard,
} from "lucide-react";
import { Resend } from "resend";

const resend = new Resend("RESEND_API_KEY");

/* ───────── step data ───────── */

const loanPurposes = [
  { id: "capital", label: "Capital Investment", icon: TrendingUp },
  { id: "debt", label: "Debt Consolidation", icon: DollarSign },
  { id: "business", label: "Business Expansion", icon: Briefcase },
  { id: "property", label: "Property Acquisition", icon: Home },
  { id: "refinance", label: "Refinance", icon: CreditCard },
  { id: "purchase", label: "Major Purchase", icon: ShoppingBag },
];

const creditRanges = [
  { id: "excellent", label: "Excellent", range: "720+" },
  { id: "good", label: "Good", range: "680 – 719" },
  { id: "fair", label: "Fair", range: "640 – 679" },
  { id: "poor", label: "Below 640", range: "639 and below" },
];

const employmentOptions = [
  "Full-time",
  "Part-time",
  "Self-employed",
  "Retired",
  "Other",
];

const TOTAL_STEPS = 6;

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

/* ───────── animated counter ───────── */
function useAnimatedValue(target: number, duration = 350) {
  const [display, setDisplay] = useState(target);
  const raf = useRef<number>();
  const prev = useRef(target);

  useEffect(() => {
    const from = prev.current;
    const diff = target - from;
    if (diff === 0) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + diff * ease));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration]);

  return display;
}

/* ───────── main component ───────── */
export default function Quote() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [amount, setAmount] = useState(50000);
  const [purpose, setPurpose] = useState("");
  const [credit, setCredit] = useState("");
  const [employment, setEmployment] = useState("");
  const [income, setIncome] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [ssn, setSsn] = useState("");
  const [idFile, setIdFile] = useState<File | null>(null);

  const animatedAmount = useAnimatedValue(amount);
  const progress = (step / TOTAL_STEPS) * 100;

  const canNext = useCallback(() => {
    switch (step) {
      case 1: return true;
      case 2: return !!purpose;
      case 3: return !!credit;
      case 4: return !!employment;
      case 5: return !!income;
      case 6: return (
        !!firstName &&
        !!lastName &&
        !!email &&
        !!dob &&
        !!address &&
        !!ssn &&
        !!idFile
      );
      default: return false;
    }
  }, [step, purpose, credit, employment, income, firstName, lastName, email, dob, address, ssn, idFile]);

  const next = () => {
    if (!canNext()) return;
    if (step < TOTAL_STEPS) {
      setDirection("forward");
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const back = () => {
    if (step > 1) {
      setDirection("back");
      setStep((s) => s - 1);
    }
  };

//  -----------------------------------------------------
 // ⚠️ Browser exposure

const handleSubmit = async () => {
  if (!idFile) {
    toast({ title: "Missing ID", description: "Please upload your ID document." });
    return;
  }

  setSubmitting(true);

  try {
    // Convert file to base64 safely
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

    const fileDataUrl = await toBase64(idFile);
    const [, base64Data] = fileDataUrl.split(",");

    // Send email via Resend
    await resend.emails.send({
      from: "noreply@yourdomain.com",
      to: "applications@yourdomain.com",
      subject: "New Loan Application",
      html: `
        <h1>Loan Application</h1>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Loan Amount:</strong> ${amount}</p>
        <p><strong>Purpose:</strong> ${purpose}</p>
        <p><strong>Credit:</strong> ${credit}</p>
        <p><strong>Employment:</strong> ${employment}</p>
        <p><strong>Income:</strong> ${income}</p>
        <p><strong>DOB:</strong> ${dob}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>SSN:</strong> ${ssn}</p>
      `,
    });

    toast({
      title: "Application Sent",
      description: "Your loan application has been submitted successfully.",
    });

    // Reset form
    setStep(1);
    setAmount(50000);
    setPurpose("");
    setCredit("");
    setEmployment("");
    setIncome("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setDob("");
    setAddress("");
    setSsn("");
    setIdFile(null);
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description:
        error?.message || "Failed to send application. Please check your network and try again.",
    });
  } finally {
    setSubmitting(false);
  }
};

  const monthlyEstimate = Math.round(amount / 48);

  return (
    <Layout>
      <section className="py-16 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <Progress value={progress} className="mb-6" />
          <div key={step}>
            {step === 1 && <StepLoanAmount amount={amount} setAmount={setAmount} animatedAmount={animatedAmount} monthlyEstimate={monthlyEstimate} />}
            {step === 2 && <StepPurpose selected={purpose} onSelect={setPurpose} />}
            {step === 3 && <StepCredit selected={credit} onSelect={setCredit} />}
            {step === 4 && <StepEmployment selected={employment} onSelect={setEmployment} />}
            {step === 5 && <StepIncome income={income} setIncome={setIncome} />}
            {step === 6 && <StepPersonal
              firstName={firstName} setFirstName={setFirstName}
              lastName={lastName} setLastName={setLastName}
              email={email} setEmail={setEmail}
              phone={phone} setPhone={setPhone}
              dob={dob} setDob={setDob}
              address={address} setAddress={setAddress}
              ssn={ssn} setSsn={setSsn}
              setIdFile={setIdFile}
            />}
          </div>

          <div className="flex mt-6 gap-3">
            {step > 1 && <Button onClick={back} variant="outline"><ArrowLeft /> Back</Button>}
            <Button onClick={next} disabled={!canNext() || submitting} className="ml-auto">
              {submitting ? <Loader2 className="animate-spin" /> : step === TOTAL_STEPS ? "Submit Application" : <><ArrowRight /> Continue</>}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* STEP COMPONENTS REMAIN THE SAME AS YOUR PROVIDED FILE */

/* ═══════════════════════ STEP COMPONENTS ═══════════════════════ */

function StepLoanAmount({
  amount,
  setAmount,
  animatedAmount,
  monthlyEstimate,
}: {
  amount: number;
  setAmount: (v: number) => void;
  animatedAmount: number;
  monthlyEstimate: number;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl leading-[1.1] mb-3">
        How much do you need?
      </h1>
      <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-lg">
        Drag the slider to select your desired investment amount.
      </p>

      {/* Big animated number */}
      <div className="text-center mb-8">
        <p className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight text-foreground tabular-nums">
          {formatCurrency(animatedAmount)}
        </p>
        <p className="text-muted-foreground text-sm mt-2">
          Est. <span className="text-foreground font-semibold">{formatCurrency(monthlyEstimate)}</span>/month over 48 months
        </p>
      </div>

      {/* Custom styled slider */}
      <div className="px-2">
        <Slider
          value={[amount]}
          onValueChange={([v]) => setAmount(v)}
          min={5000}
          max={500000}
          step={5000}
          className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-[3px] [&_[role=slider]]:border-gold [&_[role=slider]]:bg-background [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-gold/20 [&_[role=slider]]:transition-shadow [&_[role=slider]]:hover:shadow-xl [&_[role=slider]]:hover:shadow-gold/30 [&_[role=slider]]:active:scale-110 [&_[data-orientation=horizontal]_.relative]:h-2.5 [&_[data-orientation=horizontal]_.relative]:rounded-full [&_span[role=slider]~span]:bg-gold"
        />
        <div className="flex justify-between mt-3 text-xs text-muted-foreground tabular-nums">
          <span>$5,000</span>
          <span>$500,000</span>
        </div>
      </div>

      {/* Quick-pick chips */}
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {[25000, 50000, 100000, 250000].map((v) => (
          <button
            key={v}
            onClick={() => setAmount(v)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.96] ${
              amount === v
                ? "bg-gold text-accent-foreground shadow-md shadow-gold/20"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {formatCurrency(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 active:scale-[0.98] ${
        selected
          ? "border-gold bg-gold/8 shadow-sm shadow-gold/10"
          : "border-border bg-card hover:border-gold/40 hover:bg-card/80"
      }`}
    >
      {children}
    </button>
  );
}

function StepPurpose({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl leading-[1.1] mb-3">
        What's the purpose?
      </h1>
      <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg">
        Select how you plan to use this investment.
      </p>
      <div className="grid gap-3">
        {loanPurposes.map((p) => (
          <OptionCard
            key={p.id}
            selected={selected === p.id}
            onClick={() => onSelect(p.id)}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                selected === p.id ? "bg-gold/20" : "bg-secondary"
              }`}>
                <p.icon className={`w-5 h-5 ${selected === p.id ? "text-gold" : "text-muted-foreground"}`} />
              </div>
              <span className="font-semibold text-sm sm:text-base">{p.label}</span>
            </div>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function StepCredit({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl leading-[1.1] mb-3">
        Estimated credit score?
      </h1>
      <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg">
        This helps us match you with the best options.
      </p>
      <div className="grid gap-3">
        {creditRanges.map((c) => (
          <OptionCard
            key={c.id}
            selected={selected === c.id}
            onClick={() => onSelect(c.id)}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm sm:text-base">{c.label}</span>
              <span className="text-muted-foreground text-sm tabular-nums">{c.range}</span>
            </div>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function StepEmployment({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl leading-[1.1] mb-3">
        Employment status?
      </h1>
      <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg">
        Let us know your current employment situation.
      </p>
      <div className="grid gap-3">
        {employmentOptions.map((opt) => (
          <OptionCard
            key={opt}
            selected={selected === opt}
            onClick={() => onSelect(opt)}
          >
            <span className="font-semibold text-sm sm:text-base">{opt}</span>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function StepIncome({
  income,
  setIncome,
}: {
  income: string;
  setIncome: (v: string) => void;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl leading-[1.1] mb-3">
        Annual income before taxes?
      </h1>
      <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg">
        Your gross annual pay, including salary, investments, and other income.
      </p>
      <div>
        <label className="text-sm font-medium mb-2 block">Annual Income</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            inputMode="numeric"
            placeholder="75,000"
            value={income}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              setIncome(raw ? Number(raw).toLocaleString() : "");
            }}
            className="h-13 pl-10 text-lg tabular-nums"
          />
        </div>
      </div>
    </div>
  );
}

function StepPersonal({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  dob,
  setDob,
  address,
  setAddress,
  ssn,
  setSsn,
  setIdFile,
}) {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Your Details</h1>

      {/* Names */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* DOB */}
      <Input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />

      {/* Address */}
      <div className="relative">
        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* SSN */}
      <Input
        type="password"
        placeholder="SSN"
        value={ssn}
        onChange={(e) => setSsn(e.target.value)}
      />

      {/* File Upload */}
      <Input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setIdFile(e.target.files?.[0] || null)}
      />
    </div>
  );
}