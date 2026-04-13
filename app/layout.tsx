import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'WayScan | Smart City Admin Dashboard',
  description: 'AI-powered pothole and civic issue detection system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 font-sans antialiased text-slate-800">
        <div className="flex h-screen overflow-hidden bg-slate-50/50">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden relative">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-6">
              <div className="max-w-[1600px] mx-auto space-y-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
