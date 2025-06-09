import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Clock, Fish, Target } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.pexels.com/photos/5560911/pexels-photo-5560911.jpeg" 
            alt="Fishing gear background" 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">О FishMaster</h1>
            <p className="text-xl text-blue-200 mb-6">
              Премиальное рыболовное снаряжение для рыбаков, которые требуют лучшего.
            </p>
            <p className="text-lg text-blue-100">
              С 2005 года мы посвящаем себя предоставлению рыбакам высококачественного снаряжения, 
              экспертных советов и исключительного сервиса.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <motion.img 
                src="https://images.pexels.com/photos/2583852/pexels-photo-2583852.jpeg" 
                alt="Founder fishing" 
                className="rounded-lg shadow-md"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
              <p className="text-gray-700 mb-4">
                FishMaster был основан Александром Фишером, профессиональным рыбаком с более чем 20-летним опытом участия в рыболовных соревнованиях по всему миру. После многих лет поиска надежного и высокопроизводительного рыболовного снаряжения Алекс решил создать собственную компанию, посвященную поставке премиальных продуктов для серьезных рыбаков.
              </p>
              <p className="text-gray-700 mb-4">
                То, что начиналось как небольшой магазин в 2005 году, выросло в одно из самых надежных имен в рыболовном снаряжении. Сегодня FishMaster обслуживает тысячи клиентов по всему миру — от новичков до профессиональных рыбаков.
              </p>
              <p className="text-gray-700">
                Наша философия проста: мы продаем только то, что использовали бы сами. Каждый продукт в нашем каталоге был протестирован и одобрен нашей командой энтузиастов рыбалки, чтобы гарантировать соответствие высоким стандартам производительности, долговечности и ценности.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши ценности</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              В FishMaster нас ведет набор основных принципов, которые влияют на все, что мы делаем — от выбора продуктов до обслуживания клиентов.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 text-blue-700 p-3 inline-flex rounded-full mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Качество</h3>
              <p className="text-gray-600">
                Мы никогда не идем на компромисс с качеством. Каждый продукт, который мы продаем, тщательно отбирается и тестируется, чтобы соответствовать нашим высоким стандартам.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 text-blue-700 p-3 inline-flex rounded-full mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Экспертиза</h3>
              <p className="text-gray-600">
                Наша команда состоит из страстных рыбаков с многолетним опытом. Мы всегда готовы поделиться знаниями и помочь вам принимать обоснованные решения.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 text-blue-700 p-3 inline-flex rounded-full mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Сообщество</h3>
              <p className="text-gray-600">
                Мы верим в создание сильного рыболовного сообщества. Через мероприятия, мастер-классы и онлайн-ресурсы мы объединяем рыбаков и продвигаем ответственные методы рыбалки.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 text-blue-700 p-3 inline-flex rounded-full mb-4">
                <Fish className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Устойчивость</h3>
              <p className="text-gray-600">
                Мы стремимся защищать водные экосистемы. Мы поддерживаем практику "поймал-отпустил" и содействуем охране природы, чтобы рыбалка оставалась приятным занятием для будущих поколений.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 text-blue-700 p-3 inline-flex rounded-full mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Надежность</h3>
              <p className="text-gray-600">
                Мы понимаем, что рыбалка часто происходит в удаленных местах, где отказ оборудования недопустим. Поэтому надежность — ключевой фактор в нашем процессе выбора продуктов.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 text-blue-700 p-3 inline-flex rounded-full mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Инновации</h3>
              <p className="text-gray-600">
                Мы постоянно ищем последние достижения в рыболовных технологиях. Наш каталог включает инновационные продукты, которые помогут вам получить преимущество на следующей рыбалке.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наша команда</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Наша команда энтузиастов рыбалки стремится предоставить вам лучшие продукты и советы для ваших рыболовных приключений.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                alt="Alexander Fisher - Founder & CEO" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">Александр Фишер</h3>
                <p className="text-gray-600 text-sm mb-2">Основатель и генеральный директор</p>
                <p className="text-gray-700 text-sm">
                  Профессиональный рыбак с более чем 20-летним опытом и множеством чемпионских титулов.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" 
                alt="Sarah Johnson - Product Specialist" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">Сара Джонсон</h3>
                <p className="text-gray-600 text-sm mb-2">Специалист по продуктам</p>
                <p className="text-gray-700 text-sm">
                  Эксперт по нахлыстовой рыбалке с тонким чувством качества и производительности рыболовного снаряжения.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                alt="Mike Rodriguez - Customer Service Manager" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">Майк Родригес</h3>
                <p className="text-gray-600 text-sm mb-2">Менеджер по обслуживанию клиентов</p>
                <p className="text-gray-700 text-sm">
                  Посвящен обеспечению исключительного опыта для каждого клиента.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
                alt="Emma Chen - Marketing Director" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">Эмма Чен</h3>
                <p className="text-gray-600 text-sm mb-2">Директор по маркетингу</p>
                <p className="text-gray-700 text-sm">
                  Креативный маркетолог с страстью к природе и рыбалке.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Присоединяйтесь к сообществу FishMaster</h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">
            Подпишитесь на нашу рассылку, чтобы получать советы по рыбалке, обновления продуктов и эксклюзивные предложения.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;