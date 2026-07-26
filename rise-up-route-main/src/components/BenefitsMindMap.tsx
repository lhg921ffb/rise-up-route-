import { motion } from "framer-motion";
import { Flame, Dumbbell, Zap, Users, UserCheck, Repeat, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const icons: LucideIcon[] = [Flame, Dumbbell, Zap, Users, UserCheck, Repeat];

// 6 nodes around center. Positions on a 1000x760 viewBox for desktop SVG connectors.
const positions = [
  { x: 140, y: 130 },   // top-left
  { x: 860, y: 130 },   // top-right
  { x: 60,  y: 380 },   // mid-left
  { x: 940, y: 380 },   // mid-right
  { x: 200, y: 640 },   // bottom-left
  { x: 800, y: 640 },   // bottom-right
];
const center = { x: 500, y: 380 };

export function BenefitsMindMap({ centerLabel }: { centerLabel: string }) {
  const { t } = useI18n();
  const items = t.benefits.items;

  return (
    <div className="relative mt-12">
      {/* DESKTOP / TABLET: absolute-positioned nodes with SVG connectors */}
      <div className="relative hidden md:block" style={{ aspectRatio: "1000 / 760" }}>
        <svg
          viewBox="0 0 1000 760"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B22222" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#8B0000" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={center.x} cy={center.y} r="120" fill="url(#centerGlow)" />

          {positions.map((p, i) => (
            <g key={i}>
              <motion.line
                x1={center.x}
                y1={center.y}
                x2={p.x}
                y2={p.y}
                stroke="#8B0000"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease: "easeOut" }}
              />
              <motion.line
                x1={center.x}
                y1={center.y}
                x2={p.x}
                y2={p.y}
                stroke="#B22222"
                strokeWidth="1"
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
              <circle cx={p.x} cy={p.y} r="3.5" fill="#0a0a0a" stroke="#B22222" strokeWidth="1" />
            </g>
          ))}

          <circle cx={center.x} cy={center.y} r="5" fill="#B22222" />
          <circle cx={center.x} cy={center.y} r="10" fill="none" stroke="#8B0000" strokeWidth="1" opacity="0.6" />
        </svg>

        {/* Center node */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(center.x / 1000) * 100}%`, top: `${(center.y / 760) * 100}%` }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex h-40 w-40 items-center justify-center border border-primary/40 bg-black/70 px-4 text-center backdrop-blur-sm"
          >
            <span className="font-display text-sm tracking-[0.2em] text-white/90">
              {centerLabel}
            </span>
          </motion.div>
        </div>

        {/* Outer nodes */}
        {items.map((b, i) => {
          const p = positions[i];
          const Icon = icons[i];
          return (
            <motion.div
              key={b.t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.4 + i * 0.09, ease: "easeOut" }}
              className="absolute w-64 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(p.x / 1000) * 100}%`, top: `${(p.y / 760) * 100}%` }}
            >
              <div className="border border-white/10 bg-black/60 p-5 backdrop-blur-sm transition hover:border-primary/50">
                <div className="flex h-9 w-9 items-center justify-center border border-primary/40 bg-primary/10 text-primary-glow">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-display text-lg tracking-wide text-white">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{b.d}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MOBILE: vertical spine with connectors */}
      <div className="relative md:hidden">
        <div className="pointer-events-none absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-[#8B0000] to-transparent" />
        <div className="relative flex flex-col gap-5 pl-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -left-14 top-1/2 h-3 w-3 -translate-y-1/2 border border-primary bg-primary/60" />
            <div className="border border-primary/40 bg-black/70 p-4 backdrop-blur-sm">
              <span className="font-display text-xs tracking-[0.25em] text-white/90">{centerLabel}</span>
            </div>
          </motion.div>

          {items.map((b, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative"
              >
                <span className="pointer-events-none absolute -left-14 top-1/2 h-px w-11 -translate-y-1/2 bg-[#8B0000]" />
                <span className="pointer-events-none absolute -left-[52px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-[#B22222] bg-black" />
                <div className="border border-white/10 bg-black/60 p-5 backdrop-blur-sm">
                  <div className="flex h-9 w-9 items-center justify-center border border-primary/40 bg-primary/10 text-primary-glow">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 font-display text-lg tracking-wide text-white">{b.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{b.d}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
