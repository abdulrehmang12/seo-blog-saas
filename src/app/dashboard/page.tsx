"use client";
import { useAuth } from "@/context/AuthContext";
import { FileText, TrendingUp, Clock, Eye } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="heading-1" style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Dashboard</h1>
          <p style={{ color: '#94a3b8' }}>Welcome back, {user?.email?.split('@')[0]}! Here&apos;s what&apos;s happening today.</p>
        </div>
        <Link href="/dashboard/generate" className="btn-primary">
          <FileText size={18} /> New Blog Post
        </Link>
      </div>

      <div className="grid-cards">
        <div className="stat-card">
          <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} className="text-primary"/> Total Posts Generated
          </div>
          <div className="stat-value">124</div>
        </div>
        <div className="stat-card">
          <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye size={18} className="text-primary" /> Estimated Traffic
          </div>
          <div className="stat-value">12.5K</div>
        </div>
        <div className="stat-card">
          <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} className="text-primary" /> Avg. SEO Score
          </div>
          <div className="stat-value">94%</div>
        </div>
        <div className="stat-card">
          <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} className="text-primary" /> Words Remaining
          </div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>Unlimited</div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <h2 style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>Recent Generations</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.03)', color: '#94a3b8' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Keyword</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Date generated</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Words</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { keyword: "AI in healthcare", date: "Today, 10:23 AM", words: 1250 },
              { keyword: "Best Next.js practices", date: "Yesterday", words: 2100 },
              { keyword: "Stripe integration guide", date: "Mar 16, 2026", words: 1850 },
            ].map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{item.keyword}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#94a3b8' }}>{item.date}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#94a3b8' }}>{item.words}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>Published</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
