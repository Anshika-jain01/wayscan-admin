'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapIcon, Filter, Layers, LayoutGrid, 
  ChevronRight, Maximize2, Info
} from 'lucide-react';
import { potholes as allPotholes } from '@/lib/mock-data';
import { PotholeCluster, Status } from '@/lib/types';
import DetailModal from '@/components/dashboard/detail-modal';

// Dynamically import map to avoid SSR issues
const PriorityMap = dynamic(() => import('@/components/dashboard/priority-map'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 rounded-[2.5rem] animate-pulse flex items-center justify-center text-slate-400 font-bold">Initializing Spatial Engine...</div>
});

export default function HeatmapPage() {
  const [selectedPothole, setSelectedPothole] = useState<PotholeCluster | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [data, setData] = useState(allPotholes);

  const handleSelect = (pothole: PotholeCluster) => {
    setSelectedId(pothole.id);
    setSelectedPothole(pothole);
  };

  const handleStatusChange = (id: string, newStatus: Status) => {
    setData(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    if (selectedPothole?.id === id) {
      setSelectedPothole(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest mb-1.5">
            <LayoutGrid className="w-3 h-3" /> Dashboard
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-400">Heatmap</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Priority Spatial View</h1>
          <p className="text-slate-500 font-medium mt-1">Real-time cluster visualization across regional networks</p>
        </motion.div>

        <div className="flex items-center gap-2">
           <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-bold text-slate-600 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             Live Data Feed Active
           </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 bg-white border border-slate-200 rounded-[2.5rem] p-3 shadow-xl relative overflow-hidden"
      >
        {/* Map Legend Overlay */}
        <div className="absolute top-8 right-8 z-20 flex flex-col gap-2">
           <div className="bg-white/95 backdrop-blur shadow-2xl border border-slate-200 rounded-2xl p-4 min-w-[200px]">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Priority Schema
              </h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-[11px] font-bold text-slate-700">High Action</span>
                  </div>
                  <span className="text-[10px] font-black p-1 bg-red-50 text-red-600 rounded">10+ V</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-[11px] font-bold text-slate-700">Medium Alarm</span>
                  </div>
                  <span className="text-[10px] font-black p-1 bg-orange-50 text-orange-600 rounded">4-9 V</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold text-slate-700">Low Concern</span>
                  </div>
                  <span className="text-[10px] font-black p-1 bg-emerald-50 text-emerald-600 rounded">1-3 V</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                 <p className="text-[10px] text-slate-400 font-medium italic">Priority is weighted by Unique Vehicle Count (V) per coordinate cluster.</p>
              </div>
           </div>
        </div>

        {/* Full-Screen Map Container */}
        <PriorityMap 
          data={data} 
          selectedId={selectedId} 
          onMarkerClick={handleSelect} 
        />
      </motion.div>

      <AnimatePresence>
        {selectedPothole && (
          <DetailModal 
            pothole={selectedPothole} 
            onClose={() => { setSelectedPothole(null); setSelectedId(null); }}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
