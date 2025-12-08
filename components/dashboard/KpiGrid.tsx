"use client";

import { KpiCard } from "./KpiCard";
import { useEmissionsInsights } from "@/hooks/useEmissions";
import { useFilters } from "@/filters/useFilters";

export function KpiGrid() {
    const { country, gas } = useFilters();

    const { data, isLoading, isError } = useEmissionsInsights(country, gas);

    if (isLoading) {
        return (
            <section className="grid gap-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 mb-4">
                <KpiCard label="Loading..." value="..." helper="Fetching data..." />
            </section>
        );
    }

    if (isError || !data || !Number.isFinite(data.totalMt)) {
        return (
            <section className="grid gap-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 mb-4">
                <KpiCard label="Data unavailable" value="N/A" helper="No emissions data" />
            </section>
        );
    }

    const {
        latestYear,
        earliestYear,
        totalMt,
        changeYoY,
        changeSince1990,
        topSectorName,
        topSectorShare,
        netZeroPercent
    } = data;

    // const yoyTrend = changeYoY > 0 ? "up" : changeYoY < 0 ? "down" : "flat";
    // const histTrend = changeSince1990 > 0 ? "up" : changeSince1990 < 0 ? "down" : "flat";
    // These are now ALWAYS numbers
    const safeYoY: number =
        typeof changeYoY === "number" && Number.isFinite(changeYoY)
            ? changeYoY
            : 0;

    const safeHist: number =
        typeof changeSince1990 === "number" && Number.isFinite(changeSince1990)
            ? changeSince1990
            : 0;


    const yoyTrend = safeYoY > 0 ? "up" : safeYoY < 0 ? "down" : "flat";
    const histTrend = safeHist > 0 ? "up" : safeHist < 0 ? "down" : "flat";

    return (
        <section className="grid gap-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 mb-4">
            <KpiCard
                label={`Total Emissions (${latestYear})`}
                value={`${totalMt.toFixed(1)} Mt CO₂e`}
                helper={
                    safeYoY !== 0
                        ? `${safeYoY.toFixed(1)}% vs ${earliestYear}`
                        : "No previous year data"
                }
                trend={yoyTrend}
            />

            <KpiCard
                label={`Change Since ${earliestYear}`}
                value={
                    safeHist !== 0 ? `${safeHist.toFixed(0)}%` : "N/A"
                }
                helper={`vs ${earliestYear}`}
                trend={histTrend}
            />


            <KpiCard
                label="Top Sector"
                value={topSectorName
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                helper={`~${topSectorShare.toFixed(0)}% of total emissions`}
            />

            <KpiCard
                label="Net-zero aligned"
                value={`${netZeroPercent}%`}
                helper="Countries w/ net-zero laws"
                trend="up"
            />
        </section>
    );
}
