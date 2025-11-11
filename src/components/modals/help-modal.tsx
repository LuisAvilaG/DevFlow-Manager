'use client';

import React from 'react';

interface HelpModalProps {
  pdfUrl: string;
}

export function HelpModal({ pdfUrl }: HelpModalProps) {
  // Parámetros más robustos para visores de PDF:
  // #toolbar=0 oculta la barra de herramientas superior.
  // #navpanes=0 oculta el panel lateral de miniaturas.
  const urlWithParams = `${pdfUrl}#toolbar=0&navpanes=0`;

  return (
    <div className="w-full h-[80vh] bg-gray-800 rounded-lg overflow-hidden">
      {/* ¡CORREGIDO! Usamos <embed> en lugar de <iframe> para un mejor control. */}
      <embed
        src={urlWithParams}
        type="application/pdf"
        className="w-full h-full border-0"
        title="Guía de Uso de la Aplicación (PDF)"
      />
    </div>
  );
}
