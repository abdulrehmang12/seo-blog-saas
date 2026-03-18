import Link from "next/link";
import { Sparkles, Zap, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container">
      <nav className="nav">
        <div className="logo">
          <Sparkles className="text-primary" /> AuraSEO
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/login" className="btn-secondary">Log In</Link>
          <Link href="/login" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      <main style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h1 className="heading-1 animate-fade-in">
          Unlock the Power of <br />
          <span className="text-gradient">AI-Driven SEO Content</span>
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.25rem', color: '#cbd5e1' }} className="animate-fade-in text-muted">
          Generate perfectly optimized, high-ranking blog posts from just a few keywords. Start driving massive organic traffic today.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }} className="animate-fade-in">
          <Link href="/login" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Try it for Free <ArrowRight size={20} />
          </Link>
          <Link href="#features" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            See How it Works
          </Link>
        </div>

        <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }} id="features">
          <div className="card">
            <Cpu className="text-primary" size={40} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>GPT-4 Powered</h3>
            <p style={{ color: '#94a3b8' }}>Advanced language models generate human-like, engaging content tailored to your target audience.</p>
          </div>
          <div className="card">
            <Zap className="text-primary" size={40} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Instant Generation</h3>
            <p style={{ color: '#94a3b8' }}>No more writer's block. Turn keywords into thousands of words of high-quality copy in seconds.</p>
          </div>
          <div className="card">
            <ShieldCheck className="text-primary" size={40} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>SEO Optimized</h3>
            <p style={{ color: '#94a3b8' }}>Every article follows the latest search engine guidelines and incorporates your keywords naturally.</p>
          </div>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 0', textAlign: 'center', color: '#64748b' }}>
        <p>&copy; {new Date().getFullYear()} AuraSEO - All rights reserved.</p>
      </footer>
    </div>
  );
}
