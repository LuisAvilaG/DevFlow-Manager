"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSettings, type Settings } from "@/hooks/use-settings";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const settingsSchema = z.object({
  clickUpApiKey: z.string().optional(),
  n8nHtmlGenerationWebhook: z.string().url("Debe ser una URL válida."),
  n8nSaveHtmlWebhook: z.string().url("Debe ser una URL válida."),
});

export function SettingsForm() {
  const [settings, setSettings] = useSettings();
  const { toast } = useToast();

  const form = useForm<Settings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  function onSubmit(data: Settings) {
    setSettings(data);
    toast({
      title: "Configuración guardada",
      description: "Tus cambios han sido guardados en el almacenamiento local.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Conexiones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="clickUpApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clave de API de ClickUp</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••••••••••" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tu clave de API para interactuar con ClickUp.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="n8nHtmlGenerationWebhook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webhook de n8n (Generación HTML)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://n8n.example.com/..." {...field} />
                  </FormControl>
                   <FormDescription>
                    URL del webhook para generar el documento HTML.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="n8nSaveHtmlWebhook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webhook de n8n (Guardar HTML)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://n8n.example.com/..." {...field} />
                  </FormControl>
                   <FormDescription>
                    URL del webhook para enviar el HTML final.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Guardar Cambios</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
