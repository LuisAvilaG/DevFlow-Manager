import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Settings, HelpCircle } from 'lucide-react'; // Importar el icono de ayuda
import { Logo } from './logo';

interface HeaderProps {
  onHelpClick: () => void; // Prop para manejar el clic en el botón de ayuda
  onQuickTest: () => void; // Mantener la prop existente
}

export default function Header({ onHelpClick, onQuickTest }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold sm:inline-block">
              DevFlow Manager
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* El botón de Prueba Rápida se puede eliminar si ya no es necesario */}
          {/* <Button variant="outline" size="sm" onClick={onQuickTest}>...</Button> */}
          
          <Button variant="ghost" size="icon" aria-label="Help" onClick={onHelpClick}>
            <HelpCircle className="h-5 w-5" />
          </Button>

          <Link href="/settings" passHref>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
