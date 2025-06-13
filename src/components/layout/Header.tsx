import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, ChevronDown, Search, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { categories } from '../../data/products';
import Logo from '../ui/Logo';

import UserProfileButton from '../ui/UserProfileButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (categoryId: string) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo className="h-10 w-auto" />
            <span className="ml-2 text-xl font-bold text-blue-900">FishMaster</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium">
              Главная
            </Link>
            
            {categories.map((category) => (
              <div key={category.id} className="relative group">
                <button
                  className="flex items-center text-blue-900 hover:text-blue-700 font-medium"
                  onClick={() => toggleDropdown(category.id)}
                >
                  {category.name} 
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 invisible group-hover:visible">
                  <div className="py-2">
                    <Link
                      to={`/products?category=${category.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
                    >
                      All {category.name}
                    </Link>
                    {category.subcategories?.map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/products?category=${category.id}&subcategory=${sub.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <Link to="/about" className="text-blue-900 hover:text-blue-700 font-medium">
              О нас
            </Link>
            <Link to="/contact" className="text-blue-900 hover:text-blue-700 font-medium">
              Контакты
            </Link>
          </nav>

          {/* Cart and Mobile Menu Toggle */}
          <div className="flex items-center space-x-5">
          <button className="text-blue-900 hover:text-blue-700">
            <Search className="h-6 w-6" />
          </button>
          <Link to="/cart" className="text-blue-900 hover:text-blue-700 relative">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <UserProfileButton />
        <button className="lg:hidden text-blue-900" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-blue-900 py-2 border-b border-gray-100">
                Главная
              </Link>
              
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    className="flex items-center justify-between w-full text-blue-900 py-2 border-b border-gray-100"
                    onClick={() => toggleDropdown(category.id)}
                  >
                    {category.name}
                    <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === category.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === category.id && (
                    <div className="pl-4 mt-2 mb-2 space-y-2">
                      <Link
                        to={`/products?category=${category.id}`}
                        className="block py-1 text-blue-800 font-medium"
                      >
                        All {category.name}
                      </Link>
                      {category.subcategories?.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/products?category=${category.id}&subcategory=${sub.id}`}
                          className="block py-1 text-gray-600"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <Link to="/about" className="text-blue-900 py-2 border-b border-gray-100">
                О нас
              </Link>
              <Link to="/contact" className="text-blue-900 py-2 border-b border-gray-100">
                Контакты
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;