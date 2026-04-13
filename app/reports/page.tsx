'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Search, Filter, Download, 
  LayoutGrid, ChevronRight, ArrowUpDown, 
  MapPin, Users, Calendar, Clock
} from 'lucide-react';
import { potholes as allPotholes } from '@/lib/mock-data';
import { PotholeCluster, Status } from '@/lib/types';
import { cn, formatDate } from '@/lib/utils';
import DetailModal from '@/components/dashboard/detail-modal';

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPothole, setSelectedPothole] = useState<PotholeCluster | null>(null);
  const [data, setData] = useState(allPotholes);

  const filteredData = useMemo(() => {
    return data.filter(p => 
      p.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleStatusChange = (id: string, newStatus: Status) => {
    setData(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    if (selectedPothole?.id === id) {
      setSelectedPothole(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest mb-1.5">
            <LayoutGrid className="w-3 h-3" /> Dashboard
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-400">Reports</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Incident Reports</h1>
          <p className="text-slate-500 font-medium mt-1">Full database of all detected civic infrastructure issues</p>
        </motion.div>

        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
          <Download className="w-4 h-4" /> Export All Data (CSV)
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
           <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search by location or city..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
             />
           </div>
           <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors">
                <Filter className="w-3.5 h-3.5" /> Filters
              </button>
              <div className="w-px h-6 bg-slate-100 mx-2" />
              <button className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                <ArrowUpDown className="w-4 h-4" /> Sort: Newest First
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location Info</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle Count</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((pothole) => (
                <tr key={pothole.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-5">
                    <span className="text-xs font-black text-slate-300">#{pothole.id.slice(0, 5)}</span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-500 group-hover:border-blue-200 transition-colors">
                          <MapPin className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="text-sm font-black text-slate-800">{pothole.locationName}</div>
                          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tight">
                            {pothole.city}, {pothole.state} • <span className="text-blue-500/70">{pothole.areaType}</span>
                          </div>
                       </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded border",
                      pothole.priority === 'high' ? "bg-red-50 text-red-600 border-red-100" :
                      pothole.priority === 'medium' ? "bg-orange-50 text-orange-600 border-orange-100" :
                      "bg-emerald-50 text-emerald-600 border-emerald-100"
                    )}>
                      {pothole.priority}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                       <span className="text-sm font-black text-slate-700">{pothole.uniqueVehicleCount}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Vehicles</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 capitalize">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        pothole.status === 'repaired' ? "bg-emerald-500" :
                        pothole.status === 'in-progress' ? "bg-blue-500" : "bg-orange-500"
                      )} />
                      {pothole.status.replace('-', ' ')}
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => setSelectedPothole(pothole)}
                      className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedPothole && (
          <DetailModal 
            pothole={selectedPothole} 
            onClose={() => setSelectedPothole(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
