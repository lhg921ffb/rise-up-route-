import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — IRON RISE" },
      { name: "description", content: "How IRON RISE processes personal data under the GDPR." },
      { property: "og:title", content: "Privacy Policy — IRON RISE" },
      { property: "og:description", content: "How IRON RISE processes personal data under the GDPR." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-8">
        <Link
          to="/"
          className="pointer-events-auto font-display text-xl tracking-[0.2em] text-white drop-shadow-lg"
        >
          {t.brand}
        </Link>
        <div className="pointer-events-auto">
          <LanguageToggle />
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-5 pb-20 pt-32">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t.privacy.back}
        </Link>

        <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-6xl">
          {t.privacy.title}
        </h1>
        <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
          {t.privacy.updated}
        </p>
        <p className="mt-6 text-base leading-relaxed text-white/70">{t.privacy.intro}</p>

        <div className="mt-10 space-y-8">
          {t.privacy.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl tracking-wide text-white">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.p}</p>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} IRON RISE. {t.footer.rights}
        </footer>
      </main>
    </div>
  );
}
