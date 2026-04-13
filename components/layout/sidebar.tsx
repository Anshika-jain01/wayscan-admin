'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  FileText, 
  Wrench, 
  BarChart3, 
  RefreshCw, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Heatmap', href: '/heatmap', icon: MapIcon },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Work Orders', href: '/work-orders', icon: Wrench },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Sync Status', href: '/sync-status', icon: RefreshCw, badge: 23 },
  { name: 'User Management', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="relative flex flex-col h-full bg-white border-r border-slate-200 shadow-sm z-30"
    >
      {/* Logo Section */}
      <div className="flex h-20 items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <MapPin className="text-white w-6 h-6" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold tracking-tight text-slate-800"
            >
              Way<span className="text-blue-600">Scan</span>
            </motion.span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative",
                isActive 
                  ? "bg-blue-50 text-blue-600 font-semibold shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                isActive ? "text-blue-600" : "text-slate-400"
              )} />
              
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="whitespace-nowrap flex-1"
                >
                  {item.name}
                </motion.span>
              )}

              {item.badge && item.badge > 0 && (
                <span className={cn(
                  "flex items-center justify-center rounded-full bg-orange-500 text-white text-[10px] font-bold leading-none px-1.5 py-1",
                  collapsed ? "absolute -top-1 -right-1" : "ml-auto"
                )}>
                  {item.badge}
                </span>
              )}

              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Profile */}
      <div className="p-4 border-t border-slate-100">
        {!collapsed && (
          <div className="bg-slate-50 rounded-2xl p-3 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-slate-500 font-bold">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">Admin User</p>
              <p className="text-[10px] text-slate-500 truncate">admin@wayscan.gov.in</p>
            </div>
          </div>
        )}
        
        <button className={cn(
          "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors",
          collapsed && "justify-center"
        )}>
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-semibold">Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-24 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:bg-slate-50 text-slate-400 hover:text-slate-600 z-50 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.aside>
  );
}
