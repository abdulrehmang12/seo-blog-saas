"use client";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function BillingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 className="heading-1" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Billing & Subscriptions</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Manage your subscription plan and payment details.</p>
      
      <div style={{ padding: '1.5rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: 'var(--radius)', marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>Current Plan: <strong>{user?.plan?.toUpperCase() || 'FREE'}</strong></h3>
        <p style={{ color: '#94a3b8' }}>You are on the free plan which includes up to 5 generations per month.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Pro Plan */}
        <div className="card" style={{ border: '2px solid var(--primary)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', right: '2rem', background: 'var(--primary)', color: '#fff', padding: '0.25rem 1rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
            MOST POPULAR
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Pro Creator</h3>
          <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>$29</span>
            <span style={{ color: '#94a3b8' }}>/ month</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={18} className="text-primary"/> 100 Articles/month</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={18} className="text-primary"/> GPT-4 Powered Content</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={18} className="text-primary"/> Advanced SEO Reports</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={18} className="text-primary"/> Priority Email Support</li>
          </ul>
          <button 
            className="btn-primary" 
            style={{ width: '100%', marginTop: 'auto' }}
            onClick={() => handleSubscribe('price_pro_mock')}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Upgrade to Pro"}
          </button>
        </div>

        {/* Agency Plan */}
        <div className="card">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Agency Elite</h3>
          <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>$99</span>
            <span style={{ color: '#94a3b8' }}>/ month</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={18} className="text-primary"/> Unlimited Articles</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={18} className="text-primary"/> Custom Tone fine-tuning</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={18} className="text-primary"/> API Access & Webhooks</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={18} className="text-primary"/> Dedicated Success Manager</li>
          </ul>
          <button 
            className="btn-secondary" 
            style={{ width: '100%', marginTop: 'auto' }}
            onClick={() => handleSubscribe('price_agency_mock')}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Select Agency"}
          </button>
        </div>

      </div>
    </div>
  );
}
