"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DevelopmentsTable } from './developments-table';
import { mockDevelopments } from '@/lib/data';
import { NewDevelopmentModal } from '@/components/modals/new-development-modal';

export default function DevelopmentsDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Gestión de desarrollos
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Desarrollo
        </Button>
      </div>
      <DevelopmentsTable data={mockDevelopments} />
      <NewDevelopmentModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
