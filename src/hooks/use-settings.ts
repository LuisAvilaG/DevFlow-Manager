"use client"

import { useLocalStorage } from "@/hooks/use-local-storage"

export interface Settings {
  n8nHtmlGenerationWebhook: string
  n8nSaveHtmlWebhook: string
  clickUpApiKey: string
}

const defaultSettings: Settings = {
  n8nHtmlGenerationWebhook: "",
  n8nSaveHtmlWebhook: "",
  clickUpApiKey: "",
}

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>(
    "devflow-settings",
    defaultSettings
  )

  // ¡CORREGIDO! Nos aseguramos de que los valores nunca sean 'undefined'.
  const mergedSettings = {
    ...defaultSettings,
    ...settings,
  }

  return {
    settings: mergedSettings,
    setSettings,
  }
}
