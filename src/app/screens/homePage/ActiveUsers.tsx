import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveTopUsers } from "./selector";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";

const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .au-root, .au-root * {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }
    .au-root {
      --blue-50:  #EFF6FF;
      --blue-100: #DBEAFE;
      --blue-200: #BFDBFE;
      --blue-400: #60A5FA;
      --blue-500: #3B82F6;
      --blue-600: #2563EB;
      --blue-700: #1D4ED8;
      --ink:      #0F172A;
      --muted:    #64748B;
      --border:   #E2E8F0;
    }

    @keyframes au-fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes au-scaleIn {
      from { opacity: 0; transform: scale(0.92); }
      to   { opacity: 1; transform: scale(1); }
    }

    /* Header */
    .au-header {
      margin-bottom: 36px;
      animation: au-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .au-eyebrow {
      display: flex; align-items: center; gap: 8px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.16em;
      text-transform: uppercase; color: var(--blue-600); margin-bottom: 8px;
    }
    .au-eyebrow-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--blue-600);
    }
    .au-heading {
      font-size: clamp(22px, 3vw, 32px); font-weight: 800;
      color: var(--ink); letter-spacing: -0.03em; margin: 0;
    }

    /* Track */
    .au-grid {
      display: flex;
      gap: 20px;
        justify-content: center; 
  flex-wrap: wrap;   
      overflow-x: auto;
      padding-bottom: 12px;
      scroll-behavior: smooth;
      scrollbar-width: none;
    }
    .au-grid::-webkit-scrollbar { display: none; }

    /* Member card */
    .au-card {
      flex-shrink: 0;
      width: 220px;
      background: white;
      border: 2px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      animation: au-scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
      transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
    }
    .au-card:hover {
      border-color: var(--blue-200);
      box-shadow: 0 16px 48px rgba(37,99,235,0.14);
      transform: translateY(-5px);
    }

    /* Image */
    .au-img-wrap {
      position: relative;
      width: 100%; height: 220px;
      overflow: hidden;
      background: var(--blue-50);
    }
    .au-img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.55s cubic-bezier(0.23,1,0.32,1);
      display: block;
    }
    .au-card:hover .au-img { transform: scale(1.07); }

    /* Gradient overlay */
    .au-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(37,99,235,0.18), transparent);
      opacity: 0; transition: opacity 0.3s;
    }
    .au-card:hover .au-overlay { opacity: 1; }

    /* Bottom stripe */
    .au-stripe {
      height: 3px;
      background: linear-gradient(90deg, var(--blue-600), var(--blue-400));
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
    }
    .au-card:hover .au-stripe { transform: scaleX(1); }

    /* Body */
    .au-body { padding: 14px 16px 16px; text-align: center; }
    .au-name {
      font-size: 15px; font-weight: 700; color: var(--ink);
      margin: 0 0 4px;
      transition: color 0.18s;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .au-card:hover .au-name { color: var(--blue-600); }
    .au-label {
      font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--muted);
    }

    /* Empty */
    .au-empty {
      width: 100%; text-align: center; padding: 64px 0;
      animation: au-fadeUp 0.5s ease both;
    }
    .au-empty-icon {
      width: 72px; height: 72px; border-radius: 22px;
      background: var(--blue-50); border: 2px solid var(--blue-100);
      display: flex; align-items: center; justify-content: center;
      font-size: 32px; margin: 0 auto 16px;
    }
    .au-empty-title { font-size: 17px; font-weight: 700; color: var(--ink); margin: 0 0 6px; }
    .au-empty-sub   { font-size: 14px; font-weight: 500; color: var(--muted); margin: 0; }
  `}</style>
);

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="au-root" style={{ padding: "72px 24px" }}>
      <Styles />
      <div style={{ maxWidth: 1340, margin: "0 auto" }}>
        {/* Header */}
        <div className="au-header">
          <div className="au-eyebrow">
            <span className="au-eyebrow-dot" />
            Community Highlights
          </div>
          <h2 className="au-heading">Our Most Trusted Members</h2>
        </div>

        {/* Grid */}
        {topUsers.length > 0 ? (
          <div className="au-grid">
            {topUsers.map((member: Member, i: number) => (
              <div
                key={member._id}
                className="au-card"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="au-img-wrap">
                  <img
                    src={`${serverApi}/${member.memberImage}`}
                    alt={member.memberNick}
                    className="au-img"
                  />
                  <div className="au-overlay" />
                </div>

                <div className="au-stripe" />

                <div className="au-body">
                  <p className="au-name">{member.memberNick}</p>
                  <span className="au-label">Trusted Member</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="au-empty">
            <div className="au-empty-icon">🐾</div>
            <p className="au-empty-title">No active members yet</p>
            <p className="au-empty-sub">Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
