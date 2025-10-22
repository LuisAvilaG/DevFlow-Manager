"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/hooks/use-settings';
import { Loader2 } from 'lucide-react';

interface DocumentEditorProps {
  htmlContent: string;
  developmentId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentEditor({ htmlContent, developmentId, isOpen, onClose }: DocumentEditorProps) {
  const [editedHtml, setEditedHtml] = useState(htmlContent);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [settings] = useSettings();

  const handleSave = async () => {
    if (!developmentId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se ha proporcionado un ID de desarrollo.",
      });
      return;
    }
    setIsLoading(true);
    try {
      const finalHtmlBase64 = btoa(unescape(encodeURIComponent(editedHtml)));
      const payload = {
        id_desarrollo: developmentId,
        html_final_base64: finalHtmlBase64,
      };

      // Mocking n8n response for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Payload to be sent to n8n:", payload);

      // In a real scenario, you would use fetch:
      /*
      const response = await fetch(settings.n8nSaveHtmlWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el documento en n8n.');
      }
      */

      toast({
        title: "Éxito",
        description: "Documento enviado correctamente.",
      });
      onClose();

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Ha ocurrido un error inesperado al guardar.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-screen w-screen max-w-full !rounded-none !p-0 flex flex-col sm:p-0">
        <DialogHeader className="p-4 border-b flex-shrink-0 bg-background">
          <DialogTitle className="text-xl font-bold">Editor del Documento</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto bg-muted/20">
          <Textarea
            value={editedHtml}
            onChange={(e) => setEditedHtml(e.target.value)}
            className="h-full w-full font-code text-base resize-none rounded-none border-none focus-visible:ring-0 p-6"
            placeholder="Escribe tu HTML aquí..."
          />
        </div>
        <DialogFooter className="p-4 border-t flex-shrink-0 bg-background">
          <Button onClick={onClose} variant="outline" disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar y enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
