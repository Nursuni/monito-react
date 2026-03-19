import React, { useState } from "react";
import { Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

/* ─── Styles ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .help-root, .help-root * {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }

    .help-root {
      --blue-50:  #EFF6FF;
      --blue-100: #DBEAFE;
      --blue-200: #BFDBFE;
      --blue-500: #3B82F6;
      --blue-600: #2563EB;
      --blue-700: #1D4ED8;
      --ink:      #0F172A;
      --muted:    #64748B;
      --border:   #E2E8F0;
      --bg:       #F8FAFF;
    }

    /* ── page fade-in ── */
    @keyframes hp-fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes hp-fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes hp-slideDown {
      from { opacity: 0; max-height: 0; transform: translateY(-8px); }
      to   { opacity: 1; max-height: 600px; transform: translateY(0); }
    }
    @keyframes hp-slideUp {
      from { opacity: 1; max-height: 600px; }
      to   { opacity: 0; max-height: 0; }
    }
    @keyframes hp-stagger {
      from { opacity: 0; transform: translateX(-12px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes hp-pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
      50%      { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
    }
    @keyframes hp-spin {
      to { transform: rotate(180deg); }
    }

    .hp-fade-up   { animation: hp-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
    .hp-fade-in   { animation: hp-fadeIn 0.4s ease both; }

    /* ── Tab bar ── */
    .hp-tabs {
      display: flex;
      gap: 6px;
      background: white;
      border: 2px solid var(--border);
      border-radius: 16px;
      padding: 6px;
      width: fit-content;
      margin: 0 auto 48px;
      box-shadow: 0 4px 20px rgba(37,99,235,0.07);
    }

    .hp-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 11px 24px;
      border-radius: 11px;
      border: none;
      background: transparent;
      font-size: 14px;
      font-weight: 700;
      color: var(--muted);
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
      letter-spacing: 0.02em;
      white-space: nowrap;
    }
    .hp-tab:hover { color: var(--blue-600); background: var(--blue-50); }
    .hp-tab.active {
      background: var(--blue-600);
      color: white;
      box-shadow: 0 4px 14px rgba(37,99,235,0.32);
      transform: scale(1.03);
    }

    /* ── Terms ── */
    .hp-term {
      display: flex;
      gap: 14px;
      align-items: flex-start;
      padding: 16px 20px;
      background: white;
      border: 2px solid var(--border);
      border-radius: 14px;
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
      animation: hp-stagger 0.4s cubic-bezier(0.22,1,0.36,1) both;
    }
    .hp-term:hover {
      border-color: var(--blue-200);
      box-shadow: 0 4px 20px rgba(37,99,235,0.08);
      transform: translateX(4px);
    }
    .hp-term-num {
      flex-shrink: 0;
      width: 28px; height: 28px;
      border-radius: 8px;
      background: var(--blue-600);
      color: white;
      font-size: 12px;
      font-weight: 800;
      display: flex; align-items: center; justify-content: center;
    }

    /* ── Accordion ── */
    .hp-accordion {
      background: white;
      border: 2px solid var(--border);
      border-radius: 14px !important;
      overflow: hidden;
      transition: border-color 0.2s, box-shadow 0.2s;
      animation: hp-fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
    }
    .hp-accordion:hover { border-color: var(--blue-200); }
    .hp-accordion.open  { border-color: var(--blue-500); box-shadow: 0 4px 20px rgba(37,99,235,0.1); }

    .hp-accordion-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px;
      cursor: pointer;
      gap: 12px;
      user-select: none;
    }
    .hp-accordion-q {
      font-size: 15px;
      font-weight: 700;
      color: var(--ink);
      flex: 1;
    }
    .hp-accordion-icon {
      flex-shrink: 0;
      width: 28px; height: 28px;
      border-radius: 8px;
      background: var(--blue-50);
      border: 2px solid var(--blue-200);
      display: flex; align-items: center; justify-content: center;
      color: var(--blue-600);
      transition: background 0.2s, transform 0.3s ease;
    }
    .hp-accordion.open .hp-accordion-icon {
      background: var(--blue-600);
      border-color: var(--blue-600);
      color: white;
      transform: rotate(180deg);
    }

    .hp-accordion-body {
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition: max-height 0.35s cubic-bezier(0.22,1,0.36,1),
                  opacity 0.25s ease,
                  padding 0.25s ease;
      padding: 0 20px;
    }
    .hp-accordion.open .hp-accordion-body {
      max-height: 400px;
      opacity: 1;
      padding: 0 20px 18px;
    }
    .hp-accordion-a {
      font-size: 14px;
      font-weight: 500;
      color: var(--muted);
      line-height: 1.7;
      border-top: 1px solid var(--border);
      padding-top: 14px;
    }

    /* ── Contact form ── */
    .hp-form-wrap {
      max-width: 560px;
      margin: 0 auto;
      background: white;
      border: 2px solid var(--border);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 8px 32px rgba(37,99,235,0.07);
      animation: hp-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }

    .hp-field {
      margin-bottom: 18px;
    }
    .hp-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 7px;
    }
    .hp-input, .hp-textarea {
      width: 100%;
      border: 2px solid var(--border);
      border-radius: 12px;
      padding: 11px 14px;
      font-size: 14px;
      font-weight: 500;
      color: var(--ink);
      background: var(--bg);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      resize: none;
    }
    .hp-input:focus, .hp-textarea:focus {
      border-color: var(--blue-500);
      box-shadow: 0 0 0 4px rgba(37,99,235,0.1);
      background: white;
    }
    .hp-input::placeholder, .hp-textarea::placeholder { color: #CBD5E1; }
    .hp-textarea { min-height: 110px; }

    .hp-submit {
      width: 100%;
      padding: 13px;
      border-radius: 12px;
      border: none;
      background: var(--blue-600);
      color: white;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.03em;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(37,99,235,0.3);
      transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
      margin-top: 4px;
    }
    .hp-submit:hover {
      background: var(--blue-700);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(37,99,235,0.38);
    }
    .hp-submit:active { transform: translateY(0); }

    /* ── Panel wrapper (for fade transition) ── */
    .hp-panel { animation: hp-fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both; }
  `}</style>
);

/* ─── Accordion Item ─── */
function FaqItem({
  item,
  index,
}: {
  item: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`hp-accordion${open ? " open" : ""}`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="hp-accordion-header" onClick={() => setOpen(!open)}>
        <span className="hp-accordion-q">{item.question}</span>
        <span className="hp-accordion-icon">
          <ExpandMoreIcon style={{ fontSize: 18 }} />
        </span>
      </div>
      <div className="hp-accordion-body">
        <p className="hp-accordion-a">{item.answer}</p>
      </div>
    </div>
  );
}

/* ─── Tab config ─── */
const TABS = [
  {
    id: "1",
    label: "Terms",
    icon: <GavelOutlinedIcon style={{ fontSize: 17 }} />,
  },
  {
    id: "2",
    label: "FAQ",
    icon: <QuestionAnswerOutlinedIcon style={{ fontSize: 17 }} />,
  },
  {
    id: "3",
    label: "Contact",
    icon: <EmailOutlinedIcon style={{ fontSize: 17 }} />,
  },
];

/* ─── Main Component ─── */
export default function HelpPage() {
  const [activeTab, setActiveTab] = useState("1");
  const [openTab, setOpenTab] = useState("1");

  const switchTab = (id: string) => {
    setActiveTab(id);
    // Small delay so fade-up re-triggers
    setTimeout(() => setOpenTab(id), 10);
  };

  return (
    <div
      className="help-root"
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        padding: "64px 0 100px",
      }}
    >
      <GlobalStyles />
      <Container maxWidth="md">
        {/* ── Header ── */}
        <div
          className="hp-fade-up"
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--blue-600)",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width: 24,
                height: 3,
                background: "var(--blue-600)",
                borderRadius: 2,
                display: "block",
              }}
            />
            Support Center
            <span
              style={{
                width: 24,
                height: 3,
                background: "var(--blue-600)",
                borderRadius: 2,
                display: "block",
              }}
            />
          </div>
          <h1
            style={{
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 800,
              color: "var(--ink)",
              margin: "0 0 12px",
              letterSpacing: "-0.03em",
            }}
          >
            How can we help you?
          </h1>
          <p
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Browse our terms, FAQs, or drop us a message.
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className="hp-fade-up" style={{ animationDelay: "80ms" }}>
          <div className="hp-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`hp-tab${activeTab === t.id ? " active" : ""}`}
                onClick={() => switchTab(t.id)}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══ TERMS ══ */}
        {openTab === "1" && (
          <div className="hp-panel" key="terms">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {terms.map((term, i) => (
                <div
                  key={i}
                  className="hp-term"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  <span className="hp-term-num">{i + 1}</span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--ink)",
                      lineHeight: 1.65,
                    }}
                  >
                    {term}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ FAQ ══ */}
        {openTab === "2" && (
          <div className="hp-panel" key="faq">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {faq.map((item, i) => (
                <FaqItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ══ CONTACT ══ */}
        {openTab === "3" && (
          <div className="hp-panel" key="contact">
            <div className="hp-form-wrap">
              {/* Form header */}
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: "var(--blue-50)",
                    border: "2px solid var(--blue-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                    animation: "hp-pulse 2.5s ease infinite",
                  }}
                >
                  <EmailOutlinedIcon
                    style={{ fontSize: 24, color: "var(--blue-600)" }}
                  />
                </div>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--ink)",
                    margin: "0 0 6px",
                  }}
                >
                  Get in Touch
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--muted)",
                    margin: 0,
                  }}
                >
                  We'll get back to you within 24 hours.
                </p>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: "var(--border)",
                  marginBottom: 24,
                }}
              />

              {/* Form */}
              <form>
                <div className="hp-field">
                  <label className="hp-label">Your Name</label>
                  <input
                    className="hp-input"
                    type="text"
                    name="memberNick"
                    placeholder="John Doe"
                  />
                </div>
                <div className="hp-field">
                  <label className="hp-label">Your Email</label>
                  <input
                    className="hp-input"
                    type="email"
                    name="memberEmail"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="hp-field">
                  <label className="hp-label">Message</label>
                  <textarea
                    className="hp-textarea"
                    name="memberMsg"
                    placeholder="Tell us how we can help…"
                  />
                </div>
                <button type="submit" className="hp-submit">
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
