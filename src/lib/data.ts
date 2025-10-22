import type { Development, Client } from './types';

export const mockDevelopments: Development[] = [
  {
    id: 'DEV-001',
    name: 'Implementación de nuevo checkout',
    creationDate: '2023-10-26',
    clientName: 'TiendaTech',
    estimatedHours: 40,
  },
  {
    id: 'DEV-002',
    name: 'Módulo de reportes de ventas',
    creationDate: '2023-10-22',
    clientName: 'Analyticorp',
    estimatedHours: 80,
  },
  {
    id: 'DEV-003',
    name: 'Integración con API de pagos',
    creationDate: '2023-09-15',
    clientName: 'FinanzasGlobal',
    estimatedHours: 65,
  },
  {
    id: 'DEV-004',
    name: 'Rediseño del panel de usuario',
    creationDate: '2023-09-01',
    clientName: 'UX Masters',
    estimatedHours: 120,
  },
  {
    id: 'DEV-005',
    name: 'Optimización de base de datos',
    creationDate: '2023-08-18',
    clientName: 'DataSolutions',
    estimatedHours: 55,
  },
];

export const mockClients: Client[] = [
  { id: 'cli_1', name: 'TiendaTech' },
  { id: 'cli_2', name: 'Analyticorp' },
  { id: 'cli_3', name: 'FinanzasGlobal' },
  { id: 'cli_4', name: 'UX Masters' },
  { id: 'cli_5', name: 'DataSolutions' },
  { id: 'cli_6', name: 'InnovaSoft' },
];
