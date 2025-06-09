import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { getBestSellers, getNewArrivals, getSaleItems, categories } from '../data/products';
import { motion } from 'framer-motion';
import RegisterModal from '../components/ui/RegisterModal';
import LoginModal from '../components/ui/LoginModal';

const HomePage: React.FC = () => {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();
  const saleItems = getSaleItems();

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const categorySettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative">
        <Slider {...sliderSettings}>
          <div>
            <div className="relative h-[70vh] min-h-[500px]">
              <img 
                src="./src/assets/fishing-header.jpg" 
                alt="Fishing at sunset" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Лови момент, лови рыбу – с Fish Master!</h1>
                    <p className="text-lg mb-8">Откройте для себя нашу коллекцию высококачественного рыболовного снаряжения, предназначенного для ваших лучших уловов.</p>
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" onClick={() => setRegisterModalOpen(true)}>Регистрация</Button>
                      <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm" onClick={() => setLoginModalOpen(true)}>
                        Войти
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative h-[70vh] min-h-[500px]">
              <img 
                src="./src/assets/fishing-sale.jpg" 
                alt="Fishing gear" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Летняя распродажа со скидкой до 40%</h1>
                    <p className="text-lg mb-8">Ограниченные предложения на избранные удилища, катушки и аксессуары. Не пропустите!</p>
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" variant="danger">Распродажа</Button>
                      <Button variant="danger" size="lg" className="bg-white/10 backdrop-blur-sm">
                        Узнать больше
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>

      {/* Categories Slider */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Каталог</h2>
            <Link to="/products" className="text-blue-700 hover:text-blue-800 flex items-center">
              Ещё <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <Slider {...categorySettings} className="category-slider">
            {categories.map((category) => (
              <div key={category.id} className="px-2">
                <Link to={`/products?category=${category.id}`}>
                  <motion.div 
                    className="relative rounded-lg overflow-hidden h-64 group"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src={category.imageUrl} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                      <div>
                        <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
                        <p className="text-gray-200 text-sm">{category.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Лучшее предложение</h2>
            <Link to="/products?sort=popular" className="text-blue-700 hover:text-blue-800 flex items-center">
              Ещё <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Экспертные советы по рыболовным снастям</h2>
              <p className="text-blue-200 text-lg mb-6">
                Имея более чем 20-летний опыт работы, наша команда энтузиастов рыбной ловли предоставляет высококачественное оборудование и квалифицированные консультации для рыболовов любого уровня.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg">Купить профессиональное снаряжение</Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Получить советы
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <img 
                src="https://images.pexels.com/photos/5560911/pexels-photo-5560911.jpeg" 
                alt="Professional fishing gear" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Новинки</h2>
            <Link to="/products?sort=new" className="text-blue-700 hover:text-blue-800 flex items-center">
              Ещё <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Отзывы наших клиентов</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
                <p className="text-gray-600 mb-4">
                  "Спиннинг Pro Angler превзошел мои ожидания. Идеальный баланс и чувствительность для пресной и соленой воды. Настоятельно рекомендую!"
                </p>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">Michael T.</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">Professional Angler</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
                <p className="text-gray-600 mb-4">
                  "Быстрая доставка и отличный сервис. Заказанные приманки отлично подошли для ловли басса. Обязательно буду заказывать снова!"
                </p>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">Sarah K.</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">Recreational Fisher</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
                <p className="text-gray-600 mb-4">
                  "Вейдерсы отличного качества. Полностью водонепроницаемые и очень удобные для долгих дней на реке. Стоят каждой копейки."
                </p>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">James L.</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">Fly Fishing Guide</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Присоединяйтесь к нашему рыболовному сообществу</h2>
          <p className="text-gray-300 mb-8">
            Подпишитесь, чтобы получать эксклюзивные предложения, советы по рыбалке и ранний доступ к новым товарам.
          </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Ваш адрес электронной почты"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <Button variant="secondary" size="lg">
                Подписаться
              </Button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Подписываясь, вы соглашаетесь с нашей Политикой конфиденциальности и даете согласие на получение обновлений от нашей компании.
            </p>
          </div>
        </div>
      </section>

      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </div>
  );
};

export default HomePage;
