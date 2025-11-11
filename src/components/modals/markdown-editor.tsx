'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Save, Rocket, Loader2, Download } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface MarkdownEditorProps {
  markdownContent: string;
  documentName?: string;
  onSave: (markdown: string, action: 'draft' | 'finalize') => void;
  isSaving: boolean;
}

export function MarkdownEditor({ markdownContent, documentName = "documento", onSave, isSaving }: MarkdownEditorProps) {
  const [content, setContent] = useState(markdownContent);

  const handleSaveDraft = () => {
    onSave(content, 'draft');
  };

  const handleFinalize = () => {
    onSave(content, 'finalize');
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${documentName}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* CORRECCIÓN: Añadido padding a la derecha (pr-12) para dejar espacio al botón de cierre */}
      <DialogHeader className="flex-row items-center justify-between pr-12">
        <div>
          <DialogTitle className="text-2xl font-bold">Editor de Documento de Arquitectura (DAT)</DialogTitle>
          <DialogDescription>
            Edita el contenido en Markdown a la izquierda y visualiza el resultado a la derecha.
          </DialogDescription>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownload} disabled={isSaving}>
                <Download className="mr-2 h-4 w-4" />
                Descargar
            </Button>
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Guardar Borrador
            </Button>
            <Button onClick={handleFinalize} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Rocket className="mr-2 h-4 w-4" />}
                Finalizar
            </Button>
        </div>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-6 px-1 h-[80vh]">
        {/* Editor de Texto */}
        <div className="flex flex-col gap-2 min-h-0">
            <Label htmlFor="markdown-editor" className="text-sm font-medium">Editor Markdown</Label>
            <Textarea
                id="markdown-editor"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-full resize-none font-mono"
                disabled={isSaving}
            />
        </div>
        
        {/* Vista Previa */}
        <div className="flex flex-col gap-2 min-h-0">
            <Label className="text-sm font-medium">Vista Previa</Label>
            <ScrollArea className="h-full w-full rounded-md border bg-white">
                <div className="prose dark:prose-invert max-w-none p-6">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                    </ReactMarkdown>
                </div>
            </ScrollArea>
        </div>
      </div>
    </>
  );
}
