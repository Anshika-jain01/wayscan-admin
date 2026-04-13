'use client';

import React from 'react';
import { Search, Bell, Calendar, RefreshCw, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const pendingSync = 23;

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-4 md:px-8">
      <div className="flex h-full items-center justify-between gap-4 max-w-[1600px] mx-auto">
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by city, area, or coordinates..." 
              className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Dashboard Stats / Date */}
          <div className="hidden lg:flex items-center gap-4 border-r border-slate-200 pr-6 mr-2">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Date</span>
              <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Sync Status Badge */}
          <button className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
            pendingSync > 0 ? "bg-orange-50 text-orange-600 border border-orange-100 animate-pulse-subtle" : "bg-slate-50 text-slate-500"
          )}>
            <RefreshCw className={cn("w-4 h-4", pendingSync > 0 && "animate-spin-slow")} />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-bold uppercase tracking-tight">Sync Status</span>
              <span className="text-xs font-bold">{pendingSync} Pending</span>
            </div>
          </button>

          {/* Icon Controls */}
          <div className="flex items-center gap-1.5">
            <button className="relative p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm" />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Profile Trigger (Simplified) */}
          <div className="md:hidden w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
