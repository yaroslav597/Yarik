import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { products, categories } from '../data/products';
import { Product, ProductCategory } from '../types/product';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<ProductCategory | null>(null);

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const subcategory = params.get('subcategory');
    const sort = params.get('sort');
    
    if (category) {
      setSelectedCategory(category);
      const foundCategory = categories.find(c => c.id === category);
      setCurrentCategory(foundCategory || null);
    } else {
      setSelectedCategory(null);
      setCurrentCategory(null);
    }
    
    if (subcategory) {
      setSelectedSubcategory(subcategory);
    } else {
      setSelectedSubcategory(null);
    }
    
    if (sort) {
      setSortBy(sort);
    }
    
    // Filter and sort products
    filterProducts(category, subcategory, sort);
  }, [location.search]);

  const filterProducts = (category: string | null, subcategory: string | null, sort: string | null) => {
    let filtered = [...products];
    
    // Apply category filter
    if (category) {
      filtered = filtered.filter(product => product.category === category);
      
      // Apply subcategory filter if category is selected
      if (subcategory) {
        filtered = filtered.filter(product => product.subcategory === subcategory);
      }
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'new':
          filtered.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
          break;
        case 'popular':
          filtered.sort((a, b) => (a.isPopular === b.isPopular) ? 0 : a.isPopular ? -1 : 1);
          break;
        case 'sale':
          filtered.sort((a, b) => (a.isSale === b.isSale) ? 0 : a.isSale ? -1 : 1);
          break;
        case 'featured':
        default:
          filtered.sort((a, b) => (a.isFeatured === b.isFeatured) ? 0 : a.isFeatured ? -1 : 1);
      }
    }
    
    setFilteredProducts(filtered);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    filterProducts(selectedCategory, selectedSubcategory, sortBy);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortBy(value);
    filterProducts(selectedCategory, selectedSubcategory, value);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setPriceRange([0, 300]);
    setSortBy('featured');
    setCurrentCategory(null);
    filterProducts(null, null, 'featured');
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-700">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/products" className="text-gray-500 hover:text-blue-700">Products</Link>
            {selectedCategory && (
              <>
                <span className="mx-2 text-gray-500">/</span>
                <Link 
                  to={`/products?category=${selectedCategory}`} 
                  className="text-gray-500 hover:text-blue-700"
                >
                  {currentCategory?.name || selectedCategory}
                </Link>
              </>
            )}
            {selectedSubcategory && currentCategory && (
              <>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-900">
                  {currentCategory.subcategories?.find(s => s.id === selectedSubcategory)?.name || selectedSubcategory}
                </span>
              </>
            )}
          </nav>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedCategory 
              ? currentCategory?.name || 'Товары' 
              : 'Все рыболовные товары'}
          </h1>
          {currentCategory?.description && (
            <p className="mt-2 text-gray-600">{currentCategory.description}</p>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            onClick={toggleFilter}
            className="w-full flex items-center justify-center"
          >
            <Filter className="mr-2 h-5 w-5" />
            {isFilterOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Фильтры</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-700 hover:text-blue-800"
                >
                  Сбросить все
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Категории</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/products?category=${category.id}`}
                        className={`block py-1 ${
                          selectedCategory === category.id 
                            ? 'text-blue-700 font-medium' 
                            : 'text-gray-700 hover:text-blue-700'
                        }`}
                      >
                        {category.name}
                      </Link>
                      
                      {/* Подкатегории */}
                      {selectedCategory === category.id && category.subcategories && (
                        <ul className="ml-4 mt-2 space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory.id}>
                              <Link
                                to={`/products?category=${category.id}&subcategory=${subcategory.id}`}
                                className={`block py-1 text-sm ${
                                  selectedSubcategory === subcategory.id 
                                    ? 'text-blue-700 font-medium' 
                                    : 'text-gray-600 hover:text-blue-700'
                                }`}
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Диапазон цен</h3>
                <div className="flex items-center mb-2">
                  <span className="text-gray-600 text-sm">
                    {priceRange[0]} ₽ - {priceRange[1]} ₽
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[50, 100, 150, 200].map((price) => (
                    <button
                      key={price}
                      onClick={() => handlePriceChange(0, price)}
                      className={`px-2 py-1 text-xs rounded ${
                        priceRange[1] === price
                          ? 'bg-blue-100 text-blue-800 font-medium'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      До {price} ₽
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Наличие</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-700 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">В наличии</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-700 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Распродажа</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-700 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Новинки</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            {/* Sort Options */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap items-center justify-between">
              <p className="text-gray-600 mb-2 sm:mb-0">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="new">Newest</option>
                  <option value="popular">Popularity</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or browse our categories.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;