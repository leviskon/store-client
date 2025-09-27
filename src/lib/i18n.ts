export type Language = 'kg' | 'ru'

export interface Translations {
  // Navigation
  home: string
  cart: string
  favorites: string
  orders: string
  
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
  
  // Modal confirmations
  confirm: string
  cancel: string
  confirmRemoveTitle: string
  confirmRemoveMessage: string
  remove: string
  
  // Cart page
  myCart: string
  emptyCartTitle: string
  emptyCartSubtitle: string
  subtotal: string
  deliveryFee: string
  discount: string
  totalCost: string
  proceedToCheckout: string
  removeFromCart: string
  confirmRemoveFromCartTitle: string
  confirmRemoveFromCartMessage: string
  yesRemove: string
  size: string
  color: string
  price: string
  
  // Orders page
  myOrders: string
  active: string
  completed: string
  cancelled: string
  trackOrder: string
  noOrdersTitle: string
  noOrdersSubtitle: string
  orderStatus: string
  orderDate: string
  orderTotal: string
  orderNumber: string
  deliveryAddress: string
  customerPhone: string
  customerComment: string
  cancelComment: string
  courierInfo: string
  orderCreated: string
  orderInProgress: string
  orderDelivered: string
  orderCancelled: string
  orderCourierWait: string
  orderCourierPicked: string
  orderEnroute: string
  
  // Track Order page
  orderDetails: string
  expectedDeliveryDate: string
  trackingId: string
  orderPlaced: string
  inProgress: string
  shipped: string
  delivered: string
  orderPlacedDate: string
  inProgressDate: string
  shippedDate: string
  deliveredDate: string
  expectedDate: string
}

export const translations: Record<Language, Translations> = {
  kg: {
    // Navigation
    home: 'Башкы бет',
    cart: 'Себет',
    favorites: 'Тандалмалар',
    orders: 'Заказдар',
    
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
    removeFromFavorites: 'Тандалмалардан чыгаруу',
    
    // Modal confirmations
    confirm: 'Ырастоо',
    cancel: 'Жокко чыгаруу',
    confirmRemoveTitle: 'Тандалмалардан чыгаруу',
    confirmRemoveMessage: 'Бул товарды тандалмалардан чыгарууну каалайсызбы?',
    remove: 'Чыгаруу',
    
    // Cart page
    myCart: 'Менин себетим',
    emptyCartTitle: 'Сиздин себетиңиз бош',
    emptyCartSubtitle: 'Жакшы көргөн товарларыңызды кошуп баштаңыз',
    subtotal: 'Жыйынтык',
    deliveryFee: 'Жеткирүү акысы',
    discount: 'Арзандатуу',
    totalCost: 'Жалпы наркы',
    proceedToCheckout: 'Төлөмгө өтүү',
    removeFromCart: 'Себеттен чыгаруу',
    confirmRemoveFromCartTitle: 'Себеттен чыгаруу',
    confirmRemoveFromCartMessage: 'Бул товарды себеттен чыгарууну каалайсызбы?',
    yesRemove: 'Ооба, чыгаруу',
    size: 'Өлчөмү',
    color: 'Түсү',
    price: 'Баасы',
    
    // Orders page
    myOrders: 'Менин заказдарым',
    active: 'Активдүү',
    completed: 'Аякталган',
    cancelled: 'Жокко чыгарылган',
    trackOrder: 'Заказды көзөмөлдөө',
    noOrdersTitle: 'Сиздин заказдарыңыз жок',
    noOrdersSubtitle: 'Биринчи заказды берүү үчүн товарларды сатып алыңыз',
    orderStatus: 'Заказдын статусу',
    orderDate: 'Заказдын датасы',
    orderTotal: 'Жалпы сумма',
    orderNumber: 'Заказдын номуру',
    deliveryAddress: 'Жеткирүү дареги',
    customerPhone: 'Телефон номуру',
    customerComment: 'Клиенттин комментарийи',
    cancelComment: 'Жокко чыгаруу себеби',
    courierInfo: 'Курьер тууралуу маалымат',
    orderCreated: 'Түзүлгөн',
    orderInProgress: 'Ишке ашырылууда',
    orderDelivered: 'Жеткирилген',
    orderCancelled: 'Жокко чыгарылган',
    orderCourierWait: 'Курьер күтүүдө',
    orderCourierPicked: 'Курьер алып кеткен',
    orderEnroute: 'Жолдо',
    
    // Track Order page
    orderDetails: 'Заказдын маалыматтары',
    expectedDeliveryDate: 'Күтүлгөн жеткирүү күнү',
    trackingId: 'Көзөмөлдөө ID',
    orderPlaced: 'Заказ берилген',
    inProgress: 'Ишке ашырылууда',
    shipped: 'Жөнөтүлгөн',
    delivered: 'Жеткирилген',
    orderPlacedDate: '23 Авг 2023, 04:25 PM',
    inProgressDate: '23 Авг 2023, 03:54 PM',
    shippedDate: 'Күтүлгөн 02 Сен 2023',
    deliveredDate: '23 Авг 2023, 2023',
    expectedDate: '03 Сен 2023'
  },
  
  ru: {
    // Navigation
    home: 'Главная',
    cart: 'Корзина',
    favorites: 'Избранное',
    orders: 'Заказы',
    
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
    removeFromFavorites: 'Удалить из избранного',
    
    // Modal confirmations
    confirm: 'Подтвердить',
    cancel: 'Отмена',
    confirmRemoveTitle: 'Удалить из избранного',
    confirmRemoveMessage: 'Вы уверены, что хотите удалить этот товар из избранного?',
    remove: 'Удалить',
    
    // Cart page
    myCart: 'Моя корзина',
    emptyCartTitle: 'Ваша корзина пуста',
    emptyCartSubtitle: 'Начните добавлять понравившиеся товары',
    subtotal: 'Промежуточный итог',
    deliveryFee: 'Стоимость доставки',
    discount: 'Скидка',
    totalCost: 'Общая стоимость',
    proceedToCheckout: 'Перейти к оформлению',
    removeFromCart: 'Удалить из корзины',
    confirmRemoveFromCartTitle: 'Удалить из корзины',
    confirmRemoveFromCartMessage: 'Вы уверены, что хотите удалить этот товар из корзины?',
    yesRemove: 'Да, удалить',
    size: 'Размер',
    color: 'Цвет',
    price: 'Цена',
    
    // Orders page
    myOrders: 'Мои заказы',
    active: 'Активные',
    completed: 'Завершенные',
    cancelled: 'Отмененные',
    trackOrder: 'Отследить заказ',
    noOrdersTitle: 'У вас нет заказов',
    noOrdersSubtitle: 'Сделайте первую покупку, чтобы увидеть заказы здесь',
    orderStatus: 'Статус заказа',
    orderDate: 'Дата заказа',
    orderTotal: 'Общая сумма',
    orderNumber: 'Номер заказа',
    deliveryAddress: 'Адрес доставки',
    customerPhone: 'Номер телефона',
    customerComment: 'Комментарий клиента',
    cancelComment: 'Причина отмены',
    courierInfo: 'Информация о курьере',
    orderCreated: 'Создан',
    orderInProgress: 'В обработке',
    orderDelivered: 'Доставлен',
    orderCancelled: 'Отменен',
    orderCourierWait: 'Ожидает курьера',
    orderCourierPicked: 'Курьер забрал',
    orderEnroute: 'В пути',
    
    // Track Order page
    orderDetails: 'Детали заказа',
    expectedDeliveryDate: 'Ожидаемая дата доставки',
    trackingId: 'ID отслеживания',
    orderPlaced: 'Заказ размещен',
    inProgress: 'В обработке',
    shipped: 'Отправлен',
    delivered: 'Доставлен',
    orderPlacedDate: '23 Авг 2023, 04:25 PM',
    inProgressDate: '23 Авг 2023, 03:54 PM',
    shippedDate: 'Ожидается 02 Сен 2023',
    deliveredDate: '23 Авг 2023, 2023',
    expectedDate: '03 Сен 2023'
  }
}

export const useTranslation = (language: Language) => {
  return translations[language]
}

