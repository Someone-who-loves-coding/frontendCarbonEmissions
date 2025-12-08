// app/page.tsx
import { AppShell } from "@/components/layouts/AppShell";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export default function HomePage() {
    return (
        <AppShell>
            <DashboardPage />
        </AppShell>
    );
}
