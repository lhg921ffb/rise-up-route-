import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Flame, Dumbbell, Zap, Users, UserCheck, Repeat,
  Star, MapPin, Clock, Shield, Award, Heart, Lock,
  ChevronDown,
} from "lucide-react";
import { useState, Suspense } from "react";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { HeroScene } from "@/components/HeroScene";
import { BenefitsMindMap } from "@/components/BenefitsMindMap";
import heroAsset from "@/assets/hero.jpg.asset.json";
import coachAsset from "@/assets/coach.jpg.asset.json";
import t1Asset from "@/assets/t1.jpg.asset.json";
import t2Asset from "@/assets/t2.jpg.asset.json";
import t3Asset from "@/assets/t3.jpg.asset.json";
import ba1Asset from "@/assets/sara.jpg.asset.json";
import ba2Asset from "@/assets/mark.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IRON RISE Bootcamp — Transform in 6 Weeks" },
      { name: "description", content: "Premium outdoor bootcamp. 8 spots per group. Coach-led, results-driven. Reserve your spot." },
      { property: "og:title", content: "IRON RISE Bootcamp — Transform in 6 Weeks" },
      { property: "og:description", content: "Premium outdoor bootcamp for people ready to change." },
      { property: "og:image", content: heroAsset.url },
      { name: "twitter:image", content: heroAsset.url },
    ],
  }),
  component: Landing,
});

const benefitIcons = [Flame, Dumbbell, Zap, Users, UserCheck, Repeat];
const trustIcons = [Shield, Heart, Lock, Award];

function Landing() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed top bar with language toggle only */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-8">
        <div className="pointer-events-auto font-display text-xl tracking-[0.2em] text-white drop-shadow-lg">
          {t.brand}
        </div>
        <div className="pointer-events-auto">
          <LanguageToggle />
        </div>
      </div>

      {/* HERO */}
      <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#1a0f0a]">
        <Suspense fallback={<div className="flex items-center justify-center min-h-[100svh]">Loading hero...</div>}>
          <HeroScene />
        </Suspense>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col justify-end px-5 pb-14 pt-32 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-glow">
              {t.hero.location} — {t.hero.duration}
            </p>

            <h1 className="mt-5 font-display text-5xl leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
              {t.hero.headline}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t.hero.sub}
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                to="/apply"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-none bg-primary px-8 py-4 text-base font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary-glow glow-red"
              >
                <span className="relative z-10">{t.hero.cta} →</span>
              </Link>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <div className="flex -space-x-2">
                  {[t1Asset, t2Asset, t3Asset].map((a) => (
                    <img key={a.url} src={a.url} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />
                  ))}
                </div>
                <span>{t.hero.members} · ★ {t.hero.rating.split(" ")[0]}</span>
              </div>
            </div>

            {/* Meta strip */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {[
                { i: MapPin, v: t.hero.location },
                { i: Clock, v: t.hero.duration },
                { i: Users, v: t.hero.groupSize },
              ].map(({ i: Icon, v }) => (
                <div key={v} className="glass flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-white/90 sm:text-sm">
                  <Icon className="h-4 w-4 shrink-0 text-primary-glow" />
                  <span className="truncate">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-y border-white/5 bg-black/40">
        <div className="mx-auto max-w-5xl px-5 py-8">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-white/40">
            {t.trust.title}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {t.trust.items.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <div key={item} className="flex items-center justify-center gap-2 text-white/70">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider sm:text-sm">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS — Mind Map */}
      <Section>
        <SectionHeader eyebrow="01 · Results" title={t.benefits.title} sub={t.benefits.sub} />
        <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]">Loading benefits...</div>}>
          <BenefitsMindMap centerLabel={t.benefits.title} />
        </Suspense>
      </section>


      {/* TRANSFORMATION */}
      <Section>
        <SectionHeader eyebrow="02 · Proof" title={t.transformation.title} sub={t.transformation.sub} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { img: ba1Asset.url, ...t.transformation.case1 },
            { img: ba2Asset.url, ...t.transformation.case2 },
          ].map((c) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass overflow-hidden rounded-2xl"
            >
              <div className="relative">
                <img src={c.img} loading="lazy" alt="" className="aspect-[4/3] w-full object-cover" />
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-primary/60" />
                <div className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur">
                  {t.transformation.before}
                </div>
                <div className="absolute right-3 top-3 rounded-md bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  {t.transformation.after}
                </div>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="font-display text-lg tracking-wide text-white">{c.name}</div>
                <div className="text-sm font-semibold text-primary-glow">{c.result}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* COACH */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <img src={coachAsset.url} loading="lazy" alt={t.coach.name} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </motion.div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary-glow">{t.coach.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-tight text-white sm:text-5xl">
              {t.coach.name}
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-white/50">{t.coach.title}</p>
            <p className="mt-6 text-base leading-relaxed text-white/70">{t.coach.bio}</p>
            <Link
              to="/apply"
              className="mt-8 inline-flex items-center justify-center rounded-none bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary-glow glow-red"
            >
              {t.coach.cta} →
            </Link>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <SectionHeader eyebrow="03 · Voices" title={t.testimonials.title} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.testimonials.items.map((tItem, i) => {
            const imgs = [t1Asset.url, t2Asset.url, t3Asset.url];
            return (
              <motion.div
                key={tItem.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass flex flex-col rounded-2xl p-6"
              >
                <div className="flex gap-0.5 text-primary-glow">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/80">"{tItem.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={imgs[i]} alt="" className="h-10 w-10 rounded-full object-cover" />
                  <div className="text-sm font-semibold text-white">{tItem.name}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader eyebrow="04 · FAQ" title={t.faq.title} />
        <div className="mt-10 space-y-3">
          {t.faq.items.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 grid-noise" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-5xl leading-none tracking-tight text-white sm:text-7xl">
            {t.finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/70">{t.finalCta.sub}</p>
          <Link
            to="/apply"
            className="mt-10 inline-flex items-center justify-center rounded-none bg-primary px-10 py-5 text-base font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary-glow glow-red"
          >
            {t.finalCta.cta} →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} {t.brand}. {t.footer.rights}</span>
          <Link to="/privacy" className="hover:text-white">{t.footer.privacy}</Link>
        </div>
      </footer>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">{children}</section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.3em] text-primary-glow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight text-white sm:text-6xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base text-white/60">{sub}</p>}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <span className="font-semibold text-white">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-primary-glow transition ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-white/70">{a}</p>
      </motion.div>
    </div>
  );
}