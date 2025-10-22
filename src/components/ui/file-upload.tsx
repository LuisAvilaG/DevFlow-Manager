"use client";

import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onChange: (files: File[]) => void;
  value: File[];
  accept?: string;
}

export function FileUpload({ onChange, value, accept = "application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document" }: FileUploadProps) {
  const onDrop = (acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    }
  });

  const removeFile = (fileToRemove: File) => {
    const newFiles = value.filter(file => file !== fileToRemove);
    onChange(newFiles);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`w-full p-6 border-2 border-dashed rounded-lg cursor-pointer text-center transition-colors
        ${isDragActive ? 'border-primary bg-secondary' : 'border-input hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <UploadCloud className="h-10 w-10" />
          {isDragActive ? (
            <p>Suelta los archivos aquí...</p>
          ) : (
            <p>Arrastra archivos aquí, o haz clic para seleccionar (PDF, DOCX)</p>
          )}
        </div>
      </div>
      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="font-medium text-sm">Archivos seleccionados:</p>
          <ul className="space-y-2">
            {value.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-2 rounded-md bg-secondary text-secondary-foreground">
                <div className="flex items-center gap-2">
                  <FileIcon className="h-5 w-5" />
                  <span className="text-sm">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="p-1 rounded-full hover:bg-destructive/20 text-destructive"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
