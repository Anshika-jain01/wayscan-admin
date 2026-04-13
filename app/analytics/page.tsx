'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  BarChart3, TrendingUp, MapPin, Globe, CheckCircle2, 
  ArrowUpRight, ArrowDownRight, LayoutGrid, ChevronRight
} from 'lucide-react';

const cityData = [
  { name: 'Mumbai', count: 156 },
  { name: 'Delhi', count: 142 },
  { name: 'Bengaluru', count: 98 },
  { name: 'Jabalpur', count: 62 },
  { name: 'Lucknow', count: 45 },
];

const areaData = [
  { name: 'Urban', value: 72 },
  { name: 'Rural', value: 28 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
const AREA_COLORS = ['#3b82f6', '#fbbf24'];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest mb-1.5">
            <LayoutGrid className="w-3 h-3" /> Dashboard
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-400">Analytics</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">System Analytics</h1>
          <p className="text-slate-500 font-medium mt-1">Cross-regional performance and infrastructure trends</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* City-wise Comparison */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" /> City Distribution
            </h3>
            <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All Cities</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} dx={-10} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={40}>
                  {cityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rural vs Urban Split */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-8">
            <Globe className="w-5 h-5 text-emerald-500" /> Area Split
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={areaData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {areaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={AREA_COLORS[index % AREA_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
             {areaData.map((item, i) => (
               <div key={i} className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: AREA_COLORS[i] }} />
                 <span className="text-xs font-bold text-slate-600">{item.name} ({item.value}%)</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Repair Rate', value: '78%', trend: '+4.2%', icon: CheckCircle2, color: 'emerald' },
          { label: 'Active Reports', value: '1,240', trend: '+12%', icon: BarChart3, color: 'blue' },
          { label: 'Response Time', value: '3.2d', trend: '-0.5d', icon: TrendingUp, color: 'purple' },
          { label: 'Network Health', value: '94%', trend: 'Stable', icon: Globe, color: 'orange' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
               <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
               <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.trend}</span>
            </div>
            <div className="text-2xl font-black text-slate-800">{stat.value}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
