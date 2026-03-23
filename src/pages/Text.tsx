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
} from "lucide-react";

/* ───────── constants ───────── */

const TOTAL_STEPS = 6;

/* ───────── main component ───────── */

export default function Quote() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Existing state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // NEW state
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [ssn, setSsn] = useState("");
  const [idFile, setIdFile] = useState<File | null>(null);

  const canNext = useCallback(() => {
    switch (step) {
      case 6:
        return (
          !!firstName &&
          !!lastName &&
          !!email &&
          !!dob &&
          !!address &&
          !!ssn &&
          !!idFile
        );
      default:
        return true;
    }
  }, [step, firstName, lastName, email, dob, address, ssn, idFile]);

  const next = () => {
    if (!canNext()) return;
    handleSubmit();
  };

  const handleSubmit = () => {
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);

      toast({
        title: "Application received",
        description: "We will contact you shortly.",
      });

      // Reset everything
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDob("");
      setAddress("");
      setSsn("");
      setIdFile(null);
      setStep(1);
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-20">
        <Progress value={100} className="mb-6" />

        <StepPersonal
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          dob={dob}
          setDob={setDob}
          address={address}
          setAddress={setAddress}
          ssn={ssn}
          setSsn={setSsn}
          setIdFile={setIdFile}
        />

        <div className="mt-8">
          <Button
            onClick={next}
            disabled={!canNext() || submitting}
            className="w-full"
          >
            {submitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>

        <div className="mt-6 text-xs text-muted-foreground flex gap-4">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3" /> Secure
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> No credit impact
          </span>
        </div>
      </div>
    </Layout>
  );
}

/* ───────── STEP PERSONAL ───────── */

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