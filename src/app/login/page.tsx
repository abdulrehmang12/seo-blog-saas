"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, isMock } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signInMock, user } = useAuth();
  const router = useRouter();

  if (user) {
    if (typeof window !== "undefined") router.push("/dashboard");
    return null;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isMock) {
        await new Promise(res => setTimeout(res, 1000));
        signInMock();
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
      }
      router.push("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
         setError("This email is already taken. Try logging in.");
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
         setError("Invalid email or password.");
      } else {
         setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card" style={{ width: '400px', maxWidth: '90%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Sparkles className="text-primary" size={40} style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
            {isLogin ? "Sign in to manage your AI blogs." : "Start generating SEO content today."}
          </p>
        </div>

        {error && <div style={{ color: 'var(--error)', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

        <form onSubmit={handleAuth}>
          <div>
            <label className="label">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              minLength={6}
            />
          </div>

          <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : isLogin ? "Sign In" : "Sign Up"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#94a3b8' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(""); }} 
            style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
