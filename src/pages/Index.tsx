import { Button } from "@/components/ui/button";
import {
  Shield,
  FileText,
  Users,
  Award,
  History,
  Lock,
  ClipboardList,
  Vote,
  Bell,
  Mail,
  CheckCircle2,
  Building2,
  Leaf,
  ArrowRight,
  Linkedin,
} from "lucide-react";
import heroImage from "@/assets/hero-vault.jpg";
import heroVideo from "@/assets/hero-demo.mp4";
import HeroMediaCard from "@/components/HeroMediaCard";
import YouTubePlayer from "@/components/YouTubePlayer";
import { useState } from "react";

const SOCIETY_VIDEO = "th56jdG5jRE";
const BUILDER_VIDEO = "YM7kL-mTvPY";

const Section = ({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <div className="container max-w-6xl">
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
          <Leaf className="h-3.5 w-3.5" /> {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1] text-foreground max-w-3xl mb-8">
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
);

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) => (
  <div className="group rounded-2xl bg-gradient-card p-6 border border-border shadow-soft hover:shadow-glow transition-smooth">
    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground leading-relaxed text-[0.95rem]">{desc}</p>
  </div>
);

const registers = [
  "Flat ownership & resale records",
  "Register of Members (Form I)",
  "List of Members (Form J)",
  "Nomination register",
  "Shares register (allocation)",
  "Shares ledger (transfer trail)",
  "Asset register",
  "Investment register — sinking, repair, reserve funds",
  "Property register — common spaces & amenities",
  "Proceeding book — MC, AGM, SGM minutes",
  "Notice board with trail & ageing",
  "Online elections — OTP authenticated voting",
];

const Index = () => {
  // Only one demo player is mounted at a time — starting one stops the other.
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="container max-w-6xl flex items-center justify-between py-6">
          <a href="#" className="flex items-center gap-2 text-primary-foreground">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/15 backdrop-blur">
              <Shield className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">soc-doc-loc</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/80">
            <a href="#how" className="hover:text-primary-foreground transition-smooth">How it works</a>
            <a href="#security" className="hover:text-primary-foreground transition-smooth">Security</a>
            <a href="#registers" className="hover:text-primary-foreground transition-smooth">What we maintain</a>
            <a href="#pricing" className="hover:text-primary-foreground transition-smooth">Pricing</a>
            <a href="https://socdocloc.wordpress.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-smooth">Blog</a>
          </nav>
          <Button variant="soft" size="sm" asChild>
            <a href="#contact">Request access</a>
          </Button>
        </div>
      </header>

      {/* PANEL 1 — HERO */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(hsl(var(--primary-foreground)/0.4)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container max-w-6xl relative pt-36 pb-24 md:pt-44 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur">
              <Leaf className="h-3 w-3" /> For CHSs & RWAs
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
              soc-doc-loc
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-xl leading-relaxed">
              A secure members data & document repository — built to meet compliance mandates and earn your society the
              <span className="text-primary-foreground font-medium"> Class A audit certificate</span>.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="soft" size="xl" asChild>
                <a href="#contact">
                  Create my society account <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <p className="self-center text-sm text-primary-foreground/70">
                Onboarded by invitation — no self subscription.
              </p>
            </div>
          </div>
          <div className="md:justify-self-end w-full">
            <HeroMediaCard
              image={heroImage}
              video={heroVideo}
              alt="Secure digital vault for housing society documents"
            />
          </div>
        </div>
      </section>

      {/* PANEL 2 */}
      <Section
        eyebrow="From paper to permanent"
        title="A digital replica of every register, ledger and member record."
      >
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Many RWAs and Co-operative Housing Societies still maintain physical, hand-written registers. It is
            practically impossible to keep such details accurate, searchable and intact at granular depth on paper —
            ink fades, pages tear, custodians change.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">soc-doc-loc digitizes all of it</span> — a faithful, structured
            replica of every official document your society is required to maintain, kept secure for generations of
            committees to come.
          </p>
        </div>

        {/* YouTube videos — side by side */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Video 1 — For Housing Societies */}
          <div className="group flex flex-col gap-4">
            {/* Audience tag + title */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                For Housing Societies &amp; RWAs
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-foreground leading-snug">
                See how your society's records<br className="hidden sm:block" /> get digitised
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A guided demo of the member portal, registers and audit trail — built for office bearers and MC members.
              </p>
            </div>
            {/* player */}
            <div className="overflow-hidden rounded-xl border border-border shadow-soft group-hover:shadow-glow transition-smooth">
              <YouTubePlayer
                videoId={SOCIETY_VIDEO}
                title="soc-doc-loc demo for housing societies and RWAs"
                active={activeVideo === SOCIETY_VIDEO}
                onActivate={() => setActiveVideo(SOCIETY_VIDEO)}
              />
            </div>
            <a
              href="https://www.youtube.com/watch?v=th56jdG5jRE"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-xs text-muted-foreground hover:text-primary transition-smooth flex items-center gap-1"
            >
              Watch on YouTube ↗
            </a>
          </div>

          {/* Video 2 — For Builders */}
          <div className="group flex flex-col gap-4">
            {/* Audience tag + title */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                For Builders &amp; Developers
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-foreground leading-snug">
                Onboard your new project's<br className="hidden sm:block" /> residents from day one
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                How builders and developers can hand over a fully configured soc-doc-loc locker alongside possession of the property.
              </p>
            </div>
            {/* player */}
            <div className="overflow-hidden rounded-xl border border-border shadow-soft group-hover:shadow-glow transition-smooth">
              <YouTubePlayer
                videoId={BUILDER_VIDEO}
                title="soc-doc-loc demo for builders and developers"
                active={activeVideo === BUILDER_VIDEO}
                onActivate={() => setActiveVideo(BUILDER_VIDEO)}
              />
            </div>
            <a
              href="https://www.youtube.com/watch?v=YM7kL-mTvPY"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-xs text-muted-foreground hover:text-primary transition-smooth flex items-center gap-1"
            >
              Watch on YouTube ↗
            </a>
          </div>
        </div>
      </Section>

      {/* PANEL 3 */}
      <Section
        className="bg-gradient-soft"
        eyebrow="Class A audit"
        title="Wear the medal of pride — earn your Class A audit certificate."
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Under the Maharashtra Co-operative Societies Act and the model bye-laws (No. 141–147), every society
              must maintain a prescribed set of accounts, registers and records. Statutory auditors grade societies
              <span className="text-foreground font-medium"> A, B, C or D</span> based on completeness of records,
              timely accounting, internal controls, member compliance and adherence to the bye-laws.
            </p>
            <p>
              A <span className="text-foreground font-medium">Class A grade</span> signals an exceptionally well-run
              society — one whose books, minutes and member records stand up to scrutiny without exception.
            </p>
            <p>
              soc-doc-loc gives office bearers a single, organised place to maintain all required records — and gives
              government & third-party auditors a clean, read-only review trail. Less scrambling, fewer queries,
              better grade.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
            <Award className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-display text-2xl font-semibold mb-2">Audit-ready, always</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                "Complete bye-law register coverage",
                "Time-stamped change history",
                "One-click auditor review access",
                "Member-verified data accuracy",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* PANEL 4 */}
      <Section id="how" eyebrow="How it works" title="Three roles. One trusted record.">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={ClipboardList}
            title="Admins & MC members input"
            desc="Office bearers digitise the data they hold today in physical registers — one structured form at a time."
          />
          <FeatureCard
            icon={Users}
            title="Members view & verify"
            desc="Society members securely view and review the data and documents that belong to them, and seek corrections."
          />
          <FeatureCard
            icon={Shield}
            title="Auditors review"
            desc="Government and third-party auditors get scoped access to inspect the records and run compliance checks."
          />
        </div>
      </Section>

      {/* PANEL 5 */}
      <Section
        className="bg-gradient-soft"
        eyebrow="Accountability"
        title="Every change, traced. No data ever lost."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={History}
            title="Complete change trail"
            desc="See who changed what and when — every edit on every record is permanently logged for accountability."
          />
          <FeatureCard
            icon={Building2}
            title="Continuity across committees"
            desc="No data loss when management committees change hands. New office bearers inherit a clean, complete archive."
          />
        </div>
      </Section>

      {/* PANEL 6 — SECURITY */}
      <Section id="security" eyebrow="Security & privacy" title="Built like a vault. Locked by default.">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Shield, title: "DPDP Act compliant", desc: "Meets India's Digital Personal Data Protection Act requirements." },
            { icon: Shield, title: "GDPR compliant", desc: "Aligned to GDPR principles for data minimisation and consent." },
            { icon: Lock, title: "Physical data isolation", desc: "Each society's data is logically and physically isolated to prevent leakage." },
            { icon: Lock, title: "No bulk export", desc: "Bulk export is disabled by design — preventing mass circulation in open networks." },
            { icon: Users, title: "Identity masking", desc: "Only admins can view identity details. For everyone else, sensitive fields stay masked." },
            { icon: Leaf, title: "Never shared, ever", desc: "Your data is never shared with any third party for any reason. You own it — we just protect it." },
          ].map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
        <p className="mt-10 text-center text-muted-foreground italic">
          You own it. We provide the safety locker to maintain and organise it.
        </p>
      </Section>

      {/* PANEL 7 — REGISTERS */}
      <Section
        id="registers"
        className="bg-gradient-soft"
        eyebrow="Everything in one locker"
        title="soc-doc-loc maintains all of the following."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {registers.map((r) => (
            <div
              key={r}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft hover:shadow-glow transition-smooth"
            >
              <FileText className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-foreground font-medium">{r}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-primary/5 border border-primary/10 p-4">
            <Vote className="h-5 w-5 text-primary" />
            <p className="text-sm text-foreground"><span className="font-semibold">Online elections</span> — identity-authenticated MC voting.</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-primary/5 border border-primary/10 p-4">
            <Bell className="h-5 w-5 text-primary" />
            <p className="text-sm text-foreground"><span className="font-semibold">All notifications</span> — delivered on email.</p>
          </div>
        </div>
      </Section>

      {/* PANEL 8 — PRICING */}
      <Section id="pricing" eyebrow="Pricing" title="Simple, society-friendly.">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 rounded-3xl bg-gradient-hero text-primary-foreground p-10 shadow-glow">
            <p className="text-sm uppercase tracking-widest text-primary-foreground/70">Per flat, per year</p>
            <p className="mt-3 font-display text-6xl font-semibold">₹200</p>
            <p className="mt-4 text-primary-foreground/80 text-sm leading-relaxed">
              Inclusive of your society's own secure website, password-less login, and all registers listed above.
            </p>
          </div>
          <ul className="md:col-span-3 space-y-4">
            {[
              "Your own society website members can access securely",
              "Password-less sign-in — email OTP based",
              "Publish rules and guidelines for easy member access",
              "Unlimited admins, members, registers and uploads",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-base">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* PANEL 9 — CTA */}
      <section id="contact" className="py-24 md:py-32">
        <div className="container max-w-4xl">
          <div className="rounded-3xl bg-gradient-hero text-primary-foreground p-12 md:p-16 text-center shadow-glow">
            <Leaf className="h-8 w-8 mx-auto mb-4 opacity-80" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Onboard your housing society on soc-doc-loc.
            </h2>
            <p className="mt-5 text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Reach out and our team will set up your society's secure locker, train your committee, and migrate your existing records.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button variant="soft" size="xl" asChild>
                <a href="mailto:socdocloc@gmail.com">
                  <Mail className="h-4 w-4" /> Contact to onboard
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PANEL 10 — FOOTER */}
      <footer className="border-t border-border bg-secondary/40">
        <div className="container max-w-6xl py-12 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </span>
              <span className="font-display text-lg font-semibold">soc-doc-loc</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              A secure members data & document repository for Co-operative Housing Societies and Resident Welfare Associations.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground/60 font-semibold mb-3">Product</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#how" className="hover:text-foreground transition-smooth">How it works</a></li>
              <li><a href="#registers" className="hover:text-foreground transition-smooth">Registers maintained</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-smooth">Pricing</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground/60 font-semibold mb-3">Company</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#security" className="hover:text-foreground transition-smooth">Security</a></li>
              <li><a href="https://socdocloc.wordpress.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-smooth">Blog</a></li>
              <li><a href="mailto:socdocloc@gmail.com" className="hover:text-foreground transition-smooth">Contact</a></li>
              <li><span>Privacy · Terms</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="container max-w-6xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()}  ·  RISEAUT CONSULTING —{"  "}
              <a
                href="https://riseaut.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-primary/80 transition-smooth"
              >
                riseaut.com
              </a>
            </p>
            <div className="flex items-center gap-3">
              <p>Compliant with India's DPDP Act & GDPR.</p>
              <a
                href="https://www.linkedin.com/company/soc-doc-loc"
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
