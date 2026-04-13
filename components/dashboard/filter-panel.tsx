'use client';

import React from 'react';
import { 
  Filter, 
  MapPin, 
  AlertCircle, 
  FileCheck, 
  Globe, 
  Clock,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { FilterState } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const activeCount = Object.entries(filters).filter(([key, val]) => 
    key !== 'sortBy' && val !== 'all'
  ).length;

  const updateFilter = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onChange({
      state: 'all',
      city: 'all',
      priority: 'all',
      status: 'all',
      areaType: 'all',
      timeRange: 'all',
      sortBy: 'priority',
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Advanced Filters</h2>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Refine data visualization and reports</p>
          </div>
          {activeCount > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded-full border border-blue-200 uppercase tracking-tighter">
              {activeCount} Active
            </span>
          )}
        </div>
        
        <button 
          onClick={resetFilters}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* State Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
            <MapPin className="w-3 h-3" /> State
          </label>
          <select 
            value={filters.state} 
            onChange={(e) => updateFilter('state', e.target.value)}
            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="all">All States</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
          </select>
        </div>

        {/* City Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
             City
          </label>
          <select 
            value={filters.city} 
            onChange={(e) => updateFilter('city', e.target.value)}
            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="all">All Cities</option>
            <option value="Jabalpur">Jabalpur</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Lucknow">Lucknow</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
            <AlertCircle className={cn("w-3 h-3", filters.priority !== 'all' && "text-red-500")} /> Priority
          </label>
          <select 
            value={filters.priority} 
            onChange={(e) => updateFilter('priority', e.target.value)}
            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="all">Any Priority</option>
            <option value="high">Critical (High)</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
            <FileCheck className="w-3 h-3" /> Status
          </label>
          <select 
            value={filters.status} 
            onChange={(e) => updateFilter('status', e.target.value)}
            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="reported">Reported</option>
            <option value="in-progress">In Progress</option>
            <option value="repaired">Repaired</option>
          </select>
        </div>

        {/* Area Type Toggle */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
            <Globe className="w-3 h-3" /> Area Mode
          </label>
          <div className="flex h-11 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {['all', 'urban', 'rural'].map((mode) => (
              <button
                key={mode}
                onClick={() => updateFilter('areaType', mode)}
                className={cn(
                  "flex-1 text-[10px] font-black uppercase transition-all rounded-lg",
                  filters.areaType === mode 
                    ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-500" 
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Time Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
            <Clock className="w-3 h-3" /> Timeframe
          </label>
          <select 
            value={filters.timeRange} 
            onChange={(e) => updateFilter('timeRange', e.target.value)}
            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="all">Lifetime</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

      </div>
    </div>
  );
}
