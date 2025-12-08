"use client";
// components/layout/AppSidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Dashboard" },
    { href: "/industries", label: "Industries" },
    { href: "/regions", label: "Regions" },
    { href: "/trends", label: "Trends" },
    { href: "/sources", label: "Data Sources" },
    { href: "/about", label: "About" },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex md:flex-col w-56 border-r border-slate-800 bg-slate-950/80">
            <nav className="flex-1 px-3 py-4 space-y-1">
                {links.map((link) => {
                    const active =
                        link.href === "/"
                            ? pathname === "/"
                            : pathname?.startsWith(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block rounded-lg px-3 py-2 text-sm transition ${
                                active
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="px-4 py-3 text-xs text-slate-500 border-t border-slate-800">
                © {new Date().getFullYear()} Emission Insights
            </div>
        </aside>
    );
}
