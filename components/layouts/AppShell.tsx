// components/layout/AppShell.tsx
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <AppHeader />
            <div className="flex flex-1">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto bg-slate-950 px-4 py-4 md:px-6 md:py-6">
                    {children}
                </main>
            </div>
        </div>
    );
}