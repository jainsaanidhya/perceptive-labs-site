import React, { useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  ArrowRight,
  Play,
  Shield,
  Smartphone,
  Store,
  LineChart,
  Bot,
  Zap,
  Layers,
  Cpu,
  Workflow,
  ShieldCheck,
  Building2,
  LayoutDashboard,
  Plug,
  MessageSquare,
  Menu,
  X,
  Package,
  TrendingUp,
  Truck,
  Users,
  Brain,
  Wallet,
} from "lucide-react";

export default function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  // form status
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const WORKER_URL = "https://perceptive-contact.jainsaanidhya.workers.dev/"; // <-- replace with your Worker endpoint

  // ===== CTA handlers =====
  const handleBriefing = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

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

  // ===== Agents data (richer, impact + actions) =====
  const AGENTS = [
    {
      key: "SALES & INVENTORY AGENTS",
      icon: <Package className="h-5 w-5" />,
      tagline: "Never miss a sale. Stock what moves.",
      impact: ["Stockouts ↓ 25–40%", "Sell-through ↑ 10–20%", "Dead stock ↓", "Expiry risk ↓"],
      actions: [
        "Replenishment windows by store/SKU",
        "Slow-mover & dead-stock sweeps",
        "Expiry & batch risk watch",
        "Elasticity-aware price nudges",
        "Promo lift targeting on fast movers",
      ],
    },
    {
      key: "BUSINESS PROFITABILITY AGENTS",
      icon: <TrendingUp className="h-5 w-5" />,
      tagline: "Margin up without guesswork.",
      impact: ["Gross margin ↑ 2–5%", "Waste & shrink ↓", "Revenue quality ↑"],
      actions: [
        "Mix & markdown optimization",
        "Basket-affinity bundles",
        "ROI guardrails for discounts",
        "High-leverage price changes",
        "Zero/negative margin detectors",
      ],
    },
    {
      key: "VENDOR & PURCHASE AGENTS",
      icon: <Truck className="h-5 w-5" />,
      tagline: "Buy smarter. Faster. With proof.",
      impact: ["Lead time ↓", "Fill rate ↑", "Cost-to-serve ↓"],
      actions: [
        "PO suggestions from reorder logic",
        "Vendor switch / renegotiate packs",
        "Payment-terms scoring",
        "SLA breach evidence & alerts",
        "WhatsApp PO drafts to vendors",
      ],
    },
    {
      key: "CUSTOMER & LOYALTY AGENTS",
      icon: <Users className="h-5 w-5" />,
      tagline: "Retain, re-activate, and grow baskets.",
      impact: ["Repeat rate ↑", "AOV ↑", "Churn ↓"],
      actions: [
        "RFM & loyalty tagging",
        "Win-back flows for lapsing buyers",
        "Segments & WhatsApp templates",
        "Coupons to clear overstock",
        "Local-language nudges",
      ],
    },
    {
      key: "INSIGHT & STRATEGY AGENTS",
      icon: <Brain className="h-5 w-5" />,
      tagline: "From ‘what happened’ to ‘what to do next’.",
      impact: ["Assortment gaps closed", "Better store clusters", "Festive/seasonal planning ↑"],
      actions: [
        "Root-cause analysis (price, vendor, depth)",
        "Assortment depth planner",
        "Store clusters & micro-markets",
        "What-if simulators & briefings",
        "Weekly business health score",
      ],
    },
    {
      key: "EXPENSE & CASHFLOW AGENTS",
      icon: <Wallet className="h-5 w-5" />,
      tagline: "See spend early. Keep cash moving.",
      impact: ["Run-rate visibility ↑", "Leakage ↓", "Cash conversion ↑"],
      actions: [
        "Expense autopilot & anomalies",
        "Cashflow runway alerts",
        "Vendor dues scheduling",
        "EMI & payout calendars",
        "Shrink detection signals",
      ],
    },
  ];

  // ===== Carousel state + swipe handling =====
  const [agentIdx, setAgentIdx] = useState(0);
  const next = () => setAgentIdx((i) => (i + 1) % AGENTS.length);
  const prev = () => setAgentIdx((i) => (i - 1 + AGENTS.length) % AGENTS.length);

  const startX = useRef(0);
  const lastX = useRef(0);
  const dragging = useRef(false);
  const threshold = 48; // px to trigger swipe

  const getX = (e) =>
    "touches" in e ? e.touches[0].clientX : "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;

  const onStart = (e) => {
    dragging.current = true;
    startX.current = getX(e);
    lastX.current = startX.current;
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    lastX.current = getX(e);
  };
  const onEnd = () => {
    if (!dragging.current) return;
    const delta = lastX.current - startX.current;
    if (delta > threshold) prev();
    if (delta < -threshold) next();
    dragging.current = false;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#overview" className="flex items-center gap-2 group">
            {/* Put your logo at /public/logo.png */}
            <img src="/logo.png" alt="Perceptive Labs" className="h-9 w-auto rounded" />
            <span className="font-semibold text-lg group-hover:opacity-90">Perceptive Labs</span>
            <span className="hidden sm:inline text-xs text-gray-500 ml-2">Agentic Suite</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#overview" className="hover:text-black">Overview</a>
            <a href="#suite" className="hover:text-black">Suite</a>
            <a href="#industries" className="hover:text-black">Industries</a>
            <a href="#agents" className="hover:text-black">Agents</a>
            <a href="#principles" className="hover:text-black">Principles</a>
            <a href="#resources" className="hover:text-black">Resources</a>
            <a href="#contact" className="hover:text-black">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="md:hidden" onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Button className="rounded-2xl" onClick={handleBriefing}>Request access</Button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t">
            <div className="max-w-6xl mx-auto px-4 py-3 grid gap-3 text-sm">
              {[
                ["#overview", "Overview"],
                ["#suite", "Suite"],
                ["#industries", "Industries"],
                ["#agents", "Agents"],
                ["#principles", "Principles"],
                ["#resources", "Resources"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="py-2">
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="overview" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center text-white">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
              Perceptive Labs · Agentic Suite for Retail
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Empowering retail with AI agents that{" "}
              <span className="underline decoration-wavy decoration-gray-500">decide & deliver</span>
            </h1>
            <p className="text-gray-300 mb-4">
              We connect your <strong>sales, inventory, suppliers, and customers</strong> into one intelligent
              system that doesn’t just report data — it <strong>acts on it</strong>.
            </p>
            <p className="text-gray-300 mb-6">
              <strong>You stay in control.</strong> The system <strong>anticipates</strong> what your business needs
              and <strong>delivers coordinated actions</strong>.
            </p>
            <p className="text-gray-300 mb-6">
              The result? <strong>Seamless operations</strong>, healthier margins, and a business that’s always one step ahead.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="rounded-2xl" onClick={handleBriefing}>
                Request a briefing
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-white/30 text-white hover:bg-white/10"
              >
                <Play className="h-4 w-4 mr-2" />
                Watch concept trailer
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2"><Shield className="h-4 w-4" />Privacy-first</div>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4" />Offline-capable</div>
              <div className="flex items-center gap-2"><Smartphone className="h-4 w-4" />Phone & desktop</div>
            </div>
          </div>
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
            <div className="text-xs text-gray-300 mb-2">Agent feed · Today</div>
            {[
              "Replenish 18 SKUs before Friday; margin impact +2.1%",
              "Shift 20% promo budget from low-lift items to fast movers",
              "Vendor swap for biscuits; expected lead-time −3 days",
              "Draft WhatsApp for price-sensitive buyers in Zone B",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2 py-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <div className="text-sm text-gray-100">{t}</div>
              </div>
            ))}
            <Button className="mt-4 w-full rounded-2xl bg-white text-gray-900 hover:bg-gray-100">
              Apply all <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Suite overview */}
      <section id="suite" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-semibold mb-2">The Agentic Suite</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            A layered system that moves from data → decisions → delivery, with governance built-in.
            Modern, modular, and ready for real-world retail.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Layers className="h-5 w-5" />, t: "Data Layer", d: "Connect POS, Excel/CSV, vendor lists. Clean & unify SKUs, vendors, customers." },
              { icon: <Cpu className="h-5 w-5" />, t: "Reasoning Layer", d: "Causal models rank purchase, price, and promo moves by expected ROI." },
              { icon: <Workflow className="h-5 w-5" />, t: "Action Layer", d: "One-click execution: WhatsApp, lists, emails, ERP bridges—no new habits required." },
              { icon: <ShieldCheck className="h-5 w-5" />, t: "Assurance Layer", d: "Privacy, on-prem options, audit trails and human-in-the-loop controls." },
            ].map((s, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gray-50">{s.icon}</div>
                  <CardTitle className="text-base">{s.t}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">{s.d}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h3 className="text-xl font-semibold mb-6">Agentic Suite modules</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <LayoutDashboard className="h-5 w-5" />, t: "Command Console", d: "Review agent suggestions, approve in bulk, and track impact." },
              { icon: <Bot className="h-5 w-5" />, t: "Retail Agents", d: "Specialists for Replenish, Price, Promo, Vendor—coordinated, not siloed." },
              { icon: <Plug className="h-5 w-5" />, t: "Connector Hub", d: "POS/Excel/CSV now; ERP and marketplace bridges next." },
              { icon: <MessageSquare className="h-5 w-5" />, t: "WhatsApp Workbench", d: "Ready-to-send messages to customers & suppliers—multi-language." },
              { icon: <Building2 className="h-5 w-5" />, t: "ERP Bridges", d: "Voucher-safe exports and imports to your existing systems." },
              { icon: <LineChart className="h-5 w-5" />, t: "Impact Feeds", d: "Before/after metrics and weekly impact notes you can trust." },
            ].map((m, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white">{m.icon}</div>
                  <CardTitle className="text-base">{m.t}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">{m.d}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="bg-white border-y">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-semibold mb-6">Designed for modern retail</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Store className="h-5 w-5" />, title: "Grocery & Convenience", pts: ["Smart replenishment", "Expiry risk watch", "Promo lift guidance"] },
              { icon: <Store className="h-5 w-5" />, title: "Pharmacy", pts: ["Batch/expiry controls", "Shortage radar", "Therapy substitutions"] },
              { icon: <Store className="h-5 w-5" />, title: "Quick-service F&B", pts: ["Recipe costing", "Prep forecasts", "Vendor price checks"] },
              { icon: <Store className="h-5 w-5" />, title: "Electronics", pts: ["Assortment gaps", "Seasonal price nudges", "Warranty funnel nudges"] },
              { icon: <Store className="h-5 w-5" />, title: "Fashion", pts: ["Size-color depth", "Markdown planning", "Repeat buyer activation"] },
              { icon: <Store className="h-5 w-5" />, title: "Home & Lifestyle", pts: ["Bundle suggestions", "Vendor SLAs", "Regional preferences"] },
            ].map((b, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gray-50">{b.icon}</div>
                  <CardTitle className="text-base">{b.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    {b.pts.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AGENTS — swipeable carousel */}
      <section id="agents" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Agents that act — not just report</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-2xl" onClick={prev} aria-label="Previous">‹</Button>
              <Button variant="outline" className="rounded-2xl" onClick={next} aria-label="Next">›</Button>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl select-none"
            style={{ touchAction: "pan-y" }}
            onTouchStart={onStart}
            onTouchMove={onMove}
            onTouchEnd={onEnd}
            onMouseDown={(e) => {
              e.preventDefault();
              onStart(e);
            }}
            onMouseMove={onMove}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
          >
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${agentIdx * 100}%)`, width: `${AGENTS.length * 100}%` }}
            >
              {AGENTS.map((a, i) => (
                <div key={i} className="w-full shrink-0" style={{ width: "100%" }}>
                  <Card className="rounded-2xl">
                    <CardHeader className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white">{a.icon}</div>
                      <div>
                        <CardTitle className="text-base">{a.key}</CardTitle>
                        <div className="text-sm text-gray-600">{a.tagline}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {a.impact.map((chip, j) => (
                          <span key={j} className="text-xs px-3 py-1 rounded-full bg-gray-100 border">{chip}</span>
                        ))}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <ul className="list-disc pl-5 space-y-1">
                          {a.actions.slice(0, Math.ceil(a.actions.length / 2)).map((p, j) => <li key={j}>{p}</li>)}
                        </ul>
                        <ul className="list-disc pl-5 space-y-1">
                          {a.actions.slice(Math.ceil(a.actions.length / 2)).map((p, j) => <li key={j}>{p}</li>)}
                        </ul>
                      </div>
                      <div className="mt-5">
                        <Button className="rounded-2xl" onClick={handleBriefing}>
                          See a 5-min walkthrough <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {AGENTS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setAgentIdx(i)}
                  className={`h-2 w-2 rounded-full ${i === agentIdx ? "bg-gray-900" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why different */}
      <section className="bg-white border-y">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-semibold mb-4">Why it’s different</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div className="p-5 bg-gray-50 rounded-2xl border">
              <div className="font-medium mb-1">Root-cause intelligence</div>
              <div>Agents trace <em>why</em> (vendor lead time, price elasticity, assortment depth) and propose the fix — not just flag symptoms.</div>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border">
              <div className="font-medium mb-1">Actions over dashboards</div>
              <div>Every insight becomes an actionable list, message, or export. Move the business, not pixels.</div>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border">
              <div className="font-medium mb-1">Human-in-the-loop control</div>
              <div>Agents propose; you approve. Audit trail on every step. Private by design, offline-capable.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-semibold mb-6">Principles we won’t compromise</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck className="h-5 w-5" />, t: "Privacy by design", d: "Own your data. On-prem options. No data brokers." },
              { icon: <Workflow className="h-5 w-5" />, t: "Human in the loop", d: "Agents propose. You approve. Audit trail everywhere." },
              { icon: <Zap className="h-5 w-5" />, t: "Real-world speed", d: "Fast on modest hardware. Offline-capable." },
              { icon: <LineChart className="h-5 w-5" />, t: "Measured impact", d: "Before/after metrics, not vanity charts." },
            ].map((p, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gray-50">{p.icon}</div>
                  <CardTitle className="text-base">{p.t}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">{p.d}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-3">Launch resources</h3>
            <div className="grid gap-3">
              {["Briefing deck (PDF)", "Vision note: Agentic retail", "Pilot playbook (4 weeks)"].map((g, i) => (
                <a key={i} className="p-4 bg-white rounded-2xl border hover:shadow-sm" href="#">
                  {g}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">FAQs</h3>
            <ul className="text-sm text-gray-700 space-y-3">
              <li><span className="font-medium">Is this a dashboard?</span> No—agents produce actions you can execute.</li>
              <li><span className="font-medium">Will it work with my POS?</span> Yes—via CSV/Excel now, connectors next.</li>
              <li><span className="font-medium">How private is my data?</span> Local or on-prem with audit trails.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white border-t">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-semibold mb-6">Request access</h2>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-2xl" required />
            <Input type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl" required />
            <Textarea
              placeholder="Tell us about your retail footprint (stores, categories)"
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
          <p className="text-sm text-gray-500 mt-4">
            Prefer email? <a className="underline" href="mailto:team@perceptivelabs.in">team@perceptivelabs.in</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 grid md:grid-cols-4 gap-6">
          <div>
            <div className="font-semibold text-gray-900 mb-2">Perceptive Labs</div>
            <p>Agentic Suite for retail. Decide & deliver.</p>
          </div>
          <div>
            <div className="font-medium text-gray-900 mb-2">Company</div>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-black">Overview</a></li>
              <li><a href="#suite" className="hover:text-black">Suite</a></li>
              <li><a href="#contact" className="hover:text-black">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-gray-900 mb-2">Legal</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black">Privacy</a></li>
              <li><a href="#" className="hover:text-black">Terms</a></li>
              <li><a href="#" className="hover:text-black">Security</a></li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-gray-900 mb-2">Stay in touch</div>
            <div className="flex gap-2">
              <Input placeholder="Email" className="rounded-2xl" />
              <Button className="rounded-2xl">Subscribe</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
