import { Phone, Mail } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-pallets-yellow border-b-4 border-pallets-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo y Nombre */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {/* Logo simulado - se reemplazará con la imagen real */}
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-pallets-black font-bold text-2xl">PP</div>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl md:text-3xl font-bold text-pallets-black">
                  PALLETS PREMIUM
                </h1>
                <p className="text-sm text-pallets-black/80 font-medium">
                  Tu envío seguro de LA a México
                </p>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="hidden md:flex flex-col items-end space-y-1">
            <a 
              href="tel:+1234567890" 
              className="flex items-center text-pallets-black hover:text-pallets-black/80 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">+1 (234) 567-890</span>
            </a>
            <a 
              href="mailto:contacto@palletspremium.com" 
              className="flex items-center text-pallets-black hover:text-pallets-black/80 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">contacto@palletspremium.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

