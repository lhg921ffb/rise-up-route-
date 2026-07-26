import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "nl" | "en";

type Dict = typeof translations.nl;

export const translations = {
  nl: {
    brand: "IRON RISE",
    langToggle: { nl: "NL", en: "EN" },

    meta: {
      landingTitle: "IRON RISE Bootcamp — Transformeer in 75 Dagen",
      landingDesc: "Premium outdoor bootcamp voor mensen die klaar zijn om écht te veranderen. Kleine groepen, persoonlijke coaching.",
      applyTitle: "Aanmelden — IRON RISE Bootcamp",
      applyDesc: "Beantwoord 5 korte vragen om te zien of je kwalificeert.",
      contactTitle: "Jouw gegevens — IRON RISE",
      contactDesc: "Vul je gegevens in om je aanmelding af te ronden.",
      confirmationTitle: "Aanmelding ontvangen — IRON RISE",
      confirmationDesc: "Je aanvraag is binnen. Onze coach neemt binnen 24 uur contact op.",
      privacyTitle: "Privacybeleid — IRON RISE",
      privacyDesc: "Hoe IRON RISE persoonsgegevens verwerkt onder de AVG.",
    },

    hero: {
      headline: "Word De Sterkste Versie Van Jezelf",
      sub: "Voor mannen en vrouwen 25–55 die klaar zijn om vet te verliezen, kracht op te bouwen en hun energie terug te winnen — in 75 dagen keihard buiten trainen.",
      cta: "Reserveer Mijn Plek",
      location: "Vondelpark, Amsterdam",
      duration: "75 dagen · 3× per week",
      rating: "4.9/5 rating",
      members: "250+ deelnemers",
      groupSize: "Kleine groepen · max 8",
    },

    trust: {
      title: "Vertrouwd door serieuze doorzetters",
      items: ["NL-1 Gecertificeerd", "EHBO Getraind", "Verzekerd", "10+ Jaar Ervaring"],
    },

    benefits: {
      title: "Wat Je Krijgt",
      sub: "Geen apparaten. Geen excuses. Alleen resultaten.",
      items: [
        { t: "Verbrand Vet", d: "Verlies gemiddeld 6–10 kg in 75 dagen door hoge-intensiteit outdoor training." },
        { t: "Bouw Kracht", d: "Functionele kracht die je in het dagelijks leven écht voelt." },
        { t: "Meer Energie", d: "Betere slaap, focus en uithoudingsvermogen binnen 14 dagen." },
        { t: "Echte Community", d: "Train met een kleine groep gemotiveerde mensen. Niemand valt af." },
        { t: "Coach 1-op-1", d: "Persoonlijke feedback op techniek, voeding en mindset." },
        { t: "Levenslange Gewoontes", d: "Geen dieet. Systeem dat blijft werken na de bootcamp." },
      ],
    },

    transformation: {
      title: "Echte Transformaties",
      sub: "Deelnemers die 75 dagen geleden begonnen waar jij nu staat.",
      before: "Voor",
      after: "Na 75 Dagen",
      case1: { name: "Sara, 32", result: "−8 kg · +14% kracht" },
      case2: { name: "Mark, 34", result: "−9 kg · +12% kracht" },
    },

    coach: {
      eyebrow: "Ontmoet Je Coach",
      name: "Coach Daan Verhoeven",
      title: "Head Coach & Oprichter",
      bio: "10+ jaar ervaring als militair fitness instructeur. Voormalig topsporter. Ik heb 250+ mensen door dit programma geleid. Ik geloof niet in shortcuts — ik geloof in werk. En ik zorg dat jij het doet.",
      cta: "Werk Met Daan",
    },

    testimonials: {
      title: "Wat Ze Zeggen",
      items: [
        { name: "Sanne, 31", quote: "Ik was al 3 jaar vastgelopen. Na 75 dagen voelde ik me sterker dan op mijn 25e." },
        { name: "Rick, 42", quote: "De eerlijkste €795 die ik ooit heb uitgegeven. Geen fluff, alleen resultaat." },
        { name: "Priya, 29", quote: "De groep maakt het onmogelijk om op te geven. Ik ben verslaafd aan 6u training." },
      ],
    },

    faq: {
      title: "Veelgestelde Vragen",
      items: [
        { q: "Ik ben totaal niet fit — kan ik meedoen?", a: "Ja. Elke oefening heeft 3 niveaus. We beginnen waar jij bent en bouwen op." },
        { q: "Wat als het regent?", a: "We trainen. Regen, kou, mist — alleen bij onweer verzetten we." },
        { q: "Hoe laat is de training?", a: "3 sessies per week op vaste tijden, ochtend en weekend. Consistent tijdstip = discipline." },
        { q: "Wat kost het?", a: "€795 voor het volledige 75-dagen programma (3 sessies per week). Betaling in termijnen mogelijk." },
        { q: "Geld terug garantie?", a: "Ja. Kom naar de eerste week, geef 100% — niet tevreden? Volledig terug." },
      ],
    },

    finalCta: {
      title: "Klaar Om Te Beginnen?",
      sub: "Aanmelden duurt 2 minuten. Coach reviewt binnen 24 uur.",
      cta: "Reserveer Mijn Plek",
    },

    quiz: {
      step: (n: number, of: number) => `Stap ${n} van ${of}`,
      back: "Terug",
      continue: "Doorgaan",
      questions: [
        {
          title: "Wat is je belangrijkste doel?",
          sub: "Kies wat het meest voor jou geldt.",
          options: [
            { k: "fatloss", label: "Vet verliezen", desc: "5–15 kg eraf krijgen" },
            { k: "strength", label: "Kracht opbouwen", desc: "Sterker en gedefinieerd worden" },
            { k: "energy", label: "Energie & fitheid", desc: "Fit voelen in dagelijks leven" },
            { k: "reset", label: "Complete reset", desc: "Alles tegelijk aanpakken" },
          ],
        },
        {
          title: "Hoe vaak train je nu?",
          sub: "Wees eerlijk — dit bepaalt je startpunt.",
          options: [
            { k: "0", label: "Nooit", desc: "Ik ben net klaar met uitstellen" },
            { k: "1-2", label: "1–2× per week", desc: "Ik probeer het, wisselend" },
            { k: "3-4", label: "3–4× per week", desc: "Vaste routine" },
            { k: "5+", label: "5+ per week", desc: "Ik wil naar het volgende niveau" },
          ],
        },
        {
          title: "In welke leeftijdsgroep zit je?",
          sub: "Programma wordt aangepast per fase.",
          options: [
            { k: "25-34", label: "25–34", desc: "" },
            { k: "35-44", label: "35–44", desc: "" },
            { k: "45-54", label: "45–54", desc: "" },
            { k: "55+", label: "55+", desc: "" },
          ],
        },
        {
          title: "Wanneer wil je trainen?",
          sub: "We bevestigen je slot na goedkeuring.",
          options: [
            { k: "early", label: "Vroege ochtend", desc: "Dinsdag / donderdag" },
            { k: "morning", label: "Weekend ochtend", desc: "Zaterdag" },
            { k: "both", label: "Alle 3 sessies", desc: "Aanbevolen voor beste resultaat" },
            { k: "flex", label: "Nog flexibel", desc: "Coach bespreekt met jou" },
          ],
        },
        {
          title: "Wat houdt je nu tegen?",
          sub: "Ons doel is dit definitief oplossen.",
          options: [
            { k: "motivation", label: "Motivatie & consistentie", desc: "Ik begin, ik stop" },
            { k: "time", label: "Tijd", desc: "Druk werk, gezin" },
            { k: "knowhow", label: "Weten wat te doen", desc: "Te veel info, te weinig plan" },
            { k: "results", label: "Geen resultaten meer", desc: "Ik train, maar geen progressie" },
          ],
        },
      ],
    },

    contact: {
      step: "Stap 3 van 4",
      title: "Bijna Klaar",
      sub: "Vul je gegevens in — coach reviewt je aanvraag binnen 24 uur.",
      firstName: "Voornaam",
      lastName: "Achternaam",
      email: "E-mailadres",
      phone: "Telefoonnummer",
      optional: "Optioneel",
      emergency: "Contactpersoon bij noodgeval",
      medical: "Medische aandachtspunten",
      privacy: "Je gegevens worden veilig opgeslagen en enkel gebruikt om je aanmelding te verwerken. Geen spam, geen doorverkoop. Lees ons",
      privacyLink: "privacybeleid",
      submit: "Aanvraag Voltooien",
      errors: {
        required: "Verplicht veld",
        email: "Ongeldig e-mailadres",
        phone: "Ongeldig telefoonnummer",
        min: (n: number) => `Minimaal ${n} tekens`,
      },
    },

    confirmation: {
      progress: "100% Compleet",
      title: "Je Bent Bijna Binnen",
      sub: "De coach gaat een plan voor je maken. Wij nemen contact met je op.",
    },

    privacy: {
      title: "Privacybeleid",
      updated: "Laatst bijgewerkt: januari 2026",
      intro: "IRON RISE Bootcamp (\"wij\", \"ons\") respecteert je privacy en verwerkt je persoonsgegevens conform de Algemene Verordening Gegevensbescherming (AVG / GDPR). Dit beleid legt uit welke gegevens we verzamelen, waarom, hoe lang we ze bewaren en welke rechten je hebt.",
      sections: [
        {
          h: "1. Verwerkingsverantwoordelijke",
          p: "IRON RISE Bootcamp is verwerkingsverantwoordelijke voor de gegevens die je op deze site achterlaat. Voor vragen kun je contact opnemen via info@ironrise.nl.",
        },
        {
          h: "2. Welke gegevens verzamelen we?",
          p: "Bij aanmelding verwerken we: voornaam, achternaam, e-mailadres, telefoonnummer, quiz-antwoorden over je doelen en trainingsniveau, en optioneel je contactpersoon voor noodgevallen en medische aandachtspunten. We plaatsen alleen functionele opslag (sessionStorage / localStorage) om je voortgang in het aanmeldingsformulier te bewaren.",
        },
        {
          h: "3. Grondslag en doel",
          p: "We verwerken je gegevens op basis van (a) uitvoering van de overeenkomst — het beoordelen en beheren van je aanmelding — en (b) je toestemming voor optionele medische informatie. Doeleinden: aanmelding beoordelen, intake plannen, veiligheid tijdens training, en communicatie over je programma.",
        },
        {
          h: "4. Bewaartermijnen",
          p: "Aanmeldgegevens worden bewaard voor de duur van je programma plus 2 jaar voor administratieve en fiscale verplichtingen. Medische aandachtspunten worden verwijderd binnen 3 maanden na afloop van je programma. Niet-geaccepteerde aanmeldingen worden na 6 maanden verwijderd.",
        },
        {
          h: "5. Delen met derden",
          p: "We verkopen je gegevens nooit. We delen alleen met verwerkers die nodig zijn om de dienst te leveren (bijv. e-mailprovider, betaalprovider) onder een verwerkersovereenkomst. Er vindt geen doorgifte plaats buiten de EER zonder passende waarborgen.",
        },
        {
          h: "6. Je rechten",
          p: "Je hebt recht op inzage, correctie, verwijdering, beperking, overdraagbaarheid en bezwaar tegen verwerking van je persoonsgegevens. Toestemming kun je op elk moment intrekken. Dien een verzoek in via info@ironrise.nl — we reageren binnen 30 dagen. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).",
        },
        {
          h: "7. Beveiliging",
          p: "We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen, waaronder versleuteling in transit (HTTPS), toegangscontrole en periodieke evaluatie.",
        },
        {
          h: "8. Wijzigingen",
          p: "We kunnen dit beleid van tijd tot tijd bijwerken. De actuele versie staat altijd op deze pagina met de datum van laatste wijziging.",
        },
      ],
      back: "Terug naar home",
    },

    footer: {
      privacy: "Privacybeleid",
      rights: "Alle rechten voorbehouden.",
    },
  },
  en: {
    brand: "IRON RISE",
    langToggle: { nl: "NL", en: "EN" },

    meta: {
      landingTitle: "IRON RISE Bootcamp — Transform in 75 Days",
      landingDesc: "Premium outdoor bootcamp for people ready to actually change. Small groups, personal coaching.",
      applyTitle: "Apply — IRON RISE Bootcamp",
      applyDesc: "Answer 5 quick questions to see if you qualify.",
      contactTitle: "Your Details — IRON RISE",
      contactDesc: "Fill in your details to complete your application.",
      confirmationTitle: "Application Received — IRON RISE",
      confirmationDesc: "Your application is in. Our coach will be in touch within 24 hours.",
      privacyTitle: "Privacy Policy — IRON RISE",
      privacyDesc: "How IRON RISE processes personal data under the GDPR.",
    },

    hero: {
      headline: "Become The Strongest Version Of Yourself",
      sub: "For men and women 25–55 ready to burn fat, build strength and reclaim their energy — in 75 relentless days of outdoor training.",
      cta: "Reserve My Spot",
      location: "Vondelpark, Amsterdam",
      duration: "75 days · 3× per week",
      rating: "4.9/5 rating",
      members: "250+ members",
      groupSize: "Small groups · max 8",
    },

    trust: {
      title: "Trusted by people who show up",
      items: ["NL-1 Certified", "First-Aid Trained", "Fully Insured", "10+ Years Experience"],
    },

    benefits: {
      title: "What You Actually Get",
      sub: "No machines. No excuses. Only results.",
      items: [
        { t: "Burn Fat", d: "Average 6–10 kg lost in 75 days through high-intensity outdoor training." },
        { t: "Build Strength", d: "Functional strength you feel in real life, not just the mirror." },
        { t: "More Energy", d: "Better sleep, focus and endurance within 14 days." },
        { t: "Real Community", d: "Train with a small committed group. Nobody drops off." },
        { t: "1-on-1 Coaching", d: "Personal feedback on technique, nutrition and mindset." },
        { t: "Lifelong Habits", d: "No diet. A system that keeps working after the bootcamp." },
      ],
    },

    transformation: {
      title: "Real Transformations",
      sub: "Members who started 75 days ago from where you are now.",
      before: "Before",
      after: "After 75 Days",
      case1: { name: "Sara, 32", result: "−8 kg · +14% strength" },
      case2: { name: "Mark, 34", result: "−9 kg · +12% strength" },
    },

    coach: {
      eyebrow: "Meet Your Coach",
      name: "Coach Daan Verhoeven",
      title: "Head Coach & Founder",
      bio: "10+ years as a military-style fitness instructor. Former competitive athlete. I've led 250+ people through this program. I don't believe in shortcuts — I believe in work. And I make sure you do it.",
      cta: "Work With Daan",
    },

    testimonials: {
      title: "What They Say",
      items: [
        { name: "Sanne, 31", quote: "I'd been stuck for 3 years. After 75 days I felt stronger than I did at 25." },
        { name: "Rick, 42", quote: "The most honest €795 I've ever spent. No fluff, only results." },
        { name: "Priya, 29", quote: "The group makes it impossible to quit. I'm addicted to 6am training." },
      ],
    },

    faq: {
      title: "Common Questions",
      items: [
        { q: "I'm completely out of shape — can I join?", a: "Yes. Every exercise has 3 levels. We start where you are and build up." },
        { q: "What if it rains?", a: "We train. Rain, cold, fog — we only reschedule for lightning." },
        { q: "When are the sessions?", a: "3 sessions per week at fixed times, mornings and weekend. Consistent time = discipline." },
        { q: "What does it cost?", a: "€795 for the full 75-day program (3 sessions per week). Payment plans available." },
        { q: "Money-back guarantee?", a: "Yes. Come to the first week, give it 100% — not happy? Full refund." },
      ],
    },

    finalCta: {
      title: "Ready To Start?",
      sub: "Application takes 2 minutes. Coach reviews within 24 hours.",
      cta: "Reserve My Spot",
    },

    quiz: {
      step: (n: number, of: number) => `Step ${n} of ${of}`,
      back: "Back",
      continue: "Continue",
      questions: [
        {
          title: "What's your primary goal?",
          sub: "Pick what matters most to you.",
          options: [
            { k: "fatloss", label: "Lose fat", desc: "Drop 5–15 kg" },
            { k: "strength", label: "Build strength", desc: "Get strong and defined" },
            { k: "energy", label: "Energy & fitness", desc: "Feel great day-to-day" },
            { k: "reset", label: "Complete reset", desc: "Tackle everything at once" },
          ],
        },
        {
          title: "How often do you train now?",
          sub: "Be honest — this sets your starting point.",
          options: [
            { k: "0", label: "Never", desc: "Just done procrastinating" },
            { k: "1-2", label: "1–2× per week", desc: "I try, inconsistently" },
            { k: "3-4", label: "3–4× per week", desc: "Solid routine" },
            { k: "5+", label: "5+ per week", desc: "I want the next level" },
          ],
        },
        {
          title: "Which age range are you in?",
          sub: "Program is adapted per phase of life.",
          options: [
            { k: "25-34", label: "25–34", desc: "" },
            { k: "35-44", label: "35–44", desc: "" },
            { k: "45-54", label: "45–54", desc: "" },
            { k: "55+", label: "55+", desc: "" },
          ],
        },
        {
          title: "When do you want to train?",
          sub: "We confirm your slot after approval.",
          options: [
            { k: "early", label: "Early morning", desc: "Tuesday / Thursday" },
            { k: "morning", label: "Weekend morning", desc: "Saturday" },
            { k: "both", label: "All 3 sessions", desc: "Recommended for best result" },
            { k: "flex", label: "Still flexible", desc: "Coach will discuss with you" },
          ],
        },
        {
          title: "What's holding you back right now?",
          sub: "Our job is to remove this permanently.",
          options: [
            { k: "motivation", label: "Motivation & consistency", desc: "I start, I stop" },
            { k: "time", label: "Time", desc: "Busy work, family" },
            { k: "knowhow", label: "Knowing what to do", desc: "Too much info, no plan" },
            { k: "results", label: "No more results", desc: "I train but don't progress" },
          ],
        },
      ],
    },

    contact: {
      step: "Step 3 of 4",
      title: "Almost There",
      sub: "Fill in your details — coach reviews your application within 24 hours.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email address",
      phone: "Phone number",
      optional: "Optional",
      emergency: "Emergency contact",
      medical: "Medical notes",
      privacy: "Your data is stored securely and used only to process your application. No spam, never sold. Read our",
      privacyLink: "privacy policy",
      submit: "Complete Application",
      errors: {
        required: "Required",
        email: "Invalid email",
        phone: "Invalid phone number",
        min: (n: number) => `Minimum ${n} characters`,
      },
    },

    confirmation: {
      progress: "100% Complete",
      title: "You're Almost In",
      sub: "The coach will build a plan for you. We'll be in touch.",
    },

    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: January 2026",
      intro: "IRON RISE Bootcamp (\"we\", \"us\") respects your privacy and processes your personal data in accordance with the General Data Protection Regulation (GDPR). This policy explains what data we collect, why, how long we keep it, and what rights you have.",
      sections: [
        {
          h: "1. Data controller",
          p: "IRON RISE Bootcamp is the data controller for information you submit on this site. For questions, contact info@ironrise.nl.",
        },
        {
          h: "2. What data we collect",
          p: "When you apply we process: first name, last name, email address, phone number, quiz answers about your goals and training level, and optionally an emergency contact and medical notes. We only use functional storage (sessionStorage / localStorage) to preserve your progress in the application form.",
        },
        {
          h: "3. Legal basis and purpose",
          p: "We process your data based on (a) performance of the contract — reviewing and managing your application — and (b) your consent for optional medical information. Purposes: assessing the application, scheduling intake, safety during training, and communication about your program.",
        },
        {
          h: "4. Retention periods",
          p: "Application data is retained for the duration of your program plus 2 years for administrative and tax obligations. Medical notes are deleted within 3 months after your program ends. Rejected applications are deleted after 6 months.",
        },
        {
          h: "5. Sharing with third parties",
          p: "We never sell your data. We only share with processors necessary to deliver the service (e.g. email provider, payment provider) under a data processing agreement. No transfers occur outside the EEA without appropriate safeguards.",
        },
        {
          h: "6. Your rights",
          p: "You have the right to access, rectify, erase, restrict, port, and object to processing of your personal data. Consent can be withdrawn at any time. Submit a request via info@ironrise.nl — we respond within 30 days. You can also lodge a complaint with the Dutch Data Protection Authority (autoriteitpersoonsgegevens.nl).",
        },
        {
          h: "7. Security",
          p: "We take appropriate technical and organisational measures to protect your data, including encryption in transit (HTTPS), access control, and periodic review.",
        },
        {
          h: "8. Changes",
          p: "We may update this policy from time to time. The current version is always on this page with the date of last change.",
        },
      ],
      back: "Back to home",
    },

    footer: {
      privacy: "Privacy Policy",
      rights: "All rights reserved.",
    },
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("nl");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("iron-rise-lang");
      if (saved === "en" || saved === "nl") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("iron-rise-lang", l); } catch {}
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t: translations[lang] as Dict }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
