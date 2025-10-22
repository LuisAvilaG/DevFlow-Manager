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
import type { Development } from "@/lib/types";

interface DevelopmentsTableProps {
  data: Development[];
}

export function DevelopmentsTable({ data }: DevelopmentsTableProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nombre de desarrollo</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead>Nombre del cliente</TableHead>
            <TableHead>Horas estimadas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((dev) => (
            <TableRow key={dev.id}>
              <TableCell className="font-medium text-muted-foreground">{dev.id}</TableCell>
              <TableCell className="font-semibold">{dev.name}</TableCell>
              <TableCell>{dev.creationDate}</TableCell>
              <TableCell>{dev.clientName}</TableCell>
              <TableCell>{dev.estimatedHours}h</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                   <Badge variant="outline" className="cursor-pointer">DED</Badge>
                   <Badge variant="outline" className="cursor-pointer">Arquitectura</Badge>
                   <Badge variant="outline" className="cursor-pointer">QA</Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
