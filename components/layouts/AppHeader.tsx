// components/layout/AppHeader.tsx
"use client";

import { useState } from "react";

export function AppHeader() {
    const [country, setCountry] = useState("Global");
    const [gas, setGas] = useState("CO2");

    return (
        <header className="flex items-center justify-between border-b border-slate-800 px-6 py-3 bg-slate-900/80 backdrop-blur">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-900 font-bold">
                    Ei
                </div>
                <div>
                    <h1 className="text-lg font-semibold">Emission Insights</h1>
                    <p className="text-xs text-slate-400">
                        Explore emissions across industries & sectors
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="text-xs px-2 py-1 border border-slate-700 rounded-lg">
                    Dark
                </button>
                <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
                    PS
                </div>
            </div>
        </header>
    );
}
