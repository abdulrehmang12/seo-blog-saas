"use client";
import { useAuth } from "@/context/AuthContext";
import { User, Lock, Bell } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="heading-1" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Account Settings</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Update your profile details and preferences.</p>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={20} className="text-primary" /> Personal Information
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label className="label">Full Name</label>
            <input type="text" className="input-field" defaultValue="John Doe" />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input type="email" className="input-field" defaultValue={user?.email || ""} disabled style={{ opacity: 0.6 }} />
          </div>
        </div>
        <button className="btn-primary" style={{ marginTop: '1rem' }}>Save Changes</button>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lock size={20} className="text-primary" /> Security
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <div>
            <label className="label">Current Password</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          <div>
            <label className="label">New Password</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
        </div>
        <button className="btn-secondary" style={{ marginTop: '1rem' }}>Update Password</button>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={20} className="text-primary" /> Email Notifications
        </h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer' }}>
          <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
          <span>Product Updates & Announcements</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer' }}>
          <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
          <span>Weekly Performance Reports</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
          <span>Billing Alerts (Only send if my usage is high)</span>
        </label>
      </div>
    </div>
  );
}
