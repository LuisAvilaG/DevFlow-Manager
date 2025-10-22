"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SelectDevType } from './select-dev-type';
import { CreateFromDEDForm } from './create-from-ded-form';
import { DocumentEditor } from './document-editor';

type ModalStep = 'selectType' | 'createFromDED' | 'editDocument';

interface NewDevelopmentModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function NewDevelopmentModal({ isOpen, onOpenChange }: NewDevelopmentModalProps) {
  const [step, setStep] = useState<ModalStep>('selectType');
  const [htmlContent, setHtmlContent] = useState('');
  const [developmentId, setDevelopmentId] = useState<string | null>(null);

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Reset state on close with a delay for the animation
      setTimeout(() => {
        setStep('selectType');
        setHtmlContent('');
        setDevelopmentId(null);
      }, 300);
    }
  };
  
  const handleSelectDED = () => {
    setStep('createFromDED');
  };

  const handleCreateFromDEDSuccess = (html: string, id: string) => {
    setHtmlContent(html);
    setDevelopmentId(id);
    setStep('editDocument');
  };
  
  const handleEditorClose = () => {
    handleClose(false);
  }

  const renderStep = () => {
    switch (step) {
      case 'selectType':
        return <SelectDevType onSelectDED={handleSelectDED} />;
      case 'createFromDED':
        return <CreateFromDEDForm onSuccess={handleCreateFromDEDSuccess} />;
      default:
        return null;
    }
  };
  
  if (step === 'editDocument') {
      return (
        <DocumentEditor 
          htmlContent={htmlContent} 
          developmentId={developmentId}
          isOpen={true}
          onClose={handleEditorClose}
        />
      );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
