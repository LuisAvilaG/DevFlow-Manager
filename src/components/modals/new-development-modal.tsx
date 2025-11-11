"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { CreateFromDEDForm } from './create-from-ded-form';
import { DocumentEditor } from './document-editor';
import { useToast } from '@/hooks/use-toast';

const parseHtmlForEditor = (html: string): { style: string; body: string } => {
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
  return { style: styleMatch ? styleMatch[1] : '', body: bodyMatch ? bodyMatch[1] : html };
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
}

// Se ha simplificado el manejo de los pasos
type ModalStep = 'createFromDED' | 'editDocument';

interface NewDevelopmentModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDevelopmentCreated: () => void;
}

export function NewDevelopmentModal({ isOpen, onOpenChange, onDevelopmentCreated }: NewDevelopmentModalProps) {
  // ¡CORREGIDO! El estado inicial ahora es directamente el formulario.
  const [step, setStep] = useState<ModalStep>('createFromDED');
  const [editingDocument, setEditingDocument] = useState<{ id: string, html: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setTimeout(() => {
        // Al cerrar, siempre reseteamos al formulario.
        setStep('createFromDED');
        setEditingDocument(null);
      }, 300);
    }
  };

  const handleCreateFromDEDSuccess = (html: string, id: string) => {
    setEditingDocument({ id, html });
    setStep('editDocument');
  };

  const handleSaveHtmlDocument = async (newBodyHtml: string, action: 'draft' | 'finalize') => {
      if (!editingDocument) return;
      setIsSaving(true);

      const { style } = parseHtmlForEditor(editingDocument.html);
      const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${style}</style></head><body>${newBodyHtml}</body></html>`;
      const encodedContent = encodeToBase64(fullHtml);

      try {
          const response = await fetch("https://n8n.dinamicsw.site/webhook/actualizar-documento", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  desarrolloId: editingDocument.id, 
                  tipo: 'DED',
                  htmlContent: encodedContent, 
                  action 
              }),
          });
          if (!response.ok) throw new Error("La sincronización falló.");
          
          toast({ title: "Guardado", description: `El documento DED ha sido guardado.` });
          onDevelopmentCreated();
          handleClose(false);

      } catch (error) {
          toast({ variant: "destructive", title: "Error de Sincronización", description: error instanceof Error ? error.message : "No se pudo guardar." });
      } finally {
          setIsSaving(false);
      }
  };

  const renderStep = () => {
    if (step === 'editDocument' && editingDocument) {
      const { body, style } = parseHtmlForEditor(editingDocument.html);
      return (
        <>
            <DialogHeader className="sr-only">
                <DialogTitle>Editor de Documento: DED</DialogTitle>
            </DialogHeader>
            <DocumentEditor 
                htmlContent={body} 
                contentCss={style}
                onSave={handleSaveHtmlDocument}
                isSaving={isSaving}
            />
        </>
      );
    }
    // Por defecto, o en el paso 'createFromDED', mostramos el formulario.
    return <CreateFromDEDForm onSuccess={handleCreateFromDEDSuccess} />;
  };

  const dialogClassName = step === 'editDocument' 
    ? "max-w-none w-full h-full p-0 flex flex-col" 
    : "max-w-2xl";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={dialogClassName}>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
