import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Answers = Record<number, string>;

type FunnelState = {
  answers: Answers;
  setAnswer: (index: number, key: string) => void;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    emergency?: string;
    medical?: string;
  } | null;
  setContact: (c: FunnelState["contact"]) => void;
  reset: () => void;
};

export const useFunnel = create<FunnelState>()(
  persist(
    (set) => ({
      answers: {},
      contact: null,
      setAnswer: (index, key) =>
        set((s) => ({ answers: { ...s.answers, [index]: key } })),
      setContact: (c) => set({ contact: c }),
      reset: () => set({ answers: {}, contact: null }),
    }),
    {
      name: "iron-rise-funnel",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? sessionStorage : (undefined as never),
      ),
    },
  ),
);
