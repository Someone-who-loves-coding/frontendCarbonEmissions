import { create } from "zustand";

interface FilterState {
    country: string;
    gas: string;
    fromYear: number;
    toYear: number;
    industry: string;
    setCountry: (value: string) => void;
    setGas: (value: string) => void;
    setFromYear: (value: number) => void;
    setToYear: (value: number) => void;
    setIndustry: (value: string) => void;
    resetFilters: () => void;
}

export const useFilters = create<FilterState>((set) => ({
    country: "HUN",
    gas: "CO2",
    fromYear: 1990,
    toYear: 2022,
    industry: "All",

    setCountry: (value) => set({ country: value }),
    setGas: (value) => set({ gas: value }),
    setFromYear: (value) => set({ fromYear: value }),
    setToYear: (value) => set({ toYear: value }),
    setIndustry: (value) => set({ industry: value }),

    resetFilters: () =>
        set({
            country: "HUN",
            gas: "CO2",
            fromYear: 1990,
            toYear: 2023,
            industry: "All",
        }),
}));
