// components/dashboard/KpiCard.tsx
type KpiCardProps = {
    label: string;
    value: string;
    helper?: string;
    trend?: "up" | "down" | "flat";
};

export function KpiCard({ label, value, helper, trend }: KpiCardProps) {
    const trendSymbol =
        trend === "up" ? "↑" : trend === "down" ? "↓" : trend === "flat" ? "→" : "";

    const trendColor =
        trend === "up"
            ? "text-red-400"
            : trend === "down"
                ? "text-emerald-400"
                : "text-slate-400";

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-1">
            <div className="text-xs uppercase tracking-wide text-slate-400">
                {label}
            </div>
            <div className="text-2xl font-semibold">{value}</div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
                {trend && <span className={trendColor}>{trendSymbol}</span>}
                {helper}
            </div>
        </div>
    );
}
