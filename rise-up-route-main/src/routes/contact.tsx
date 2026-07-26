import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Lock } from "lucide-react";
import { FunnelShell } from "@/components/FunnelShell";
import { useI18n } from "@/lib/i18n";
import { useFunnel } from "@/lib/funnel-store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Your Details — IRON RISE" },
      { name: "description", content: "Fill in your contact details to complete your bootcamp application." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Your Details — IRON RISE" },
      { property: "og:description", content: "Application step 3 of 4." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const setContact = useFunnel((s) => s.setContact);

  const schema = z.object({
    firstName: z.string().trim().min(2, t.contact.errors.min(2)),
    lastName: z.string().trim().min(2, t.contact.errors.min(2)),
    email: z.string().trim().email(t.contact.errors.email),
    phone: z
      .string()
      .trim()
      .min(6, t.contact.errors.phone)
      .regex(/^[+()\\-\\s\\d]+$/, t.contact.errors.phone),
    medical: z.string().trim().max(500).optional().or(z.literal("")),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async (data: FormData) => {
    // Add honeypot field (empty string)
    const payload = { ...data, website: "" };

    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        // Show a generic error message; never expose validation details to the user
        alert(json.message ?? 'Something went wrong. Please try again.');
        return;
      }

      // Success: store in Zustand (optional) and navigate to confirmation
      setContact({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        medical: data.medical || undefined,
      });
      navigate({ to: '/confirmation' });
    } catch (err) {
      console.error(err);
      alert('Network error – please try again later.');
    }
  };

  return (
    <FunnelShell step={3}>
      <h1 className="font-display text-3xl leading-tight tracking-tight text-white sm:text-5xl">
        {t.contact.title}
      </h1>
      <p className="mt-3 text-sm text-white/60">{t.contact.sub}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t.contact.firstName} error={errors.firstName?.message}>
            <input {...register("firstName")} className={inputCls} autoComplete="given-name" />
          </Field>
          <Field label={t.contact.lastName} error={errors.lastName?.message}>
            <input {...register("lastName")} className={inputCls} autoComplete="family-name" />
          </Field>
        </div>
        <Field label={t.contact.email} error={errors.email?.message}>
          <input {...register("email")} type="email" className={inputCls} autoComplete="email" />
        </Field>
        <Field label={t.contact.phone} error={errors.phone?.message}>
          <input {...register("phone")} type="tel" className={inputCls} autoComplete="tel" />
        </Field>

        <div className="pt-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            {t.contact.optional}
          </p>
        </div>
        <Field label={t.contact.medical} error={errors.medical?.message}>
          <textarea {...register("medical")} rows={3} className={`${inputCls} resize-none`} />
        </Field>

        <div className="flex items-start gap-2 pt-2 text-xs text-white/50">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-glow" />
          <p>
            {t.contact.privacy}{" "}
            <Link to="/privacy" className="underline underline-offset-2 hover:text-white">
              {t.contact.privacyLink}
            </Link>
            .
          </p>
        </div>

        {/* Honeypot field – invisible to users, bots may fill it */}
        <div className="absolute -left-9999px">
          <label htmlFor="website" className="sr-only">
            Website (leave blank)
          </label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 inline-flex w-full items-center justify-center rounded-none bg-primary px-8 py-4 text-base font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary-glow glow-red disabled:opacity-60 sm:w-auto"
        >
          {t.contact.submit} →
        </button>
      </form>
    </FunnelShell>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-primary focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/40";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-primary-glow">{error}</span>}
    </label>
  );
}