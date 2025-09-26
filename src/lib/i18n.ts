export type Language = 'kg' | 'ru'

export interface Translations {
  // Navigation
  home: string
  cart: string
  favorites: string
  
  // Search and filters
  search: string
  searchProducts: string
  filters: string
  seeAll: string
  categories: string
  
  // Product related
  featuredProducts: string
  newCollection: string
  discount50: string
  shopNow: string
  summerSale: string
  upTo70Off: string
  explore: string
  newArrivals: string
  freshStyles: string
  discover: string
  
  // Filter modal
  priceRange: string
  min: string
  max: string
  minimumRating: string
  any: string
  sortBy: string
  newestFirst: string
  oldestFirst: string
  priceLowToHigh: string
  priceHighToLow: string
  highestRated: string
  reset: string
  applyFilters: string
  
  // Product categories
  tshirt: string
  pant: string
  dress: string
  jacket: string
  
  // Product titles
  categoryProducts: string
  filteredProducts: string
  allProducts: string
  
  // Product page
  productDetails: string
  selectSize: string
  selectColor: string
  quantity: string
  totalPrice: string
  addToCart: string
  readMore: string
  productNotFound: string
  goBack: string
  noImage: string
  specifications: string
  noColorsAvailable: string
  
  // Favorites page
  myWishlist: string
  noFavoritesTitle: string
  noFavoritesSubtitle: string
  startShopping: string
  all: string
  removeFromFavorites: string
}

export const translations: Record<Language, Translations> = {
  kg: {
    // Navigation
    home: 'Башкы бет',
    cart: 'Себет',
    favorites: 'Тандалмалар',
    
    // Search and filters
    search: 'Издөө',
    searchProducts: 'Товарларды издөө...',
    filters: 'Чыпкалар',
    seeAll: 'Бардыгын көрүү',
    categories: 'Категориялар',
    
    // Product related
    featuredProducts: 'Сунушталган товарлар',
    newCollection: 'Жаңы коллекция',
    discount50: 'Биринчи сатып алууда\n50% арзандатуу',
    shopNow: 'Азыр сатып алуу',
    summerSale: 'Жайкы арзандатуу',
    upTo70Off: 'Тандалган товарларга\n70% чейин арзандатуу',
    explore: 'Изилдөө',
    newArrivals: 'Жаңы келгендер',
    freshStyles: 'Жаңы стилдер\nкелди',
    discover: 'Ачуу',
    
    // Filter modal
    priceRange: 'Баа диапазону',
    min: 'Мин',
    max: 'Макс',
    minimumRating: 'Минималдуу рейтинг',
    any: 'Каалаган',
    sortBy: 'Иреттөө',
    newestFirst: 'Алгач жаңылар',
    oldestFirst: 'Алгач эскилер',
    priceLowToHigh: 'Баа: арзандан кымбатка',
    priceHighToLow: 'Баа: кымбаттан арзанга',
    highestRated: 'Эң жогорку рейтинг',
    reset: 'Тазалоо',
    applyFilters: 'Чыпкаларды колдонуу',
    
    // Product categories
    tshirt: 'Футболка',
    pant: 'Шым',
    dress: 'Көйнөк',
    jacket: 'Куртка',
    
    // Product titles
    categoryProducts: 'товарлары',
    filteredProducts: 'Чыпкаланган товарлар',
    allProducts: 'Бардык товарлар',
    
    // Product page
    productDetails: 'Товардын тарыхы',
    selectSize: 'Өлчөмдү тандаңыз',
    selectColor: 'Түстү тандаңыз',
    quantity: 'Саны',
    totalPrice: 'Жалпы баасы',
    addToCart: 'Себетке кошуу',
    readMore: 'Толугу менен окуу',
    productNotFound: 'Товар табылган жок',
    goBack: 'Артка кайтуу',
    noImage: 'Сүрөт жок',
    specifications: 'Техникалык мүнөздөмөлөр',
    noColorsAvailable: 'Түстөр жеткиликсиз',
    
    // Favorites page
    myWishlist: 'Менин тилек тизмем',
    noFavoritesTitle: 'Сиздин тилек тизмеңиз бош',
    noFavoritesSubtitle: 'Жакшы көргөн товарларыңызды сактоо үчүн жүрөк белгисин басыңыз',
    startShopping: 'Соода кылууну баштоо',
    all: 'Баары',
    removeFromFavorites: 'Тандалмалардан чыгаруу'
  },
  
  ru: {
    // Navigation
    home: 'Главная',
    cart: 'Корзина',
    favorites: 'Избранное',
    
    // Search and filters
    search: 'Поиск',
    searchProducts: 'Поиск товаров...',
    filters: 'Фильтры',
    seeAll: 'Смотреть все',
    categories: 'Категории',
    
    // Product related
    featuredProducts: 'Рекомендуемые товары',
    newCollection: 'Новая коллекция',
    discount50: 'Скидка 50% на\nпервую покупку',
    shopNow: 'Купить сейчас',
    summerSale: 'Летняя распродажа',
    upTo70Off: 'Скидки до 70%\nна выбранные товары',
    explore: 'Исследовать',
    newArrivals: 'Новинки',
    freshStyles: 'Новые стили\nуже здесь',
    discover: 'Открыть',
    
    // Filter modal
    priceRange: 'Диапазон цен',
    min: 'Мин',
    max: 'Макс',
    minimumRating: 'Минимальный рейтинг',
    any: 'Любой',
    sortBy: 'Сортировка',
    newestFirst: 'Сначала новые',
    oldestFirst: 'Сначала старые',
    priceLowToHigh: 'Цена: по возрастанию',
    priceHighToLow: 'Цена: по убыванию',
    highestRated: 'Высокий рейтинг',
    reset: 'Сбросить',
    applyFilters: 'Применить фильтры',
    
    // Product categories
    tshirt: 'Футболка',
    pant: 'Брюки',
    dress: 'Платье',
    jacket: 'Куртка',
    
    // Product titles
    categoryProducts: 'товары',
    filteredProducts: 'Отфильтрованные товары',
    allProducts: 'Все товары',
    
    // Product page
    productDetails: 'Описание товара',
    selectSize: 'Выберите размер',
    selectColor: 'Выберите цвет',
    quantity: 'Количество',
    totalPrice: 'Общая стоимость',
    addToCart: 'Добавить в корзину',
    readMore: 'Читать далее',
    productNotFound: 'Товар не найден',
    goBack: 'Вернуться назад',
    noImage: 'Нет изображения',
    specifications: 'Характеристики',
    noColorsAvailable: 'Цвета недоступны',
    
    // Favorites page
    myWishlist: 'Мои избранные',
    noFavoritesTitle: 'Ваш список избранного пуст',
    noFavoritesSubtitle: 'Нажмите на сердечко, чтобы сохранить понравившиеся товары',
    startShopping: 'Начать покупки',
    all: 'Все',
    removeFromFavorites: 'Удалить из избранного'
  }
}

export const useTranslation = (language: Language) => {
  return translations[language]
}

