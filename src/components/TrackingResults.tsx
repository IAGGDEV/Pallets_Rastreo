import { CheckCircle, Clock, Package, MapPin, Calendar, ExternalLink } from 'lucide-react';
import type { TrackingData } from '../services/trackingService';

interface TrackingResultsProps {
  data: TrackingData;
}

const TrackingResults = ({ data }: TrackingResultsProps) => {
  // Determinar qué estados están completados
  const getStatusIcon = (status: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    return <Clock className="w-6 h-6 text-gray-400" />;
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header de Resultados */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-pallets-yellow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-pallets-black mb-2">
              Rastreo: {data.trackingNumber}
            </h2>
            {data.customerName && (
              <p className="text-pallets-gray">
                Cliente: <span className="font-semibold">{data.customerName}</span>
              </p>
            )}
          </div>
          <Package className="w-16 h-16 text-pallets-yellow" />
        </div>

        {/* Estado Actual */}
        <div className="bg-pallets-light rounded-xl p-6 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pallets-gray mb-1">Estado Actual</p>
              <p className="text-2xl font-bold text-pallets-black">{data.currentStatus}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-pallets-gray mb-1">Última Actualización</p>
              <p className="text-sm font-semibold text-pallets-black">
                {formatDate(data.lastUpdate)}
              </p>
            </div>
          </div>
        </div>

        {/* Fecha Estimada de Entrega */}
        {data.estimatedDelivery && (
          <div className="flex items-center text-pallets-gray mb-4">
            <Calendar className="w-5 h-5 mr-2" />
            <span>
              Entrega estimada: <span className="font-semibold">{formatDate(data.estimatedDelivery)}</span>
            </span>
          </div>
        )}

        {/* Link Externo */}
        {data.externalTrackingLink && (
          <a
            href={data.externalTrackingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-pallets-yellow hover:text-pallets-black transition-colors font-semibold"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Rastrear en paquetería local
          </a>
        )}
      </div>

      {/* Timeline de Estados */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-pallets-black mb-6">Historial de Rastreo</h3>

        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Estados */}
          <div className="space-y-6">
            {data.statusHistory.map((item, index) => {
              const isCompleted = index === 0; // El más reciente está completado
              const isCurrent = index === 0;

              return (
                <div key={index} className="relative flex items-start">
                  {/* Icono */}
                  <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                    isCurrent 
                      ? 'bg-pallets-yellow ring-4 ring-pallets-yellow/20' 
                      : isCompleted
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Clock className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Contenido */}
                  <div className={`ml-6 flex-1 pb-6 ${isCurrent ? 'bg-pallets-light rounded-xl p-4 -mt-2' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`font-bold ${isCurrent ? 'text-pallets-black text-lg' : 'text-gray-700'}`}>
                          {item.status}
                        </p>
                        {item.location && (
                          <div className="flex items-center text-sm text-pallets-gray mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {item.location}
                          </div>
                        )}
                        {item.note && (
                          <p className="text-sm text-pallets-gray mt-2">{item.note}</p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-pallets-gray">{formatDate(item.date)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botón para nueva búsqueda */}
      <div className="text-center mt-8">
        <button
          onClick={() => window.location.reload()}
          className="bg-pallets-yellow hover:bg-pallets-black hover:text-white text-pallets-black font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Buscar otro paquete
        </button>
      </div>
    </div>
  );
};

export default TrackingResults;

