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
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
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
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export function eraseCookie(name: string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

// Специальные функции для работы с избранными
export function setFavoritesCookie(favorites: any[]) {
  try {
    const favoritesJson = JSON.stringify(favorites)
    setCookie('favorites', favoritesJson)
  } catch (error) {
    console.error('Error saving favorites to cookies:', error)
  }
}

export function getFavoritesCookie(): any[] {
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

// Специальные функции для работы с заказами
export function setOrdersCookie(orders: any[]) {
  try {
    const ordersJson = JSON.stringify(orders)
    setCookie('user_orders', ordersJson)
  } catch (error) {
    console.error('Error saving orders to cookies:', error)
  }
}

export function getOrdersCookie(): any[] {
  try {
    const ordersJson = getCookie('user_orders')
    if (ordersJson) {
      return JSON.parse(ordersJson)
    }
    return []
  } catch (error) {
    console.error('Error reading orders from cookies:', error)
    return []
  }
}

export function addOrderToCookie(order: any) {
  try {
    const existingOrders = getOrdersCookie()
    const updatedOrders = [order, ...existingOrders]
    setOrdersCookie(updatedOrders)
  } catch (error) {
    console.error('Error adding order to cookies:', error)
  }
}