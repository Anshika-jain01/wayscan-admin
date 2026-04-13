'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, Smartphone, Signal, SignalLow, SignalHigh,
  Clock, CheckCircle, AlertCircle, LayoutGrid, ChevronRight, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const pendingDevices = [
  { id: 'WS-782', reports: 12, city: 'Jabalpur', lastSync: '1h ago', signal: 'low', battery: 84 },
  { id: 'WS-105', reports: 5, city: 'Lucknow', lastSync: '15m ago', signal: 'high', battery: 92 },
  { id: 'WS-992', reports: 8, city: 'Mumbai', lastSync: '3h ago', signal: 'none', battery: 45 },
  { id: 'WS-441', reports: 2, city: 'Delhi', lastSync: '2m ago', signal: 'high', battery: 98 },
];

export default function SyncStatusPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest mb-1.5">
            <LayoutGrid className="w-3 h-3" /> Dashboard
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-400">Sync Status</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Data Pipeline</h1>
          <p className="text-slate-500 font-medium mt-1">Monitoring real-time sync status from field devices</p>
        </motion.div>

        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Network Online</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sync Health Card */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
             <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-blue-500" strokeDasharray={377} strokeDashoffset={377 * 0.15} />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800">85%</span>
                <span className="text-[10px] font-black text-slate-400 uppercase">Health</span>
             </div>
          </div>
          <h3 className="font-black text-slate-800 mb-1">Queue Integrity</h3>
          <p className="text-xs font-medium text-slate-500">23 items currently waiting in regional dead zones</p>
          <button className="mt-6 w-full py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
             <RefreshCw className="w-3.5 h-3.5" /> Force Global Sync
          </button>
        </div>

        {/* Device List */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
             <h3 className="font-black text-slate-800 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-slate-400" /> Active Edge Devices
             </h3>
             <span className="bg-slate-50 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full border border-slate-200">
               4 DEVICES CONNECTED
             </span>
          </div>
          <div className="flex-1 overflow-y-auto">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-slate-50/50">
                      <th className="p-4 text-[10px] font-black text-slate-400 uppercase">Device ID</th>
                      <th className="p-4 text-[10px] font-black text-slate-400 uppercase">Current Zone</th>
                      <th className="p-4 text-[10px] font-black text-slate-400 uppercase">Signal</th>
                      <th className="p-4 text-[10px] font-black text-slate-400 uppercase">Queue</th>
                      <th className="p-4 text-[10px] font-black text-slate-400 uppercase text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {pendingDevices.map((device) => (
                      <tr key={device.id} className="hover:bg-slate-50/80 transition-colors">
                         <td className="p-4 font-black text-blue-600">{device.id}</td>
                         <td className="p-4 font-bold text-slate-600">{device.city}</td>
                         <td className="p-4">
                            {device.signal === 'high' ? <SignalHigh className="w-4 h-4 text-emerald-500" /> : 
                             device.signal === 'low' ? <SignalLow className="w-4 h-4 text-orange-400" /> :
                             <Signal className="w-4 h-4 text-red-400" />}
                         </td>
                         <td className="p-4">
                            <span className="font-black text-slate-800">{device.reports}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase ml-1.5">Reports</span>
                         </td>
                         <td className="p-4 text-right">
                            <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-black rounded-lg transition-colors">
                               SYNC NOW
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
}
