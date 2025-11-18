import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TrackingResults from './components/TrackingResults';
import Footer from './components/Footer';
import type { TrackingResponseFound } from './types/tracking';

function App() {
  // Datos mock para visualizar el segundo hero
  const [mockData] = useState<TrackingResponseFound>({
    success: true,
    tracking_number: '801868820503993',
    status_master: 'IN_TRANSIT',
    service_type: 'Día Sig.',
    estimated_delivery: '2024-12-15T18:00:00Z',
    receiver_name: 'SOE: ANGELINA',
    origin: 'Los Ángeles, California',
    destination: 'Ciudad de México',
    history: [
      {
        date: '2024-11-18T14:30:00Z',
        status: 'En tránsito hacia destino',
        location: 'Centro de Distribución Querétaro',
        note: 'El paquete se encuentra en ruta hacia la ciudad de destino'
      },
      {
        date: '2024-11-18T08:15:00Z',
        status: 'Paquete procesado en centro de clasificación',
        location: 'Hub Guadalajara',
        note: 'Clasificación completada y listo para envío'
      },
      {
        date: '2024-11-17T16:45:00Z',
        status: 'En tránsito nacional',
        location: 'Frontera Tijuana',
        note: 'Paquete cruzó la frontera exitosamente'
      },
      {
        date: '2024-11-17T09:00:00Z',
        status: 'En proceso de aduana',
        location: 'Aduana Tijuana',
        note: 'Documentación en revisión'
      },
      {
        date: '2024-11-16T12:00:00Z',
        status: 'Recibido por Paquetería Estrella',
        location: 'Los Ángeles, CA',
        note: 'Paquete recolectado y en proceso de envío internacional'
      }
    ]
  });

  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleTrack = async (numbers: string[]) => {
    // Por ahora no hace nada, solo para mantener la estructura
    console.log('Búsqueda de:', numbers);
    // TODO: Implementar búsqueda real más adelante
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Por ahora siempre mostramos HeroSection */}
        <HeroSection 
          onTrack={handleTrack} 
          isLoading={isLoading}
          error={error}
        />
        
        {/* Renderizar TrackingResults con mock data para ver el diseño */}
        <TrackingResults data={mockData} />
      </main>
      <Footer />
    </div>
  );
}

export default App;

