import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative pb-[75%] overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.isSale && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              СКИДКА
            </span>
          )}
          {product.isNew && (
            <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
              НОВИНКА
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.shortDescription || product.description.substring(0, 80) + '...'}</p>
          
          <div className="flex items-end justify-between mt-auto">
            <div>
              {product.originalPrice ? (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                  <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
              </p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white rounded-full w-10 h-10 transition-colors"
              aria-label="Добавить в корзину"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;