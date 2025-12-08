import { useQuery } from "@tanstack/react-query";
import {fetchTrend, fetchSector, fetchTable} from "@/lib/api";
import type { TrendResponse, SectorResponse, TrendPoint, SectorItem } from "@/types/emissions";

export function useEmissionsTrend(country: string, gas: string, fromYear: number, toYear: number) {
  return useQuery({
    queryKey: ["trend", country, gas, fromYear, toYear],
    queryFn: () => fetchTrend(country, gas, fromYear, toYear),
  });
}

export function useEmissionsBySector() {
    return useQuery({
        queryKey: ["sector"],
        queryFn: () => fetchSector(),
    });
}

export function useEmissionsTable(country: string, gas: string, year: number, page=0, size=10) {
    return useQuery({
        queryKey: ["table", country, gas, year, page, size],
        queryFn: () => fetchTable(country, gas, year, page, size),
    });
}

// export function useEmissionsInsights(country: string, gas: string) {
//     return useQuery({
//         queryKey: ["insights", country, gas],
//         queryFn: async () => {
//             const [
//                 trendFull,
//                 trendLatest,
//                 trendYoY,
//                 sector,
//             ]: [TrendResponse, TrendResponse, TrendResponse, SectorResponse] = await Promise.all([
//                 fetchTrend(country, gas, 1990, 2023),
//                 fetchTrend(country, gas, 2023, 2023),
//                 fetchTrend(country, gas, 2022, 2023),
//                 fetchSector(),
//             ]);
//
//             const latest: number = trendLatest.points[0]?.value / 1000;
//             const previous: number = trendYoY.points[0]?.value / 1000;
//
//             const base1990Point: TrendPoint | undefined = trendFull.points.find(
//                 (p: TrendPoint) => p.year === 1990
//             );
//
//             const base1990: number = base1990Point ? base1990Point.value / 1000 : 0;
//
//             const changeYoY: number = previous ? ((latest - previous) / previous) * 100 : 0;
//             const changeSince1990: number = base1990 ? ((latest - base1990) / base1990) * 100 : 0;
//
//             const topSector: SectorItem | undefined = [...sector.sectors].sort(
//                 (a: SectorItem, b: SectorItem) => b.share - a.share
//             )[0];
//
//             return {
//                 totalGt: latest,
//                 changeYoY,
//                 changeSince1990,
//                 topSectorName: topSector?.sector ?? "N/A",
//                 topSectorShare: topSector?.share ?? 0,
//                 netZeroPercent: 19,
//             };
//         },
//     });
// }

const START_YEAR = 1990;
const END_YEAR = 2025;
//
// export function useEmissionsInsights(country: string, gas: string) {
//     return useQuery({
//         queryKey: ["insights", country, gas],
//         queryFn: async () => {
//             const [trendFull, sector]: [TrendResponse, SectorResponse] = await Promise.all([
//                 fetchTrend(country, gas, START_YEAR, END_YEAR),
//                 fetchSector(), // currently global only
//             ]);
//
//             console.log("Total sectors:", sector.sectors.length);
//
//             const validPoints: TrendPoint[] = trendFull.points
//                 .filter((p) => p.value !== undefined && p.value > 0)
//                 .sort((a, b) => a.year - b.year);
//
//             console.log("valid:", validPoints);
//
//             const changeYoY: number = 0;
//             const changeSince1990: number = 0;
//
//             if (validPoints.length === 0) {
//                 return {
//                     latestYear: 0,
//                     earliestYear: 0,
//                     changeYoY,
//                     changeSince1990,
//                     totalGt: 0,
//                     changePercent: 0,
//                     topSectorName: "N/A",
//                     topSectorShare: 0,
//                     netZeroPercent: 19,
//                 };
//             }
//
//             const earliestPoint = validPoints[0];
//             const latestPoint = validPoints[validPoints.length - 1];
//
//             const earliestGt = earliestPoint.value;
//             const latestGt = latestPoint.value;
//
//             const changePercent =
//                 earliestGt > 0 ? ((latestGt - earliestGt) / earliestGt) * 100 : 0;
//
//             const topSector: SectorItem | undefined = [...sector.sectors].sort(
//                 (a: SectorItem, b: SectorItem) => b.share - a.share
//             )[0];
//
//             return {
//                 latestYear: latestPoint.year,
//                 earliestYear: earliestPoint.year,
//                 totalGt: latestGt,
//                 changePercent,
//                 topSectorName: topSector?.sector ?? "N/A",
//                 topSectorShare: topSector?.share ?? 0,
//                 netZeroPercent: 19, // placeholder
//             };
//         },
//     });
// }

export function useEmissionsInsights(country: string, gas: string) {
    return useQuery({
        queryKey: ["insights", country, gas],
        queryFn: async () => {
            const [trendFull, sector]: [TrendResponse, SectorResponse] = await Promise.all([
                fetchTrend(country, gas, START_YEAR, END_YEAR),
                fetchSector(),
            ]);

            const validPoints = trendFull.points
                .filter((p) => typeof p.value === "number")
                .sort((a, b) => a.year - b.year);

            if (validPoints.length === 0) {
                return {
                    latestYear: 0,
                    earliestYear: 0,
                    totalMt: 0,
                    changeYoY: 0,
                    changeSince1990: 0,
                    topSectorName: "N/A",
                    topSectorShare: 0,
                    netZeroPercent: 19,
                };
            }

            const earliestPoint = validPoints[0];
            const latestPoint = validPoints[validPoints.length - 1];

            const earliestMt = earliestPoint.value;
            const latestMt = latestPoint.value;

            const changeSince1990 =
                earliestMt > 0 ? ((latestMt - earliestMt) / earliestMt) * 100 : 0;

            const prevPoint = validPoints.length > 1
                ? validPoints[validPoints.length - 2]
                : null;
            const prevMt = prevPoint ? prevPoint.value : latestMt;
            const changeYoY =
                prevMt > 0 ? ((latestMt - prevMt) / prevMt) * 100 : 0;

            const sortedSectors = [...sector.sectors].sort(
                (a, b) => b.share - a.share
            );
            const topSector = sortedSectors[0];

            return {
                latestYear: latestPoint.year,
                earliestYear: earliestPoint.year,
                totalMt: latestMt, // 🚀 Mt directly
                changeYoY,
                changeSince1990,
                topSectorName: topSector.sector,
                topSectorShare: topSector.share,
                netZeroPercent: 45,
            };
        },
    });
}
