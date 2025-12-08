// // app/layout.tsx
// import type { Metadata } from "next";
// import "./globals.css";
//
// export const metadata: Metadata = {
//     title: "Emission Insights Dashboard",
//     description: "Visualize and explore emissions across industries and sectors.",
// };
//
// export default function RootLayout({
//                                        children,
//                                    }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <html lang="en">
//         <body className="min-h-screen bg-slate-950 text-slate-100">
//         {children}
//         </body>
//         </html>
//     );
// }

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        </body>
        </html>
    );
}
