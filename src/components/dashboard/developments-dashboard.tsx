"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentoEstado } from "@/lib/types";

interface DevelopmentsDashboardProps {
  onNewDevelopment: () => void;
  children: React.ReactNode;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: DocumentoEstado | "Todos";
  onStatusChange: (status: DocumentoEstado | "Todos") => void;
}

export default function DevelopmentsDashboard({ 
  onNewDevelopment, 
  children,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: DevelopmentsDashboardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="text-2xl font-bold">Gestión de desarrollos</CardTitle>
                <CardDescription>Visualiza y gestiona todos tus desarrollos activos.</CardDescription>
            </div>
            {/* El prop onNewDevelopment se conecta directamente al onClick */}
            <Button onClick={onNewDevelopment}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Desarrollo
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Buscar por nombre o cliente..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-sm"
          />
          <Select value={statusFilter} onValueChange={(value) => onStatusChange(value as DocumentoEstado | "Todos")}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos los estados</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="En edición">En edición</SelectItem>
              <SelectItem value="Completado">Completado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
