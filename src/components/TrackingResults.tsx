import { useState } from 'react';
import { Package, Truck, MapPin, Home, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import type { TrackingResponseFound } from '../types/tracking';
import { STATUS_STEP_MAP, STEP_NAMES } from '../types/tracking';

interface TrackingResultsProps {
  data: TrackingResponseFound;
}

const TrackingResults = ({ data }: TrackingResultsProps) => {
  const [showHistory, setShowHistory] = useState(false);

  // Determinar el paso actual basado en status_master
  const currentStep = STATUS_STEP_MAP[data.status_master];

  // Formatear fecha en formato corto (DD/MM/YYYY)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  // Formatear fecha y hora completa
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Iconos para cada paso
  const stepIcons = [
    <Package className="w-8 h-8 md:w-10 md:h-10" />,
    <Truck className="w-8 h-8 md:w-10 md:h-10" />,
    <MapPin className="w-8 h-8 md:w-10 md:h-10" />,
    <Home className="w-8 h-8 md:w-10 md:h-10" />
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white">
      {/* Fondo hexagonal */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/background-hex.jpg)',
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Título Principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-pallets-black text-center mb-8">
          Sigue el estatus de tu envío
        </h2>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-pallets-yellow">
          {/* Información del Paquete */}
          <div className="p-6 md:p-8 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
              <div>
                <span className="text-pallets-gray">Número de guía: </span>
                <span className="font-bold text-pallets-black">{data.tracking_number}</span>
              </div>

              {data.service_type && (
                <>
                  <span className="text-gray-300">|</span>
                  <div>
                    <span className="text-pallets-gray">Servicio: </span>
                    <span className="font-bold text-pallets-black">{data.service_type}</span>
                  </div>
                </>
              )}

              {data.estimated_delivery && (
                <>
                  <span className="text-gray-300 hidden md:inline">|</span>
                  <div>
                    <span className="text-pallets-gray">Fecha programada de entrega: </span>
                    <span className="font-bold text-pallets-black">{formatDate(data.estimated_delivery)}</span>
                  </div>
                </>
              )}
            </div>

            {data.receiver_name && (
              <div className="mt-4">
                <span className="text-pallets-gray">Recibió: </span>
                <span className="font-bold text-pallets-black">{data.receiver_name}</span>
              </div>
            )}
          </div>

          {/* Barra de Progreso con 4 Pasos */}
          <div className="p-6 md:p-8 bg-gray-50">
            <div className="relative">
              {/* Línea de conexión */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 hidden md:block" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 transition-all duration-500 hidden md:block"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />

              {/* Pasos */}
              <div className="relative grid grid-cols-4 gap-2 md:gap-4">
                {STEP_NAMES.map((stepName, index) => {
                  const stepNumber = index + 1;
                  const isCurrent = stepNumber === currentStep;
                  const isActive = stepNumber <= currentStep;

                  return (
                    <div key={index} className="flex flex-col items-center">
                      {/* Círculo con icono */}
                      <div
                        className={`
                          relative z-10 rounded-full p-4 md:p-6 transition-all duration-300
                          ${isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}
                          ${isCurrent ? 'ring-4 ring-green-200 scale-110' : ''}
                        `}
                      >
                        {stepIcons[index]}
                      </div>

                      {/* Línea vertical móvil */}
                      {index < 3 && (
                        <div className="md:hidden w-0.5 h-8 my-2 bg-gray-200" />
                      )}

                      {/* Texto del paso */}
                      <p
                        className={`
                          mt-3 text-center text-xs md:text-sm font-semibold px-1
                          ${isActive ? 'text-pallets-black' : 'text-gray-400'}
                        `}
                      >
                        {stepName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Botón Ver Historia */}
          <div className="p-6 md:p-8 border-t border-gray-200">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-pallets-yellow hover:bg-pallets-black hover:text-white text-pallets-black font-bold rounded-xl transition-all duration-200 shadow-md"
            >
              {showHistory ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Ocultar Historia
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  Ver Historia
                </>
              )}
            </button>
          </div>

          {/* Timeline de Historia (colapsable) */}
          {showHistory && (
            <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200">
              <h3 className="text-xl font-bold text-pallets-black mb-6">Historial de Rastreo</h3>

              <div className="space-y-4">
                {data.history.map((event, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-pallets-yellow"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icono de reloj */}
                      <div className="flex-shrink-0 w-10 h-10 bg-pallets-yellow rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>

                      {/* Contenido */}
                      <div className="flex-1">
                        <p className="font-bold text-pallets-black">{event.status}</p>

                        {event.location && (
                          <p className="text-sm text-pallets-gray mt-1">
                            📍 {event.location}
                          </p>
                        )}

                        {event.note && (
                          <p className="text-sm text-pallets-gray mt-1">{event.note}</p>
                        )}

                        <p className="text-xs text-gray-400 mt-2">
                          {formatDateTime(event.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botón para nueva búsqueda */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.location.reload()}
            className="bg-white hover:bg-pallets-yellow text-pallets-black font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg border-2 border-pallets-yellow"
          >
            Nueva Consulta
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingResults;

