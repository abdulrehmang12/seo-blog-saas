"use client";
import { useState } from "react";
import { Wand2, Loader2, CheckCircle2, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function GeneratePage() {
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    setLoading(true);

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
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 className="heading-1" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>AI Content Engine</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Generate fully-optimized, ready-to-publish blog content instantly.</p>

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
                 <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={() => navigator.clipboard.writeText(content)}>
                   <Copy size={16} /> Copy Text
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
      <style dangerouslySetInnerHTML={{__html: `
        .markdown-content h1 { font-size: 2rem; margin: 1.5rem 0 1rem; color: #fff; }
        .markdown-content h2 { font-size: 1.5rem; margin: 1.5rem 0 1rem; color: #fff; }
        .markdown-content h3 { font-size: 1.25rem; margin: 1.25rem 0 0.75rem; color: #fff; }
        .markdown-content p { margin-bottom: 1rem; }
        .markdown-content ul { margin-left: 1.5rem; margin-bottom: 1rem; }
        .markdown-content li { margin-bottom: 0.25rem; }
      `}} />
    </div>
  );
}
