import { useLocalStorage } from './use-local-storage';

export type Settings = {
  clickUpApiKey: string;
  n8nHtmlGenerationWebhook: string;
  n8nSaveHtmlWebhook: string;
};

const defaultSettings: Settings = {
  clickUpApiKey: '',
  n8nHtmlGenerationWebhook: 'https://n8n.dinamicsw.site/webhook-test/generar_html',
  n8nSaveHtmlWebhook: 'https://n8n.dinamicsw.site/webhook-test/guardar_html',
};

export function useSettings() {
  return useLocalStorage<Settings>('devflow-settings', defaultSettings);
}
