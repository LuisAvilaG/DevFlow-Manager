"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import { mockClients } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileUpload } from "../ui/file-upload";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido."),
  cliente: z.string().min(1, "Debes seleccionar un cliente."),
  archivos: z.array(z.instanceof(File)).min(1, "Debes subir al menos un archivo."),
});

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        resolve(base64String);
    };
    reader.onerror = error => reject(error);
});


interface CreateFromDEDFormProps {
  onSuccess: (html: string, id: string) => void;
}

export function CreateFromDEDForm({ onSuccess }: CreateFromDEDFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      cliente: "",
      archivos: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const archivosBase64 = await Promise.all(values.archivos.map(toBase64));

      const payload = {
        nombre: values.nombre,
        cliente: values.cliente,
        archivos: archivosBase64,
      };
      
      const webhookUrl = "https://n8n.dinamicsw.site/webhook/crear-desarrollo";

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error al conectar con el backend: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.id || !result.html_output) {
        throw new Error("La respuesta del backend no tiene el formato esperado (debe contener 'id' y 'html_output').");
      }

      onSuccess(result.html_output, String(result.id));

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Ha ocurrido un error inesperado al crear el desarrollo.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Crear desarrollo a partir de DED</DialogTitle>
      </DialogHeader>
      <div className="py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="nombre" render={({ field }) => (<FormItem><FormLabel>Nombre del desarrollo</FormLabel><FormControl><Input placeholder="Ej: Nuevo módulo de facturación" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="cliente" render={({ field }) => (<FormItem><FormLabel>Cliente</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecciona un cliente" /></SelectTrigger></FormControl><SelectContent>{mockClients.map((client) => (<SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="archivos" render={({ field }) => (<FormItem><FormLabel>Archivos DED</FormLabel><FormControl><FileUpload value={field.value} onChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generar y Crear Desarrollo
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
