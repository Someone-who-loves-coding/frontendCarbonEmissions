"use client";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

import { useEmissionsBySector } from "@/hooks/useEmissions";

interface SectorData {
    sector: string;
    emissions: number;
    share: number;
}

interface PieSector {
    name: string;
    value: number;
    [key: string]: string | number;
}

function generateColors(count: number): string[] {
    return Array.from({ length: count }, (_, i) => {
        const hue = Math.round((360 / count) * i);
        return `hsl(${hue}, 70%, 55%)`;
    });
}

export function SectorPieChart() {
    const { data, isLoading, isError } = useEmissionsBySector();

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

    const chartData: PieSector[] = data.sectors.map((s: SectorData) => ({
        name: prettySector(s.sector),
        value: Number(s.share.toFixed(2)),
    }));

    const COLORS = generateColors(chartData.length);

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold">Global Sector Emissions</h2>
                <p className="text-xs text-slate-400">{data.unit}</p>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                        >
                            {chartData.map((entry: PieSector, idx: number) => (
                                <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value: number, name: string) => [`${value}%`, name]}
                            // contentStyle={{
                            //     backgroundColor: "#020617",
                            //     borderColor: "#1f2937",
                            //     fontSize: 12,
                            // }}
                            contentStyle={{ backgroundColor: "#020617", borderColor: "#1f2937" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
