/**
 * Tipos para el sistema de rastreo
 * Basado en la API de rastreo de paquetería
 */

// Estado maestro del paquete
export type StatusMaster = 
  | 'RECEIVED'        // Recibido por paquetería
  | 'IN_TRANSIT'      // En tránsito
  | 'OUT_FOR_DELIVERY' // En proceso de entrega
  | 'DELIVERED';      // Entregado

// Evento individual en el historial
export interface TrackingEvent {
  date: string;           // ISO 8601 format
  status: string;         // Descripción del estado
  location?: string;      // Ubicación del evento
  note?: string;          // Nota adicional
}

// Datos del paquete encontrado
export interface TrackingResponseFound {
  success: true;
  tracking_number: string;
  status_master: StatusMaster;
  service_type?: string;        // Ej: "Día Sig."
  estimated_delivery?: string;  // ISO 8601 format
  receiver_name?: string;       // Nombre del receptor
  origin?: string;
  destination?: string;
  history: TrackingEvent[];     // Ordenado del más reciente al más antiguo
}

// Respuesta cuando no se encuentra el paquete
export interface TrackingResponseNotFound {
  success: false;
  error: string;
  message: string;
}

// Union type de las respuestas
export type TrackingResponse = TrackingResponseFound | TrackingResponseNotFound;

// Mapeo de status_master a pasos visuales
export const STATUS_STEP_MAP: Record<StatusMaster, number> = {
  'RECEIVED': 1,
  'IN_TRANSIT': 2,
  'OUT_FOR_DELIVERY': 3,
  'DELIVERED': 4
};

// Nombres de los pasos para mostrar en UI
export const STEP_NAMES = [
  'Recibido por Paquetería Estrella',
  'En tránsito',
  'En proceso de entrega a domicilio',
  'Entregado'
];

