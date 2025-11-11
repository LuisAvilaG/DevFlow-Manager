"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Desarrollo, Documento, DocumentoTipo, DocumentoEstado } from "@/lib/types";
import { FilePen, PlusCircle, Eye } from "lucide-react";

type DevelopmentsTableProps = {
  data: Desarrollo[];
  onActionClick: (desarrolloId: string, documento: Documento) => void;
};

const getDocumentBadgeClasses = (doc: Documento): string => {
  const baseClasses = "capitalize font-semibold border text-xs";
  const stateColorClasses: Record<DocumentoEstado, string> = {
    "Pendiente": "bg-gray-100 text-gray-800 border-gray-200 border-dashed",
    "En edición": "bg-blue-100 text-blue-800 border-blue-200",
    "Completado": "bg-green-100 text-green-800 border-green-200",
  };
  return `${baseClasses} ${stateColorClasses[doc.estado]}`;
};

export function DevelopmentsTable({ data, onActionClick }: DevelopmentsTableProps) {
  return (
    <TooltipProvider>
      <div className="border-t">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nombre del desarrollo</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Documentos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((dev) => {
              const dedDoc = dev.documentos.find(d => d.tipo === 'DED');
              const qaDoc = dev.documentos.find(d => d.tipo === 'QA');
              const riesgosDoc = dev.documentos.find(d => d.tipo === 'Riesgos');
              const datDoc = dev.documentos.find(d => d.tipo === 'DAT' || d.tipo === 'Arquitectura') 
                           || { tipo: 'DAT', estado: 'Pendiente', contenidoHtml: null };

              const isDatReady = dedDoc?.estado === 'Completado' && qaDoc?.estado === 'Completado' && riesgosDoc?.estado === 'Completado';

              return (
                <TableRow key={dev.id}>
                  <TableCell className="font-medium text-muted-foreground">{dev.id}</TableCell>
                  <TableCell className="font-semibold">{dev.nombre}</TableCell>
                  <TableCell>{dev.cliente}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {dev.documentos.map((doc) => (
                        <Badge key={doc.tipo} className={getDocumentBadgeClasses(doc)}>
                          {doc.tipo === 'Arquitectura' ? 'DAT' : doc.tipo}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => onActionClick(dev.id, dedDoc!)}><FilePen className="mr-2 h-4 w-4" /> DED</Button>
                      <Button size="sm" variant="outline" onClick={() => onActionClick(dev.id, qaDoc!)}><FilePen className="mr-2 h-4 w-4" /> QA</Button>
                      <Button size="sm" variant="outline" onClick={() => onActionClick(dev.id, riesgosDoc!)}><FilePen className="mr-2 h-4 w-4" /> Riesgos</Button>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-block">
                            <Button
                              size="sm"
                              variant="default"
                              className="w-32" // Ancho fijo para el botón
                              disabled={!isDatReady && datDoc.estado === 'Pendiente'}
                              onClick={() => onActionClick(dev.id, datDoc)}
                            >
                              {datDoc.estado === 'Pendiente' ? <PlusCircle className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                              {datDoc.estado === 'Pendiente' ? 'Crear DAT' : 'Ver DAT'}
                            </Button>
                          </div>
                        </TooltipTrigger>
                        {!isDatReady && datDoc.estado === 'Pendiente' && (
                          <TooltipContent>
                            <p>Completa DED, QA y Riesgos para crear el DAT.</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
