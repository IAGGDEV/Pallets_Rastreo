import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pallets-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de Contacto */}
          <div>
            <h3 className="text-xl font-bold text-pallets-yellow mb-4">
              Contacto
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+1234567890" 
                className="flex items-center hover:text-pallets-yellow transition-colors"
              >
                <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>+1 (234) 567-890</span>
              </a>
              <a 
                href="mailto:contacto@palletspremium.com" 
                className="flex items-center hover:text-pallets-yellow transition-colors"
              >
                <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>contacto@palletspremium.com</span>
              </a>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                <span>Los Ángeles, California<br />Servicio a México</span>
              </div>
            </div>
          </div>

          {/* Horarios de Atención */}
          <div>
            <h3 className="text-xl font-bold text-pallets-yellow mb-4">
              Horarios de Atención
            </h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Lunes a Viernes</p>
                  <p className="text-gray-300">9:00 AM - 6:00 PM (PST)</p>
                </div>
              </div>
              <div className="ml-8">
                <p className="font-semibold">Sábados</p>
                <p className="text-gray-300">10:00 AM - 2:00 PM (PST)</p>
              </div>
              <div className="ml-8">
                <p className="font-semibold">Domingos</p>
                <p className="text-gray-300">Cerrado</p>
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-xl font-bold text-pallets-yellow mb-4">
              Síguenos
            </h3>
            <p className="text-gray-300 mb-4">
              Mantente informado sobre nuestros servicios y promociones
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-pallets-yellow/10 hover:bg-pallets-yellow hover:text-pallets-black p-3 rounded-full transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-pallets-yellow/10 hover:bg-pallets-yellow hover:text-pallets-black p-3 rounded-full transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-pallets-yellow/10 hover:bg-pallets-yellow hover:text-pallets-black p-3 rounded-full transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} <span className="text-pallets-yellow font-semibold">Pallets Premium</span>. 
            Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Servicio de envío de paquetes de Los Ángeles a México
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

