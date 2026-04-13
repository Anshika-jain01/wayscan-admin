'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, Truck, CheckCircle2, AlertTriangle, Clock, 
  ChevronRight, LayoutGrid, Search, Filter, Download
} from 'lucide-react';
import { potholes } from '@/lib/mock-data';
import { cn, formatDate } from '@/lib/utils';

export default function WorkOrdersPage() {
  const activeOrders = potholes.filter(p => p.status !== 'repaired');

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest mb-1.5">
            <LayoutGrid className="w-3 h-3" /> Dashboard
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-400">Work Orders</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Maintenance Ops</h1>
          <p className="text-slate-500 font-medium mt-1">Manage field teams and active repair schedules</p>
        </motion.div>

        <div className="flex items-center gap-2">
           <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
             <Download className="w-4 h-4" /> Export Field PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl">
            <div className="text-orange-600 font-black text-[10px] uppercase tracking-widest mb-1">Critical Queue</div>
            <div className="text-3xl font-black text-orange-700">{activeOrders.filter(o => o.priority === 'high').length}</div>
            <p className="text-xs font-bold text-orange-400 mt-1">Requires immediate dispatch</p>
         </div>
         <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
            <div className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-1">In Progress</div>
            <div className="text-3xl font-black text-blue-700">{activeOrders.filter(o => o.status === 'in-progress').length}</div>
            <p className="text-xs font-bold text-blue-400 mt-1">Teams currently on site</p>
         </div>
         <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
            <div className="text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-1">Completed (24h)</div>
            <div className="text-3xl font-black text-emerald-700">14</div>
            <p className="text-xs font-bold text-emerald-400 mt-1">Successfully resolved</p>
         </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
           <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input type="text" placeholder="Search orders..." className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
           </div>
           <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"><Filter className="w-4 h-4" /></button>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Sort by: Date</div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Incident Location</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Team</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Detected</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                          <Wrench className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="text-sm font-black text-slate-800">{order.locationName}</div>
                          <div className="text-xs font-bold text-slate-400">{order.city}, {order.state}</div>
                       </div>
                    </div>
                  </td>
                  <td className="p-5">
                     <span className={cn(
                       "text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full border",
                       order.priority === 'high' ? "bg-red-50 text-red-600 border-red-100" :
                       "bg-orange-50 text-orange-600 border-orange-100"
                     )}>
                       {order.priority}
                     </span>
                  </td>
                  <td className="p-5">
                     <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                        <Truck className="w-4 h-4 text-slate-400" />
                        {order.assignedTeam || 'PENDING'}
                     </div>
                  </td>
                  <td className="p-5">
                     <div className="text-sm font-bold text-slate-600">{formatDate(order.firstDetected)}</div>
                  </td>
                  <td className="p-5 text-right">
                    <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase rounded-lg shadow-md transition-all">
                      Dispatch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
