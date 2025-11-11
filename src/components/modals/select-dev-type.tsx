"use client";

import { FileText, BrainCircuit } from "lucide-react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface SelectDevTypeProps {
  onSelectDED: () => void;
  onSelectQA: () => void;
}

export function SelectDevType({ onSelectDED, onSelectQA }: SelectDevTypeProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center">Nuevo desarrollo</DialogTitle>
        <DialogDescription className="text-center">
          Selecciona cómo quieres iniciar el nuevo desarrollo.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        <button
          onClick={onSelectDED}
          className="flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-accent hover:border-primary transition-all duration-200"
        >
          <FileText className="h-10 w-10 mb-3 text-primary" />
          <h3 className="font-semibold">A partir de DED</h3>
          <p className="text-sm text-muted-foreground text-center mt-1">
            Usa una plantilla de Documento de Especificaciones de Diseño.
          </p>
        </button>
        <button
          onClick={onSelectQA}
          className="flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-accent hover:border-primary transition-all duration-200"
        >
          <BrainCircuit className="h-10 w-10 mb-3 text-primary" />
          <h3 className="font-semibold">Crear desde cero</h3>
          <p className="text-sm text-muted-foreground text-center mt-1">
            Empieza con un documento en blanco.
          </p>
        </button>
      </div>
    </>
  );
}
