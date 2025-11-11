// Definición de los tipos de documentos y sus estados posibles.
export type DocumentoEstado = "Pendiente" | "En edición" | "Completado";
export type DocumentoTipo = "DED" | "QA" | "Riesgos" | "DAT"; // "Arquitectura" ha sido renombrado a "DAT"

/**
 * Representa un único documento dentro de un desarrollo.
 * Cada documento tiene un tipo, un estado y su contenido.
 */
export interface Documento {
  tipo: DocumentoTipo;
  estado: DocumentoEstado;
  contenidoHtml: string | null; // Para DAT, este campo contendrá Markdown
}

/**
 * Representa un desarrollo completo, que agrupa varios documentos
 * y contiene la información general del proyecto.
 * ¡CORREGIDO! Se eliminó la propiedad 'estado', ya que el estado se gestiona a nivel de Documento.
 */
export interface Desarrollo {
  id: string;
  nombre: string;
  fechaCreacion: string;
  cliente: string;
  horasEstimadas: string;
  documentos: Documento[];
}

/**
 * Representa un cliente, utilizado en los formularios de creación.
 */
export interface Cliente {
    id: string;
    name: string;
}
