import Header from "@/components/header";
import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-2xl">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Configuración</h1>
            <p className="text-muted-foreground">
              Administra las claves de API y las URL de los webhooks.
            </p>
          </div>
          <SettingsForm />
        </div>
      </main>
    </div>
  )
}
