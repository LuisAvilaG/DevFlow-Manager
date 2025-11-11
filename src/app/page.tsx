"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/header';
import DevelopmentsDashboard from '@/components/dashboard/developments-dashboard';
import { NewDevelopmentModal } from '@/components/modals/new-development-modal';
import { DocumentEditor } from '@/components/modals/document-editor';
import { MarkdownEditor } from '@/components/modals/markdown-editor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HelpModal } from '@/components/modals/help-modal';
import { Desarrollo, Documento, DocumentoTipo, DocumentoEstado } from '@/lib/types';
import { DevelopmentsTable } from '@/components/dashboard/developments-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

// --- Funciones Helper (Más Robustas) ---
const isBase64 = (str: string): boolean => {
  if (!str || str.trim() === '') return false;
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(str.trim());
};

const decodeBase64 = (base64String: string | null): string => {
  if (!base64String) return '';
  if (!isBase64(base64String)) {
    return base64String;
  }
  try {
    const binaryString = atob(base64String);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch (e) {
    console.error("Error al decodificar Base64:", e, "String:", base64String);
    return "Error: No se pudo decodificar el contenido.";
  }
};

const encodeToBase64 = (textString: string): string => {
  try {
    const bytes = new TextEncoder().encode(textString);
    const binaryString = String.fromCharCode(...bytes);
    return btoa(binaryString);
  } catch (e) {
    console.error("Error al codificar a Base64:", e);
    return '';
  }
};

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
    documentos: (item.documentos || []).map((doc: Documento) => ({
        ...doc,
        contenidoHtml: decodeBase64(doc.contenidoHtml)
    })),
  }));
};

// --- Componente Principal ---
export default function Home() {
    const [developments, setDevelopments] = useState<Desarrollo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    const [isNewDevModalOpen, setIsNewDevModalOpen] = useState(false);
    const [editingHtmlContext, setEditingHtmlContext] = useState<{ desarrolloId: string; tipo: DocumentoTipo; } | null>(null);
    const [editingDatContext, setEditingDatContext] = useState<{ desarrolloId: string; } | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<DocumentoEstado | 'Todos'>('Todos');
    const { toast } = useToast();

    useEffect(() => { fetchDevelopments(); }, []);

    const fetchDevelopments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://n8n.dinamicsw.site/webhook/desarrollos');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const adaptedData = adaptApiDataToDesarrollo(data);
            adaptedData.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
            setDevelopments(adaptedData);
        } catch (error) {
            toast({ variant: "destructive", title: "Error de Carga", description: "No se pudieron cargar los datos." });
        } finally {
            setIsLoading(false);
        }
    };

    const filteredDevelopments = useMemo(() => {
        return developments.filter(dev => {
            const searchTermLower = searchTerm.toLowerCase();
            const matchesSearch = searchTerm === '' ||
                dev.nombre.toLowerCase().includes(searchTermLower) ||
                dev.cliente.toLowerCase().includes(searchTermLower);
            if (statusFilter === 'Todos') return matchesSearch;
            const hasStatus = dev.documentos.some(doc => doc.estado === statusFilter);
            return matchesSearch && hasStatus;
        });
    }, [developments, searchTerm, statusFilter]);

    const handleActionClick = (desarrolloId: string, documento: Documento) => {
        // ¡CORREGIDO! Se elimina la comprobación '|| documento.tipo === 'Arquitectura''
        if (documento.tipo === 'DAT') {
            setEditingDatContext({ desarrolloId });
        } else {
            setEditingHtmlContext({ desarrolloId, tipo: documento.tipo });
        }
    };

    const handleSaveHtmlDocument = async (newBodyHtml: string, action: 'draft' | 'finalize') => {
        if (!editingHtmlContext) return;
        const { desarrolloId, tipo } = editingHtmlContext;
        
        const document = developments.find(d => d.id === desarrolloId)?.documentos.find(doc => doc.tipo === tipo);
        const { style } = parseHtmlForEditor(document?.contenidoHtml || '');
        const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${style}</style></head><body>${newBodyHtml}</body></html>`;
        
        await saveData(desarrolloId, tipo, fullHtml, action);
        setEditingHtmlContext(null);
    };

    const handleSaveDatDocument = async (markdown: string, action: 'draft' | 'finalize') => {
        if (!editingDatContext) return;
        await saveData(editingDatContext.desarrolloId, 'DAT', markdown, action);
        setEditingDatContext(null);
    };

    const saveData = async (desarrolloId: string, tipo: DocumentoTipo, rawContent: string, action: 'draft' | 'finalize') => {
        setIsSaving(true);
        const encodedContent = encodeToBase64(rawContent);

        try {
            const response = await fetch("https://n8n.dinamicsw.site/webhook/actualizar-documento", {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ desarrolloId, tipo, htmlContent: encodedContent, action }),
            });
            if (!response.ok) throw new Error("La sincronización falló.");
            await fetchDevelopments();
            toast({ title: "Sincronizado", description: `Documento ${tipo} guardado en el servidor.` });
        } catch (error) {
            toast({ variant: "destructive", title: "Error de Sincronización", description: `No se pudo guardar el documento ${tipo}.` });
        } finally {
            setIsSaving(false);
        }
    };

    const documentBeingEdited = editingHtmlContext ? 
        developments.find(d => d.id === editingHtmlContext.desarrolloId)?.documentos.find(doc => doc.tipo === editingHtmlContext.tipo) 
        : null;
    const parsedEditingDocument = parseHtmlForEditor(documentBeingEdited?.contenidoHtml || '');

    const datBeingEdited = editingDatContext ? 
        developments.find(d => d.id === editingDatContext.desarrolloId)?.documentos.find(doc => doc.tipo === 'DAT') 
        : null;
    const decodedMarkdownContent = (datBeingEdited?.contenidoHtml || '').replace(/\\n/g, '\n');

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header onHelpClick={() => setIsHelpModalOpen(true)} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 container mx-auto">
                <DevelopmentsDashboard 
                    onNewDevelopment={() => setIsNewDevModalOpen(true)}
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
            
            <NewDevelopmentModal isOpen={isNewDevModalOpen} onOpenChange={setIsNewDevModalOpen} onDevelopmentCreated={fetchDevelopments} />
            
            <Dialog open={!!editingHtmlContext} onOpenChange={(isOpen) => !isOpen && setEditingHtmlContext(null)}>
                <DialogContent className="max-w-none w-full h-full p-0 flex flex-col">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Editor de Documento: {editingHtmlContext?.tipo}</DialogTitle>
                    </DialogHeader>
                    <DocumentEditor htmlContent={parsedEditingDocument.body} contentCss={parsedEditingDocument.style} onSave={handleSaveHtmlDocument} isSaving={isSaving}/>
                </DialogContent>
            </Dialog>

            <Dialog open={!!editingDatContext} onOpenChange={(isOpen) => !isOpen && setEditingDatContext(null)}>
                <DialogContent className="max-w-7xl w-full h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Editor de Documento de Arquitectura (DAT)</DialogTitle>
                    </DialogHeader>
                    <MarkdownEditor markdownContent={decodedMarkdownContent} onSave={handleSaveDatDocument} isSaving={isSaving}/>
                </DialogContent>
            </Dialog>

            <Dialog open={isHelpModalOpen} onOpenChange={setIsHelpModalOpen}>
              <DialogContent className="p-0 bg-transparent border-none max-w-5xl w-full">
                  <DialogHeader className="sr-only">
                      <DialogTitle>Guía de Ayuda</DialogTitle>
                  </DialogHeader>
                  <HelpModal pdfUrl="/guia_de_uso.pdf" />
              </DialogContent>
            </Dialog>
        </div>
    );
}
