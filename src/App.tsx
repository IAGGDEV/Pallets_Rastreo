import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TrackingResults from './components/TrackingResults';
import Footer from './components/Footer';
import type { TrackingResponseFound } from './types/tracking';
import { searchTracking } from './services/trackingService';

function App() {
  const [data, setData] = useState<TrackingResponseFound | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (numbers: string[]) => {
    if (!numbers.length) {
      setError('Por favor ingresa un número de rastreo válido.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await searchTracking(numbers[0]);

      if (response.success) {
        setData(response as unknown as TrackingResponseFound);
      } else {
        setError(response.message || 'No se pudo encontrar el paquete.');
      }
    } catch (err) {
      setError('Hubo un error de conexión al buscar el envío.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {!data && (
          <HeroSection
            onTrack={handleTrack}
            isLoading={isLoading}
            error={error}
          />
        )}

        {data && <TrackingResults data={data} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

