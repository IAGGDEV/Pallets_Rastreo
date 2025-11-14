import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TrackingResults from './components/TrackingResults';
import Footer from './components/Footer';
import { searchTracking, type TrackingData } from './services/trackingService';

function App() {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (numbers: string[]) => {
    // Por ahora solo soportamos un número a la vez
    const trackingNumber = numbers[0];
    
    if (!trackingNumber) return;

    setIsLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      const response = await searchTracking(trackingNumber);

      if (response.success && response.data) {
        setTrackingData(response.data);
      } else {
        setError(response.message || 'No se encontró el número de rastreo');
      }
    } catch (err) {
      setError('Error al buscar el rastreo. Intenta nuevamente.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {!trackingData ? (
          <HeroSection 
            onTrack={handleTrack} 
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <TrackingResults data={trackingData} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

