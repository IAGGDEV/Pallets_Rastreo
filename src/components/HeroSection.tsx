import { useState } from 'react';
import { Search, Package } from 'lucide-react';

interface HeroSectionProps {
  onTrack: (numbers: string[]) => void;
}

const HeroSection = ({ onTrack }: HeroSectionProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    setIsLoading(true);
    
    // Separar múltiples números por comas
    const numbers = inputValue
      .split(',')
      .map(num => num.trim())
      .filter(num => num.length > 0);
    
    // Simular búsqueda
    setTimeout(() => {
      onTrack(numbers);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-12 h-12 text-pallets-yellow" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-pallets-black mb-4">
            Rastreo y seguimiento
          </h2>
          <p className="text-lg md:text-xl text-pallets-gray max-w-2xl mx-auto">
            Rastrea tu paquete de Los Ángeles a México en tiempo real
          </p>
        </div>
      </div>

      {/* Tracking Form Section - Estilo DHL */}
      <div className="bg-pallets-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Field */}
              <div>
                <label 
                  htmlFor="tracking-input" 
                  className="block text-sm font-semibold text-pallets-black mb-3"
                >
                  Ingresar el o los números de rastreo.
                </label>
                <div className="relative">
                  <input
                    id="tracking-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ejemplo: PP-12345, PP-67890"
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-pallets-yellow focus:ring-2 focus:ring-pallets-yellow/20 outline-none transition-all text-lg"
                    disabled={isLoading}
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <p className="mt-2 text-sm text-pallets-gray">
                  Puedes ingresar varios números separados por comas
                </p>
              </div>

              {/* Submit Button - Estilo DHL (rojo) */}
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-12 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg text-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Buscando...
                  </span>
                ) : (
                  'Rastrear'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-pallets-black mb-8">
          Preguntas Frecuentes
        </h3>
        
        <div className="space-y-4">
          <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer group">
            <summary className="font-semibold text-pallets-black text-lg list-none flex items-center justify-between">
              ¿Qué Es un Número de Rastreo y Dónde Puedo Encontrarlo?
              <span className="text-pallets-yellow text-2xl group-open:rotate-180 transition-transform">
                ⌄
              </span>
            </summary>
            <p className="mt-4 text-pallets-gray leading-relaxed">
              Tu número de rastreo es un código único que comienza con "PP-" seguido de números. 
              Lo encontrarás en tu comprobante de envío o en el correo de confirmación que te enviamos.
            </p>
          </details>

          <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer group">
            <summary className="font-semibold text-pallets-black text-lg list-none flex items-center justify-between">
              ¿Cuándo estará disponible la información de rastreo de mi envío?
              <span className="text-pallets-yellow text-2xl group-open:rotate-180 transition-transform">
                ⌄
              </span>
            </summary>
            <p className="mt-4 text-pallets-gray leading-relaxed">
              La información de rastreo estará disponible dentro de las 24 horas posteriores 
              a la recolección de tu paquete. Los datos se actualizan cada vez que tu envío 
              pasa por un punto de control.
            </p>
          </details>

          <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer group">
            <summary className="font-semibold text-pallets-black text-lg list-none flex items-center justify-between">
              ¿Por qué no funciona mi número o ID de rastreo?
              <span className="text-pallets-yellow text-2xl group-open:rotate-180 transition-transform">
                ⌄
              </span>
            </summary>
            <p className="mt-4 text-pallets-gray leading-relaxed">
              Si tu número de rastreo no funciona, verifica que esté escrito correctamente. 
              Si el problema persiste, puede que la información aún no esté disponible (espera 24 horas) 
              o contacta a nuestro equipo de soporte para ayudarte.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

