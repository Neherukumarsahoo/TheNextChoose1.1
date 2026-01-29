"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { Loader2 } from "lucide-react"
import { LoadingProvider, useLoading } from "@/components/providers/LoadingProvider"

function DashboardInner({ children }: { children: React.ReactNode }) {
    const { isLoading, startLoading } = useLoading()

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar className="hidden lg:flex" onNavStart={startLoading} />
            <div className="flex flex-1 flex-col overflow-hidden relative">
                <Header />
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-4 lg:p-6 relative">
                   {/* content */}
                    {children}

                    {/* Loading Overlay */}
                    {isLoading && (
                        <div className="absolute inset-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center fade-in duration-200">
                             <div className="bg-white dark:bg-zinc-900 p-4 rounded-full shadow-2xl flex items-center gap-3 border border-gray-200 dark:border-zinc-800">
                                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                                <span className="text-sm font-medium">Loading...</span>
                             </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <DashboardInner>
                {children}
            </DashboardInner>
        </LoadingProvider>
    )
}
