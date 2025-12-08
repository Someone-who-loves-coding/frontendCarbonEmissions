"use client";

import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useEmissionsBySector } from "@/hooks/useEmissions";

interface SectorData {
    sector: string;
    emissions: number;
    share: number;
}

export function SectorBarChart() {
    const { data, isLoading, isError } = useEmissionsBySector();
    const [page, setPage] = useState(0);
    const pageSize = 5;

    const prettySector = (s: string) =>
        s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    if (isLoading)
        return (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
                Loading Sector Data...
            </div>
        );

    if (isError || !data?.sectors?.length)
        return (
            <div className="rounded-2xl border border-red-500/40 bg-red-900/20 p-4 text-sm text-red-400">
                No sector data available
            </div>
        );

    // Sort by highest share first (global ranking)
    const sortedSectors = [...data.sectors].sort(
        (a: SectorData, b: SectorData) => b.share - a.share
    );

    const totalPages = Math.ceil(sortedSectors.length / pageSize);

    // Slice the current page only
    const pageData = sortedSectors
        .slice(page * pageSize, (page + 1) * pageSize)
        .map((s: SectorData) => ({
            sector: prettySector(s.sector),
            share: Number(s.share.toFixed(2)),
        }));

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold">Top Sector Emissions</h2>
                <p className="text-xs text-slate-400">
                    Page {page + 1} of {totalPages}
                </p>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pageData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis
                            type="number"
                            stroke="#9ca3af"
                            tickFormatter={(v: number) => `${v}%`}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            dataKey="sector"
                            type="category"
                            tick={{ fontSize: 12 }}
                            stroke="#9ca3af"
                        />
                        <Tooltip
                            formatter={(v: number) => [`${v}%`, "Share of Total Emissions"]}
                            contentStyle={{
                                backgroundColor: "#020617",
                                borderColor: "#1f2937",
                                fontSize: 12,
                            }}
                        />
                        <Bar dataKey="share" fill="#22c55e" radius={[4, 4, 4, 4]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-3">
                <button
                    disabled={page === 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    className={`px-3 py-1 rounded-md border border-slate-700 text-xs ${
                        page === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-slate-800"
                    }`}
                >
                    Prev
                </button>

                <button
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    className={`px-3 py-1 rounded-md border border-slate-700 text-xs ${
                        page >= totalPages - 1
                            ? "opacity-30 cursor-not-allowed"
                            : "hover:bg-slate-800"
                    }`}
                >
                    Next
                </button>
            </div>
        </section>
    );
}
