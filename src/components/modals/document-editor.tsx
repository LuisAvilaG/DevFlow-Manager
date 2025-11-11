'use client';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
import { Save, Rocket, Loader2, Download } from 'lucide-react';

interface DocumentEditorProps {
  htmlContent: string;
  contentCss?: string;
  documentName?: string;
  onSave: (html: string, action: 'draft' | 'finalize') => void;
  isSaving: boolean;
}

export function DocumentEditor({ htmlContent, contentCss = '', documentName = "documento", onSave, isSaving }: DocumentEditorProps) {
  const editorRef = useRef<any>(null);

  const handleSaveDraft = () => {
    if (editorRef.current) {
      onSave(editorRef.current.getContent(), 'draft');
    }
  };

  const handleFinalize = () => {
    if (editorRef.current) {
      onSave(editorRef.current.getContent(), 'finalize');
    }
  };

  const handleDownload = () => {
    if (editorRef.current) {
      const currentContent = editorRef.current.getContent();
      const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${contentCss}</style></head><body>${currentContent}</body></html>`;
      const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${documentName}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const finalContentStyle = `${contentCss} body { font-family:Helvetica,Arial,sans-serif; font-size:14px; margin: 20px; }`;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* CORRECCIÓN: Añadido padding a la derecha (pr-12) para dejar espacio al botón de cierre */}
      <div className="p-4 pr-12 bg-muted/40 border-b flex items-center justify-between">
        <h2 className="text-xl font-bold">Editor de Documento</h2>
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
      </div>
      <div className="flex-grow">
        <Editor
          apiKey="eu224tgyab3b14rgilyeo0avw4jxh1316yet2ivtlng535gt"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={htmlContent}
          disabled={isSaving}
          init={{
            height: '100%',
            width: '100%',
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: finalContentStyle,
            body_class: 'doc'
          }}
        />
      </div>
    </div>
  );
}
