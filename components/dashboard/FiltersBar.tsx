"use client";

import { COUNTRIES } from "@/data/countries";
import { useFilters } from "@/filters/useFilters";

export function FiltersBar() {
    const {
        country,
        gas,
        fromYear,
        toYear,
        industry,
        setCountry,
        setGas,
        setFromYear,
        setToYear,
        setIndustry,
        resetFilters,
    } = useFilters();

    const years = Array.from({ length: 2023 - 1960 }, (_, i) => 1960 + i);

    const handleFromYearChange = (value: number) => {
        setFromYear(value);

        // ensure toYear stays >= fromYear
        if (value > toYear) {
            setToYear(value);
        }
    };

    const handleToYearChange = (value: number) => {
        // enforce rule immediately
        if (value < fromYear) {
            value = fromYear;
        }
        setToYear(value);
    };

    return (
        <section className="mb-4 flex flex-wrap items-center gap-4 text-sm">

            {/* Country */}
            <div className="flex flex-col">
                <span className="text-xs text-slate-400">Country</span>
                <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1"
                >
                    {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                            {c.name} ({c.code})
                        </option>
                    ))}
                </select>
            </div>

            {/* From Year */}
            <div className="flex flex-col">
                <span className="text-xs text-slate-400">From Year</span>
                <select
                    value={fromYear}
                    onChange={(e) => handleFromYearChange(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1"
                >
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            {/* To Year */}
            <div className="flex flex-col">
                <span className="text-xs text-slate-400">To Year</span>
                <select
                    value={toYear}
                    onChange={(e) => handleToYearChange(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1"
                >
                    {years
                        .filter((y) => y >= fromYear) // 👈 UI Constraint
                        .map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                </select>
            </div>

            {/* Gas */}
            <div className="flex flex-col">
                <span className="text-xs text-slate-400">Gas</span>
                <select
                    value={gas}
                    onChange={(e) => setGas(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1"
                >
                    <option value="CO2">CO₂</option>
                    <option value="CH4">CH₄</option>
                    <option value="N2O">N₂O</option>
                </select>
            </div>

            {/* Reset Button */}
            <button
                onClick={resetFilters}
                className="text-xs px-3 py-1 border border-slate-700 rounded-lg hover:bg-slate-800"
            >
                Reset
            </button>

        </section>
    );
}
