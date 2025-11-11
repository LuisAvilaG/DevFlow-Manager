"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Desarrollo, Documento, DocumentoEstado, DocumentoTipo } from "@/lib/types";
import { PlayCircle } from 'lucide-react';

// --- Helper Components ---

const StatusBadge = ({ estado, onClick }: { estado: DocumentoEstado, onClick: () => void }) => {
  const variant = {
    "Pendiente": "outline",
    "En edición": "secondary",
    "Completado": "default",
  }[estado] as "outline" | "secondary" | "default";

  return (
    <Badge 
      variant={variant} 
      onClick={onClick}
      className="cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-1 transition-all"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      {estado}
    </Badge>
  );
};

// --- Main Table Component ---

interface DevelopmentsTableProps {
  data: Desarrollo[];
  onActionClick: (desarrolloId: string, documento: Documento) => void;
}

export function DevelopmentsTable({ data, onActionClick }: DevelopmentsTableProps) {
  
  const documentOrder: DocumentoTipo[] = ["DED", "QA", "Riesgos", "DAT"];

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Desarrollo</TableHead>
            <TableHead>Cliente</TableHead>
            {documentOrder.map(docType => (
              <TableHead key={docType} className="text-center">{docType}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={documentOrder.length + 2} className="h-24 text-center">
                No se encontraron desarrollos.
              </TableCell>
            </TableRow>
          ) : (
            data.map((desarrollo) => (
              <TableRow key={desarrollo.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{desarrollo.nombre}</div>
                    <div className="text-xs text-muted-foreground">ID: {desarrollo.id}</div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{desarrollo.cliente}</TableCell>
                
                {documentOrder.map(docType => {
                  // ¡CORREGIDO! Se elimina la comprobación '|| (docType === 'DAT' && d.tipo === 'Arquitectura')'
                  const documento = desarrollo.documentos.find(d => d.tipo === docType);
                  return (
                    <TableCell key={docType} className="text-center">
                      {documento ? (
                        <div className="flex flex-col items-center justify-center">
                          {documento.estado === 'Pendiente' ? (
                            <Button variant="outline" size="sm" onClick={() => onActionClick(desarrollo.id, documento)} className="flex items-center gap-2">
                              <PlayCircle className="h-4 w-4" />
                              <span>Iniciar</span>
                            </Button>
                          ) : (
                            <StatusBadge estado={documento.estado} onClick={() => onActionClick(desarrollo.id, documento)} />
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
