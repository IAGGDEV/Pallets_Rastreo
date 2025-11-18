import { Phone, Mail } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-pallets-yellow border-b-4 border-pallets-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo de Paquetería 5 Estrellas */}
          <div className="flex items-center">
            <img 
              src="/images/logo-paqueteria-5-estrellas.png" 
              alt="Paquetería 5 Estrellas" 
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>

          {/* Información de Contacto */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+525512345678" 
              className="flex items-center text-pallets-black hover:text-pallets-black/80 transition-colors bg-pallets-black/10 px-3 py-1.5 rounded-lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">+52 55 1234 5678</span>
            </a>
            <a 
              href="mailto:contacto@paqueteria5estrellas.com" 
              className="flex items-center text-pallets-black hover:text-pallets-black/80 transition-colors bg-pallets-black/10 px-3 py-1.5 rounded-lg"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">contacto@paqueteria5estrellas.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

