import { Documento, Desarrollo, Cliente } from "./types";

// This function contains browser-only APIs (new File) and should only be called on the client.
export const getInitialDocuments = (): Documento[] => [
  // ... (existing data)
];

export const mockClients: Cliente[] = [
    { id: "1", name: "TechSolutions Inc." },
    { id: "2", name: "E-Commerce Global" },
    { id: "3", name: "Innovatech" },
    { id: "4", name: "HealthCare Plus" },
];

export const helpHtmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Generador de Documentos Técnicos con IA — Visión y Flujo</title>
<style>
  :root{
    --bg:#0b1020;--panel:#121a33;--panel-2:#0f1630;--ink:#e6ecff;--muted:#93a0c6;--brand:#6c9eff;--brand-2:#22d4a3;--line:rgba(255,255,255,.08);--r:16px;
  }
  *{box-sizing:border-box}
  body{margin:0;background:linear-gradient(180deg,#1c2752,#0e1530);color:var(--ink);font-family:'Inter',system-ui;padding:40px}
  .wrap{max-width:1200px;margin:auto}
  .panel{background:var(--panel);border:1px solid var(--line);border-radius:var(--r);padding:20px;margin-top:24px;transition:all .3s ease}
  .panel:hover{transform:translateY(-4px);box-shadow:0 0 20px rgba(108,158,255,0.15)}
  .highlight-green{background:rgba(34,212,163,.08);border:1px solid rgba(34,212,163,.35)}
  .highlight-blue{background:rgba(108,158,255,.08);border:1px solid rgba(108,158,255,.35)}
  .title{font-weight:700;font-size:20px;margin-bottom:10px}
  svg{width:100%;height:auto;display:block}
  .hero{margin-bottom:40px}
  .hero h1{font-size:36px;margin:0 0 10px;font-weight:800}
  .hero p{color:var(--muted);font-size:18px;line-height:1.6}
  .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:20px}
  .step{background:var(--panel-2);border:1px solid var(--line);border-radius:12px;padding:14px}
  .step h3{margin:0 0 6px;font-size:16px}
  .mini{color:var(--muted);font-size:13px}
  .kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:16px}
  .kpi{background:rgba(34,212,163,.08);border:1px solid rgba(34,212,163,.25);border-radius:10px;padding:12px;text-align:center}
  .kpi .v{font-weight:800;font-size:20px;color:#bff7e9}
  .kpi .l{font-size:12px;color:#a9f3de}
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}
  .list{display:grid;gap:10px;color:var(--muted)}
  .li{display:flex;gap:8px;align-items:flex-start}
  .road{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px}
  .milestone{background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.02));border:1px solid var(--line);border-radius:14px;padding:16px}
</style>
</head>
<body>
<div class="wrap">
  <section class="hero">
    <h1>De DED a Código Productivo: documentación viva y automatizada</h1>
    <p>La app orquesta IA + RAG para transformar un DED base en <strong>DED refinado</strong>, <strong>QA</strong>, <strong>Riesgos</strong> y finalmente un <strong>Documento de Arquitectura Técnica (DAT)</strong>. Luego, un motor de <em>vibe coding</em> genera el código; ese código retroalimenta el RAG y mejora la siguiente iteración.</p>
  </section>
  <section class="panel">
    <div class="title">Arquitectura del Flujo (alto nivel)</div>
    <svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="box" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#223064"/>
          <stop offset="1" stop-color="#131b38"/>
        </linearGradient>
        <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="rgba(0,0,0,.35)"/>
        </filter>
      </defs>
      <g font-family="Inter, Arial" font-size="14" fill="#dfe7ff" text-anchor="middle">
        <g filter="url(#s)">
          <rect x="30" y="40" width="200" height="80" rx="12" fill="url(#box)"/>
          <text x="130" y="82">DED base</text>
          <text x="130" y="102" fill="#93a0c6">entrada del usuario</text>
        </g>
        <g filter="url(#s)">
          <rect x="270" y="40" width="240" height="80" rx="12" fill="url(#box)"/>
          <text x="390" y="72">Refactor & Enriquecimiento</text>
          <text x="390" y="92" fill="#93a0c6">IA + RAG (estándares internos)</text>
        </g>
        <g filter="url(#s)">
          <rect x="550" y="30" width="220" height="60" rx="12" fill="url(#box)"/>
          <text x="660" y="60">DED+</text>
        </g>
        <g filter="url(#s)">
          <rect x="550" y="110" width="220" height="60" rx="12" fill="url(#box)"/>
          <text x="660" y="140">QA</text>
        </g>
        <g filter="url(#s)">
          <rect x="550" y="190" width="220" height="60" rx="12" fill="url(#box)"/>
          <text x="660" y="220">Riesgos</text>
        </g>
        <g filter="url(#s)">
          <rect x="820" y="110" width="260" height="80" rx="12" fill="url(#box)"/>
          <text x="950" y="150">Generación DAT</text>
          <text x="950" y="170" fill="#93a0c6">consolidación de DED+/QA/Riesgos</text>
        </g>
        <g filter="url(#s)">
          <rect x="820" y="260" width="160" height="70" rx="12" fill="url(#box)"/>
          <text x="900" y="300">Vibe Coding</text>
        </g>
        <g filter="url(#s)">
          <rect x="1010" y="260" width="160" height="70" rx="12" fill="url(#box)"/>
          <text x="1090" y="295">Código</text>
          <text x="1090" y="313" fill="#93a0c6">artefactos</text>
        </g>
      </g>
      <g stroke="#6c9eff" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M230 80 H270"/>
        <path d="M510 80 V150"/>
        <path d="M510 150 H550"/>
        <path d="M550 60 V150"/>
        <path d="M550 150 V220"/>
        <path d="M770 140 H820"/>
        <path d="M950 190 V260"/>
        <path d="M980 295 H1010"/>
      </g>
      <g stroke="#22d4a3" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M1090 330 V360 H390 V80" stroke-dasharray="6 6"/>
        <circle cx="1090" cy="330" r="4" fill="#22d4a3"/>
      </g>
      <g fill="#a6ffd9" font-family="Inter, Arial" font-size="12">
        <text x="700" y="360">feedback del código → RAG</text>
      </g>
    </svg>
  </section>
</div>
</body>
</html>
`;
