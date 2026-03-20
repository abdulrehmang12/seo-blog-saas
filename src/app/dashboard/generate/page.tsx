"use client";
import { useState } from "react";
import { Wand2, Loader2, CheckCircle2, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

const markdownStyles = `
  .markdown-content h1 { font-size: 2rem; margin: 1.5rem 0 1rem; color: #fff; }
  .markdown-content h2 { font-size: 1.5rem; margin: 1.5rem 0 1rem; color: #fff; }
  .markdown-content h3 { font-size: 1.25rem; margin: 1.25rem 0 0.75rem; color: #fff; }
  .markdown-content p { margin-bottom: 1rem; }
  .markdown-content ul { margin-left: 1.5rem; margin-bottom: 1rem; }
  .markdown-content li { margin-bottom: 0.25rem; }
`;

export default function GeneratePage() {
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, tone })
      });
      
      const data = await res.json();
      if (res.ok) {
        setContent(data.content);
      } else {
        setError(data.error || "Failed to generate content. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <style>{markdownStyles}</style>
      <h1 className="heading-1" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>AI Content Engine</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Generate fully-optimized, ready-to-publish blog content instantly.</p>

      {error && (
        <div style={{
          color: '#ef4444',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius)',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 600, marginLeft: '1rem' }}
          >
            ✕
          </button>
        </div>
      )}

      <div className="generate-grid">
        <div className="card">
          <form onSubmit={handleGenerate}>
            <label className="label">Primary Keyword</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Next.js server actions SEO" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required 
            />

            <label className="label" style={{ marginTop: '1rem' }}>Content Tone</label>
            <select 
              className="input-field"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{ appearance: 'none' }}
            >
              <option value="Professional">Professional</option>
              <option value="Conversational">Conversational</option>
              <option value="Persuasive">Persuasive</option>
              <option value="Humorous">Humorous</option>
            </select>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <><Wand2 size={18} /> Generate Content</>}
            </button>
          </form>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: 'var(--radius)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
              <CheckCircle2 size={16} /> SEO Checklist
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>✓ Keyword in H1</li>
              <li>✓ LSI Keywords included</li>
              <li>✓ Optimal keyword density</li>
              <li>✓ Meta tags generated</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
          {content ? (
            <>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                 <h3 style={{ fontWeight: 600 }}>Generated Output</h3>
                 <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={handleCopy}>
                   {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Text</>}
                 </button>
               </div>
               <div className="markdown-content" style={{ overflowY: 'auto', flex: 1, paddingRight: '1rem', lineHeight: 1.6, color: '#e2e8f0' }}>
                 <ReactMarkdown>{content}</ReactMarkdown>
               </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-primary" size={48} style={{ marginBottom: '1rem' }} />
                  <p>Orchestrating AI generation magic...</p>
                </>
              ) : (
                <>
                  <Wand2 size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <p>Enter a keyword to see the magic happen.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
