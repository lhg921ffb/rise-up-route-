import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { FunnelShell } from "@/components/FunnelShell";
import { useI18n } from "@/lib/i18n";
import { useFunnel } from "@/lib/funnel-store";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply — IRON RISE Bootcamp" },
      { name: "description", content: "Answer 5 quick questions to see if you qualify for the next group." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Apply — IRON RISE Bootcamp" },
      { property: "og:description", content: "Application step 2 of 4." },
    ],
  }),
  component: Apply,
});

function Apply() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const { answers, setAnswer } = useFunnel();
  const questions = t.quiz.questions;
  const total = questions.length;
  const q = questions[index];
  const selected = answers[index];

  const goNext = () => {
    if (index < total - 1) setIndex(index + 1);
    else navigate({ to: "/contact" });
  };

  const goBack = () => {
    if (index > 0) setIndex(index - 1);
    else navigate({ to: "/" });
  };

  // Step 2 shell for all questions, sub-progress within
  const subProgress = ((index + 1) / total) * 100;

  return (
    <FunnelShell step={2}>
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 rounded-none border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/70 hover:bg-white/5"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t.quiz.back}
        </button>
        <div className="flex-1">
          <div className="h-1 rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${subProgress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
        <div className="text-xs font-semibold tabular-nums text-white/50">
          {index + 1}/{total}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="font-display text-3xl leading-tight tracking-tight text-white sm:text-5xl">
            {q.title}
          </h1>
          {q.sub && <p className="mt-3 text-sm text-white/60">{q.sub}</p>}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {q.options.map((opt) => {
              const active = selected === opt.k;
              return (
                <button
                  key={opt.k}
                  onClick={() => setAnswer(index, opt.k)}
                  className={`glass group relative flex items-start gap-4 rounded-2xl p-5 text-left transition ${
                    active ? "border-primary bg-primary/10 glow-red" : "hover:border-white/20"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-white/25 bg-white/5"
                    }`}
                  >
                    {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white">{opt.label}</div>
                    {opt.desc && <div className="mt-1 text-xs text-white/55">{opt.desc}</div>}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={goNext}
            disabled={!selected}
            className="mt-10 inline-flex w-full items-center justify-center rounded-none bg-primary px-8 py-4 text-base font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary-glow disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30 sm:w-auto glow-red disabled:!shadow-none"
          >
            {t.quiz.continue} →
          </button>
        </motion.div>
      </AnimatePresence>
    </FunnelShell>
  );
}
