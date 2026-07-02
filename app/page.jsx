"use client";

import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   ONE MEMORIES — A Collaborative Wedding-Film Atelier
   Bay Area, California · "Your idea, our work."
   Light editorial design system: ivory paper, Didone serif,
   film-timecode structural language, 2.39:1 letterbox frames.
   ============================================================ */

const GRAIN =
  "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/><feColorMatrix type=%22saturate%22 values=%220%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.55%22/></svg>')";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400;1,6..96,500&family=Karla:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root{
  --paper:#F7F3EB;
  --paper-2:#EFE8DA;
  --paper-3:#E9E0CE;
  --ink:#1E1B15;
  --ink-2:#71695A;
  --line:rgba(30,27,21,0.16);
  --line-soft:rgba(30,27,21,0.09);
  --merlot:#6E2F37;
  --merlot-deep:#4E2128;
  --fd:"Bodoni Moda","Didot","Bodoni 72","Bodoni MT","Playfair Display",Georgia,"Times New Roman",serif;
  --fb:"Karla","Avenir Next","Avenir","Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
  --fm:"IBM Plex Mono","SF Mono",Menlo,Consolas,"Liberation Mono",monospace;
}

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body,#root{background:var(--paper);}
.om{
  background:var(--paper);
  color:var(--ink);
  font-family:var(--fb);
  font-weight:400;
  font-size:16px;
  line-height:1.7;
  -webkit-font-smoothing:antialiased;
  min-height:100vh;
}
.om ::selection{background:var(--merlot);color:var(--paper)}
.om em{font-style:italic}
.om button{font-family:inherit;cursor:pointer;background:none;border:none;color:inherit}
.om input,.om textarea{font-family:var(--fb);color:var(--ink)}
.om :focus-visible{outline:2px solid var(--merlot);outline-offset:3px}

/* ---------- type ---------- */
.fd{font-family:var(--fd);font-weight:400}
.mono{font-family:var(--fm);font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:400}
.mono-xs{font-family:var(--fm);font-size:10px;letter-spacing:0.22em;text-transform:uppercase}
.display-hero{font-family:var(--fd);font-weight:400;font-size:clamp(3rem,9vw,7.4rem);line-height:0.98;letter-spacing:-0.01em}
.display-xl{font-family:var(--fd);font-weight:400;font-size:clamp(2.1rem,4.6vw,3.8rem);line-height:1.06;letter-spacing:-0.005em}
.display-lg{font-family:var(--fd);font-weight:400;font-size:clamp(1.55rem,3vw,2.35rem);line-height:1.12}
.display-md{font-family:var(--fd);font-weight:400;font-size:clamp(1.25rem,2.2vw,1.6rem);line-height:1.2}
.lede{font-size:1.09rem;line-height:1.8;color:var(--ink-2);font-weight:400;max-width:58ch}
.body-2{font-size:0.98rem;line-height:1.8;color:var(--ink-2)}
.ink{color:var(--ink)}
.merlot{color:var(--merlot)}
.muted{color:var(--ink-2)}

/* ---------- structure ---------- */
.wrap{max-width:1180px;margin:0 auto;padding-left:28px;padding-right:28px}
.hairline-t{border-top:1px solid var(--line)}
.hairline-b{border-bottom:1px solid var(--line)}
.eyebrow{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap}
.eyebrow .tc{color:var(--merlot)}
.eyebrow .rule{flex:1;height:1px;background:var(--line);min-width:40px;align-self:center}

/* ---------- buttons ---------- */
.btn{
  display:inline-flex;align-items:center;gap:12px;
  font-family:var(--fm);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;
  padding:18px 30px;background:var(--ink);color:var(--paper);
  transition:background .35s ease,transform .35s ease;border:1px solid var(--ink);
}
.btn:hover{background:var(--merlot);border-color:var(--merlot)}
.btn .arr{transition:transform .35s ease}
.btn:hover .arr{transform:translateX(5px)}
.btn-ghost{background:transparent;color:var(--ink)}
.btn-ghost:hover{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.btn-paper{background:var(--paper);color:var(--ink);border-color:var(--paper)}
.btn-paper:hover{background:var(--merlot);color:var(--paper);border-color:var(--merlot)}
.btn-block{width:100%;justify-content:center;padding:20px 30px}

/* ---------- nav ---------- */
.nav{position:sticky;top:0;z-index:50;background:rgba(247,243,235,0.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:76px}
.wordmark{font-family:var(--fd);font-size:1.45rem;letter-spacing:0.01em;line-height:1;display:flex;flex-direction:column;gap:3px;text-align:left}
.wordmark small{font-family:var(--fm);font-size:8.5px;letter-spacing:0.32em;color:var(--ink-2);text-transform:uppercase}
.nav-links{display:flex;align-items:center;gap:34px}
.nav-link{font-family:var(--fm);font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-2);padding:6px 0;position:relative;transition:color .3s}
.nav-link:hover{color:var(--ink)}
.nav-link::after{content:"";position:absolute;left:0;bottom:0;height:1px;width:0;background:var(--merlot);transition:width .35s ease}
.nav-link:hover::after,.nav-link.on::after{width:100%}
.nav-link.on{color:var(--ink)}
.booking{display:flex;align-items:center;gap:9px;font-family:var(--fm);font-size:9.5px;letter-spacing:0.2em;color:var(--ink-2);text-transform:uppercase}
.dot{width:6px;height:6px;border-radius:50%;background:var(--merlot);animation:pulse 2.2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.25}}
.burger{display:none;flex-direction:column;gap:5px;padding:10px 2px}
.burger span{display:block;width:24px;height:1.5px;background:var(--ink);transition:transform .3s,opacity .3s}
.burger.x span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
.burger.x span:nth-child(2){opacity:0}
.burger.x span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}
.mobile-menu{display:none}

/* ---------- letterbox / film frames ---------- */
.letterbox{position:relative;aspect-ratio:2.39/1;overflow:hidden;background:var(--paper-3)}
.letterbox.tall{aspect-ratio:16/10}
.lb-art{position:absolute;inset:0;transition:transform 1.2s cubic-bezier(.16,1,.3,1)}
.lb-grain::after{content:"";position:absolute;inset:0;background-image:${GRAIN};background-size:200px 200px;opacity:0.09;pointer-events:none}
.tick{position:absolute;width:14px;height:14px;pointer-events:none}
.tick.tl{top:10px;left:10px;border-top:1px solid rgba(247,243,235,0.85);border-left:1px solid rgba(247,243,235,0.85)}
.tick.tr{top:10px;right:10px;border-top:1px solid rgba(247,243,235,0.85);border-right:1px solid rgba(247,243,235,0.85)}
.tick.bl{bottom:10px;left:10px;border-bottom:1px solid rgba(247,243,235,0.85);border-left:1px solid rgba(247,243,235,0.85)}
.tick.br{bottom:10px;right:10px;border-bottom:1px solid rgba(247,243,235,0.85);border-right:1px solid rgba(247,243,235,0.85)}
.lb-meta{position:absolute;font-family:var(--fm);font-size:9px;letter-spacing:0.22em;color:rgba(247,243,235,0.9);text-transform:uppercase}
.playbtn{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:66px;height:66px;border-radius:50%;border:1px solid rgba(247,243,235,0.8);
  display:flex;align-items:center;justify-content:center;
  transition:transform .4s ease,background .4s ease;background:rgba(30,27,21,0.12);backdrop-filter:blur(2px);
}
.playbtn::after{content:"";display:block;width:0;height:0;border-left:13px solid rgba(247,243,235,0.95);border-top:8px solid transparent;border-bottom:8px solid transparent;margin-left:4px}
.filmcard:hover .playbtn,.lb-click:hover .playbtn{transform:translate(-50%,-50%) scale(1.12);background:rgba(78,33,40,0.45)}
.filmcard:hover .lb-art,.lb-click:hover .lb-art{transform:scale(1.035)}
.lb-initials{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--fd);font-style:italic;font-size:clamp(2rem,4vw,3rem);color:rgba(247,243,235,0.55);letter-spacing:0.04em;pointer-events:none}

/* ---------- marquee ---------- */
.marquee{overflow:hidden;border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:16px 0;background:var(--paper)}
.marquee-track{display:flex;gap:56px;width:max-content;animation:slide 46s linear infinite}
.marquee span{font-family:var(--fm);font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:var(--ink-2);white-space:nowrap}
.marquee i{color:var(--merlot);font-style:normal}
@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ---------- spectrum ---------- */
.spec-bar{position:relative;display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.spec-tab{padding:22px 10px 20px;text-align:center;font-family:var(--fm);font-size:10.5px;letter-spacing:0.24em;text-transform:uppercase;color:var(--ink-2);transition:color .3s;position:relative}
.spec-tab:hover{color:var(--ink)}
.spec-tab.on{color:var(--ink)}
.spec-tab .n{display:block;font-size:9px;color:var(--merlot);margin-bottom:6px;letter-spacing:0.3em}
.spec-ind{position:absolute;bottom:-1px;height:2px;width:33.333%;background:var(--merlot);transition:transform .5s cubic-bezier(.16,1,.3,1)}
.fade-swap{animation:swap .55s cubic-bezier(.16,1,.3,1)}
@keyframes swap{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.sig-list{list-style:none;display:flex;flex-direction:column}
.sig-list li{font-family:var(--fm);font-size:10.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--ink-2);padding:13px 0;border-bottom:1px solid var(--line-soft);display:flex;gap:14px}
.sig-list li::before{content:"—";color:var(--merlot)}

/* ---------- principles / rows ---------- */
.p-row{display:grid;grid-template-columns:220px 1fr;gap:28px;padding:30px 0;border-bottom:1px solid var(--line-soft)}
.next-row{display:grid;grid-template-columns:56px 220px 1fr;gap:24px;padding:26px 0;border-bottom:1px solid var(--line-soft);align-items:baseline}
@media(max-width:720px){.p-row{grid-template-columns:1fr;gap:8px}.next-row{grid-template-columns:56px 1fr;gap:10px 24px}.next-row .body-2{grid-column:2}}

/* ---------- quotes ---------- */
.quote-card{background:var(--paper-2);padding:clamp(30px,4vw,52px);position:relative;border:1px solid var(--line-soft);display:flex;flex-direction:column}
.quote-card .qmark{font-family:var(--fd);font-style:italic;font-size:4.4rem;line-height:0.6;color:var(--merlot);opacity:0.85;margin-bottom:26px}
.quote-card p{font-family:var(--fd);font-size:clamp(1.05rem,1.6vw,1.28rem);line-height:1.55;font-style:italic}
.quote-card footer{margin-top:auto;padding-top:30px}

/* ---------- credits band ---------- */
.credits{background:var(--ink);color:var(--paper)}
.credits .mono,.credits .mono-xs{color:rgba(247,243,235,0.55)}
.credits .rule{background:rgba(247,243,235,0.2)}

/* ---------- process ---------- */
.step-num{font-family:var(--fd);font-size:clamp(4.5rem,9vw,8rem);line-height:0.8;color:transparent;-webkit-text-stroke:1px var(--line);letter-spacing:-0.02em}
.deliv{list-style:none}
.deliv li{font-family:var(--fm);font-size:10.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--ink-2);padding:12px 0;border-bottom:1px solid var(--line-soft);display:flex;gap:14px}
.deliv li::before{content:"▸";color:var(--merlot)}
.boundary{border:1px solid var(--ink);outline:1px solid var(--line);outline-offset:5px;background:var(--paper-2);padding:clamp(34px,5vw,64px)}

/* ---------- portfolio ---------- */
.pill{font-family:var(--fm);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;padding:10px 18px;border:1px solid var(--line);border-radius:999px;color:var(--ink-2);transition:all .3s}
.pill:hover{border-color:var(--ink);color:var(--ink)}
.pill.on{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.filmcard{text-align:left;display:block;width:100%}
.chip{display:inline-block;font-family:var(--fm);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;border:1px solid var(--line);padding:5px 11px;border-radius:999px;color:var(--ink-2)}
.cat-note{border-top:1px solid var(--ink);padding-top:18px}

/* ---------- form ---------- */
.f-label{font-family:var(--fm);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--ink);display:block;margin-bottom:10px}
.f-label .req{color:var(--merlot)}
.f-help{font-size:0.85rem;color:var(--ink-2);margin-top:-4px;margin-bottom:12px;line-height:1.6}
.f-input{width:100%;background:transparent;border:none;border-bottom:1px solid var(--line);padding:12px 2px;font-size:1.02rem;transition:border-color .3s;border-radius:0}
.f-input:focus{border-color:var(--ink);outline:none}
.f-input::placeholder{color:rgba(113,105,90,0.55)}
textarea.f-input{border:1px solid var(--line);padding:16px;min-height:150px;resize:vertical;line-height:1.7}
textarea.f-input:focus{border-color:var(--ink)}
.f-err{font-family:var(--fm);font-size:9.5px;letter-spacing:0.14em;text-transform:uppercase;color:var(--merlot);margin-top:8px}
.choice{border:1px solid var(--line);padding:20px 22px;transition:all .3s;text-align:left;width:100%;background:transparent;position:relative}
.choice:hover{border-color:var(--ink)}
.choice.on{border-color:var(--merlot);background:#FCFAF4;box-shadow:inset 0 0 0 1px var(--merlot)}
.choice .c-mark{position:absolute;top:16px;right:16px;width:14px;height:14px;border:1px solid var(--line);transition:all .3s}
.choice.on .c-mark{background:var(--merlot);border-color:var(--merlot)}
.choice .c-title{font-family:var(--fd);font-size:1.12rem;line-height:1.3;padding-right:26px}
.choice .c-sub{font-family:var(--fm);font-size:9px;letter-spacing:0.24em;text-transform:uppercase;color:var(--ink-2);display:block;margin-bottom:8px}

/* ---------- footer ---------- */
.foot-mark{font-family:var(--fd);font-size:clamp(2.6rem,7vw,5.2rem);line-height:1}
.foot-link{font-family:var(--fm);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--ink-2);padding:5px 0;display:block;transition:color .3s;text-align:left}
.foot-link:hover{color:var(--merlot)}

/* ---------- motion ---------- */
.reveal{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
.reveal.in{opacity:1;transform:none}
.page-enter{animation:pageIn .65s cubic-bezier(.16,1,.3,1)}
@keyframes pageIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}

@media(prefers-reduced-motion:reduce){
  .reveal{opacity:1;transform:none;transition:none}
  .page-enter,.fade-swap{animation:none}
  .marquee-track{animation:none}
  .dot{animation:none}
  html{scroll-behavior:auto}
}

/* ---------- responsive ---------- */
@media(max-width:860px){
  .nav-links{display:none}
  .booking{display:none}
  .burger{display:flex}
  .mobile-menu{display:block;border-bottom:1px solid var(--line);background:var(--paper);animation:pageIn .4s ease}
  .mobile-menu button{display:block;width:100%;text-align:left;font-family:var(--fd);font-size:1.9rem;padding:16px 0;border-bottom:1px solid var(--line-soft)}
  .p-row{grid-template-columns:1fr}
}
`;

/* ============================================================
   DATA — all copywriting lives here
   ============================================================ */

const MOODS = [
  {
    id: "vibrant",
    label: "Vibrant",
    name: "The Vibrant & Fast-Paced",
    tag: "CUT RATE — HIGH · 120 BPM+",
    copy:
      "For couples whose story moves at speed. Quick cuts timed to the beat, candid chaos, confetti mid-air and heels in hands — a film with the pulse of the dance floor still in it. This is the one your guests replay on their phones the morning after, engineered to make everyone wish they’d danced harder.",
    elements: [
      "Beat-matched editing",
      "Handheld, in-the-crowd energy",
      "Bold, saturated color",
      "Social-ready vertical cuts",
    ],
    grad: ["#E7C88F", "#B0603A"],
  },
  {
    id: "soulful",
    label: "Soulful",
    name: "The Cinematic & Soulful",
    tag: "CUT RATE — SLOW BURN · DIALOGUE-LED",
    copy:
      "For couples who want a film that feels like memory itself. Deliberate pacing built on real audio — vows, letters, a grandmother’s blessing — layered over full-frame imagery that lingers a beat longer than you expect. Ten years from now, this is the one you watch alone on an anniversary, and it still undoes you.",
    elements: [
      "Vow & letter audio design",
      "Anamorphic-style framing",
      "Long, patient takes",
      "Archival warmth in the grade",
    ],
    grad: ["#9A9482", "#3B382F"],
  },
  {
    id: "hybrid",
    label: "Hybrid",
    name: "The Hybrid Masterpiece",
    tag: "CUT RATE — DYNAMIC · TWO-ACT STRUCTURE",
    copy:
      "For couples unwilling to choose — rightly. A two-act film that opens in stillness and closes at full volume: the weight of the vows first, then the release of the dance floor. Structured so the emotion earns the celebration, and the celebration means more because of it.",
    elements: [
      "Two-act emotional build",
      "Seamless tonal shifts",
      "Score-to-party transitions",
      "Full-spectrum coverage",
    ],
    grad: ["#C79E86", "#6E2F37"],
  },
];

const MOOD_DESC = {
  vibrant:
    "Films that move the way the night did — fast, loud, unreasonably fun. If your first priority is that people feel the party, start here.",
  soulful:
    "Slow-burn films built on vows, letters, and the moments most guests never saw. These are the ones that age into heirlooms.",
  hybrid:
    "Two-act films that open in stillness and end at full volume. The emotion earns the celebration — and the celebration repays it.",
};

const BACKDROPS = [
  { id: "cityhall", label: "SF City Hall" },
  { id: "napa", label: "Napa Valley" },
  { id: "sv", label: "Silicon Valley Estates" },
];

const BACKDROP_DESC = {
  cityhall:
    "Beaux-Arts marble, a four-story light well, and ceremonies measured in minutes. We know the rotunda’s light and its echo — and exactly where to stand for both.",
  napa:
    "Golden-hour vine rows, candlelit caves, and estates that seem built to be filmed. Here the landscape does half the cinematography; we answer for the other half.",
  sv:
    "Private gardens and modern architecture from Atherton to Los Altos Hills, where celebrations run on precision and discretion. Unobtrusive coverage isn’t a preference at these addresses — it’s a requirement we’re built for.",
};

const FILMS = [
  { couple: "Sofia & James", init: "S · J", venue: "The Rotunda, SF City Hall", backdrop: "cityhall", mood: "soulful", dur: "06:42", log: "Vows under the dome, scored to the room’s own echo.", grad: ["#B9B2A4", "#4A463D"] },
  { couple: "Priya & Daniel", init: "P · D", venue: "Beaulieu Garden, Napa Valley", backdrop: "napa", mood: "hybrid", dur: "08:15", log: "A candlelit first look; a dance floor that refused to close.", grad: ["#C79E86", "#6E2F37"] },
  { couple: "Mai & Tommy", init: "M · T", venue: "A Private Estate, Atherton", backdrop: "sv", mood: "vibrant", dur: "03:58", log: "Two families, one tea ceremony, zero slow songs.", grad: ["#E7C88F", "#B0603A"] },
  { couple: "Lauren & Marcus", init: "L · M", venue: "SF City Hall & The Mission", backdrop: "cityhall", mood: "vibrant", dur: "04:05", log: "Married by noon, on a rooftop by three, barefoot by nine.", grad: ["#E2BE8A", "#8A4B2F"] },
  { couple: "Elena & Sam", init: "E · S", venue: "Stanly Ranch, Napa Valley", backdrop: "napa", mood: "soulful", dur: "07:30", log: "Letters read at dawn between the vines, before anyone arrived.", grad: ["#A79F8D", "#3B382F"] },
  { couple: "Grace & Julian", init: "G · J", venue: "Los Altos Hills", backdrop: "sv", mood: "hybrid", dur: "07:12", log: "A string quartet at sunset; a DJ set the neighbors still discuss.", grad: ["#CBA98E", "#5A2A31"] },
  { couple: "Anh & David", init: "A · D", venue: "A Vineyard Cave, Napa Valley", backdrop: "napa", mood: "vibrant", dur: "04:21", log: "Sparklers in the rows, confetti in the cave.", grad: ["#E5C287", "#A65433"] },
  { couple: "Noor & Alexander", init: "N · A", venue: "A Garden Estate, Palo Alto", backdrop: "sv", mood: "soulful", dur: "06:58", log: "A ceremony in three languages, held in one long take.", grad: ["#B3AC9C", "#44403A"] },
  { couple: "Camille & Theo", init: "C · T", venue: "SF City Hall, Fourth Floor", backdrop: "cityhall", mood: "hybrid", dur: "07:45", log: "Quiet vows in marble; loud everything after.", grad: ["#C4A188", "#63333A"] },
];

const STEPS = [
  {
    n: "01",
    meta: "STEP 01 · PRE-PRODUCTION · A 90-MINUTE WORKING SESSION",
    name: "The Vision & Vibe Alignment",
    copy:
      "Every film begins with a working session — not a sales call. Together we build a moodboard from films, colors and references you love; audit your music taste to shape the score; and place your film precisely on the spectrum between vibrant and soulful. By the end, we hold a shared creative brief: the feeling of your film, agreed on paper before a single frame exists.",
    deliv: ["A visual moodboard", "A music direction", "A pacing map on the spectrum", "A locked creative brief"],
    grad: ["#DECBA0", "#8F7748"],
  },
  {
    n: "02",
    meta: "STEP 02 · THE WEDDING DAY · DUAL FULL-FRAME COVERAGE",
    name: "The Groundwork",
    copy:
      "On the day, we disappear into the room. Two Lumix full-frame cinema systems run in parallel — one composed and deliberate, one candid and mobile — so nothing real is ever interrupted for the sake of a shot. No staged laughter, no hijacked timeline, no directing you out of your own wedding. The best material is always the moment that happened anyway; our craft is being exactly where it does.",
    deliv: ["Dual Lumix full-frame systems", "Dedicated audio on vows & toasts", "A discreet, documentary presence", "Coverage mapped to your brief"],
    grad: ["#A8A192", "#3E3B33"],
  },
  {
    n: "03",
    meta: "STEP 03 · POST-PRODUCTION · TWO STRUCTURED ROUNDS",
    name: "The Collaborative Edit",
    copy:
      "The edit is where your brief becomes a film. We assemble the first cut against the pacing map and music direction agreed in step one, then bring you into the room through structured feedback rounds — timestamped notes, specific and unhurried. You steer the feeling; we translate it into rhythm, grade and sound, until the film is precisely the one you described in that first session.",
    deliv: ["A first cut built to your brief", "Two structured revision rounds", "Color grade & sound design", "Final films mastered in 4K"],
    grad: ["#C29A85", "#59262E"],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We came in with a Pinterest board, three songs, and a slightly unhinged idea about opening the film mid-dance-floor. They didn’t flinch — every call, they asked sharper questions about what we actually wanted. The final film opens exactly the way we imagined it, executed better than we could have dreamed.",
    who: "PRIYA & DANIEL",
    where: "BEAULIEU GARDEN, NAPA VALLEY",
    film: "THE HYBRID MASTERPIECE",
  },
  {
    quote:
      "I was dreading a generic wedding video — drone shots, trending audio, someone else’s taste. Instead, they spent two hours just talking with us about pacing and the films we love. What they delivered feels like it was made by people who’ve known us for years; every choice on screen is ours, refined.",
    who: "LAUREN & MARCUS",
    where: "SAN FRANCISCO CITY HALL",
    film: "THE CINEMATIC & SOULFUL",
  },
];

const PRINCIPLES = [
  {
    t: "Taste, not templates",
    c: "Every film is scored, paced, and graded from zero — against your references, never our archive.",
  },
  {
    t: "Candor, both directions",
    c: "We tell you what will and won’t translate to film. You tell us what matters most. Neither is negotiable.",
  },
  {
    t: "The final cut answers to you",
    c: "Structured feedback rounds ensure the finished film matches the vision you approved — not a surprise we hope you’ll like.",
  },
];

const VENUES =
  "San Francisco City Hall · Beaulieu Garden · Filoli · Carmel-by-the-Sea · Atherton Estates · Stanly Ranch · Palace of Fine Arts · Los Altos Hills · Sonoma Coast · Cavallo Point";

const TIERS = [
  { v: "$4,000 – $6,000", sub: "The Essential Film" },
  { v: "$6,000 – $8,000", sub: "The Signature Film" },
  { v: "$8,000+ / Custom Luxury", sub: "The Commission" },
];

const VIBES = [
  { v: "Fast-paced, fun & energetic", sub: "The Vibrant" },
  { v: "Deeply emotional, cinematic & nostalgic", sub: "The Soulful" },
  { v: "Give me the best of both worlds (Hybrid)", sub: "The Hybrid" },
];

/* ============================================================
   PRIMITIVES
   ============================================================ */

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ tc, label, right }) {
  return (
    <div className="eyebrow mono">
      <span className="tc">{tc}</span>
      <span>{label}</span>
      <span className="rule" />
      {right && <span className="muted">{right}</span>}
    </div>
  );
}

function Ticks() {
  return (
    <>
      <i className="tick tl" />
      <i className="tick tr" />
      <i className="tick bl" />
      <i className="tick br" />
    </>
  );
}

function Letterbox({ grad, tall, children, className = "", onClick, ariaLabel }) {
  const inner = (
    <div className={`letterbox lb-grain ${tall ? "tall" : ""} ${className}`}>
      <div
        className="lb-art"
        style={{ background: `linear-gradient(128deg, ${grad[0]} 0%, ${grad[1]} 100%)` }}
      />
      <Ticks />
      {children}
    </div>
  );
  if (onClick)
    return (
      <button onClick={onClick} aria-label={ariaLabel} className="lb-click" style={{ display: "block", width: "100%", textAlign: "left" }}>
        {inner}
      </button>
    );
  return inner;
}

function Marquee() {
  const row = (
    <>
      {VENUES.split(" · ").map((v, i) => (
        <span key={i}>
          {v} <i>·</i>
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}

function Timecode() {
  const [f, setF] = useState(0);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setF((x) => x + 1), 1000 / 24);
    return () => clearInterval(id);
  }, []);
  const fr = f % 24;
  const s = Math.floor(f / 24) % 60;
  const m = Math.floor(f / 1440) % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return <>{`00:${pad(m)}:${pad(s)}:${pad(fr)}`}</>;
}

/* ============================================================
   NAV + FOOTER
   ============================================================ */

const LINKS = [
  { id: "home", label: "Home" },
  { id: "process", label: "Process" },
  { id: "portfolio", label: "Portfolio" },
];

function Nav({ page, go }) {
  const [open, setOpen] = useState(false);
  const nav = (id) => {
    setOpen(false);
    go(id);
  };
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <button className="wordmark fd" onClick={() => nav("home")} aria-label="One Memories — home">
          <span>
            One <em>Memories</em>
          </span>
          <small>Wedding Films — Bay Area</small>
        </button>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <button key={l.id} className={`nav-link ${page === l.id ? "on" : ""}`} onClick={() => nav(l.id)}>
              {l.label}
            </button>
          ))}
          <span className="booking">
            <span className="dot" /> Booking 2026 / 27
          </span>
          <button className="btn" style={{ padding: "13px 22px" }} onClick={() => nav("contact")}>
            Inquire
          </button>
        </nav>
        <button className={`burger ${open ? "x" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          <div className="wrap" style={{ paddingTop: 10, paddingBottom: 26 }}>
            {[...LINKS, { id: "contact", label: "Inquire" }].map((l) => (
              <button key={l.id} className="fd" onClick={() => nav(l.id)}>
                {l.label} {page === l.id && <em className="merlot">·</em>}
              </button>
            ))}
            <p className="mono muted" style={{ marginTop: 20 }}>
              <span className="dot" style={{ display: "inline-block", marginRight: 8 }} />
              Booking 2026 / 27 — Limited commissions
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="hairline-t" style={{ background: "var(--paper)" }}>
      <div className="wrap" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <div className="grid md:grid-cols-2 gap-10 items-end" style={{ paddingBottom: 56 }}>
          <h2 className="foot-mark">
            One <em>Memories.</em>
          </h2>
          <p className="body-2" style={{ maxWidth: "42ch" }}>
            Your idea, our work. A collaborative wedding-film atelier for the San Francisco Bay Area — and wherever your date takes us.
          </p>
        </div>
        <div className="hairline-t grid grid-cols-2 md:grid-cols-4 gap-8" style={{ paddingTop: 40, paddingBottom: 48 }}>
          <div>
            <p className="mono-xs merlot" style={{ marginBottom: 16 }}>Navigate</p>
            {[...LINKS, { id: "contact", label: "Inquire" }].map((l) => (
              <button key={l.id} className="foot-link" onClick={() => go(l.id)}>
                {l.label}
              </button>
            ))}
          </div>
          <div>
            <p className="mono-xs merlot" style={{ marginBottom: 16 }}>Studio</p>
            <p className="foot-link" style={{ cursor: "default" }}>San Francisco Bay Area</p>
            <p className="foot-link" style={{ cursor: "default" }}>hello@onememories.film</p>
            <p className="foot-link" style={{ cursor: "default" }}>@one.memories.film</p>
          </div>
          <div>
            <p className="mono-xs merlot" style={{ marginBottom: 16 }}>Backdrops</p>
            <p className="foot-link" style={{ cursor: "default" }}>SF City Hall</p>
            <p className="foot-link" style={{ cursor: "default" }}>Napa Valley</p>
            <p className="foot-link" style={{ cursor: "default" }}>Silicon Valley Estates</p>
          </div>
          <div>
            <p className="mono-xs merlot" style={{ marginBottom: 16 }}>Status</p>
            <p className="foot-link" style={{ cursor: "default" }}>
              <span className="dot" style={{ display: "inline-block", marginRight: 8 }} />
              Booking 2026 / 27
            </p>
            <p className="foot-link" style={{ cursor: "default" }}>Limited commissions per season</p>
          </div>
        </div>
        <div className="hairline-t flex flex-wrap gap-4 justify-between" style={{ paddingTop: 22 }}>
          <span className="mono-xs muted">© 2026 One Memories</span>
          <span className="mono-xs muted">Wedding Films — California</span>
          <span className="mono-xs muted">2.39 : 1, forever</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   PAGE — HOME
   ============================================================ */

function MoodSpectrum() {
  const [active, setActive] = useState(0);
  const m = MOODS[active];
  return (
    <section className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
      <Reveal>
        <Eyebrow tc="TC 00:01" label="The Mood Spectrum" right="Choose the feeling first" />
      </Reveal>
      <Reveal delay={80}>
        <h2 className="display-xl" style={{ marginTop: 34, maxWidth: "16ch" }}>
          Every couple runs at a <em>different tempo.</em>
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="lede" style={{ marginTop: 26, marginBottom: 60 }}>
          Before dates or deliverables, we ask one question: how should this film <em className="ink">feel</em>? Some couples want the night to hit the way the party did. Others want the quiet given room to breathe — a father’s toast, a held glance. Most want both, in careful measure. This spectrum is where every collaboration begins.
        </p>
      </Reveal>

      <Reveal>
        <div className="spec-bar" role="tablist" aria-label="Mood spectrum">
          {MOODS.map((mm, i) => (
            <button
              key={mm.id}
              role="tab"
              aria-selected={active === i}
              className={`spec-tab ${active === i ? "on" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              {mm.label}
            </button>
          ))}
          <span className="spec-ind" style={{ transform: `translateX(${active * 100}%)` }} />
        </div>
      </Reveal>

      <div key={m.id} className="fade-swap grid md:grid-cols-2 gap-12 items-center" style={{ paddingTop: 56 }}>
        <div>
          <p className="mono merlot">{m.tag}</p>
          <h3 className="display-lg" style={{ marginTop: 18, marginBottom: 20 }}>
            {m.name}
          </h3>
          <p className="body-2" style={{ marginBottom: 30 }}>{m.copy}</p>
          <p className="mono-xs muted" style={{ marginBottom: 6 }}>Signature elements</p>
          <ul className="sig-list">
            {m.elements.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <Letterbox grad={m.grad} tall>
          <span className="lb-meta" style={{ top: 16, left: 34 }}>One Memories — {m.label}</span>
          <span className="lb-meta" style={{ top: 16, right: 34 }}>2.39 : 1</span>
          <span className="lb-initials">{m.label}</span>
          <span className="lb-meta" style={{ bottom: 16, left: 34 }}>{m.tag}</span>
          <span className="lb-meta" style={{ bottom: 16, right: 34 }}>4K</span>
        </Letterbox>
      </div>
    </section>
  );
}

function Home({ go }) {
  return (
    <>
      {/* HERO */}
      <section className="wrap" style={{ paddingTop: 72, paddingBottom: 64 }}>
        <Reveal>
          <Eyebrow tc={<>TC <Timecode /></>} label="Overture" right="A collaborative film atelier · San Francisco Bay Area" />
        </Reveal>
        <Reveal delay={100}>
          <h1 className="display-hero" style={{ marginTop: 48, marginBottom: 36 }}>
            Your idea,
            <br />
            <em>our work.</em>
          </h1>
        </Reveal>
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <Reveal delay={180} className="md:col-span-7">
            <p className="lede">
              One Memories is a wedding film studio built on a single conviction: the most arresting films begin with the couple’s imagination — not the studio’s formula. You set the tone, the tempo, the feeling. We answer with full-frame cinematography, disciplined editing, and a finished film that could belong to no one else.
            </p>
          </Reveal>
          <Reveal delay={260} className="md:col-span-5">
            <div className="flex flex-wrap gap-4 md:justify-end">
              <button className="btn" onClick={() => go("contact")}>
                Co-Create Your Film <span className="arr">→</span>
              </button>
              <button className="btn btn-ghost" onClick={() => go("portfolio")}>
                View the Work
              </button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={320}>
          <div style={{ marginTop: 64 }}>
            <Letterbox
              grad={["#D9C296", "#5A2A31"]}
              onClick={() => go("portfolio")}
              ariaLabel="Open the portfolio"
            >
              <span className="lb-meta" style={{ top: 16, left: 34 }}>One Memories — Showreel</span>
              <span className="lb-meta" style={{ top: 16, right: 34 }}>2.39 : 1</span>
              <div className="playbtn" />
              <span className="lb-meta" style={{ bottom: 16, left: 34 }}>
                TC <Timecode /> <span style={{ color: "#E8B4B8" }}>● REC</span>
              </span>
              <span className="lb-meta" style={{ bottom: 16, right: 34 }}>4K · Dual Full-Frame</span>
            </Letterbox>
          </div>
        </Reveal>
      </section>

      <Marquee />

      {/* MOOD SPECTRUM */}
      <MoodSpectrum />

      {/* WHY COLLABORATION MATTERS */}
      <section className="hairline-t" style={{ background: "var(--paper-2)" }}>
        <div className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
          <Reveal>
            <Eyebrow tc="TC 00:02" label="The Philosophy" right="Why collaboration matters" />
          </Reveal>
          <div className="grid md:grid-cols-12 gap-12" style={{ marginTop: 40 }}>
            <div className="md:col-span-5">
              <Reveal>
                <h2 className="display-xl">
                  A formula can be flawless — <em>and still be wrong.</em>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="body-2" style={{ marginTop: 28 }}>
                  Most studios keep a house style, and every couple who books them receives a version of it. The work is often beautiful. It is also interchangeable.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={100}>
                <p className="lede ink" style={{ maxWidth: "100%" }}>
                  We built One Memories on the opposite premise: you are the only authority on how your wedding should feel, and our job is to place serious craft in service of your instinct. When couples drive the concept, a film stops performing for an algorithm and starts telling the truth — your humor, your family’s noise, your particular quiet. That specificity is what makes it impossible to confuse with anyone else’s work, and impossible to stop watching.
                </p>
              </Reveal>
              <div style={{ marginTop: 44 }}>
                {PRINCIPLES.map((p, i) => (
                  <Reveal key={p.t} delay={i * 90}>
                    <div className="p-row">
                      <h3 className="display-md">{p.t}</h3>
                      <p className="body-2">{p.c}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="wrap" style={{ paddingTop: 110, paddingBottom: 110 }}>
        <Reveal>
          <Eyebrow tc="TC 00:03" label="In Their Words" right="Couples on being heard" />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8" style={{ marginTop: 48 }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.who} delay={i * 120}>
              <figure className="quote-card" style={{ height: "100%" }}>
                <div className="qmark">”</div>
                <p>{t.quote}</p>
                <footer className="hairline-t" style={{ marginTop: 34 }}>
                  <p className="mono ink" style={{ paddingTop: 22 }}>{t.who}</p>
                  <p className="mono-xs muted" style={{ marginTop: 6 }}>{t.where}</p>
                  <p className="mono-xs merlot" style={{ marginTop: 6 }}>Commission — {t.film}</p>
                </footer>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CREDITS CTA BAND */}
      <section className="credits">
        <div className="wrap" style={{ paddingTop: 120, paddingBottom: 120, textAlign: "center" }}>
          <Reveal>
            <p className="mono-xs" style={{ marginBottom: 30 }}>End credits — or an opening scene</p>
            <h2 className="display-xl" style={{ maxWidth: "22ch", margin: "0 auto" }}>
              Bring us the idea no one else <em>will take seriously.</em>
            </h2>
            <div style={{ marginTop: 44 }}>
              <button className="btn btn-paper" onClick={() => go("contact")}>
                Co-Create Your Film <span className="arr">→</span>
              </button>
            </div>
            <p className="mono-xs" style={{ marginTop: 36 }}>
              Currently booking 2026 – 2027 · A limited number of commissions per season
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   PAGE — PROCESS
   ============================================================ */

function Process({ go }) {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 72, paddingBottom: 80 }}>
        <Reveal>
          <Eyebrow tc="TC 00:00" label="The Co-Creation Process" right="How a commission unfolds" />
        </Reveal>
        <Reveal delay={100}>
          <h1 className="display-hero" style={{ marginTop: 44, maxWidth: "13ch" }}>
            Three movements. <em>One film.</em>
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="lede" style={{ marginTop: 30 }}>
            The process is designed like a good edit — nothing wasted, everything intentional. From the first conversation to final delivery, you’ll always know where we are, what happens next, and where your voice enters the cut.
          </p>
        </Reveal>
      </section>

      {STEPS.map((s, i) => (
        <section key={s.n} className="hairline-t" style={{ background: i % 2 ? "var(--paper-2)" : "var(--paper)" }}>
          <div className="wrap grid md:grid-cols-12 gap-10" style={{ paddingTop: 90, paddingBottom: 90 }}>
            <Reveal className="md:col-span-2">
              <div className="step-num">{s.n}</div>
            </Reveal>
            <div className="md:col-span-6">
              <Reveal delay={80}>
                <p className="mono merlot">{s.meta}</p>
                <h2 className="display-lg" style={{ marginTop: 16, marginBottom: 20 }}>{s.name}</h2>
                <p className="body-2" style={{ marginBottom: 30 }}>{s.copy}</p>
              </Reveal>
              <Reveal delay={140}>
                <p className="mono-xs muted" style={{ marginBottom: 6 }}>
                  {i === 0 ? "You leave with" : i === 1 ? "On the day" : "You receive"}
                </p>
                <ul className="deliv">
                  {s.deliv.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={160} className="md:col-span-4" >
              <Letterbox grad={s.grad} tall>
                <span className="lb-meta" style={{ top: 14, left: 32 }}>Movement {s.n}</span>
                <span className="lb-meta" style={{ top: 14, right: 32 }}>2.39 : 1</span>
                <span className="lb-initials">{s.n}</span>
                <span className="lb-meta" style={{ bottom: 14, left: 32 }}>{s.name}</span>
              </Letterbox>
            </Reveal>
          </div>
        </section>
      ))}

      {/* CREATIVE BOUNDARIES */}
      <section className="wrap" style={{ paddingTop: 100, paddingBottom: 110 }}>
        <Reveal>
          <div className="boundary">
            <p className="mono merlot" style={{ marginBottom: 24 }}>
              A note on creative boundaries — read before inquiring
            </p>
            <h2 className="display-xl" style={{ marginBottom: 26, maxWidth: "18ch" }}>
              You own the soul. <em>We own the craft.</em>
            </h2>
            <p className="body-2" style={{ maxWidth: "72ch" }}>
              Collaboration works because the roles are clear. You are the authority on the film’s soul — its mood, its music, its emotional priorities, the moments that must not be missed. We are the authority on execution — camera language, cut points, color science, sound design, and the pacing judgment that makes a film hold together. We will always explain our reasoning, and we will never dismiss an instinct of yours without offering a better route to the same feeling. But we don’t hand over the timeline — and you shouldn’t want us to. You’re not hiring a pair of hands; you’re hiring a standard.
            </p>
            <div className="flex flex-wrap gap-4" style={{ marginTop: 40 }}>
              <button className="btn" onClick={() => go("contact")}>
                Begin the Collaboration <span className="arr">→</span>
              </button>
              <button className="btn btn-ghost" onClick={() => go("portfolio")}>
                See the Results
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ============================================================
   PAGE — PORTFOLIO
   ============================================================ */

function Portfolio({ go }) {
  const [mood, setMood] = useState("all");
  const [backdrop, setBackdrop] = useState("all");
  const films = FILMS.filter(
    (f) => (mood === "all" || f.mood === mood) && (backdrop === "all" || f.backdrop === backdrop)
  );
  const moodLabel = (id) => MOODS.find((m) => m.id === id)?.label || id;
  return (
    <>
      <section className="wrap" style={{ paddingTop: 72, paddingBottom: 56 }}>
        <Reveal>
          <Eyebrow tc="TC 00:00" label="Selected Works" right="Nine commissions, no two alike" />
        </Reveal>
        <Reveal delay={100}>
          <h1 className="display-hero" style={{ marginTop: 44 }}>
            Films with <em>fingerprints.</em>
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="lede" style={{ marginTop: 30 }}>
            Every film below began as a couple’s idea. Filter by the feeling you’re drawn to, or by the Bay Area rooms and landscapes we know frame by frame — then notice how differently each one moves. That difference is the point.
          </p>
        </Reveal>
      </section>

      <section className="wrap" style={{ paddingBottom: 110 }}>
        {/* FILTERS */}
        <Reveal>
          <div className="hairline-t" style={{ paddingTop: 28 }}>
            <div className="flex flex-wrap items-center gap-3" style={{ marginBottom: 16 }}>
              <span className="mono-xs muted" style={{ marginRight: 8, minWidth: 88 }}>Mood —</span>
              <button className={`pill ${mood === "all" ? "on" : ""}`} onClick={() => setMood("all")}>All</button>
              {MOODS.map((m) => (
                <button key={m.id} className={`pill ${mood === m.id ? "on" : ""}`} onClick={() => setMood(m.id)}>
                  {m.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="mono-xs muted" style={{ marginRight: 8, minWidth: 88 }}>Backdrop —</span>
              <button className={`pill ${backdrop === "all" ? "on" : ""}`} onClick={() => setBackdrop("all")}>All</button>
              {BACKDROPS.map((b) => (
                <button key={b.id} className={`pill ${backdrop === b.id ? "on" : ""}`} onClick={() => setBackdrop(b.id)}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ACTIVE CATEGORY NOTES */}
        {(mood !== "all" || backdrop !== "all") && (
          <div key={mood + backdrop} className="fade-swap grid md:grid-cols-2 gap-8" style={{ marginTop: 44 }}>
            {mood !== "all" && (
              <div className="cat-note">
                <p className="mono merlot" style={{ marginBottom: 12 }}>The {moodLabel(mood)} — mood</p>
                <p className="body-2">{MOOD_DESC[mood]}</p>
              </div>
            )}
            {backdrop !== "all" && (
              <div className="cat-note">
                <p className="mono merlot" style={{ marginBottom: 12 }}>
                  {BACKDROPS.find((b) => b.id === backdrop)?.label} — backdrop
                </p>
                <p className="body-2">{BACKDROP_DESC[backdrop]}</p>
              </div>
            )}
          </div>
        )}

        <p className="mono-xs muted" style={{ marginTop: 40, marginBottom: 24 }}>
          Showing {String(films.length).padStart(2, "0")} / {String(FILMS.length).padStart(2, "0")} films
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {films.map((f, i) => (
            <Reveal key={f.couple} delay={(i % 3) * 80}>
              <button className="filmcard" onClick={() => go("contact")} aria-label={`Inquire about a film like ${f.couple}`}>
                <Letterbox grad={f.grad} tall>
                  <span className="lb-meta" style={{ top: 12, left: 30 }}>OM — {String(i + 1).padStart(2, "0")}</span>
                  <span className="lb-meta" style={{ top: 12, right: 30 }}>2.39 : 1</span>
                  <span className="lb-initials">{f.init}</span>
                  <div className="playbtn" style={{ width: 52, height: 52 }} />
                  <span className="lb-meta" style={{ bottom: 12, right: 30 }}>{f.dur}</span>
                </Letterbox>
                <div className="flex items-start justify-between gap-4" style={{ marginTop: 18 }}>
                  <div>
                    <h3 className="display-md">{f.couple}</h3>
                    <p className="mono-xs muted" style={{ marginTop: 8 }}>{f.venue}</p>
                  </div>
                  <span className="chip">{moodLabel(f.mood)}</span>
                </div>
                <p className="body-2" style={{ marginTop: 12, fontSize: "0.92rem" }}>{f.log}</p>
              </button>
            </Reveal>
          ))}
        </div>

        {/* PRIVATE SCREENING NOTE */}
        <Reveal>
          <div className="boundary" style={{ marginTop: 90, display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ maxWidth: "56ch" }}>
              <p className="mono merlot" style={{ marginBottom: 16 }}>The private screening room</p>
              <p className="body-2">
                Full films are shared privately, out of respect for the couples in them. Ask for the screening-room password on your discovery call — and tell us which of these moved you.
              </p>
            </div>
            <button className="btn" onClick={() => go("contact")}>
              Request Access <span className="arr">→</span>
            </button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ============================================================
   PAGE — CONTACT / VIBE CHECK
   ============================================================ */

function Contact({ go }) {
  const [f, setF] = useState({ name: "", partner: "", email: "", date: "", venue: "", tier: "", vibe: "", idea: "" });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = () => {
    const er = {};
    if (!f.name.trim()) er.name = "Add your name so we know who’s writing.";
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      er.email = "We need a working email to reply within 24 hours.";
    if (!f.vibe) er.vibe = "Choose the feeling — it’s the whole point of this form.";
    setErrs(er);
    if (Object.keys(er).length === 0) {
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (sent) {
    return (
      <section className="wrap page-enter" style={{ paddingTop: 90, paddingBottom: 130, maxWidth: 860 }}>
        <Eyebrow tc="TC 00:00:01" label="Received" right="Vibe check — logged" />
        <h1 className="display-hero" style={{ marginTop: 44, fontSize: "clamp(2.6rem,6.5vw,5rem)" }}>
          Received — and <em>already being read.</em>
        </h1>
        <p className="lede" style={{ marginTop: 30 }}>
          Thank you for trusting us with the first draft of your idea. A filmmaker — not an autoresponder — will reply within 24 hours with availability for your date and a private link to schedule your discovery call. Until then, keep collecting: songs, stills, half-formed thoughts. Nothing is too early to share.
        </p>
        <div className="hairline-t" style={{ marginTop: 56 }}>
          {[
            ["01", "Within 24 hours", "A personal reply, honest availability & your call link"],
            ["02", "The discovery call", "Thirty minutes, cameras optional, no pitch deck"],
            ["03", "The working session", "Where your film formally begins"],
          ].map((r) => (
            <div key={r[0]} className="next-row">
              <span className="mono merlot">{r[0]}</span>
              <span className="mono ink">{r[1]}</span>
              <span className="body-2">{r[2]}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4" style={{ marginTop: 48 }}>
          <button className="btn btn-ghost" onClick={() => go("portfolio")}>
            Browse the films while you wait <span className="arr">→</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="wrap" style={{ paddingTop: 72, paddingBottom: 56 }}>
        <Reveal>
          <Eyebrow tc="TC 00:00" label="Inquire" right="Replies within 24 hours" />
        </Reveal>
        <Reveal delay={100}>
          <h1 className="display-hero" style={{ marginTop: 44 }}>
            First, the <em>vibe check.</em>
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="lede" style={{ marginTop: 30 }}>
            This isn’t a quote request — it’s the first creative conversation. Tell us who you are and how the film should feel. A member of the studio replies within 24 hours with honest availability and a link to book your discovery call.
          </p>
        </Reveal>
      </section>

      <section className="wrap hairline-t" style={{ paddingTop: 64, paddingBottom: 120 }}>
        <div className="grid md:grid-cols-12 gap-14">
          {/* FORM */}
          <div className="md:col-span-7 flex flex-col gap-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <label className="f-label" htmlFor="om-name">Your name <span className="req">*</span></label>
                <input id="om-name" className="f-input" value={f.name} onChange={set("name")} placeholder="First & last" />
                {errs.name && <p className="f-err">{errs.name}</p>}
              </div>
              <div>
                <label className="f-label" htmlFor="om-partner">Your partner’s name</label>
                <input id="om-partner" className="f-input" value={f.partner} onChange={set("partner")} placeholder="The co-author" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <label className="f-label" htmlFor="om-email">Email <span className="req">*</span></label>
                <input id="om-email" className="f-input" type="email" value={f.email} onChange={set("email")} placeholder="you@…" />
                {errs.email && <p className="f-err">{errs.email}</p>}
              </div>
              <div>
                <label className="f-label" htmlFor="om-date">Wedding date</label>
                <input id="om-date" className="f-input" value={f.date} onChange={set("date")} placeholder="10 · 12 · 2026 — or ‘Fall 2027, TBD’" />
              </div>
            </div>

            <div>
              <label className="f-label" htmlFor="om-venue">Venue or location</label>
              <input id="om-venue" className="f-input" value={f.venue} onChange={set("venue")} placeholder="SF City Hall · a Napa estate · still scouting" />
            </div>

            <div>
              <span className="f-label">Investment tier</span>
              <p className="f-help">Honest ranges let us design honestly. Every tier receives the same standard of craft.</p>
              <div className="grid md:grid-cols-3 gap-4">
                {TIERS.map((t) => (
                  <button
                    key={t.v}
                    type="button"
                    className={`choice ${f.tier === t.v ? "on" : ""}`}
                    onClick={() => setF({ ...f, tier: t.v })}
                    aria-pressed={f.tier === t.v}
                  >
                    <span className="c-mark" />
                    <span className="c-sub">{t.sub}</span>
                    <span className="c-title">{t.v}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="f-label">How do you want your legacy film to feel? <span className="req">*</span></span>
              <div className="grid gap-4" style={{ marginTop: 4 }}>
                {VIBES.map((v) => (
                  <button
                    key={v.v}
                    type="button"
                    className={`choice ${f.vibe === v.v ? "on" : ""}`}
                    onClick={() => setF({ ...f, vibe: v.v })}
                    aria-pressed={f.vibe === v.v}
                  >
                    <span className="c-mark" />
                    <span className="c-sub">{v.sub}</span>
                    <span className="c-title">{v.v}</span>
                  </button>
                ))}
              </div>
              {errs.vibe && <p className="f-err">{errs.vibe}</p>}
            </div>

            <div>
              <label className="f-label" htmlFor="om-idea">Tell us about your wildest creative idea for your film.</label>
              <textarea
                id="om-idea"
                className="f-input"
                value={f.idea}
                onChange={set("idea")}
                placeholder="Open on the getaway car. Score the vows to the song from our first road trip. Let the dog narrate. Nothing is too ambitious — or too strange — to say out loud."
              />
            </div>

            <div>
              <button className="btn btn-block" onClick={submit}>
                Send the Vibe Check <span className="arr">→</span>
              </button>
              <p className="mono-xs muted" style={{ marginTop: 16, textAlign: "center" }}>
                No autoresponders · Read by a filmmaker within 24 hours
              </p>
            </div>
          </div>

          {/* ASIDE */}
          <aside className="md:col-span-5">
            <div style={{ position: "sticky", top: 110 }}>
              <Letterbox grad={["#CBB68C", "#4E2128"]} tall>
                <span className="lb-meta" style={{ top: 14, left: 32 }}>One Memories — Inquiry</span>
                <span className="lb-meta" style={{ top: 14, right: 32 }}>2.39 : 1</span>
                <span className="lb-initials">You & —</span>
                <span className="lb-meta" style={{ bottom: 14, left: 32 }}>Scene 01 · Take 01</span>
              </Letterbox>
              <div className="hairline-b" style={{ marginTop: 36 }}>
                {[
                  ["Response", "Within 24 hours, direct from the studio"],
                  ["Booking", "2026 / 2027 · Limited commissions per season"],
                  ["Base", "San Francisco Bay Area · Travel on request"],
                  ["Write", "hello@onememories.film"],
                ].map((r) => (
                  <div key={r[0]} className="hairline-t flex gap-6" style={{ padding: "18px 0" }}>
                    <span className="mono merlot" style={{ minWidth: 92 }}>{r[0]}</span>
                    <span className="body-2" style={{ fontSize: "0.9rem" }}>{r[1]}</span>
                  </div>
                ))}
              </div>
              <p className="fd" style={{ marginTop: 32, fontSize: "1.35rem", lineHeight: 1.4 }}>
                “Your idea, <em>our work.”</em>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const [page, setPage] = useState("home");
  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  return (
    <div className="om">
      <style>{CSS}</style>
      <Nav page={page} go={go} />
      <main key={page} className="page-enter">
        {page === "home" && <Home go={go} />}
        {page === "process" && <Process go={go} />}
        {page === "portfolio" && <Portfolio go={go} />}
        {page === "contact" && <Contact go={go} />}
      </main>
      <Footer go={go} />
    </div>
  );
}
