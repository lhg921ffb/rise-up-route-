import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

export function FunnelShell({
  step,
  totalSteps = 4,
  children,
}: {
  step: number;
  totalSteps?: number;
  children: ReactNode;
}) {
  const { t } = useI18n();
  const pct = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground grid-noise">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-display text-lg tracking-widest text-white">
            {t.brand}
          </Link>
          <div className="text-xs font-semibold tracking-wider text-white/60">
            {step === 4 ? t.confirmation.progress : t.quiz.step(step, totalSteps)}
          </div>
          <LanguageToggle />
        </div>
        <div className="h-1 w-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary-glow"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-16">{children}</main>
    </div>
  );
}
