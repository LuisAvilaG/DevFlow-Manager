"use client";

import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
import { Download, Save, Zap, Loader2, Star } from 'lucide-react';

interface DocumentEditorProps {
  htmlContent: string;
  contentCss: string;
  isSaving: boolean;
  onSave: (newContent: string, action: 'draft' | 'finalize') => void;
}

export function DocumentEditor({ htmlContent, contentCss, onSave, isSaving }: DocumentEditorProps) {
  const editorRef = useRef<any>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  
  const handleSave = (action: 'draft' | 'finalize') => {
    if (editorRef.current) {
      const newContent = editorRef.current.getContent();
      if (action === 'draft') setIsDrafting(true);
      if (action === 'finalize') setIsFinalizing(true);
      onSave(newContent, action);
    }
  };

  const handleDownload = () => {
    if (editorRef.current) {
        const fullHtml = `<!DOCTYPE html><html><head><style>${contentCss}</style></head><body>${editorRef.current.getContent()}</body></html>`;
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'documento.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col h-full">
        <div className="flex-none bg-gray-50 border-b p-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold pl-2">Editor de Documento</h2>
            <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={isSaving}>
                    <Download className="mr-2 h-4 w-4" /> Descargar
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleSave('draft')} disabled={isSaving}>
                    {isDrafting && isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Guardar Borrador
                </Button>
                <Button size="sm" onClick={() => handleSave('finalize')} disabled={isSaving}>
                     {isFinalizing && isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Star className="mr-2 h-4 w-4" />}
                    Finalizar
                </Button>
            </div>
        </div>
        <div className="flex-grow">
        <Editor
          apiKey="eu224tgyab3b14rgilyeo0avw4jxh1316yet2ivtlng535gt"
          // ¡CORREGIDO! Se añade el tipo explícito ': any' a ambos parámetros.
          onInit={(evt: any, editor: any) => (editorRef.current = editor)}
          initialValue={htmlContent}
          disabled={isSaving}
          init={{
            height: '100%',
            width: '100%',
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: contentCss,
            body_class: 'prose dark:prose-invert max-w-none'
          }}
        />
        </div>
    </div>
  );
}
