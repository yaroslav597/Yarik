import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Minus, Plus, ShoppingCart, Heart, Share2, Info, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductById, getRelatedProducts } from '../data/products';
import { Product } from '../types/product';
import { motion } from 'framer-motion';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.imageUrl);
        
        // Get related products
        const related = getRelatedProducts(productId);
        setRelatedProducts(related);
      }
    }
    
    // Reset quantity when product changes
    setQuantity(1);
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      setIsAddingToCart(true);
      
      // Add to cart
      addToCart(product, quantity);
      
      // Reset animation state after 1 second
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
        <p className="text-gray-600 mb-8">Искомый товар не существует или был удален.</p>
        <Link to="/products">
          <Button>Продолжить покупки</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex text-sm mb-8">
          <Link to="/" className="text-gray-500 hover:text-blue-700">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to="/products" className="text-gray-500 hover:text-blue-700">Products</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-blue-700">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {/* Product Images */}
            <div className="lg:col-span-1">
              <div className="mb-4 overflow-hidden rounded-lg">
                <motion.img 
                  src={selectedImage} 
                  alt={product.name}
                  className="w-full h-auto object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  key={selectedImage}
                />
              </div>
              
              {/* Thumbnail images */}
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`rounded-md overflow-hidden border-2 ${
                        selectedImage === img ? 'border-blue-500' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} view ${index + 1}`} 
                        className="w-full h-auto"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-col h-full">
                {/* Basic Info */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {product.isSale && (
          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            Распродажа
          </span>
                    )}
                    {product.isNew && (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            Новинка
          </span>
                    )}
                    {product.inStock ? (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
              <Check className="w-3 h-3 mr-1" /> В наличии
            </span>
          ) : (
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Нет в наличии
            </span>
                    )}
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">4.9 (24 отзыва)</span>
                  </div>
                  
                  <div className="mb-4">
                    {product.originalPrice ? (
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">{product.price.toFixed(2)} ₽</span>
                        <span className="ml-2 text-lg text-gray-500 line-through">{product.originalPrice.toFixed(2)} ₽</span>
                        <span className="ml-2 text-sm text-red-600 font-semibold">
                          Экономия {(product.originalPrice - product.price).toFixed(2)} ₽ ({Math.round((1 - product.price / product.originalPrice) * 100)}%)
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">{product.price.toFixed(2)} ₽</span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    {product.description}
                  </p>
                </div>

                {/* Add to Cart */}
                <div className="mt-auto">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="inline-flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 text-gray-900 font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth={false}
                      className="flex-grow sm:flex-grow-0"
                      onClick={handleAddToCart}
                      disabled={!product.inStock || isAddingToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {isAddingToCart ? 'Added!' : 'Add to Cart'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="p-3"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="p-3"
                      aria-label="Share product"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="bg-blue-50 rounded-md p-4 flex items-start">
                    <Info className="h-5 w-5 text-blue-700 mt-0.5 flex-shrink-0" />
                    <p className="ml-3 text-sm text-blue-700">
                      Free shipping on orders over $75. 30-day return policy. 
                      <a href="#" className="underline font-medium ml-1">Learn more</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications & Reviews Tabs */}
          <div className="border-t border-gray-200">
            <div className="container mx-auto px-6 py-8">
              <div className="flex border-b border-gray-200 mb-6">
                <button className="px-6 py-3 border-b-2 border-blue-700 text-blue-700 font-medium">
                  Specifications
                </button>
                <button className="px-6 py-3 text-gray-600 hover:text-gray-900">
                  Reviews (24)
                </button>
              </div>
              
              {/* Specifications */}
              {product.specifications && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-start">
                        <dt className="w-1/3 text-sm text-gray-500">{key}</dt>
                        <dd className="w-2/3 text-sm font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;