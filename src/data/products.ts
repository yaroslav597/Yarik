import { Product, ProductCategory } from '../types/product';

export const categories: ProductCategory[] = [
  {
    id: 'rods',
    name: 'Удилища',
    description: 'Высококачественные удилища для всех видов рыбалки',
    imageUrl: 'https://i.ebayimg.com/images/g/PE8AAOSwQcJaCcaY/s-l1600.jpg',
    subcategories: [
      { id: 'spinning', name: 'Спиннинговые удилища' },
      { id: 'casting', name: 'Кастинговые удилища' },
      { id: 'telescopic', name: 'Телескопические удилища' },
      { id: 'fly', name: 'Нахлыстовые удилища' }
    ]
  },
  {
    id: 'reels',
    name: 'Катушки',
    description: 'Надежные и долговечные катушки для любых условий рыбалки',
    imageUrl: 'https://img.joomcdn.net/d8c81ac0aa259b45078cbfb81b7330ddbdc54ede_original.jpeg',
    subcategories: [
      { id: 'spinning-reels', name: 'Спиннинговые катушки' },
      { id: 'baitcasting', name: 'Мультипликаторные катушки' },
      { id: 'surf', name: 'Катушки для морской рыбалки' },
      { id: 'fly-reels', name: 'Нахлыстовые катушки' }
    ]
  },
  {
    id: 'lures',
    name: 'Приманки',
    description: 'Эффективные приманки для разных видов рыб',
    imageUrl: 'https://avatars.mds.yandex.net/i?id=9b8dbf564091da0685004d4e46ecfe0f_l-12569562-images-thumbs&n=13',
    subcategories: [
      { id: 'soft-baits', name: 'Мягкие приманки' },
      { id: 'hard-baits', name: 'Воблеры' },
      { id: 'spoons', name: 'Блесны' },
      { id: 'jigs', name: 'Джиг-головки' }
    ]
  },
  {
    id: 'tackle',
    name: 'Снасти',
    description: 'Необходимые снасти для успешной рыбалки',
    imageUrl: 'https://cdn1.ozone.ru/s3/multimedia-3/6413109363.jpg',
    subcategories: [
      { id: 'hooks', name: 'Крючки' },
      { id: 'lines', name: 'Лески и шнуры' },
      { id: 'sinkers', name: 'Грузила и джиг-головки' },
      { id: 'accessories', name: 'Аксессуары' }
    ]
  },
  {
    id: 'clothing',
    name: 'Одежда',
    description: 'Комфортная и функциональная одежда для рыбалки',
    imageUrl: 'https://images.pexels.com/photos/1630039/pexels-photo-1630039.jpeg',
    subcategories: [
      { id: 'jackets', name: 'Куртки и жилеты' },
      { id: 'waders', name: 'Вейдерсы' },
      { id: 'boots', name: 'Обувь для рыбалки' },
      { id: 'hats', name: 'Головные уборы' }
    ]
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Спиннинг Pro Angler',
    category: 'rods',
    subcategory: 'spinning',
    price: 9999,
    originalPrice: 12999,
    description: 'Спиннинг Pro Angler разработан для серьезных рыболовов, которым требуется производительность и надежность. Это премиальное удилище оснащено бланком из углеволокна для отличной чувствительности и прочности, оставаясь при этом легким для комфортной рыбалки в течение всего дня. Высококачественная пробковая рукоятка обеспечивает надежный хват в любых условиях, а кольца из нержавеющей стали гарантируют плавное прохождение лески для более точных и дальних забросов.',
    shortDescription: 'Премиальный карбоновый спиннинг с отличной чувствительностью и прочностью.',
    imageUrl: 'https://fmagazin.ru/_files/editor/images/pic/akara/wobbler/spinning_akara_proangler_tackle_mh_1_9m_70_150g_b.jpg',
    images: [
      'https://rybolov.org/images/shop/products/l8003.jpg',
      
      
    ],
    inStock: true,
    isFeatured: true,
    isSale: true,
    specifications: {
      'Длина': '2.13 м',
      'Мощность': 'Средняя',
      'Строй': 'Быстрый',
      'Секции': 2,
      'Материал': 'Карбон',
      'Рукоятка': 'Пробка',
      'Вес': '136 г'
    },
    relatedProducts: [2, 5, 10]
  },
  {
    id: 2,
    name: 'Мультипликаторная катушка Elite Series',
    category: 'reels',
    subcategory: 'baitcasting',
    price: 14999,
    description: 'Мультипликаторная катушка Elite Series создана для точности и долговечности. Оснащенная легким алюминиевым корпусом и шпулей, эта катушка обеспечивает исключительную производительность при забросе и тормозное усилие. Карбоновая тормозная система обеспечивает плавное, постоянное давление, а 11+1 подшипников из нержавеющей стали гарантируют шелковистую плавность работы.',
    shortDescription: 'Высокопроизводительная мультипликаторная катушка с карбоновой тормозной системой.',
    imageUrl: 'https://multi-fish.ru/upload/iblock/02f/katushka_multiplikatornaya_salmo_elite_baitcast_6.jpg',
    images: [
      'https://multi-fish.ru/upload/iblock/ad9/9467-_1_.jpg',
      
    ],
    inStock: true,
    isNew: true,
    isFeatured: true,
    specifications: {
      'Передаточное число': '7.3:1',
      'Подшипники': '11+1',
      'Тормозная система': 'Карбоновая',
      'Вес': '190 г',
      'Лесоемкость': '0.30мм/120м',
      'Максимальное тормозное усилие': '8 кг',
      'Рукоятка': 'Алюминий'
    }
  },
  {
    id: 3,
    name: 'Набор мягких приманок',
    category: 'lures',
    subcategory: 'soft-baits',
    price: 999,
    originalPrice: 1499,
    description: 'Этот комплексный набор мягких приманок включает различные формы, размеры и цвета, предназначенные для ловли разных видов рыб в различных условиях. От реалистичных плавающих приманок до имитаций раков, этот набор содержит все необходимое для успешной рыбалки.',
    shortDescription: 'Комплексный набор мягких приманок с различными формами и цветами.',
    imageUrl: 'https://img.joomcdn.net/8f218fc7a2858f2afdd38ad26c91b0e613c36971_original.jpeg',
    images: [
      'https://img.joomcdn.net/05356e999589707ea3bc6c1def3e8cddbfce4cea_original.jpeg',
      
    ],
    inStock: true,
    isPopular: true,
    isSale: true,
    specifications: {
      'Количество': '24 штук',
      'Типы': 'Виброхвосты, Твистеры, Раки',
      'Цвета': '10 различных вариантов',
      'Материал': 'Силикон с аттрактантом',
      'Размеры': '5-13 см',
      'Хранение': 'Включен кейс'
    }
  }
];

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.isPopular || product.isFeatured).slice(0, 4);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew).slice(0, 4);
};

export const getSaleItems = (): Product[] => {
  return products.filter(product => product.isSale).slice(0, 4);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (productId: number): Product[] => {
  const product = getProductById(productId);
  if (!product || !product.relatedProducts) return [];
  
  return products.filter(p => product.relatedProducts?.includes(p.id));
};