'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserPlus, Shield, MapPin, Search, 
  MoreVertical, LayoutGrid, ChevronRight, Mail
} from 'lucide-react';

const users = [
  { id: 1, name: 'Anjali Sharma', role: 'Admin', zone: 'Jabalpur HQ', email: 'anjali@wayscan.gov.in', status: 'active' },
  { id: 2, name: 'Vikram Singh', role: 'Field Officer', zone: 'Mumbai West', email: 'vikram@wayscan.gov.in', status: 'active' },
  { id: 3, name: 'Rahul Verma', role: 'Field Officer', zone: 'Delhi Central', email: 'rahul@wayscan.gov.in', status: 'offline' },
  { id: 4, name: 'Priya Das', role: 'Viewer', zone: 'National Council', email: 'priya@wayscan.gov.in', status: 'active' },
];

export default function UsersPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest mb-1.5">
            <LayoutGrid className="w-3 h-3" /> Dashboard
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-400">User Management</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Administrative Access</h1>
          <p className="text-slate-500 font-medium mt-1">Manage team roles and operational zone assignments</p>
        </motion.div>

        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all">
          <UserPlus className="w-4 h-4" /> Add New Team Member
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
           <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input type="text" placeholder="Search members by name or zone..." className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
           </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
           {users.map((user, i) => (
             <motion.div 
               key={user.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 relative group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
             >
                <div className="absolute top-4 right-4">
                   <button className="text-slate-300 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
                </div>
                
                <div className="relative mb-6">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-xl font-black text-slate-800 border border-slate-100 shadow-sm relative z-10">
                      {user.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'} z-20`} />
                </div>

                <h3 className="text-lg font-black text-slate-800 mb-1">{user.name}</h3>
                <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-4 uppercase tracking-widest">
                   <Shield className="w-3 h-3 text-blue-500" /> {user.role}
                </p>

                <div className="space-y-2.5">
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-300" /> {user.zone}
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Mail className="w-3.5 h-3.5 text-slate-300" /> {user.email}
                   </div>
                </div>

                <button className="w-full mt-6 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all tracking-widest">
                   Manage Permissions
                </button>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
