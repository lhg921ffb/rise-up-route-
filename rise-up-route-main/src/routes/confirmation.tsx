import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";

import { FunnelShell } from "@/components/FunnelShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Application Received — IRON RISE" },
      { name: "description", content: "Your bootcamp application is in. Coach reviews within 24 hours." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Application Received — IRON RISE" },
      { property: "og:description", content: "Step 4 of 4 complete." },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const title = t.confirmation.title;
  const words = title.split(" ");

  return (
    <FunnelShell step={4}>
      <div className="relative flex flex-col items-center text-center">
        {/* Animated concentric squares behind the check */}
        <div className="relative flex h-56 w-56 items-center justify-center">
          {/* Expanding concentric rings */}
          {!reduce &&
            [0, 1, 2].map((i) => (
              <motion.span
                key={i}
                aria-hidden
                className="absolute rounded-full border border-primary/40"
                initial={{ width: 96, height: 96, opacity: 0 }}
                animate={{
                  width: [96, 224],
                  height: [96, 224],
                  opacity: [0.9, 0],
                }}
                transition={{
                  duration: 2.2,
                  ease: "easeOut",
                  repeat: Infinity,
                  delay: 0.6 + i * 0.7,
                }}
              />
            ))}

          {/* Soft red halo */}
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute h-40 w-40 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent) 0%, transparent 70%)",
                filter: "blur(14px)",
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.9, 0.55], scale: [0.6, 1.15, 1] }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            />
          )}

          {/* Circular badge */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
            className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_18px_50px_-12px_color-mix(in_oklab,var(--primary)_65%,transparent)]"
          >
            {/* Rotating dashed ring */}
            {!reduce && (
              <motion.span
                aria-hidden
                className="absolute inset-[-10px] rounded-full border-2 border-dashed border-white/25"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Animated check stroke */}
            <motion.svg
              viewBox="0 0 48 48"
              className="h-14 w-14"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M12 25 L21 34 L37 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: { duration: 0.55, delay: 0.55, ease: [0.65, 0, 0.35, 1] },
                  },
                }}
              />
            </motion.svg>
          </motion.div>
        </div>


        {/* Title — word-by-word reveal */}
        <h1 className="mt-10 font-display text-4xl leading-[0.95] tracking-tight text-white sm:text-6xl">
          {words.map((w, i) => (
            <span key={i} className="mr-3 inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Accent bar */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.9 + words.length * 0.09, ease: "easeOut" }}
          className="mt-6 block h-[3px] w-16 origin-left bg-primary"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 + words.length * 0.09 }}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/70"
        >
          {t.confirmation.sub}
        </motion.p>
      </div>
    </FunnelShell>
  );
}
