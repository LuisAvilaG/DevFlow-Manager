'use client';

import React from 'react';

interface HelpModalProps {
  htmlContent: string;
}

export function HelpModal({ htmlContent }: HelpModalProps) {
  return (
    <div className="w-full h-[80vh] bg-transparent">
      <iframe
        srcDoc={htmlContent}
        className="w-full h-full border-0 rounded-lg"
        title="Guía de Uso de la Aplicación"
      />
    </div>
  );
}
