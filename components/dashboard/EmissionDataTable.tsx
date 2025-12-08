"use client";

import { useState, useMemo } from "react";
import { useFilters } from "@/filters/useFilters";
import { useEmissionsTrend, useEmissionsBySector } from "@/hooks/useEmissions";

interface TrendPoint {
    year: number;
    value: number;
}

interface SectorItem {
    sector: string;
    emissions: number;
    share: number;
}

export function EmissionDataTable() {
    const { country, gas } = useFilters();

    const [activeTab, setActiveTab] = useState<"country" | "sector">("country");
    const [yearFilter, setYearFilter] = useState<"all" | number>("all");

    // Fetch data — hooks ALWAYS executed
    const {
        data: trendData,
        isLoading: loadingTrend,
        isError: errorTrend,
    } = useEmissionsTrend(country, gas, 1990, 2025);

    const {
        data: sectorData,
        isLoading: loadingSector,
        isError: errorSector,
    } = useEmissionsBySector();

    // Safe fallback -> ensure arrays
    const points: TrendPoint[] = trendData?.points ?? [];
    const sectors: SectorItem[] = sectorData?.sectors ?? [];

    // Memo ALWAYS called → No ESLint errors now
    const allYears: number[] = useMemo(
        () => [...new Set(points.map((p) => p.year))].sort((a, b) => a - b),
        [points]
    );

    const filteredPoints: TrendPoint[] =
        yearFilter === "all"
            ? points
            : points.filter((p) => p.year === yearFilter);

    const sortedSectors: SectorItem[] = useMemo(
        () => [...sectors].sort((a, b) => b.emissions - a.emissions),
        [sectors]
    );

    const isLoading = loadingTrend || loadingSector;
    const isError = errorTrend || errorSector;

    if (isLoading) {
        return <div className="p-4 text-xs text-slate-400">Loading data…</div>;
    }

    if (isError || filteredPoints.length === 0) {
        return <div className="p-4 text-xs text-red-400">No data available</div>;
    }

    const prettySector = (s: string) =>
        s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 mt-4 w-full">
            {/* TABS */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setActiveTab("country")}
                    className={`px-4 py-1 text-xs rounded-lg border ${
                        activeTab === "country"
                            ? "bg-emerald-500 text-black border-emerald-400"
                            : "border-slate-700 hover:bg-slate-800"
                    }`}
                >
                    Country yearly totals
                </button>
                <button
                    onClick={() => setActiveTab("sector")}
                    className={`px-4 py-1 text-xs rounded-lg border ${
                        activeTab === "sector"
                            ? "bg-emerald-500 text-black border-emerald-400"
                            : "border-slate-700 hover:bg-slate-800"
                    }`}
                >
                    Global sector breakdown
                </button>
            </div>

            {/* COUNTRY TABLE */}
            {activeTab === "country" && (
                <>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold">
                            Country yearly emissions — {trendData?.countryCode}
                        </h2>

                        {/* Year Filter */}
                        <select
                            className="text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-1"
                            value={yearFilter === "all" ? "all" : String(yearFilter)}
                            onChange={(e) =>
                                setYearFilter(
                                    e.target.value === "all" ? "all" : Number(e.target.value)
                                )
                            }
                        >
                            <option value="all">All years</option>
                            {allYears.map((year: number) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase text-slate-400 border-b border-slate-800">
                        <tr>
                            {/*<th className="py-2 pr-3">Country</th>*/}
                            <th className="py-2 pr-3">Year</th>
                            <th className="py-2 pr-3">Emissions (Mt CO₂e)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredPoints.map((p, idx) => (
                            <tr key={`${p.year}-${idx}`} className="border-b border-slate-900">
                                {/*<td className="py-2 pr-3">{trendData?.countryCode}</td>*/}
                                <td className="py-2 pr-3">{p.year}</td>
                                <td className="py-2 pr-3">{p.value.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* SECTOR TABLE */}
            {activeTab === "sector" && (
                <>
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase text-slate-400 border-b border-slate-800">
                        <tr>
                            <th className="py-2 pr-3">Sector</th>
                            <th className="py-2 pr-3">Emissions (Mt CO₂e)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedSectors.map((row, idx) => (
                            <tr key={`${row.sector}-${idx}`} className="border-b border-slate-900">
                                <td className="py-2 pr-3">{prettySector(row.sector)}</td>
                                <td className="py-2 pr-3">{row.emissions.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </section>
    );
}
