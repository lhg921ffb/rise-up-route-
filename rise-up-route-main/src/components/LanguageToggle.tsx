import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-black/40 p-1 text-xs font-semibold tracking-wider backdrop-blur">
      <button
        onClick={() => setLang("nl")}
        className={`px-3 py-1 rounded-full transition ${lang === "nl" ? "bg-primary text-primary-foreground" : "text-white/60 hover:text-white"}`}
        aria-pressed={lang === "nl"}
      >
        NL
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full transition ${lang === "en" ? "bg-primary text-primary-foreground" : "text-white/60 hover:text-white"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
