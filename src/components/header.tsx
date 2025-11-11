"use client";

import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";

interface HeaderProps {
  onHelpClick: () => void;
  // ¡CORREGIDO! Se añade '?' para hacer la propiedad opcional.
  onQuickTest?: () => void; 
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
        </div>
      </div>
    </header>
  );
}
