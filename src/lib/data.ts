import { Desarrollo, Cliente } from "./types";

// Contenido del documento de arquitectura técnica (DAT) en formato Markdown.
const datMarkdownContent = `# Documento de Arquitectura Técnica

**Cliente:** <Cliente>  
**Fecha:** 26/10/2025  
**Versión:** 1.0  
**Arquitecto:** Be Exponential  
**Tipo de Desarrollo:** SuiteScript / NetSuite  
**Módulo:** General

---

## 1. Descripción Técnica del Alcance
El proyecto tiene como objetivo implementar una solución en NetSuite que prevenga la duplicidad de ítems en transacciones de Órdenes de Venta y Facturas de Venta. Esto se logrará mediante la integración de varios scripts en SuiteScript 2.1: un User Event Script que validará las transacciones en el lado del servidor, un Client Script para proporcionar feedback en tiempo real al usuario durante la entrada de datos, y un Suitelet para manejar integraciones complejas y procesamiento de datos. La consolidación automática de líneas duplicadas se gestionará eficientemente en el User Event Script, mejorando la integridad de datos y optimizando la experiencia del usuario. Se seguirán buenas prácticas de arquitectura orientada a servicios, asegurando que el flujo entre los componentes sea robusto y escalable.

---

## 2. Componentes del Desarrollo
| tipo | nombreArchivo | modulo | proposito |
| --- | --- | --- | --- |
| User Event Script | validateDuplicateItems.js | N/record | Valida transacciones en el lado del servidor para prevenir duplicidades en Órdenes de Venta y Facturas de Venta, bloqueando el guardado y consolidando líneas en integraciones. |
| Client Script | realTimeValidation.js | N/ui/message | Mejora la experiencia del usuario proporcionando validaciones en tiempo real al momento de la entrada de datos en la interfaz de usuario. |
| Suitelet | integrationHandlerSuitelet.js | N/ui/serverWidget | Facilita la integración con sistemas externos, manejando lógicas de consolidación y procesamiento de datos sin sobrecargar los scripts del cliente. |
`;

// Codificamos el contenido a Base64 para simular cómo vendrá del backend.
const encodedDatContent = btoa(unescape(encodeURIComponent(datMarkdownContent)));


export const mockClients: Cliente[] = [
  { id: "1", name: "TiendaTech" },
  { id: "2", name: "Analyticorp" },
  { id: "3", name: "FinanzasGlobal" },
  { id: "4", name: "UX Masters" },
  { id: "5", name: "DataSolutions" },
];

export const mockDevelopments: Desarrollo[] = [
  {
    id: "DEV-001",
    nombre: "Implementación de nuevo checkout",
    fechaCreacion: "2023-10-26",
    cliente: "TiendaTech",
    horasEstimadas: "40h",
    documentos: [
      { tipo: "DED", estado: "Completado", contenidoHtml: "<h1>Contenido DED</h1>" },
      { tipo: "QA", estado: "En edición", contenidoHtml: "<h1>Contenido QA</h1>" },
      { tipo: "Riesgos", estado: "Pendiente", contenidoHtml: null },
      { tipo: "DAT", estado: "Pendiente", contenidoHtml: null },
    ],
  },
  {
    id: "DEV-002",
    nombre: "Módulo de reportes de ventas",
    fechaCreacion: "2023-10-22",
    cliente: "Analyticorp",
    horasEstimadas: "80h",
    documentos: [
      { tipo: "DED", estado: "Completado", contenidoHtml: "<h1>Contenido DED</h1>" },
      { tipo: "QA", estado: "Completado", contenidoHtml: "<h1>Contenido QA</h1>" },
      { tipo: "Riesgos", estado: "Completado", contenidoHtml: "<h1>Contenido Riesgos</h1>" },
      { tipo: "DAT", estado: "En edición", contenidoHtml: encodedDatContent },
    ],
  },
  {
    id: "DEV-003",
    nombre: "Integración con API de pagos",
    fechaCreacion: "2023-09-15",
    cliente: "FinanzasGlobal",
    horasEstimadas: "65h",
    documentos: [
      { tipo: "DED", estado: "Completado", contenidoHtml: "<h1>Contenido DED</h1>" },
      { tipo: "QA", estado: "Pendiente", contenidoHtml: null },
      { tipo: "Riesgos", estado: "Pendiente", contenidoHtml: null },
      { tipo: "DAT", estado: "Pendiente", contenidoHtml: null },
    ],
  },
  {
    id: "DEV-004",
    nombre: "Rediseño del panel de usuario",
    fechaCreacion: "2023-09-01",
    cliente: "UX Masters",
    horasEstimadas: "120h",
    documentos: [
      { tipo: "DED", estado: "En edición", contenidoHtml: "<h1>Contenido DED</h1>" },
      { tipo: "QA", estado: "Pendiente", contenidoHtml: null },
      { tipo: "Riesgos", estado: "Pendiente", contenidoHtml: null },
      { tipo: "DAT", estado: "Pendiente", contenidoHtml: null },
    ],
  },
  {
    id: "DEV-005",
    nombre: "Optimización de base de datos",
    fechaCreacion: "2023-08-18",
    cliente: "DataSolutions",
    horasEstimadas: "20h",
    documentos: [
        { tipo: "DED", estado: "Completado", contenidoHtml: "<h1>Contenido DED</h1>" },
        { tipo: "QA", estado: "Completado", contenidoHtml: "<h1>Contenido QA</h1>" },
        { tipo: "Riesgos", estado: "Pendiente", contenidoHtml: null },
        { tipo: "DAT", estado: "Pendiente", contenidoHtml: null },
    ],
  },
];
