'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Clock, CheckCircle, XCircle, Package, Phone, Mail, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ReturnsPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [selectedReason, setSelectedReason] = useState('')
  const [orderNumber, setOrderNumber] = useState('')

  const returnReasons = [
    {
      id: 1,
      name: t.language === 'kg' ? 'Өлчөм туура эмес' : 'Неподходящий размер',
      nameKg: 'Өлчөм туура эмес',
      nameRu: 'Неподходящий размер',
      icon: '📏'
    },
    {
      id: 2,
      name: t.language === 'kg' ? 'Түс туура эмес' : 'Неподходящий цвет',
      nameKg: 'Түс туура эмес',
      nameRu: 'Неподходящий цвет',
      icon: '🎨'
    },
    {
      id: 3,
      name: t.language === 'kg' ? 'Сапат туура эмес' : 'Некачественный товар',
      nameKg: 'Сапат туура эмес',
      nameRu: 'Некачественный товар',
      icon: '❌'
    },
    {
      id: 4,
      name: t.language === 'kg' ? 'Кыялдан айырма' : 'Не соответствует ожиданиям',
      nameKg: 'Кыялдан айырма',
      nameRu: 'Не соответствует ожиданиям',
      icon: '😞'
    },
    {
      id: 5,
      name: t.language === 'kg' ? 'Кайтаруу укугу' : 'Право на возврат',
      nameKg: 'Кайтаруу укугу',
      nameRu: 'Право на возврат',
      icon: '↩️'
    },
    {
      id: 6,
      name: t.language === 'kg' ? 'Башка себеп' : 'Другая причина',
      nameKg: 'Башка себеп',
      nameRu: 'Другая причина',
      icon: '❓'
    }
  ]

  const returnSteps = [
    {
      step: 1,
      title: t.language === 'kg' ? 'Заявка жасоо' : 'Подача заявки',
      titleKg: 'Заявка жасоо',
      titleRu: 'Подача заявки',
      description: t.language === 'kg' 
        ? 'Кайтаруу заявкасын толтуруңуз жана биз менен байланышыңыз'
        : 'Заполните заявку на возврат и свяжитесь с нами',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      step: 2,
      title: t.language === 'kg' ? 'Текшерүү' : 'Проверка',
      titleKg: 'Текшерүү',
      titleRu: 'Проверка',
      description: t.language === 'kg' 
        ? 'Биз сиздин заявкаңызды текшеребиз жана кайтарууну бекитебиз'
        : 'Мы проверим вашу заявку и подтвердим возврат',
      icon: Package,
      color: 'text-blue-500'
    },
    {
      step: 3,
      title: t.language === 'kg' ? 'Жөнөтүү' : 'Отправка',
      titleKg: 'Жөнөтүү',
      titleRu: 'Отправка',
      description: t.language === 'kg' 
        ? 'Товарды биздин дүкөнгө жөнөтүңүз же курьер менен тапшырыңыз'
        : 'Отправьте товар в наш магазин или передайте курьеру',
      icon: Package,
      color: 'text-orange-500'
    },
    {
      step: 4,
      title: t.language === 'kg' ? 'Акы кайтаруу' : 'Возврат денег',
      titleKg: 'Акы кайтаруу',
      titleRu: 'Возврат денег',
      description: t.language === 'kg' 
        ? 'Товарды алуудан кийин акыңызды кайтарабыз'
        : 'После получения товара мы вернем ваши деньги',
      icon: CheckCircle,
      color: 'text-green-500'
    }
  ]

  const returnConditions = [
    {
      id: 1,
      title: t.language === 'kg' ? 'Убакыт чектөөсү' : 'Временные ограничения',
      titleKg: 'Убакыт чектөөсү',
      titleRu: 'Временные ограничения',
      description: t.language === 'kg' 
        ? 'Товарды алуудан кийин 14 күн ичинде кайтарууга болот'
        : 'Товар можно вернуть в течение 14 дней после получения',
      icon: Clock,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      title: t.language === 'kg' ? 'Товардын абалы' : 'Состояние товара',
      titleKg: 'Товардын абалы',
      titleRu: 'Состояние товара',
      description: t.language === 'kg' 
        ? 'Товар толук сакталып, этикеткасы жана упаковкасы болушу керек'
        : 'Товар должен быть в полной сохранности с этикеткой и упаковкой',
      icon: Package,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 3,
      title: t.language === 'kg' ? 'Кайтаруу эмес товарлар' : 'Товары не подлежащие возврату',
      titleKg: 'Кайтаруу эмес товарлар',
      titleRu: 'Товары не подлежащие возврату',
      description: t.language === 'kg' 
        ? 'Ички кийимдер, аксессуарлар жана жеке гигиена товарлары'
        : 'Нижнее белье, аксессуары и товары личной гигиены',
      icon: XCircle,
      color: 'bg-red-100 text-red-800'
    }
  ]

  const returnMethods = [
    {
      id: 1,
      name: t.language === 'kg' ? 'Курьер менен' : 'Через курьера',
      nameKg: 'Курьер менен',
      nameRu: 'Через курьера',
      description: t.language === 'kg' 
        ? 'Курьер сиздин үйүңүздөн товарды алып кетет'
        : 'Курьер заберет товар из вашего дома',
      icon: '🚚',
      price: t.language === 'kg' ? 'Акысыз' : 'Бесплатно'
    },
    {
      id: 2,
      name: t.language === 'kg' ? 'Дүкөнгө алып баруу' : 'Принести в магазин',
      nameKg: 'Дүкөнгө алып баруу',
      nameRu: 'Принести в магазин',
      description: t.language === 'kg' 
        ? 'Товарды биздин дүкөнгө алып барыңыз'
        : 'Принесите товар в наш магазин',
      icon: '🏪',
      price: t.language === 'kg' ? 'Акысыз' : 'Бесплатно'
    },
    {
      id: 3,
      name: t.language === 'kg' ? 'Почта менен' : 'Почтой',
      nameKg: 'Почта менен',
      nameRu: 'Почтой',
      description: t.language === 'kg' 
        ? 'Товарды почта аркылуу жөнөтүңүз'
        : 'Отправьте товар почтой',
      icon: '📮',
      price: t.language === 'kg' ? 'Сиз төлөйсүз' : 'Вы оплачиваете'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">
                {t.language === 'kg' ? 'Артка' : 'Назад'}
              </span>
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              {t.language === 'kg' ? 'Кайтаруу' : 'Возвраты'}
            </h1>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t.language === 'kg' ? 'Товарды кайтаруу' : 'Возврат товара'}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t.language === 'kg' 
              ? 'Биз сиздин кайтаруу процессиңизди жөнөкөй жана ыңгайлуу кылабыз. Биздин шарттарыбызды окуңуз.'
              : 'Мы делаем процесс возврата простым и удобным. Ознакомьтесь с нашими условиями.'
            }
          </p>
        </div>

        {/* Return Form */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t.language === 'kg' ? 'Кайтаруу заявкасы' : 'Заявка на возврат'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.language === 'kg' ? 'Заказ номери' : 'Номер заказа'}
              </label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder={t.language === 'kg' ? 'Заказ номериңизди киргизиңиз' : 'Введите номер заказа'}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.language === 'kg' ? 'Кайтаруу себеби' : 'Причина возврата'}
              </label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">
                  {t.language === 'kg' ? 'Себепди тандаңыз' : 'Выберите причину'}
                </option>
                {returnReasons.map((reason) => (
                  <option key={reason.id} value={reason.id}>
                    {reason.icon} {reason.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.language === 'kg' ? 'Кошумча маалымат' : 'Дополнительная информация'}
            </label>
            <textarea
              rows={4}
              placeholder={t.language === 'kg' ? 'Кошумча маалымат киргизиңиз...' : 'Введите дополнительную информацию...'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              {t.language === 'kg' ? 'Заявка жөнөтүү' : 'Отправить заявку'}
            </button>
            <button className="flex-1 border border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
              {t.language === 'kg' ? 'Байланышуу' : 'Связаться'}
            </button>
          </div>
        </div>

        {/* Return Steps */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.language === 'kg' ? 'Кайтаруу процесси' : 'Процесс возврата'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Return Conditions */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.language === 'kg' ? 'Кайтаруу шарттары' : 'Условия возврата'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {returnConditions.map((condition) => (
              <div key={condition.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <condition.icon className="w-6 h-6 text-orange-500" />
                  <h4 className="text-lg font-semibold text-gray-900">{condition.title}</h4>
                </div>
                <p className="text-gray-600">{condition.description}</p>
                <div className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${condition.color}`}>
                  {t.language === 'kg' ? 'Маанилүү' : 'Важно'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return Methods */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.language === 'kg' ? 'Кайтаруу ыкмалары' : 'Способы возврата'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {returnMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{method.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{method.name}</h4>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="text-orange-500 font-semibold">{method.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-4">
            {t.language === 'kg' ? 'Кайтаруу боюнча көмөк' : 'Помощь по возвратам'}
          </h3>
          <p className="text-orange-100 mb-6">
            {t.language === 'kg' 
              ? 'Кайтаруу процесси боюнча суроолоруңуз барбы? Биз менен байланышыңыз!'
              : 'Есть вопросы по процессу возврата? Свяжитесь с нами!'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6" />
              <div>
                <div className="font-semibold">+996 555 123 456</div>
                <div className="text-orange-100 text-sm">
                  {t.language === 'kg' ? 'Дайыма жеткиликтүү' : 'Всегда доступен'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6" />
              <div>
                <div className="font-semibold">returns@storeclient.kg</div>
                <div className="text-orange-100 text-sm">
                  {t.language === 'kg' ? '24 саат ичинде жооп' : 'Ответ в течение 24 часов'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                {t.language === 'kg' ? 'Маанилүү эскертүү' : 'Важное уведомление'}
              </h4>
              <p className="text-yellow-700">
                {t.language === 'kg' 
                  ? 'Кайтаруу процесси 3-5 иш күнүнө созулат. Акы кайтаруу сиз төлөгөн ыкма менен жүргүзүлөт. Кошумча суроолор үчүн биз менен байланышыңыз.'
                  : 'Процесс возврата занимает 3-5 рабочих дней. Возврат денег осуществляется тем же способом, которым вы оплачивали. По дополнительным вопросам свяжитесь с нами.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
