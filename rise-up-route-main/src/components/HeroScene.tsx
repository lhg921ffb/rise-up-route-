import { motion, useReducedMotion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Premium digital bathroom scale scene.
 * Black tempered-glass scale with a clean white LED readout that
 * counts 82.0 → 74.0 kg on a natural settle curve, then loops.
 * Sits behind hero copy with a slight depth-of-field blur.
 */
export function HeroScene() {
  const reduce = useReducedMotion();
  const weight = useMotionValue(82);
  const [display, setDisplay] = useState("82.0");

  useEffect(() => {
    const unsub = weight.on("change", (v) => setDisplay(v.toFixed(1)));
    if (reduce) {
      weight.set(74);
      return () => unsub();
    }
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        weight.set(82);
        // Small overshoot to feel like body weight settling
        await animate(weight, [82, 81.4, 78.2, 75.6, 74.3, 73.85, 74.0], {
          duration: 3.4,
          times: [0, 0.05, 0.35, 0.6, 0.8, 0.92, 1],
          ease: "easeOut",
        }).finished;
        await new Promise((r) => setTimeout(r, 1800));
        await animate(weight, 82, { duration: 0.01 }).finished;
        await new Promise((r) => setTimeout(r, 400));
      }
    };
    loop();
    return () => {
      cancelled = true;
      unsub();
    };
  }, [weight, reduce]);

  const [whole, frac] = display.split(".");

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0b]" aria-hidden="true">
      {/* Ambient studio backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, #1a1a1c 0%, #0d0d0f 45%, #050505 100%)",
        }}
      />

      {/* Soft floor reflection band */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Scale — centered with mild perspective so it reads as a floor scale */}
      <div
        className="absolute inset-x-0 top-0 flex justify-center pt-[6vh] sm:pt-[8vh]"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14, rotateX: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: [0, -6, 0], rotateX: 16, scale: 1 }}
          transition={{
            opacity: { duration: 1, ease: "easeOut" },
            rotateX: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 1.2, ease: "easeOut" },
            y: { duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
          }}
          className="relative"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Ground contact shadow */}
          <div
            className="absolute left-1/2 top-full h-20 w-[115%] -translate-x-1/2 -translate-y-8 rounded-[50%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 68%)",
              filter: "blur(22px)",
            }}
          />
          {/* Sharper core shadow */}
          <div
            className="absolute left-1/2 top-full h-8 w-[80%] -translate-x-1/2 -translate-y-3 rounded-[50%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)",
              filter: "blur(6px)",
            }}
          />

          {/* Scale slab */}
          <div
            className="relative h-[48vh] max-h-[560px] min-h-[300px] w-[92vmin] max-w-[720px] overflow-hidden rounded-[22px] sm:h-[64vh]"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, rgba(0,0,0,0.14) 1px, rgba(0,0,0,0.14) 2px), radial-gradient(ellipse at 28% 15%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 42%), radial-gradient(ellipse at 82% 88%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 55%), linear-gradient(160deg, #b8bbc0 0%, #7d8086 24%, #43464b 60%, #1d1f22 100%)",
              boxShadow:
                "0 80px 110px -30px rgba(0,0,0,0.98), 0 34px 44px -12px rgba(0,0,0,0.85), 0 8px 12px -4px rgba(0,0,0,0.65), inset 0 3px 0 rgba(255,255,255,0.7), inset 0 -2px 0 rgba(0,0,0,0.85), inset 0 0 0 1px rgba(255,255,255,0.22), inset 0 0 30px rgba(0,0,0,0.4)",
            }}
          >
            {/* Glossy top-edge highlight (tempered glass sheen) */}
            <div
              className="absolute inset-x-4 top-3 h-[38%] rounded-t-[16px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0) 100%)",
                mixBlendMode: "screen",
              }}
            />
            {/* Diagonal reflection sweep */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 60%)",
                mixBlendMode: "screen",
              }}
            />
            {/* Crisp top rim highlight */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "rgba(255,255,255,0.85)" }}
            />
            {/* Corner soft window reflection */}
            <div
              className="absolute left-[6%] top-[6%] h-[28%] w-[42%] rounded-[18px]"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)",
              }}
            />


            {/* Foot-shaped step areas (etched into the glass) */}
            <FootMark side="left" />
            <FootMark side="right" />

            {/* Bezel inner ring */}
            <div className="pointer-events-none absolute inset-[6px] rounded-[18px] ring-1 ring-white/8" />

            {/* Brand mark */}
            <div
              className="absolute left-1/2 bottom-[8%] -translate-x-1/2 font-display text-[10px] tracking-[0.5em]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              IRON RISE
            </div>

            {/* LED display window */}
            <div className="absolute inset-x-0 top-[14%] flex justify-center">
              <div
                className="relative flex items-baseline gap-1 rounded-[6px] px-7 py-3"
                style={{
                  background:
                    "linear-gradient(180deg, #050506 0%, #0a0a0c 100%)",
                  boxShadow:
                    "inset 0 2px 4px rgba(0,0,0,0.9), inset 0 -1px 0 rgba(255,255,255,0.06), 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* faint LED backglow */}
                <div
                  className="pointer-events-none absolute -inset-4 rounded-[10px]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)",
                    filter: "blur(6px)",
                  }}
                />
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily:
                      "'SF Mono','JetBrains Mono','Menlo',ui-monospace,monospace",
                    fontWeight: 300,
                    fontSize: "clamp(2.2rem, 7vmin, 4.5rem)",
                    color: "rgba(255,255,255,0.96)",
                    textShadow:
                      "0 0 6px rgba(255,255,255,0.28), 0 0 16px rgba(255,255,255,0.10)",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                  }}
                >
                  {whole}
                </span>
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily:
                      "'SF Mono','JetBrains Mono','Menlo',ui-monospace,monospace",
                    fontWeight: 300,
                    fontSize: "clamp(1.4rem, 4.6vmin, 2.8rem)",
                    color: "rgba(255,255,255,0.85)",
                    textShadow: "0 0 6px rgba(255,255,255,0.2)",
                    lineHeight: 1,
                  }}
                >
                  .{frac}
                </span>
                <span
                  style={{
                    fontFamily:
                      "'SF Mono','JetBrains Mono','Menlo',ui-monospace,monospace",
                    fontSize: "clamp(0.75rem, 2vmin, 1rem)",
                    color: "rgba(255,255,255,0.6)",
                    marginLeft: "0.6rem",
                    letterSpacing: "0.18em",
                  }}
                >
                  KG
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Readability overlays — soft so the scale stays visible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}

function FootMark({ side }: { side: "left" | "right" }) {
  const pos = side === "left" ? { left: "18%" } : { right: "18%" };
  return (
    <div
      className="absolute top-[26%] h-[42%] w-[22%]"
      style={pos}
    >
      {/* Sole */}
      <div
        className="absolute inset-x-0 top-[22%] h-[70%] rounded-[45%/40%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      {/* Toe pad */}
      <div
        className="absolute left-1/2 top-0 h-[22%] w-[38%] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />
    </div>
  );
}

