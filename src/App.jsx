// src/App.jsx
import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Linkedin, Mail } from "lucide-react";
import {
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Workflow,
  Brain,
  Plug,
  Shield,
  CheckCircle2,
  Zap,
  LineChart,
  Clock,
  Store,
  Package,
  Truck,
  Wallet,
  Building2,
  HeartPulse,
  TrendingUp,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9 } },
};

export default function App() {
  const WORKER_URL = "https://perceptive-contact.jainsaanidhya.workers.dev/";

  // nav + UI
  const [menuOpen, setMenuOpen] = useState(false);

  // form state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // form status
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // industries carousel
  const INDUSTRIES = useMemo(
    () => [
      {
        key: "retail",
        label: "Retail & Consumer",
        Icon: Store,
        friction: [
          "Stockouts and overstock from delayed signals",
          "Store / warehouse coordination done manually",
          "Promotions and pricing execution depends on follow-ups",
        ],
        change: [
          "Decisions become continuous, not periodic",
          "Humans handle exceptions; systems handle the routine",
        ],
      },
      {
        key: "manufacturing",
        label: "Manufacturing",
        Icon: Package,
        friction: [
          "Planning changes faster than systems adapt",
          "WIP visibility is delayed; bottlenecks found late",
          "Quality/compliance follow-through depends on people",
        ],
        change: [
          "Faster response to constraints and shifts",
          "Exceptions are structured, routed, and resolved earlier",
        ],
      },
      {
        key: "logistics",
        label: "Supply Chain & Logistics",
        Icon: Truck,
        friction: [
          "Coordination across vendors, transporters, warehouses",
          "Delays surface late and trigger firefighting",
          "Exception handling consumes most effort",
        ],
        change: [
          "Proactive handling of disruptions",
          "Less manual tracking, fewer escalation loops",
        ],
      },
      {
        key: "finance",
        label: "Finance Ops",
        Icon: Wallet,
        friction: [
          "Reconciliation and validation are manual-heavy",
          "Approvals and follow-ups slow closure",
          "Teams spend time finding issues",
        ],
        change: [
          "Continuous checks with exception-first workflows",
          "Faster close cycles with fewer surprises",
        ],
      },
      {
        key: "healthcare",
        label: "Healthcare Ops",
        Icon: HeartPulse,
        friction: [
          "Scheduling/billing/claims create heavy coordination",
          "Operational data sits across tools",
          "Administrative work reduces service quality",
        ],
        change: [
          "Routine follow-ups and checks handled automatically",
          "Staff time shifts back to service and decision-making",
        ],
      },
      {
        key: "internal",
        label: "Internal Ops",
        Icon: Building2,
        friction: [
          "Requests bounce between teams (tickets, approvals, escalations)",
          "Status reporting becomes a job",
          "Progress depends on chasing updates",
        ],
        change: [
          "Work routes itself with context",
          "Updates happen automatically; humans intervene for judgment",
        ],
      },
    ],
    []
  );

  const [industryIdx, setIndustryIdx] = useState(0);
  const swipeStartX = useRef(0);
  const swipeLastX = useRef(0);
  const swiping = useRef(false);
  const swipeThreshold = 48;

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  const nav = useMemo(
    () => [
      { id: "what", label: "What we do" },
      { id: "value", label: "Value" },
      { id: "industries", label: "Industries" },
      { id: "why", label: "Why Perceptive" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const getX = (e) =>
    "touches" in e
      ? e.touches[0].clientX
      : "changedTouches" in e
        ? e.changedTouches[0].clientX
        : e.clientX;

  const onIndustryStart = (e) => {
    swiping.current = true;
    swipeStartX.current = getX(e);
    swipeLastX.current = swipeStartX.current;
  };
  const onIndustryMove = (e) => {
    if (!swiping.current) return;
    swipeLastX.current = getX(e);
  };
  const onIndustryEnd = () => {
    if (!swiping.current) return;
    const delta = swipeLastX.current - swipeStartX.current;
    if (delta > swipeThreshold) setIndustryIdx((i) => (i - 1 + INDUSTRIES.length) % INDUSTRIES.length);
    if (delta < -swipeThreshold) setIndustryIdx((i) => (i + 1) % INDUSTRIES.length);
    swiping.current = false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSent(false);
    setSending(true);

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _origin: window.location.href,
        }),
      });

      if (!res.ok) {
        let detail = "";
        try {
          const j = await res.json();
          detail = j.detail || j.error || "";
        } catch {}
        throw new Error(detail || `HTTP ${res.status}`);
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Couldn’t send. Please try again or email team@perceptivelabs.in.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen text-text overflow-x-hidden pt-20 sm:pt-24 relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white" />
    </div>

      {/* HEADER (fixed, bigger, always on top) */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/85 backdrop-blur-xl">
        <div className="w-full px-6 sm:px-10 lg:px-16 h-20 sm:h-24 flex items-center justify-between">
          <button onClick={() => scrollToId("top")} className="flex items-center gap-3">
            <img src="/logo.png" alt="Perceptive Labs" className="h-10 sm:h-12 w-auto rounded-md" />
            <div className="flex flex-col items-start leading-tight">
              <span className="font-semibold tracking-tight text-sm sm:text-base">Perceptive Labs</span>
              <span className="hidden sm:block text-xs text-subtext">
                Intelligence for the business of tomorrow
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm text-subtext">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollToId(n.id)}
                className="hover:text-text transition"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <Button onClick={() => scrollToId("contact")}>
              Reach out to us <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-bg overflow-hidden"
            >
              <div className="container-page py-4 grid gap-3 text-sm">
                {nav.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      setMenuOpen(false);
                      scrollToId(n.id);
                    }}
                    className="text-left py-2 text-subtext hover:text-text"
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <div className="bg-black text-white">

        <section id="top" className="relative">

          <div className="relative container-page section-pad grid lg:grid-cols-2 gap-14 items-center on-dark">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <p className="section-label mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand" />
                Intelligence for the business of tomorrow
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">
                Better operations that{" "}
                <span className="text-gradient">decide</span> & {" "}
                <span className="text-gradient">execute</span>.
              </h1>

              <p className="lead mt-6 max-w-xl text-white">
                We embed intelligent automation into your existing systems so routine work stops depending,
                decisions happen on time, and teams focus on judgment.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={() => scrollToId("contact")}>
                  Reach out to us <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToId("what")}>
                  What we do
                </Button>
              </div>

            </motion.div>

            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative">

                <div
                className="rounded-3xl bg-bg overflow-hidden max-w-md ml-auto relative shadow-soft hover:shadow-card transition hover:-translate-y-1"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.22), 0 0 48px rgba(255,255,255,0.10), 0 40px 140px rgba(59,130,246,0.22), 0 20px 90px rgba(124,58,237,0.18)",
                }}
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="text-sm font-semibold text-black">Perceptive Workflow Layer</div>
                  <div className="text-xs text-subtext">Signals → decisions → actions</div>
                </div>

                <div className="p-6 grid gap-4">
                  <MiniRow icon={<Clock className="h-4 w-4" />} title="Work status" value="Approvals pending (3)" />
                  <MiniRow icon={<LineChart className="h-4 w-4" />} title="Signal" value="Sales spike in Zone B" status="active" />
                  <MiniRow icon={<Brain className="h-4 w-4" />} title="Decision" value="Increase replenishment by 18%" />
                  <MiniRow icon={<Workflow className="h-4 w-4" />} title="Execution" value="PO created • Vendor notified" status="success" />
                </div>

                <div className="px-6 pb-6">
                  <div className="rounded-2xl bg-muted border border-border p-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-brand/20 via-transparent to-brand2/20 animate-shimmer" />
                    <div className="relative">
                      <div className="text-xs uppercase tracking-[0.16em] text-subtext mb-2">
                        What teams feel
                      </div>
                      <ul className="text-sm text-subtext space-y-1.5">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-brand mt-0.5" />
                          Less chasing, fewer follow-ups
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-brand mt-0.5" />
                          Exceptions surfaced early
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-brand mt-0.5" />
                          Execution actually finishes
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section id="what" className="bg-transparent">
          <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="container-page section-pad">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <p className="section-label mb-4 text-white">What we do</p>
              <h2 className="section-title mb-5">We build intelligent automation inside your existing systems.</h2>
              <p className="lead max-w-3xl text-white/80">
                Not a dashboard or replacement. We make your current tools dynamic, flexible, and intelligent.
              </p>
            </motion.div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Pillar
                icon={<Plug className="h-5 w-5" />}
                title="Intelligent Automation"
                text="Systems that learn & adapt to maximize efficiency, reduce errors, accelerate operations."
              />
              <Pillar
                icon={<Brain className="h-5 w-5" />}
                title="Enterprise Intelligence"
                text="Transform your organizational knowledge into insights & measurable business outcomes."
              />
              <Pillar
                icon={<Workflow className="h-5 w-5" />}
                title="Reliable & Safe Execution"
                text="Automated actions, reminders, escalations, & checks. Work closes on time, every time."/>
            </div>
          </div>
        </section>

        {/* VALUE */}
        <section id="value" className="bg-transparent">
          <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="container-page section-pad">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <p className="section-label mb-4 text-white">Value</p>
              <h2 className="section-title mb-5">Turn workflows into self-running operations</h2>
              <p className="lead max-w-3xl text-white/80">
                Routine execution stops depending on people. Decisions happen on time. Your team stays focused on judgment not monitoring.
              </p>
            </motion.div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card className="rounded-3xl bg-bg text-text shadow-soft hover:shadow-card transition hover:-translate-y-1">
                <CardHeader className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-muted border border-border flex items-center justify-center text-brand">
                    <Zap className="h-5 w-5" />
                  </div>
                  <CardTitle>Cost & Time Efficiency</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-subtext leading-relaxed">
                  Replace manual effort & operational overhead with automation across teams.
                </CardContent>
              </Card>

             <Card className="rounded-3xl bg-bg text-text shadow-soft hover:shadow-card transition hover:-translate-y-1">
                <CardHeader className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-muted border border-border flex items-center justify-center text-brand">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <CardTitle>Data-Driven Decisions</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-subtext leading-relaxed">
                  Decisions backed by data not bias. Transparent, auditable, and consistent.
                </CardContent>
              </Card>

              <Card className="rounded-3xl bg-bg text-text shadow-soft hover:shadow-card transition hover:-translate-y-1">
                <CardHeader className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-muted border border-border flex items-center justify-center text-brand">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <CardTitle>Compounding efficiency</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-subtext leading-relaxed">
                  Every action, rule, and workflow raises the baseline so the entire business moves faster, every day.

                </CardContent>
              </Card>
            </div>


          </div>
        </section>
      </div>

      {/* INDUSTRIES */}
      <section id="industries" className="relative overflow-hidden bg-transparent">
        <SectionDivider />
        <div className="relative container-page section-pad">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <p className="section-label mb-4">Industries</p>
            <h2 className="section-title mb-5">Where manual work quietly eats margin</h2>
            <p className="lead max-w-3xl">
              Different industries look different on the surface. The operational drag is usually the same: coordination,
              delays, and exceptions. Use these examples to recognise the pattern.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-2">
            {INDUSTRIES.map((x, idx) => {
              const active = idx === industryIdx;
              const Icon = x.Icon;
              return (
                <button
                  key={x.key}
                  type="button"
                  onClick={() => setIndustryIdx(idx)}
                  className={
                    "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-brand/30 focus:ring-offset-2 focus:ring-offset-bg " +
                    (active
                      ? "bg-gradient-to-r from-brand to-brand2 text-white border-transparent shadow-soft"
                      : "bg-surface text-text border-border/70 hover:bg-bg")
                  }
                >
                  <Icon className="h-4 w-4" />
                  {x.label}
                </button>
              );
            })}
          </div>

          <div
            className="mt-6 relative overflow-hidden rounded-3xl select-none"
            style={{ touchAction: "pan-y" }}
            onTouchStart={onIndustryStart}
            onTouchMove={onIndustryMove}
            onTouchEnd={onIndustryEnd}
            onMouseDown={(e) => {
              e.preventDefault();
              onIndustryStart(e);
            }}
            onMouseMove={onIndustryMove}
            onMouseUp={onIndustryEnd}
            onMouseLeave={onIndustryEnd}
          >
            <div
              className="flex w-full transition-transform duration-300 motion-reduce:duration-0 will-change-transform"
              style={{ transform: `translateX(-${industryIdx * 100}%)` }}
            >
              {INDUSTRIES.map((x) => {
                const Icon = x.Icon;
                return (
                  <div key={x.key} className="w-full flex-none">
                    <Card className="rounded-3xl">
                      <CardHeader className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-brand/10 border border-brand/20 text-brand flex items-center justify-center">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle>{x.label}</CardTitle>
                      </CardHeader>
                      <CardContent className="grid md:grid-cols-2 gap-8 text-sm">
                        <div>
                          <div className="section-label mb-3">Common friction</div>
                          <ul className="text-subtext list-disc pl-5 space-y-2">
                            {x.friction.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="section-label mb-3">What changes</div>
                          <ul className="text-subtext list-disc pl-5 space-y-2">
                            {x.change.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {INDUSTRIES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to industry ${i + 1}`}
                  onClick={() => setIndustryIdx(i)}
                  className={"h-2 w-2 rounded-full transition-colors " + (i === industryIdx ? "bg-brand" : "bg-border")}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY PERCEPTIVE */}
      <section id="why" className="bg-transparent">
        <SectionDivider />
        <div className="container-page section-pad">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <p className="section-label mb-4">Why Perceptive</p>
            <h2 className="section-title mb-5">An innovative partner for building tomorrow’s operations</h2>
            <p className="lead max-w-3xl">
              We combine consulting clarity with product quality.
            </p>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <WhyCard
              icon={<Workflow className="h-5 w-5" />}
              title="Operations-first"
              text="We start from reality: handoffs, exceptions, constraints—not demo slides."
            />
            <WhyCard
              icon={<Plug className="h-5 w-5" />}
              title="Works with what you already run"
              text="We integrate into existing tools so adoption is natural and execution happens where work lives."
            />
            <WhyCard
              icon={<Shield className="h-5 w-5" />}
              title="Built for trust"
              text="Clear audit trails, explainable decisions, and human control where judgment matters."
            />
            <WhyCard
              icon={<Brain className="h-5 w-5" />}
              title="Designed for change"
              text="Real businesses evolve. Our systems are built to adapt—without falling back to manual work."
            />
          </div>

          <div className="mt-12 rounded-3xl border border-border bg-surface shadow-soft p-8">
            <div className="font-semibold mb-2">How we work (4 stages)</div>
            <p className="text-sm text-subtext mb-6">
              A structured process that keeps it simple for leaders—and effective for teams.
            </p>

            <div className="grid lg:grid-cols-4 gap-4">
              <Stage n="01" title="Intro meeting" text="Discuss your operations, goals, and where work gets stuck." />
              <Stage n="02" title="Case study + plan" text="We send a clear write-up: opportunities, scope, and a 5–10 year vision path." />
              <Stage n="03" title="Demo" text="A practical demo mapped to your workflow (not generic AI)." />
              <Stage n="04" title="Build & deploy" text="We ship the system and iterate until outcomes are real and measurable." />
            </div>
          </div>


          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button size="lg" onClick={() => scrollToId("contact")}>
              Reach out to us <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToId("industries")}>
              View industries
            </Button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-transparent">
        <SectionDivider />
        <div className="container-page section-pad grid lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <p className="section-label mb-4">Contact</p>
            <h2 className="section-title mb-6">Reach out to us.</h2>
            <p className="lead max-w-xl">
              Tell us what’s slowing you down. We’ll reply with what we would change—and what it would take to implement.
            </p>

            <div className="mt-8 rounded-3xl border border-border bg-surface p-6 shadow-soft">
              <div className="text-sm font-semibold mb-1">Email</div>
              <a href="mailto:team@perceptivelabs.in" className="text-subtext hover:text-brand underline">
                team@perceptivelabs.in
              </a>
              <div className="mt-4 text-sm text-subtext">
                For faster replies, share:
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>the workflow</li>
                  <li>tools involved</li>
                  <li>what “better” looks like</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <Card className="rounded-3xl shadow-card">
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input placeholder="Work email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Textarea
                    placeholder="Workflow + tools involved + outcome you want"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={sending} className="w-full">
                    {sending ? "Sending..." : "Reach out to us"}
                  </Button>

                  {sent && <p className="text-sm text-emerald-600">Thanks! We’ll reply from team@perceptivelabs.in.</p>}
                  {error && <p className="text-sm text-red-600">{error}</p>}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-transparent">
        <div className="container-page py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-sm text-subtext">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Perceptive Labs" className="h-9 w-auto rounded-md" />
            <div>
              <div className="font-semibold text-text">Perceptive Labs Private Limited</div>
              <div>Intelligence for the business of tomorrow.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:team@perceptivelabs.in"
              aria-label="Email Perceptive Labs"
              className="h-10 w-10 rounded-full border border-border bg-white flex items-center justify-center text-subtext hover:text-text hover:border-black/30 transition"
            >
              <Mail className="h-5 w-5" />
            </a>

            <a
              href="https://www.linkedin.com/company/perceptivelabs/"
              target="_blank"
              rel="noreferrer"
              aria-label="Perceptive Labs LinkedIn"
              className="h-10 w-10 rounded-full border border-border bg-white flex items-center justify-center text-subtext hover:text-text hover:border-black/30 transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- small UI blocks ---------- */

function SectionDivider() {
  return (
    <div
      aria-hidden
      className="h-px w-full bg-gradient-to-r from-transparent via-brand/30 to-transparent"
    />
  );
}

function Chip({ children }) {
  return <div className="px-3 py-2 rounded-2xl border border-border bg-surface text-subtext">{children}</div>;
}

function Pillar({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-border bg-bg text-text p-6 shadow-soft hover:shadow-card transition hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-2xl bg-muted border border-border flex items-center justify-center text-brand">
          {icon}
        </div>
        <div className="font-semibold text-black">{title}</div>
      </div>
      <p className="text-sm text-subtext leading-relaxed">{text}</p>
    </div>
  );
}

function WhyCard({ icon, title, text }) {
  return (
    <div className="relative rounded-3xl border border-border bg-surface p-6 overflow-hidden shadow-soft hover:shadow-card transition hover:-translate-y-1">
      <div aria-hidden className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-brand/10 blur-2xl" />
      <div className="flex items-start gap-4">
        <div className="mt-0.5 h-11 w-11 rounded-2xl bg-bg border border-border flex items-center justify-center text-brand shadow-sm">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="font-semibold mb-1 ">{title}</div>
          <div className="text-sm text-subtext leading-relaxed">{text}</div>
        </div>
      </div>
    </div>
  );
}

function Stage({ n, title, text }) {
  return (
    <div className="rounded-3xl bg-muted border border-border p-5">
      <div className="text-xs text-subtext tracking-[0.18em] mb-2">{n}</div>
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm text-subtext leading-relaxed">{text}</div>
    </div>
  );
}

function FadeUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function MiniRow({ icon, title, value, status }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-subtext mb-1">
          <span className="text-brand ">{icon}</span>
          {title}
        </div>
        <div className="text-sm font-medium text-text truncate ">{value}</div>
      </div>

      {status && (
        <span
          className={
            "text-xs px-3 py-1 rounded-full border whitespace-nowrap " +
            (status === "active"
              ? "bg-brand/10 border-brand/20 text-brand"
              : "bg-emerald-50 border-emerald-200 text-emerald-700")
          }
        >
          {status === "active" ? "Now" : "Done"}
        </span>
      )}
    </div>
  );
}