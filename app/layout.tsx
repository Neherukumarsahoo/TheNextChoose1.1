import type { Metadata } from "next";

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

// Fonts removed to fix build error


export const metadata: Metadata = {
  title: "TheNextChoose - Admin Panel",
  description: "Influencer marketing management platform",
};

import { GlobalCommandMenu } from "@/components/ui/GlobalCommandMenu"
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner"
import { SchemaScript, generateOrganizationSchema } from "@/lib/schema"
import { CMSProvider } from "@/components/cms/CMSProvider"
import { getCMSConfig } from "@/lib/cms"
import { Preloader } from "@/components/ui/Preloader"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cmsConfig = await getCMSConfig()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaScript schema={generateOrganizationSchema()} />
      </head>
      <body
        className={`antialiased`}
      >
        <CMSProvider config={cmsConfig}>
          <Preloader />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider refetchOnWindowFocus={false}>
              <div className="flex flex-col min-h-screen">
                <AnnouncementBanner />
                {children}
              </div>
              <GlobalCommandMenu />
              <Toaster position="top-right" />
            </SessionProvider>
          </ThemeProvider>
        </CMSProvider>
      </body>
    </html>
  );
}
