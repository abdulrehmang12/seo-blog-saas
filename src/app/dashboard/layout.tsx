"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, LayoutDashboard, PenTool, CreditCard, LogOut, Settings, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, signOutMock } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      if (auth) {
        await signOut(auth);
      } else {
        signOutMock();
      }
      router.push("/login");
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  if (loading) return <div className="auth-container"><Sparkles className="text-primary animate-pulse" size={50} /></div>;

  if (!user) {
    if (typeof window !== 'undefined') router.push("/login");
    return null;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-layout">
      {/* Mobile overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} 
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ fontSize: '1.25rem', color: '#fff' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--primary), #ec4899)', padding: '0.4rem', borderRadius: '0.5rem', display: 'flex' }}>
              <Sparkles size={20} color="white" />
            </div>
            AuraSEO
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)} style={{ display: 'none' }}>
            <X color="#94a3b8" />
          </button>
        </div>

        <nav className="sidebar-nav" style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
          <div className="nav-section-title">Overview</div>
          <Link href="/dashboard" onClick={() => setSidebarOpen(false)} className={`sidebar-link ${pathname === '/dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/dashboard/generate" onClick={() => setSidebarOpen(false)} className={`sidebar-link ${pathname === '/dashboard/generate' ? 'active' : ''}`}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}><PenTool size={18} /> AI Generator</div>
               <span style={{ fontSize: '0.65rem', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: 600 }}>PRO</span>
             </div>
          </Link>
          
          <div className="nav-section-title" style={{ marginTop: '2rem' }}>Account</div>
          <Link href="/dashboard/billing" onClick={() => setSidebarOpen(false)} className={`sidebar-link ${pathname === '/dashboard/billing' ? 'active' : ''}`}>
            <CreditCard size={18} /> Billing & Plan
          </Link>
          <Link href="/dashboard/settings" onClick={() => setSidebarOpen(false)} className={`sidebar-link ${pathname === '/dashboard/settings' ? 'active' : ''}`}>
            <Settings size={18} /> Settings
          </Link>
        </nav>

        <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(0, 0, 0, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '0.5rem', transition: 'background 0.2s', cursor: 'pointer' }} className="user-profile-block">
            <div style={{ width: '38px', height: '38px', borderRadius: '0.4rem', background: 'linear-gradient(135deg, var(--primary), #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)' }}>
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.email?.split('@')[0]}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{user.plan?.toUpperCase() || 'FREE'} PLAN</div>
            </div>
          </div>
          <button onClick={handleSignOut} className="sidebar-link" style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'center', fontSize: '0.875rem', color: '#ef4444' }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        {children}
      </main>

      {/* Floating Toggle for Mobile */}
      <button className="mobile-sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}
