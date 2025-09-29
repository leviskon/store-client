// Утилиты для работы с куками

export function setCookie(name: string, value: string, days?: number) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  } else {
    // Если дни не указаны, кука будет храниться очень долго (100 лет)
    const date = new Date()
    date.setTime(date.getTime() + (100 * 365 * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  // Кодируем значение для безопасного хранения в куки
  const encodedValue = encodeURIComponent(value || '')
  console.log('Сохранение в куки:', { name, originalValue: value, encodedValue })
  document.cookie = name + '=' + encodedValue + expires + '; path=/'
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null // SSR safety
  }
  
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) {
      const encodedValue = c.substring(nameEQ.length, c.length)
      // Декодируем значение из куки
      try {
        const decodedValue = decodeURIComponent(encodedValue)
        console.log('Загрузка из куки:', { name, encodedValue, decodedValue })
        return decodedValue
      } catch (error) {
        console.error('Ошибка декодирования куки:', error)
        return encodedValue // Возвращаем исходное значение в случае ошибки
      }
    }
  }
  return null
}

export function eraseCookie(name: string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

// Специальные функции для работы с избранными
export function setFavoritesCookie(favorites: unknown[]) {
  try {
    const favoritesJson = JSON.stringify(favorites)
    setCookie('favorites', favoritesJson)
  } catch (error) {
    console.error('Error saving favorites to cookies:', error)
  }
}

export function getFavoritesCookie(): unknown[] {
  try {
    const favoritesJson = getCookie('favorites')
    if (favoritesJson) {
      return JSON.parse(favoritesJson)
    }
    return []
  } catch (error) {
    console.error('Error reading favorites from cookies:', error)
    return []
  }
}

// Специальные функции для работы с заказами в компактном формате
// Формат: {id};{id};{id}... - только ID заказов через точку с запятой
export function setOrdersCookie(orderIds: string[]) {
  try {
    const ordersString = orderIds.join(';')
    console.log('Saving orders to cookie:', ordersString.length, 'bytes')
    setCookie('user_orders', ordersString)
  } catch (error) {
    console.error('Error saving orders to cookies:', error)
  }
}

export function getOrdersCookie(): string[] {
  try {
    const ordersString = getCookie('user_orders')
    if (ordersString) {
      const orderIds = ordersString.split(';').filter(id => id.trim())
      console.log('Retrieved order IDs from cookies:', orderIds.length)
      return orderIds
    }
    console.log('No order IDs found in cookies')
    return []
  } catch (error) {
    console.error('Error reading order IDs from cookies:', error)
    return []
  }
}

export function addOrderToCookie(orderId: string) {
  try {
    const existingOrderIds = getOrdersCookie()
    console.log('Existing order IDs count:', existingOrderIds.length)
    
    // Проверяем, что заказ не дублируется
    if (existingOrderIds.includes(orderId)) {
      console.log('Order ID already exists in cookies:', orderId)
      return
    }
    
    // Ограничиваем количество заказов в куки до 500, так как теперь храним только ID
    const maxOrders = 500
    let updatedOrderIds = [orderId, ...existingOrderIds]
    
    // Если заказов больше максимума, оставляем только последние
    if (updatedOrderIds.length > maxOrders) {
      updatedOrderIds = updatedOrderIds.slice(0, maxOrders)
      console.log('Trimmed order IDs to max count:', maxOrders)
    }
    
    console.log('Saving order IDs count:', updatedOrderIds.length)
    setOrdersCookie(updatedOrderIds)
  } catch (error) {
    console.error('Error adding order ID to cookies:', error)
  }
}

// Функция для удаления заказа из cookies (например, при отмене)
export function removeOrderFromCookie(orderId: string) {
  try {
    const existingOrderIds = getOrdersCookie()
    const updatedOrderIds = existingOrderIds.filter(id => id !== orderId)
    setOrdersCookie(updatedOrderIds)
    console.log('Removed order ID from cookies:', orderId)
    return true
  } catch (error) {
    console.error('Error removing order ID from cookies:', error)
    return false
  }
}

// Функция для очистки куки заказов (если они повреждены)
export function clearOrdersCookie() {
  try {
    eraseCookie('user_orders')
    console.log('Orders cookie cleared')
    return true
  } catch (error) {
    console.error('Error clearing orders cookie:', error)
    return false
  }
}

// Функция для проверки и восстановления куки заказов
export function validateOrdersCookie(): string[] {
  try {
    const orderIds = getOrdersCookie()
    if (!Array.isArray(orderIds)) {
      console.warn('Orders cookie is corrupted, clearing...')
      clearOrdersCookie()
      return []
    }
    // Проверяем, что все элементы - строки
    const validOrderIds = orderIds.filter(id => typeof id === 'string' && id.trim())
    if (validOrderIds.length !== orderIds.length) {
      console.warn('Some order IDs are invalid, updating cookie...')
      setOrdersCookie(validOrderIds)
    }
    return validOrderIds
  } catch (error) {
    console.error('Error validating orders cookie:', error)
    clearOrdersCookie()
    return []
  }
}