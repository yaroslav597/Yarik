import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ChevronLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle coupon logic here
    alert(`Coupon ${couponCode} applied!`);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout functionality would be implemented here.');
      setIsCheckingOut(false);
    }, 1500);
  };

  // Calculate additional values
  const subtotal = totalPrice;
  const shipping = subtotal > 100 ? 0 : 12.99;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ваша корзина</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваша корзина пуста</h2>
            <p className="text-gray-600 mb-6">
              Похоже, вы еще не добавили товары в корзину.
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Продолжить покупки
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                      Товары ({cart.reduce((total, item) => total + item.quantity, 0)})
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Очистить корзину
                    </button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.product.id} 
                      className="p-6 flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Product Image */}
                      <div className="sm:w-24 sm:h-24 flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              <Link to={`/products/${item.product.id}`} className="hover:text-blue-700">
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              Category: {item.product.category}
                              {item.product.subcategory && ` / ${item.product.subcategory}`}
                            </p>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <p className="text-lg font-bold text-gray-900">
                              {(item.product.price * item.quantity).toFixed(2)} ₽
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-500">
                                {item.product.price.toFixed(2)} ₽ each
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between mt-4">
                          <div className="flex items-center">
                            <div className="inline-flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-1 text-gray-900 font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleRemove(item.product.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Удалить
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="p-6 border-t border-gray-200">
                  <Link to="/products" className="flex items-center text-blue-700 hover:text-blue-800 font-medium">
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    Продолжить покупки
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">{subtotal.toFixed(2)} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900 font-medium">
                      {shipping === 0 ? 'Free' : `${shipping.toFixed(2)} ₽`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7%)</span>
                    <span className="text-gray-900 font-medium">{tax.toFixed(2)} ₽</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">{total.toFixed(2)} ₽</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Including VAT
                    </p>
                  </div>
                </div>
                
                {/* Promo Code */}
                <form onSubmit={handleCouponSubmit} className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                    Промокод
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Введите код"
                    />
                    <button
                      type="submit"
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-r-md transition-colors"
                    >
                      Применить
                    </button>
                  </div>
                </form>
                
                {/* Кнопка оформления заказа */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Обработка...
                    </>
                  ) : (
                    'Перейти к оформлению'
                  )}
                </Button>
                
                {/* Способы оплаты */}
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-2 text-center">Мы принимаем</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-10 h-6 bg-gray-800 rounded"></div>
                    <div className="w-10 h-6 bg-blue-600 rounded"></div>
                    <div className="w-10 h-6 bg-red-500 rounded"></div>
                    <div className="w-10 h-6 bg-yellow-400 rounded"></div>
                    <div className="w-10 h-6 bg-blue-400 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
