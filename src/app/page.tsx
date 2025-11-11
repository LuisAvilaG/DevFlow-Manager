"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/header';
import DevelopmentsDashboard from '@/components/dashboard/developments-dashboard';
import { DocumentEditor } from '@/components/modals/document-editor';
import { MarkdownEditor } from '@/components/modals/markdown-editor';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SelectDevType } from '@/components/modals/select-dev-type';
import { CreateFromDEDForm } from '@/components/modals/create-from-ded-form';
import { HelpModal } from '@/components/modals/help-modal';
import { Desarrollo, Documento, DocumentoTipo, DocumentoEstado } from '@/lib/types';
import { DevelopmentsTable } from '@/components/dashboard/developments-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const cascadeOrder: DocumentoTipo[] = ["DED", "QA", "Riesgos", "DAT"];

const helpHtmlContent = `
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

      <!-- Boxes -->
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

      <!-- Connectors (azul) -->
      <g stroke="#6c9eff" stroke-width="2" fill="none" stroke-linecap="round">
        <!-- DED → Refactor -->
        <path d="M230 80 H270"/>
        <!-- Refactor → línea común hacia DED+, QA, Riesgos -->
        <path d="M510 80 V150"/>
        <path d="M510 150 H550"/>
        <!-- ramas verticales compartidas: DED+ y Riesgos se conectan a la misma salida de QA -->
        <path d="M550 60 V150"/>
        <path d="M550 150 V220"/>
        <!-- QA → DAT (central) -->
        <path d="M770 140 H820"/>
        <!-- DAT → Vibe Coding → Código -->
        <path d="M950 190 V260"/>
        <path d="M980 295 H1010"/>
      </g>

      <!-- Feedback (verde recto): desde abajo de Código al centro de Refactor) -->
      <g stroke="#22d4a3" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M1090 330 V360 H390 V80" stroke-dasharray="6 6"/>
        <circle cx="1090" cy="330" r="4" fill="#22d4a3"/>
      </g>

      <g fill="#a6ffd9" font-family="Inter, Arial" font-size="12">
        <text x="700" y="360">feedback del código → RAG</text>
      </g>
    </svg>
  </section>

  <section class="steps">
    <div class="step"><h3>1️⃣ Refactor de DED</h3><p class="mini">Limpieza, normalización y enriquecimiento con estándares internos de NetSuite. Resultado: DED+.</p></div>
    <div class="step"><h3>2️⃣ QA y Riesgos</h3><p class="mini">Generación automática de plan de pruebas (QA) y matriz de riesgos con mitigaciones.</p></div>
    <div class="step"><h3>3️⃣ DAT Consolidado</h3><p class="mini">Con los tres documentos aprobados, la IA compone un Documento de Arquitectura Técnica accionable y diseña una <strong>arquitectura de entregas por fases</strong>, permitiendo una entrega continua de valor.</p></div>
    <div class="step"><h3>4️⃣ Vibe Coding</h3><p class="mini">El motor genera código; los artefactos retroalimentan el RAG para la mejora continua.</p></div>
  </section>

  <section class="panel">
    <div class="title">Beneficios Clave (KPIs)</div>
    <div class="kpis">
      <div class="kpi"><div class="v">↓ 60%</div><div class="l">Tiempo a DAT</div></div>
      <div class="kpi"><div class="v">↓ 40%</div><div class="l">Retrabajos</div></div>
      <div class="kpi"><div class="v">↑ 3x</div><div class="l">Cobertura QA</div></div>
      <div class="kpi"><div class="v">100%</div><div class="l">Trazabilidad ClickUp</div></div>
      <div class="kpi"><div class="v">↑ 35%</div><div class="l">Velocidad Dev</div></div>
      <div class="kpi"><div class="v">SLA+</div><div class="l">Cumplimiento auditable</div></div>
    </div>
  </section>

  <section class="grid-3">
    <div class="panel">
      <div class="title">Integración Operativa</div>
      <div class="list">
        <div class="li">✅ ClickUp — Guardado automático, versionado y enlaces a tareas/listas de proyectos.</div>
        <div class="li">✅ RAG — Base de conocimiento viva (DED aprobados, DATs, código y lecciones aprendidas).</div>
        <div class="li">✅ LLMs — Modelos para refactor, QA, riesgos y composición del DAT.</div>
      </div>
    </div>
    <div class="panel">
      <div class="title">Gobernanza & Calidad</div>
      <div class="list">
        <div class="li">✅ Checklists de QA y criterios de aceptación autogenerados.</div>
        <div class="li">✅ Puertas de control: solo se habilita DAT tras aprobar DED+, QA y Riesgos.</div>
        <div class="li">✅ Historial auditable: quién aprobó, cuándo y sobre qué versión.</div>
      </div>
    </div>
    <div class="panel">
      <div class="title">Desarrollo & Feedback</div>
      <div class="list">
        <div class="li">✅ Vibe Coding — Generación de código guiada por el DAT.</div>
        <div class="li">✅ Pruebas QA; resultados alimentan el RAG.</div>
        <div class="li">✅ Loop de mejora continua: más código ⇒ mejor conocimiento ⇒ mejores docs.</div>
      </div>
    </div>
  </section>

  <section class="panel">
    <div class="title">Roadmap Sugerido</div>
    <div class="road">
      <div class="milestone"><strong>Fase 1</strong><br/>• Ingesta y refactor DED<br/>• Generación automática QA y Riesgos<br/>• Autosave en ClickUp</div>
      <div class="milestone"><strong>Fase 2</strong><br/>• DAT consolidado accionable<br/>• Vibe Coding inicial<br/>• Métricas de calidad (lint/tests)</div>
      <div class="milestone"><strong>Fase 3</strong><br/>• Feedback de código al RAG<br/>• Sugerencias de mejora<br/>• Tablero de KPIs y auditoría</div>
    </div>
  </section>

  <section class="panel">
    <div class="title">Siguientes Pasos y Evolución</div>
    <p class="mini">La siguiente etapa de la aplicación busca transformar completamente la forma en que se crean los desarrollos técnicos. El objetivo es pasar de generar documentos a partir de un DED existente a crear <strong>desarrollos a partir de levantamientos y comentarios funcionales</strong>, permitiendo que la IA estructure requerimientos no técnicos y los convierta en especificaciones completas.</p>
    <ul class="list">
      <li>✨ <strong>Creación a partir de levantamientos:</strong> la IA procesará entrevistas, tickets o briefs del cliente para generar un DED inicial estructurado.</li>
      <li>🤖 <strong>Arquitectos de software inteligentes:</strong> los usuarios asumirán el rol de arquitectos de software asistidos por IA, donde validarán, refinarán y aprobarán propuestas de solución antes de la generación de código.</li>
      <li>🧩 <strong>Automatización del ciclo completo:</strong> integración con repositorios (GitHub/GitLab) para vincular directamente el DAT y QA con commits y pipelines CI/CD.</li>
      <li>📈 <strong>Aprendizaje continuo:</strong> cada entrega alimentará un RAG especializado, permitiendo que la IA proponga soluciones más precisas en futuros proyectos.</li>
    </ul>
    <div class="grid-3" style="margin-top:20px;grid-template-columns:repeat(2,1fr);">
      <div class="panel highlight-blue">
        <div class="title">📎 Anexos</div>
        <p class="mini">Permitirá cargar código y documentación complementaria, generando un <strong>DAT exclusivo</strong> que describa cómo un desarrollo actual puede incorporar o extender ese anexo. Esto permitirá documentar integraciones o librerías reutilizables con precisión.</p>
      </div>
      <div class="panel highlight-green">
        <div class="title">🩺 Corregidor de errores</div>
        <p class="mini">Funcionalidad que permitirá ingresar un proyecto completo con comentarios y observaciones; la IA identificará posibles errores y propondrá <strong>soluciones técnicas automáticas</strong>, mejorando la calidad del desarrollo y del documento de soporte.</p>
      </div>
    </div>
  </section>
</div>
</body>
</html>
`;

// --- (Helper functions remain the same) ---
const decodeBase64 = (base64String: string | null): string => {
  if (!base64String) return '';
  try {
    const binaryString = window.atob(base64String);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch (e) {
    return base64String;
  }
};
const encodeToBase64 = (htmlString: string): string => window.btoa(unescape(encodeURIComponent(htmlString)));
const parseHtmlForEditor = (html: string): { style: string; body: string } => {
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
  return { style: styleMatch ? styleMatch[1] : '', body: bodyMatch ? bodyMatch[1] : html };
};
const adaptApiDataToDesarrollo = (apiData: any[]): Desarrollo[] => {
  if (!Array.isArray(apiData)) { return []; }
  return apiData.map(item => ({
    id: String(item.id || 'ID_DESCONOCIDO'),
    nombre: item.Nombre || 'Sin Nombre',
    fechaCreacion: item.createdAt ? new Date(JSON.parse(item.createdAt)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    cliente: item.cliente || 'Sin Cliente',
    horasEstimadas: String(item.horasEstimadas || '0') + 'h',
    documentos: item.documentos || [],
  }));
};

export default function Home() {
    const [developments, setDevelopments] = useState<Desarrollo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [creationModalState, setCreationModalState] = useState<'closed' | 'selectType' | 'dedForm'>('closed');
    const [editingHtmlContext, setEditingHtmlContext] = useState<{ desarrolloId: string; tipo: DocumentoTipo; } | null>(null);
    const [editingDatContext, setEditingDatContext] = useState<{ desarrolloId: string; tipo: 'DAT'; } | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const { toast } = useToast();
    
    // --- ESTADO PARA FILTROS (CORREGIDO: Declarado antes de su uso) ---
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<DocumentoEstado | 'Todos'>('Todos');

    useEffect(() => {
        fetchDevelopments();
    }, []);

    const fetchDevelopments = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://n8n.dinamicsw.site/webhook/desarrollos');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const adaptedData = adaptApiDataToDesarrollo(data);
            adaptedData.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
            setDevelopments(adaptedData);
        } catch (error) {
            toast({ variant: "destructive", title: "Error de Carga", description: "No se pudieron cargar los datos del backend." });
        } finally {
            setIsLoading(false);
        }
    };

    // --- LÓGICA DE FILTRADO (CORREGIDO: Ahora puede acceder a los estados) ---
    const filteredDevelopments = useMemo(() => {
        return developments.filter(dev => {
            const searchTermLower = searchTerm.toLowerCase();
            const matchesSearch = searchTerm === '' ||
                dev.nombre.toLowerCase().includes(searchTermLower) ||
                dev.cliente.toLowerCase().includes(searchTermLower);
            const matchesStatus = statusFilter === 'Todos' ||
                dev.documentos.some(doc => doc.estado === statusFilter);
            return matchesSearch && matchesStatus;
        });
    }, [developments, searchTerm, statusFilter]);

    const documentBeingEdited = editingHtmlContext ? developments.find(d => d.id === editingHtmlContext.desarrolloId)?.documentos.find(doc => doc.tipo === editingHtmlContext.tipo) : null;
    const parsedEditingDocument = parseHtmlForEditor(decodeBase64(documentBeingEdited?.contenidoHtml || null));
    const datBeingEdited = editingDatContext ? developments.find(d => d.id === editingDatContext.desarrolloId)?.documentos.find(doc => doc.tipo === 'DAT' || doc.tipo === 'Arquitectura') : null;
    const decodedMarkdownContent = decodeBase64(datBeingEdited?.contenidoHtml || '').replace(/\\n/g, '\n');

    const handleActionClick = (desarrolloId: string, documento: Documento) => {
        if (documento.tipo === 'DAT' || documento.tipo === 'Arquitectura') {
            if (documento.estado === 'Pendiente') handleCreateDat(desarrolloId);
            else setEditingDatContext({ desarrolloId, tipo: 'DAT' });
        } else {
            setEditingHtmlContext({ desarrolloId, tipo: documento.tipo });
        }
    };
    
    const handleCreateDat = (desarrolloId: string) => {
        updateDocumentState(desarrolloId, 'DAT', { estado: 'En edición', contenidoHtml: '# Nuevo Documento de Arquitectura\n\n' });
        setEditingDatContext({ desarrolloId, tipo: 'DAT' });
    };

    const handleSaveHtmlDocument = async (newBodyHtml: string, action: 'draft' | 'finalize') => {
        if (!editingHtmlContext) return;
        const { desarrolloId, tipo } = editingHtmlContext;
        const decodedOriginalHtml = decodeBase64(documentBeingEdited?.contenidoHtml || '');
        const { style } = parseHtmlForEditor(decodedOriginalHtml);
        const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${style}</style></head><body>${newBodyHtml}</body></html>`;
        const encodedContent = encodeToBase64(fullHtml);
        await saveData(desarrolloId, tipo, encodedContent, action);
        setEditingHtmlContext(null);
    };

    const handleSaveDatDocument = async (markdown: string, action: 'draft' | 'finalize') => {
        if (!editingDatContext) return;
        const { desarrolloId } = editingDatContext;
        await saveData(desarrolloId, 'DAT', markdown, action);
        setEditingDatContext(null);
    };

    const saveData = async (desarrolloId: string, tipo: DocumentoTipo, content: string, action: 'draft' | 'finalize') => {
        const originalState = developments;
        setIsSaving(true);
        updateDocumentState(desarrolloId, tipo, { contenidoHtml: content, estado: action === 'finalize' ? 'Completado' : 'En edición' });
        if(action === 'finalize') {
            const currentIndex = cascadeOrder.indexOf(tipo);
            const nextDocTipo = cascadeOrder[currentIndex + 1];
            if(nextDocTipo) updateDocumentState(desarrolloId, nextDocTipo, { estado: 'En edición' });
        }
        
        try {
            const response = await fetch("https://n8n.dinamicsw.site/webhook/actualizar-documento", {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ desarrolloId, tipo, htmlContent: content, action }),
            });
            if (!response.ok) throw new Error("La sincronización falló.");
            toast({ title: "Sincronizado", description: `Documento ${tipo} guardado en el servidor.` });
        } catch (error) {
            setDevelopments(originalState);
            toast({ variant: "destructive", title: "Error de Sincronización", description: "No se pudo guardar." });
        } finally {
            setIsSaving(false);
        }
    };
    
    const updateDocumentState = (desarrolloId: string, tipo: DocumentoTipo, updates: Partial<Documento>) => {
        setDevelopments(prev => prev.map(dev => 
            dev.id === desarrolloId ? { ...dev, documentos: dev.documentos.map(doc => doc.tipo === tipo ? { ...doc, ...updates } : doc) } : dev
        ));
    };

    const handleDEDSuccess = async (html: string, id: string) => {
      await fetchDevelopments();
      setCreationModalState('closed');
      setEditingHtmlContext({ desarrolloId: id, tipo: 'DED' });
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header onHelpClick={() => setIsHelpModalOpen(true)} onQuickTest={() => {}} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 container mx-auto">
                <DevelopmentsDashboard 
                    onNewDevelopment={() => setCreationModalState('selectType')}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                >
                    {isLoading
                        ? <div className="space-y-4 border rounded-lg p-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></div>
                        : <DevelopmentsTable data={filteredDevelopments} onActionClick={handleActionClick} />
                    }
                </DevelopmentsDashboard>
            </main>
            
            <Dialog open={creationModalState !== 'closed'} onOpenChange={(isOpen) => !isOpen && setCreationModalState('closed')}>
              <DialogContent>
                {creationModalState === 'selectType' && <SelectDevType onSelect={(type) => type === 'DED' ? setCreationModalState('dedForm') : setCreationModalState('closed')} />}
                {creationModalState === 'dedForm' && <CreateFromDEDForm onSuccess={handleDEDSuccess} />}
              </DialogContent>
            </Dialog>
            
            <Dialog open={!!editingHtmlContext} onOpenChange={(isOpen) => !isOpen && setEditingHtmlContext(null)}>
                <DialogContent className="max-w-none w-full h-full p-0">
                    <DocumentEditor htmlContent={parsedEditingDocument.body} contentCss={parsedEditingDocument.style} onSave={handleSaveHtmlDocument} isSaving={isSaving}/>
                </DialogContent>
            </Dialog>

            <Dialog open={!!editingDatContext} onOpenChange={(isOpen) => !isOpen && setEditingDatContext(null)}>
                <DialogContent className="max-w-7xl w-full h-[90vh]">
                    <MarkdownEditor markdownContent={decodedMarkdownContent} onSave={handleSaveDatDocument} isSaving={isSaving}/>
                </DialogContent>
            </Dialog>

            <Dialog open={isHelpModalOpen} onOpenChange={setIsHelpModalOpen}>
              <DialogContent className="p-0 bg-transparent border-none max-w-5xl w-full">
                  <HelpModal htmlContent={helpHtmlContent} onClose={() => setIsHelpModalOpen(false)} />
              </DialogContent>
            </Dialog>
        </div>
    );
}
