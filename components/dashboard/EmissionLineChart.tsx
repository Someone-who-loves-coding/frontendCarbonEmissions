"use client";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useEmissionsTrend } from "@/hooks/useEmissions";
import { useFilters } from "@/filters/useFilters";

export function EmissionLineChart() {
    const { country, gas, fromYear, toYear } = useFilters();

    const { data, isLoading, isError } = useEmissionsTrend(
        country,
        gas,
        fromYear,
        toYear
    );

    if (isLoading)
        return (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 mb-4 text-sm text-slate-400">
                Loading Trend Chart...
            </div>
        );

    if (isError || !data?.points?.length)
        return (
            <div className="rounded-2xl border border-red-500/40 bg-red-900/20 p-4 mb-4 text-sm text-red-400">
                No emissions data found
            </div>
        );

    const chartData = data.points.map(
        (p: { year: number; value: number }) => ({
            year: p.year,
            emissions: +p.value.toFixed(2),
        })
    );

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold">
                    Emissions — {data.countryCode} ({data.gas})
                </h2>
                <p className="text-xs text-slate-400">
                    {data.fromYear} – {data.toYear}
                </p>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis dataKey="year" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                        <YAxis
                            stroke="#9ca3af"
                            tick={{ fontSize: 12 }}
                            label={{
                                value: data.unit + " CO₂e",
                                angle: -90,
                                fill: "#9ca3af",
                                dx: -20,
                            }}
                        />
                        <Tooltip
                            formatter={(v: number) => `${v.toFixed(2)} ${data.unit}`}
                            labelFormatter={(year) => `Year: ${year}`}
                            contentStyle={{ backgroundColor: "#020617", borderColor: "#1f2937" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="emissions"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
