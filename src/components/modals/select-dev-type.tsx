"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Puzzle, Pencil } from "lucide-react";

interface SelectDevTypeProps {
  onSelectDED: () => void;
}

export function SelectDevType({ onSelectDED }: SelectDevTypeProps) {
  return (
    <>
      <DialogHeader className="text-center">
        <DialogTitle className="text-2xl font-bold">Nuevo desarrollo</DialogTitle>
        <DialogDescription>
          Selecciona cómo quieres iniciar el nuevo desarrollo.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8">
        <Card
          className="cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-300 group"
          onClick={onSelectDED}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelectDED()}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
            <div className="p-3 bg-secondary rounded-lg mb-4">
              <Puzzle className="w-10 h-10 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h3 className="text-lg font-semibold">A partir de DED</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Usa una plantilla de Documento de Especificaciones de Diseño.
            </p>
          </CardContent>
        </Card>
        <Card
          className="cursor-not-allowed opacity-60"
          title="Funcionalidad no implementada"
        >
          <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
            <div className="p-3 bg-muted rounded-lg mb-4">
              <Pencil className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Crear desde cero</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Empieza con un documento en blanco.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
