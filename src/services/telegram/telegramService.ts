'use server'

import { db } from '@/lib/db'

interface TelegramConfig {
  botToken: string
  chatId: string
}

interface OrderData {
  id: string
  customerName: string
  customerPhone: string
  customerAddress: string
  totalAmount: number
  items: Array<{
    name: string
    quantity: number
    price: number
    size?: string
    color?: string
  }>
  createdAt: Date
}

/**
 * Получает настройки Telegram из базы данных
 */
async function getTelegramConfig(): Promise<TelegramConfig | null> {
  try {
    const settings = await db.setting.findMany({
      where: {
        key: {
          in: ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID']
        }
      }
    })

    const botTokenSetting = settings.find(s => s.key === 'TELEGRAM_BOT_TOKEN')
    const chatIdSetting = settings.find(s => s.key === 'TELEGRAM_CHAT_ID')

    if (!botTokenSetting?.value || !chatIdSetting?.value) {
      console.error('Telegram настройки не найдены в базе данных')
      return null
    }

    return {
      botToken: botTokenSetting.value,
      chatId: chatIdSetting.value
    }
  } catch (error) {
    console.error('Ошибка получения настроек Telegram:', error)
    return null
  }
}

/**
 * Отправляет сообщение в Telegram
 */
async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    const config = await getTelegramConfig()
    if (!config) {
      console.error('Не удалось получить настройки Telegram')
      return false
    }

    const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: message,
        parse_mode: 'HTML'
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Ошибка отправки сообщения в Telegram:', errorData)
      return false
    }

    return true
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram:', error)
    return false
  }
}

/**
 * Форматирует данные заказа в сообщение для Telegram
 */
function formatOrderMessage(orderData: OrderData): string {
  const { id, customerName, customerPhone, customerAddress, totalAmount, items, createdAt } = orderData
  
  const orderDate = new Date(createdAt).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  let message = `🛍️ <b>Новый заказ</b> (<code>${id.slice(-8)}</code>)\n\n`
  message += `👤 <b>Клиент:</b> ${customerName}\n`
  message += `📞 <b>Телефон:</b> ${customerPhone}\n`
  message += `📍 <b>Адрес:</b> ${customerAddress}\n`
  message += `📅 <b>Дата заказа:</b> ${orderDate}\n\n`
  
  message += `🛒 <b>Товары:</b>\n`
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}`
    if (item.size) message += ` (Размер: ${item.size})`
    if (item.color) message += ` (Цвет: ${item.color})`
    message += `\n   Количество: ${item.quantity} шт.\n`
    message += `   Цена: ${item.price.toLocaleString('ru-RU')} сом\n\n`
  })
  
  message += `💰 <b>Общая сумма:</b> ${totalAmount.toLocaleString('ru-RU')} сом`

  return message
}

/**
 * Отправляет уведомление о новом заказе в Telegram
 */
export async function sendOrderNotification(orderData: OrderData): Promise<boolean> {
  try {
    const message = formatOrderMessage(orderData)
    return await sendTelegramMessage(message)
  } catch (error) {
    console.error('Ошибка отправки уведомления о заказе:', error)
    return false
  }
}

/**
 * Отправляет тестовое сообщение в Telegram
 */
export async function sendTestMessage(): Promise<boolean> {
  try {
    const message = '🧪 <b>Тестовое сообщение</b>\n\nЭто тестовое сообщение для проверки работы Telegram бота.'
    return await sendTelegramMessage(message)
  } catch (error) {
    console.error('Ошибка отправки тестового сообщения:', error)
    return false
  }
}
