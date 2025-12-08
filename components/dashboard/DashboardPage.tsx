// components/dashboard/DashboardPage.tsx
import { KpiGrid } from "./KpiGrid";
import { FiltersBar } from "./FiltersBar";
import { EmissionLineChart } from "./EmissionLineChart";
import { SectorBarChart } from "./SectorBarChart";
import { SectorPieChart } from "./SectorPieChart";
import { EmissionDataTable } from "./EmissionDataTable";
import { ChatPanel } from "@/components/chat/ChatPanel";

export function DashboardPage() {
    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Left: main dashboard */}
            <div className="flex-1 min-w-0">
                <KpiGrid />
                <FiltersBar />
                <EmissionLineChart />
                <div className="grid gap-4 lg:grid-cols-2">
                    <SectorBarChart />
                    <SectorPieChart />
                </div>
                <EmissionDataTable />
            </div>

            {/* Right: chat */}
            <div className="w-full lg:w-80 xl:w-96">
                <ChatPanel />
            </div>
        </div>
    );
}
