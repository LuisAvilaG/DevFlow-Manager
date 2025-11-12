"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { useSettings, Settings } from "@/hooks/use-settings"

// ¡CORREGIDO! Se asegura de que el esquema coincida con el tipo Settings
// y se proveen valores por defecto para que no haya 'undefined'.
const settingsSchema = z.object({
  n8nHtmlGenerationWebhook: z.string().url({ message: "Por favor, introduce una URL válida." }).default(''),
  n8nSaveHtmlWebhook: z.string().url({ message: "Por favor, introduce una URL válida." }).default(''),
  clickUpApiKey: z.string().optional().default(''),
})

export function SettingsForm() {
  const { settings, setSettings } = useSettings()

  const form = useForm<Settings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  })

  function onSubmit(data: Settings) {
    setSettings(data)
    toast({
      title: "Configuración guardada",
      description: "Tus cambios han sido guardados en el almacenamiento local.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="n8nHtmlGenerationWebhook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook de Generación HTML</FormLabel>
              <FormControl>
                <Input placeholder="https://tu-instancia.n8n.cloud/webhook/..." {...field} />
              </FormControl>
              <FormDescription>
                El endpoint de n8n para generar contenido HTML.
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
              <FormLabel>Webhook de Guardado HTML</FormLabel>
              <FormControl>
                <Input placeholder="https://tu-instancia.n8n.cloud/webhook/..." {...field} />
              </FormControl>
              <FormDescription>
                El endpoint de n8n para guardar el contenido HTML generado.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clickUpApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key de ClickUp (Opcional)</FormLabel>
              <FormControl>
                <Input type="password" placeholder="pk_12345678_..." {...field} />
              </FormControl>
              <FormDescription>
                Tu clave de API de ClickUp para integraciones.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Form>
  )
}
