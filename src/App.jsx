import React, { useMemo, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  ArrowRight,
  Brain,
  Building2,
  Cpu,
  LayoutDashboard,
  LineChart,
  Menu,
  Package,
  Plug,
  Store,
  Truck,
  Users,
  Wallet,
  Workflow,
  TrendingUp,
  Zap,
  Shield,
  X,
} from "lucide-react";

export default function App() {
  // ===== form state =====
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // form status
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const WORKER_URL = "https://perceptive-contact.jainsaanidhya.workers.dev/"; // replace with your Worker endpoint

  // ===== helpers =====
  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  };

  const handleTalk = () => {
    setMenuOpen(false);
    scrollToId("contact");
  };

  const nav = useMemo(
    () => [
      { href: "#overview", label: "Overview" },
      { href: "#reality", label: "Reality" },
      { href: "#value", label: "Value" },
      { href: "#agentic", label: "Agentic AI" },
      { href: "#industries", label: "Industries" },
      { href: "#why", label: "Why Perceptive" },
      { href: "#offerings", label: "Offerings" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  // POST the form to your Worker (which sends the email via Resend/SMTP)
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
        // Try to surface server detail if present
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
      setError("Couldn’t send. Please try again or email team@perceptivelabs.in.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  // ===== Reality accordions =====
  const realityItems = useMemo(
    () => [
      {
        n: "01",
        icon: <Plug className="h-5 w-5" aria-hidden="true" />,
        title: "Manual work exists to connect systems",
        body: (
          <>
            <p>
              When tools don’t speak in actions, people become the bridge—copying information,
              reconciling numbers, and keeping multiple versions of “truth” aligned.
            </p>
            <p className="mt-3 text-subtext">
              <span className="font-medium text-text">Common signs:</span> repeated updates,
              parallel trackers, daily checklists that never end.
            </p>
          </>
        ),
      },
      {
        n: "02",
        icon: <LineChart className="h-5 w-5" aria-hidden="true" />,
        title: "Decisions arrive after the moment has passed",
        body: (
          <>
            <p>
              Reports get reviewed in batches. By the time a decision is taken, the situation has
              already changed—and the business becomes reactive by default.
            </p>
            <p className="mt-3 text-subtext">
              <span className="font-medium text-text">Common signs:</span> late reorder
              decisions, delayed pricing moves, slow response to demand shifts.
            </p>
          </>
        ),
      },
      {
        n: "03",
        icon: <Zap className="h-5 w-5" aria-hidden="true" />,
        title: "Exceptions become the default work",
        body: (
          <>
            <p>
              Automation handles the happy path. Real operations live in exceptions—mismatches,
              delays, missing inputs, edge cases—and that’s what consumes the team.
            </p>
            <p className="mt-3 text-subtext">
              <span className="font-medium text-text">Common signs:</span> firefighting,
              constant escalations, “why did this happen again?” loops.
            </p>
          </>
        ),
      },
      {
        n: "04",
        icon: <Users className="h-5 w-5" aria-hidden="true" />,
        title: "Skilled people get trapped in coordination",
        body: (
          <>
            <p>
              Your best operators become workflow managers—routing tasks, chasing approvals,
              updating stakeholders—while real value creation gets squeezed out.
            </p>
            <p className="mt-3 text-subtext">
              <span className="font-medium text-text">Common signs:</span> more meetings,
              more follow-ups, less true progress.
            </p>
          </>
        ),
      },
    ],
    []
  );
  const [openRealityIdx, setOpenRealityIdx] = useState(0);

  // ===== Industries carousel =====
  const INDUSTRIES = useMemo(
    () => [
      {
        key: "retail",
        label: "Retail & Consumer",
        Icon: Store,
        friction: [
          "Stockouts and overstock from delayed signals",
          "Store/warehouse/vendor coordination done manually",
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
          "WIP visibility is delayed; bottlenecks discovered late",
          "Quality/compliance follow-through depends on people",
        ],
        change: [
          "Faster response to constraints and shifts",
          "Exceptions get structured, routed, and resolved earlier",
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
        Icon: Shield,
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
    if (delta > swipeThreshold) {
      setIndustryIdx((i) => (i - 1 + INDUSTRIES.length) % INDUSTRIES.length);
    }
    if (delta < -swipeThreshold) {
      setIndustryIdx((i) => (i + 1) % INDUSTRIES.length);
    }
    swiping.current = false;
  };

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden break-words scroll-smooth">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-surface/70 backdrop-blur border-b border-border/60">
        <div className="container-page py-3 flex items-center justify-between">
          <a href="#overview" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="Perceptive Labs" className="h-10 w-auto rounded" />
            <span className="font-semibold text-lg sm:text-xl group-hover:opacity-90">Perceptive Labs</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/30 focus:ring-offset-2 focus:ring-offset-bg rounded"
              >
                {i.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-nav"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Button className="rounded-2xl" onClick={handleTalk}>
              Talk to us
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-nav" className="md:hidden border-t border-border/60">
            <div className="container-page py-3 grid gap-1 text-sm">
              {nav.map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  className="py-2 rounded focus:outline-none focus:ring-2 focus:ring-brand/30 focus:ring-offset-2 focus:ring-offset-bg"
                  onClick={() => setMenuOpen(false)}
                >
                  {i.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Overview / Hero */}
      <section id="overview" className="relative overflow-hidden bg-slate-950 text-white scroll-mt-24">
        {/* hero background (subtle, dynamic, minimal) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
          <div className="absolute -top-56 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
          <div className="absolute -bottom-52 right-[-8rem] h-80 w-80 rounded-full bg-brand2/16 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        </div>

        <div className="relative container-page pt-10 pb-12 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="mb-6">
              <div className="text-base sm:text-lg font-semibold tracking-tight text-white/95">Perceptive Labs</div>
              <div className="mt-1 text-lg sm:text-2xl font-semibold tracking-tight text-white/90">
                Intelligence for the business of tomorrow.
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight mb-5">
              Operations, <span className="text-gradient">without the drag.</span>
            </h1>

            <p className="text-white/75 mb-8 max-w-xl text-base sm:text-lg leading-relaxed">
              We help businesses <span className="font-semibold text-white">reduce manual work</span>, improve operational
              efficiency, and turn data into{" "}
              <span className="font-semibold text-white">decisions that actually get executed</span>—inside the tools and
              workflows you already run.
            </p>

            <div className="grid gap-3 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-xl bg-white/5 border border-white/10 text-brand">
                  <Workflow className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-medium text-white/90">Remove busywork from critical workflows</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-xl bg-white/5 border border-white/10 text-brand">
                  <Zap className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-medium text-white/90">Unblock execution across teams and systems</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-xl bg-white/5 border border-white/10 text-brand">
                  <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-medium text-white/90">
                    Let your software, tools, and dashboards adapt to you—not the other way around
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="rounded-2xl" onClick={handleTalk}>
                Talk to us <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/60">Retail-built. Designed for real operational reality.</p>
          </div>

          {/* Decorative / visual block (no buttons, no claims) */}
          <div>
            <div className="rounded-3xl border border-white/10 bg-white/5 shadow-soft overflow-hidden">
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-white/60 mb-4">How work closes</div>
                <div className="grid gap-3">
                  {[
                    { t: "Observe", d: "Signals from operations" },
                    { t: "Decide", d: "Context-aware next steps" },
                    { t: "Act", d: "Execution inside existing tools" },
                    { t: "Verify", d: "Check outcomes, continue" },
                  ].map((x, idx) => (
                    <div key={x.t} className="flex items-start gap-3">
                      <div className="mt-0.5 h-7 w-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xs text-white/60">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{x.t}</div>
                        <div className="text-sm text-white/65">{x.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div aria-hidden className="h-20 bg-gradient-to-r from-brand/25 via-white/0 to-brand2/25 border-t border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Reality */}
      <section id="reality" className="bg-surface scroll-mt-24">
        <div aria-hidden className="hairline" />
        <div className="container-page section-pad grid lg:grid-cols-[0.82fr_1.18fr] gap-10 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="section-label mb-3 flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-brand2" />
              Reality
            </p>
            <h2 className="section-title mb-4">Why teams stay busy—and execution still slows</h2>
            <p className="text-subtext leading-relaxed mb-4 max-w-prose">
              Most businesses have capable people and plenty of software. But day-to-day work still runs on{" "}
              <span className="font-semibold text-text">follow-ups</span>, spreadsheets, manual checks, and coordination
              between tools—because{" "}
              <span className="font-semibold text-text">systems don’t carry responsibility</span>. Over time, teams end
              up running the process instead of the process running itself.
            </p>
            <p className="text-subtext max-w-prose">This is where time, margin, and momentum quietly leak.</p>
          </div>

          <div className="space-y-3">
            {realityItems.map((it, idx) => {
              const isOpen = idx === openRealityIdx;
              return (
                <div key={it.title} className="rounded-2xl border border-border/70 bg-surface shadow-sm overflow-hidden">
                  <button
                    type="button"
                    className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                    onClick={() => setOpenRealityIdx((cur) => (cur === idx ? -1 : idx))}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="hidden sm:flex h-9 w-9 rounded-xl bg-brand/10 border border-brand/20 text-brand items-center justify-center">
                        {it.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span className="text-xs text-subtext tabular-nums">{it.n}</span>
                          <span className="font-medium truncate">{it.title}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="shrink-0 h-8 w-8 rounded-full border border-brand/20 bg-brand/10 flex items-center justify-center text-brand"
                      aria-hidden="true"
                    >
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>
                  {isOpen && <div className="px-5 pb-5 text-sm text-subtext leading-relaxed">{it.body}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value */}
      <section id="value" className="relative overflow-hidden bg-muted scroll-mt-24">
        <div aria-hidden className="hairline" />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-[-9rem] h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-40 right-[-7rem] h-64 w-64 rounded-full bg-brand2/10 blur-3xl" />
        </div>
        <div className="relative container-page section-pad">
          <p className="section-label mb-3 flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-brand2" />
            Value
          </p>
          <h2 className="section-title mb-4">Turn workflows into self-running operations</h2>
          <p className="text-subtext mb-10 max-w-3xl leading-relaxed">
            We redesign operational work so{" "}
            <span className="font-semibold text-text">routine execution no longer depends on humans</span>,
            <span className="font-semibold text-text"> decisions happen on time</span>, and people stay focused on judgment—not monitoring.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Workflow className="h-5 w-5" aria-hidden="true" />,
                title: "Reduce manual work at the source",
                body: (
                  <>
                    We identify where humans are acting as “glue” between systems and replace that glue with reliable
                    flow—so routine actions stop requiring follow-ups and copy/paste work.
                  </>
                ),
              },
              {
                icon: <ArrowRight className="h-5 w-5" aria-hidden="true" />,
                title: "Convert data into actions",
                body: (
                  <>
                    We don’t stop at insights. We build intelligence that turns signals into decisions and decisions into
                    execution—so data produces movement, not slides.
                  </>
                ),
              },
              {
                icon: <TrendingUp className="h-5 w-5" aria-hidden="true" />,
                title: "Make efficiency compounding",
                body: (
                  <>
                    When work runs consistently, cycles shorten, errors drop, and teams gain capacity without adding
                    headcount. Operations become lighter—and faster over time.
                  </>
                ),
              },
            ].map((p) => (
              <Card key={p.title} className="rounded-2xl">
                <CardHeader className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-brand/10 border border-brand/20 text-brand">{p.icon}</div>
                  <CardTitle className="text-base">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-subtext leading-relaxed">{p.body}</CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border/70 bg-surface shadow-soft p-6">
              <div className="font-medium mb-3">What teams typically notice</div>
              <ul className="text-sm text-subtext list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium text-text">Fewer handoffs</span> and fewer “check with X” moments
                </li>
                <li>
                  <span className="font-medium text-text">Faster cycle times</span> for recurring work
                </li>
                <li>
                  <span className="font-medium text-text">Exceptions surfaced early</span>, with clear next actions
                </li>
                <li>
                  <span className="font-medium text-text">More time</span> for strategy, growth, and customer outcomes
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border/70 bg-surface shadow-soft p-6">
              <div className="font-medium mb-3">A simple principle</div>
              <p className="text-sm text-subtext leading-relaxed">
                And instead of forcing teams to adapt to new tools, we help your{" "}
                <span className="font-semibold text-text">existing software and dashboards adapt</span> to how your business
                actually works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agentic AI */}
      <section id="agentic" className="bg-surface scroll-mt-24">
        <div aria-hidden className="hairline" />
        <div className="container-page section-pad">
          <p className="section-label mb-3 flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-brand2" />
            Agentic AI
          </p>
          <h2 className="section-title mb-4">Agentic AI, explained simply</h2>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div>
              <p className="text-subtext leading-relaxed max-w-prose">
                A capable employee doesn’t wait for step-by-step instructions. They{" "}
                <span className="font-semibold text-text">remember context</span>, understand what matters, take the next
                action, and check the result. <br />
                Agentic AI brings this same loop into software—so systems don’t just inform people, they can{" "}
                <span className="font-semibold text-text">carry responsibility</span> for completing work.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <Brain className="h-5 w-5" aria-hidden="true" />,
                    title: "Memory",
                    text: "keeps context over time—what happened, what was decided, what matters",
                  },
                  {
                    icon: <Cpu className="h-5 w-5" aria-hidden="true" />,
                    title: "Reasoning",
                    text: "interprets the situation and chooses the next best step",
                  },
                  {
                    icon: <Plug className="h-5 w-5" aria-hidden="true" />,
                    title: "Tool use",
                    text: "works across real business systems (not in a separate interface)",
                  },
                  {
                    icon: <Workflow className="h-5 w-5" aria-hidden="true" />,
                    title: "Action + verification",
                    text: "acts, checks the outcome, and continues until complete",
                  },
                ].map((a) => (
                  <div key={a.title} className="rounded-2xl border border-border/70 bg-muted p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-surface border border-border/70 text-brand">{a.icon}</div>
                      <div className="font-medium">{a.title}:</div>
                    </div>
                    <div className="text-sm text-subtext leading-relaxed">{a.text}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-brand/20 bg-brand/5 p-5 text-sm text-subtext leading-relaxed">
                <span className="font-medium text-text">One-line distinction:</span> Automation follows rules. Agentic systems handle
                change and variability without collapsing back onto humans.
              </div>

              <div className="mt-6 rounded-2xl border border-border/70 bg-surface shadow-soft p-6">
                <div className="text-sm font-medium mb-3">What it isn’t</div>
                <ul className="text-sm text-subtext list-disc pl-5 space-y-2">
                  <li>Not a chatbot</li>
                  <li>Not another dashboard</li>
                  <li>Not “advice” that still needs manual execution to become real</li>
                </ul>
              </div>
            </div>

            {/* simple visual metaphor */}
            <div className="rounded-3xl border border-border/70 bg-surface shadow-soft overflow-hidden">
              <div className="p-6">
                <div className="section-label mb-4">The loop</div>
                <div className="grid gap-4">
                  {[
                    { t: "Context", d: "Remember what matters" },
                    { t: "Decide", d: "Choose the next step" },
                    { t: "Act", d: "Execute in your tools" },
                    { t: "Verify", d: "Check and continue" },
                  ].map((x) => (
                    <div key={x.t} className="flex items-start gap-3">
                      <div className="mt-0.5 h-9 w-9 rounded-xl bg-muted border border-border/60 flex items-center justify-center text-brand">
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-medium">{x.t}</div>
                        <div className="text-sm text-subtext">{x.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                aria-hidden
                className="h-20 bg-gradient-to-r from-brand/10 via-surface to-brand2/10 border-t border-border/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="relative overflow-hidden bg-muted scroll-mt-24">
        <div aria-hidden className="hairline" />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-44 right-[-10rem] h-72 w-72 rounded-full bg-brand2/8 blur-3xl" />
          <div className="absolute -bottom-52 left-[-10rem] h-80 w-80 rounded-full bg-brand/8 blur-3xl" />
        </div>
        <div className="relative container-page section-pad">
          <p className="section-label mb-3 flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-brand2" />
            Industries
          </p>
          <h2 className="section-title mb-4">Where manual work quietly eats margin</h2>
          <p className="text-subtext mb-8 max-w-3xl leading-relaxed">
            Different industries look different on the surface. The operational drag is usually the same:{" "}
            <span className="font-semibold text-text">coordination, delays, and exceptions</span>. Use these examples to recognise the
            pattern.
          </p>

          {/* tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {INDUSTRIES.map((x, idx) => {
              const active = idx === industryIdx;
              const Icon = x.Icon;
              return (
                <button
                  key={x.key}
                  type="button"
                  onClick={() => setIndustryIdx(idx)}
                  className={
                    "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-brand/30 focus:ring-offset-2 focus:ring-offset-muted " +
                    (active
                      ? "bg-gradient-to-r from-brand to-brand2 text-white border-transparent shadow-soft"
                      : "bg-surface text-text border-border/70 hover:bg-bg")
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {x.label}
                </button>
              );
            })}
          </div>

          {/* swipeable slides */}
          <div
            className="relative overflow-hidden rounded-3xl select-none"
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
                        <div className="p-2 rounded-xl bg-brand/10 border border-brand/20 text-brand">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-base">{x.label}</CardTitle>
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
                  className={
                    "h-2 w-2 rounded-full transition-colors " + (i === industryIdx ? "bg-brand" : "bg-border")
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Perceptive */}
      <section id="why" className="bg-surface scroll-mt-24">
        <div aria-hidden className="hairline" />
        <div className="container-page section-pad">
          <p className="section-label mb-3 flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-brand2" />
            Why Perceptive
          </p>
          <h2 className="section-title mb-8">Built for real operational reality</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Operations-first (not demo-first)",
                text: "We start from the workflow, the constraints, and the handoffs—not from a model capability list.",
              },
              {
                title: "Works with what you already run",
                text: "We integrate into existing systems and tools—so your software and dashboards adapt to your operations, not the other way around.",
              },
              {
                title: "Designed for exceptions",
                text: "Real operations live in edge cases. We build so workflows don’t collapse when reality changes.",
              },
              {
                title: "Builders and partners",
                text: "We build agent systems internally (retail-first) and also implement custom intelligence for client operations.",
              },
              {
                title: "Human value stays central",
                text: "The goal isn’t “more AI.” The goal is less unnecessary work—so people can create more value.",
              },
            ].map((w) => (
              <div key={w.title} className="rounded-2xl border border-border/70 bg-muted p-6">
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 h-7 w-7 rounded-full bg-gradient-to-r from-brand to-brand2 text-white flex items-center justify-center text-sm"
                    aria-hidden="true"
                  >
                    ✓
                  </div>
                  <div>
                    <div className="font-medium mb-1">{w.title}</div>
                    <div className="text-sm text-subtext leading-relaxed">{w.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="bg-muted scroll-mt-24">
        <div aria-hidden className="hairline" />
        <div className="container-page section-pad">
          <p className="section-label mb-3 flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-brand2" />
            Offerings
          </p>
          <h2 className="section-title mb-8">Two ways to work with Perceptive</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-2xl">
              <CardHeader className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand/10 border border-brand/20 text-brand">
                  <Store className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">Retail agent systems (internal)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-subtext leading-relaxed">
                We build and operate agentic systems for retail operations internally. This keeps our work grounded in real
                constraints: imperfect data, exceptions, coordination across teams, and the need for consistent execution.
                <div className="mt-4 text-subtext">
                  <span className="font-medium">Typical areas (examples, not a catalog):</span>
                  <div className="mt-2">Inventory & replenishment · Store operations · Vendor coordination · Pricing & promotions</div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand/10 border border-brand/20 text-brand">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">Custom intelligence for your operations</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-subtext leading-relaxed">
                We partner with businesses to design and implement intelligent systems tailored to your workflows, tools,
                and goals—so operations become lighter and faster without forcing a rip-and-replace transformation.
                <div className="mt-4 text-subtext">
                  <span className="font-medium">Typical areas:</span>
                  <div className="mt-2">Finance ops · Supply chain & logistics · Manufacturing ops · Shared services & internal workflows</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 rounded-2xl border border-border/70 bg-surface shadow-soft p-6">
            <div className="font-medium mb-4">Engagement shape (simple, not “architecture”)</div>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-subtext">
              <div className="rounded-2xl bg-muted border border-border/70 p-5">
                <div className="font-medium mb-1">Diagnose the drag</div>
                <div>identify where time and decisions get stuck</div>
              </div>
              <div className="rounded-2xl bg-muted border border-border/70 p-5">
                <div className="font-medium mb-1">Design + implement</div>
                <div>embed intelligence into the workflow and tools</div>
              </div>
              <div className="rounded-2xl bg-muted border border-border/70 p-5">
                <div className="font-medium mb-1">Operate + improve</div>
                <div>measure outcomes, tune, expand to adjacent workflows</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-surface scroll-mt-24">
        <div aria-hidden className="hairline" />
        <div className="container-page section-pad grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="section-label mb-3 flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-brand2" />
              Contact
            </p>
            <h2 className="section-title mb-4">Tell us what’s slowing you down</h2>
            <p className="text-subtext max-w-xl leading-relaxed">
              Share the <span className="font-semibold text-text">workflow</span>, the systems involved, and the{" "}
              <span className="font-semibold text-text">outcome you want</span>. We’ll reply with what we’d change—and what it
              would take to implement.
            </p>
          </div>

          <div>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <Input
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl"
                required
              />
              <Input
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl"
                required
              />
              <Textarea
                name="message"
                placeholder="Workflow + tools involved + outcome you want."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-2xl"
                required
              />
              <Button type="submit" className="rounded-2xl" disabled={sending}>
                {sending ? "Sending..." : "Send"}
              </Button>
              {sent && <p className="text-sm text-emerald-600">Thanks! We’ll reply from team@perceptivelabs.in.</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
            <p className="text-sm text-subtext mt-4">
              Prefer email?{" "}
              <a className="underline hover:text-brand" href="mailto:team@perceptivelabs.in">
                team@perceptivelabs.in
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg">
        <div aria-hidden className="hairline" />
        <div className="container-page py-10 grid md:grid-cols-3 gap-6 text-sm text-subtext">
          <div className="flex items-start gap-3">
            <img src="/logo.png" alt="Perceptive Labs" className="h-9 w-auto rounded" />
            <div>
              <div className="font-semibold text-text">Perceptive Labs</div>
              <div>Intelligence for the business of tomorrow.</div>
            </div>
          </div>

          <div>
            <div className="font-medium text-text mb-2">Quick links</div>
            <ul className="space-y-2">
              {[
                ["#overview", "Overview"],
                ["#industries", "Industries"],
                ["#offerings", "Offerings"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-brand">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-medium text-text mb-2">Contact</div>
            <div>
              <a className="underline hover:text-brand" href="mailto:team@perceptivelabs.in">
                team@perceptivelabs.in
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
