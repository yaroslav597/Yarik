import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Logo className="h-10 w-auto text-white" />
              <span className="ml-2 text-xl font-bold">FishMaster</span>
            </div>
            <p className="text-blue-200 mb-4">
              Премиальное рыболовное снаряжение для профессионалов и энтузиастов. Качественное оборудование для ваших лучших уловов.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
          <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-blue-200 hover:text-white transition-colors">
                  Товары
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
              <Link to="/contact" className="text-blue-200 hover:text-white transition-colors">
                Контакты
              </Link>
              </li>
              <li>
                <Link to="/cart" className="text-blue-200 hover:text-white transition-colors">
                  Корзина
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
          <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=rods" className="text-blue-200 hover:text-white transition-colors">
                  Удилища
                </Link>
              </li>
              <li>
                <Link to="/products?category=reels" className="text-blue-200 hover:text-white transition-colors">
                  Катушки
                </Link>
              </li>
              <li>
                <Link to="/products?category=lures" className="text-blue-200 hover:text-white transition-colors">
                  Приманки и наживки
                </Link>
              </li>
              <li>
                <Link to="/products?category=tackle" className="text-blue-200 hover:text-white transition-colors">
                  Снасти
                </Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-blue-200 hover:text-white transition-colors">
                  Рыболовная одежда
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
          <h3 className="text-lg font-semibold mb-4">Свяжитесь с нами</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-blue-300 flex-shrink-0 mt-0.5" />
                <span className="text-blue-200">
                  Россия, Москва, проспект Вернадского, 78, стр. 4
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-300 flex-shrink-0" />
                <span className="text-blue-200">+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-300 flex-shrink-0" />
                <span className="text-blue-200">info@fishmaster.com</span>
              </li>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Подпишитесь на нашу рассылку</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="bg-blue-800 text-white placeholder-blue-400 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-r-md transition-colors">
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-blue-800 text-center text-blue-300 text-sm">
          <p>&copy; {new Date().getFullYear()} FishMaster. Все права защищены.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Условия использования
            </Link>
            <Link to="/shipping" className="hover:text-white transition-colors">
              Условия доставки
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;