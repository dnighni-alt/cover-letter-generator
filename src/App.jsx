import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #f5f5f7;
    color: #1d1d1f;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  .app { min-height: 100vh; background: #f5f5f7; }

  .header {
    background: rgba(255,255,255,0.72);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding: 0 24px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-title {
    font-size: 17px;
    font-weight: 600;
    color: #1d1d1f;
    letter-spacing: -0.3px;
  }

  .hero {
    text-align: center;
    padding: 64px 24px 48px;
  }

  .hero-eyebrow {
    font-size: 17px;
    font-weight: 600;
    color: #0071e3;
    margin-bottom: 10px;
    letter-spacing: -0.2px;
  }

  .hero-title {
    font-size: clamp(36px, 7vw, 64px);
    font-weight: 700;
    letter-spacing: -2px;
    line-height: 1.05;
    color: #1d1d1f;
    margin-bottom: 16px;
  }

  .hero-sub {
    font-size: 19px;
    font-weight: 400;
    color: #6e6e73;
    letter-spacing: -0.3px;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.5;
  }

  .container {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 20px 80px;
  }

  .card {
    background: #ffffff;
    border-radius: 18px;
    padding: 28px;
    margin-bottom: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .card-title {
    font-size: 13px;
    font-weight: 600;
    color: #6e6e73;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) { .row { grid-template-columns: 1fr; } }

  .field { display: flex; flex-direction: column; gap: 7px; }
  .field + .field { margin-top: 12px; }

  label {
    font-size: 13px;
    font-weight: 500;
    color: #1d1d1f;
    letter-spacing: -0.1px;
  }

  input, textarea {
    background: #f5f5f7;
    border: 1.5px solid transparent;
    border-radius: 10px;
    color: #1d1d1f;
    font-family: inherit;
    font-size: 15px;
    font-weight: 400;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.15s, background 0.15s;
    width: 100%;
    letter-spacing: -0.2px;
  }

  input:focus, textarea:focus {
    background: #fff;
    border-color: #0071e3;
  }

  input::placeholder, textarea::placeholder { color: #adadb8; }
  textarea { resize: vertical; line-height: 1.6; }

  .tone-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  @media (max-width: 380px) { .tone-grid { grid-template-columns: repeat(2, 1fr); } }

  .tone-btn {
    background: #f5f5f7;
    border: 1.5px solid transparent;
    border-radius: 10px;
    color: #1d1d1f;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    padding: 11px 8px;
    text-align: center;
    transition: all 0.15s;
    letter-spacing: -0.2px;
  }

  .tone-btn:hover { background: #ebebed; }

  .tone-btn.active {
    background: #0071e3;
    border-color: #0071e3;
    color: #fff;
  }

  .generate-btn {
    width: 100%;
    background: #0071e3;
    border: none;
    border-radius: 14px;
    color: #fff;
    cursor: pointer;
    font-family: inherit;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.3px;
    padding: 18px;
    transition: background 0.15s, transform 0.1s;
    margin-top: 4px;
  }

  .generate-btn:hover:not(:disabled) { background: #0077ed; }
  .generate-btn:active:not(:disabled) { transform: scale(0.99); background: #006edb; }
  .generate-btn:disabled { background: #adadb8; cursor: not-allowed; }

  .loading {
    text-align: center;
    padding: 48px 20px;
  }

  .spinner-wrap { display: flex; justify-content: center; margin-bottom: 14px; }

  .spinner {
    width: 28px;
    height: 28px;
    border: 2.5px solid #e0e0e5;
    border-top-color: #0071e3;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text {
    font-size: 15px;
    color: #6e6e73;
    font-weight: 400;
    letter-spacing: -0.2px;
  }

  .result-card {
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    margin-top: 4px;
    animation: fadeUp 0.3s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .result-header {
    padding: 16px 22px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .result-label {
    font-size: 13px;
    font-weight: 600;
    color: #6e6e73;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  .actions { display: flex; gap: 6px; }

  .action-btn {
    background: #f5f5f7;
    border: none;
    border-radius: 7px;
    color: #0071e3;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    padding: 6px 13px;
    transition: background 0.15s;
    letter-spacing: -0.1px;
  }

  .action-btn:hover { background: #ebebed; }
  .action-btn.copied { color: #28a745; }

  .result-body { padding: 26px 24px; }

  .result-text {
    color: #1d1d1f;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.8;
    white-space: pre-wrap;
    letter-spacing: -0.1px;
  }

  .error {
    background: #fff2f2;
    border: 1.5px solid #ffcdd2;
    border-radius: 12px;
    color: #c62828;
    font-size: 14px;
    padding: 14px 18px;
    margin-top: 10px;
    letter-spacing: -0.1px;
  }

  .muted { color: #adadb8; font-weight: 400; }
`;

const TONES = [
  { id: "professional", label: "Professional" },
  { id: "confident", label: "Confident" },
  { id: "enthusiastic", label: "Enthusiastic" },
  { id: "concise", label: "Concise" },
  { id: "creative", label: "Creative" },
  { id: "humble", label: "Humble" },
];

export default function App() {
  const [form, setForm] = useState({
    jobTitle: "", company: "", jobDesc: "",
    experience: "", skills: "", tone: "professional",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const generate = async () => {
    if (!form.jobTitle || !form.company || !form.experience) {
      setError("Please fill in Job Title, Company, and Your Experience.");
      return;
    }
    setError(""); setLoading(true); setResult("");

    const prompt = `Write a ${form.tone} cover letter for:
Job Title: ${form.jobTitle}
Company: ${form.company}
${form.jobDesc ? `Job Description: ${form.jobDesc}` : ""}
My Experience: ${form.experience}
${form.skills ? `My Key Skills: ${form.skills}` : ""}

Rules:
- Human, not robotic. 3–4 paragraphs, max 350 words.
- Strong opening hook — NOT "I am writing to apply..."
- Show real enthusiasm for this specific company
- Tone: ${form.tone}
- End with a confident call to action
- No [brackets], no placeholders — complete and ready to send
- No subject line — just the letter body from greeting`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setResult(data.content?.map((b) => b.text || "").join("") || "");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setResult("");
    setForm({ jobTitle: "", company: "", jobDesc: "", experience: "", skills: "", tone: "professional" });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <span className="nav-title">Cover Letter</span>
        </div>

        <div className="hero">
          <div className="hero-eyebrow">AI‑Powered</div>
          <h1 className="hero-title">Your perfect<br />cover letter.</h1>
          <p className="hero-sub">Tailored to the job. Ready to send. In seconds.</p>
        </div>

        <div className="container">
          <div className="card">
            <div className="card-title">Job Details</div>
            <div className="row">
              <div className="field">
                <label>Job Title</label>
                <input placeholder="Frontend Developer" value={form.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} />
              </div>
              <div className="field">
                <label>Company</label>
                <input placeholder="Apple" value={form.company} onChange={(e) => set("company", e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>Job Description <span className="muted">(optional)</span></label>
              <textarea placeholder="Paste the job description or key requirements..." rows={4} value={form.jobDesc} onChange={(e) => set("jobDesc", e.target.value)} />
            </div>
          </div>

          <div className="card">
            <div className="card-title">Your Background</div>
            <div className="field">
              <label>Your Experience</label>
              <textarea placeholder="e.g. 2 years as a junior developer, built 3 web apps, switching from marketing..." rows={3} value={form.experience} onChange={(e) => set("experience", e.target.value)} />
            </div>
            <div className="field">
              <label>Key Skills <span className="muted">(optional)</span></label>
              <input placeholder="React, Python, communication, project management" value={form.skills} onChange={(e) => set("skills", e.target.value)} />
            </div>
          </div>

          <div className="card">
            <div className="card-title">Tone</div>
            <div className="tone-grid">
              {TONES.map((t) => (
                <button key={t.id} className={`tone-btn ${form.tone === t.id ? "active" : ""}`} onClick={() => set("tone", t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <button className="generate-btn" onClick={generate} disabled={loading}>
            {loading ? "Generating…" : "Generate Cover Letter"}
          </button>

          {loading && (
            <div className="loading">
              <div className="spinner-wrap"><div className="spinner" /></div>
              <div className="loading-text">Writing your cover letter…</div>
            </div>
          )}

          {result && (
            <div className="result-card">
              <div className="result-header">
                <span className="result-label">Cover Letter</span>
                <div className="actions">
                  <button className={`action-btn ${copied ? "copied" : ""}`} onClick={copy}>{copied ? "Copied!" : "Copy"}</button>
                  <button className="action-btn" onClick={generate}>Redo</button>
                  <button className="action-btn" onClick={reset}>New</button>
                </div>
              </div>
              <div className="result-body">
                <div className="result-text">{result}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
