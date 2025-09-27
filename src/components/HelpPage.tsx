'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Search, ChevronDown, ChevronRight, Phone, Mail, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function HelpPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqCategories = [
    {
      id: 1,
      name: t.language === 'kg' ? 'Заказ жасоо' : 'Оформление заказа',
      nameKg: 'Заказ жасоо',
      nameRu: 'Оформление заказа',
      icon: '🛒',
      faqs: [
        {
          id: 1,
          question: t.language === 'kg' ? 'Заказды кантип жасоого болот?' : 'Как оформить заказ?',
          answer: t.language === 'kg' 
            ? 'Заказ жасоо үчүн товарды тандап, "Сатып алуу" баскычын басыңыз. Андан кийин корзинага өтүп, заказды толуктаңыз.'
            : 'Для оформления заказа выберите товар и нажмите кнопку "Купить". Затем перейдите в корзину и завершите заказ.'
        },
        {
          id: 2,
          question: t.language === 'kg' ? 'Заказды кантип өзгөртүүгө болот?' : 'Как изменить заказ?',
          answer: t.language === 'kg' 
            ? 'Заказды өзгөртүү үчүн биз менен байланышыңыз. Биз сизге жардам беребиз.'
            : 'Для изменения заказа свяжитесь с нами. Мы поможем вам.'
        },
        {
          id: 3,
          question: t.language === 'kg' ? 'Заказды кантип жокко чыгарууга болот?' : 'Как отменить заказ?',
          answer: t.language === 'kg' 
            ? 'Заказды жокко чыгаруу үчүн заказ статусу "Обрабатывается" болгондо биз менен байланышыңыз.'
            : 'Для отмены заказа свяжитесь с нами, когда статус заказа "Обрабатывается".'
        }
      ]
    },
    {
      id: 2,
      name: t.language === 'kg' ? 'Төлөм' : 'Оплата',
      nameKg: 'Төлөм',
      nameRu: 'Оплата',
      icon: '💳',
      faqs: [
        {
          id: 4,
          question: t.language === 'kg' ? 'Кандай төлөм ыкмалары бар?' : 'Какие способы оплаты доступны?',
          answer: t.language === 'kg' 
            ? 'Биз карта менен, наличный төлөм жана банктык которууну кабыл алабыз.'
            : 'Мы принимаем оплату картой, наличными и банковским переводом.'
        },
        {
          id: 5,
          question: t.language === 'kg' ? 'Төлөм коопсузбу?' : 'Безопасна ли оплата?',
          answer: t.language === 'kg' 
            ? 'Ооба, биздин бардык төлөм ыкмалары толук коопсуз жана шифрленген.'
            : 'Да, все наши способы оплаты полностью безопасны и зашифрованы.'
        }
      ]
    },
    {
      id: 3,
      name: t.language === 'kg' ? 'Жеткирүү' : 'Доставка',
      nameKg: 'Жеткирүү',
      nameRu: 'Доставка',
      icon: '🚚',
      faqs: [
        {
          id: 6,
          question: t.language === 'kg' ? 'Жеткирүү канчага созулат?' : 'Сколько длится доставка?',
          answer: t.language === 'kg' 
            ? 'Бишкек шаарында 1-2 күн, аймактарда 3-5 күн.'
            : 'В городе Бишкек 1-2 дня, в регионах 3-5 дней.'
        },
        {
          id: 7,
          question: t.language === 'kg' ? 'Жеткирүү акысы канча?' : 'Сколько стоит доставка?',
          answer: t.language === 'kg' 
            ? 'Бишкек шаарында 200 сом, аймактарда 500 сом. 5000 сомдан жогору заказдарда акысыз.'
            : 'В городе Бишкек 200 сом, в регионах 500 сом. Бесплатно при заказе от 5000 сом.'
        }
      ]
    },
    {
      id: 4,
      name: t.language === 'kg' ? 'Кайтаруу' : 'Возврат',
      nameKg: 'Кайтаруу',
      nameRu: 'Возврат',
      icon: '↩️',
      faqs: [
        {
          id: 8,
          question: t.language === 'kg' ? 'Товарды кантип кайтарууга болот?' : 'Как вернуть товар?',
          answer: t.language === 'kg' 
            ? 'Товарды алуудан кийин 14 күн ичинде кайтарууга болот. Товар толук сакталып, этикеткасы болушу керек.'
            : 'Товар можно вернуть в течение 14 дней после получения. Товар должен быть в полной сохранности с этикеткой.'
        },
        {
          id: 9,
          question: t.language === 'kg' ? 'Кайтаруу акысын кантип алууга болот?' : 'Как получить деньги за возврат?',
          answer: t.language === 'kg' 
            ? 'Кайтаруу акысы сиз төлөгөн ыкма менен кайтарылат.'
            : 'Деньги за возврат возвращаются тем же способом, которым вы оплачивали.'
        }
      ]
    }
  ]

  const allFaqs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, categoryName: category.name }))
  )

  const filteredFaqs = allFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const contactMethods = [
    {
      id: 1,
      name: t.language === 'kg' ? 'Телефон' : 'Телефон',
      nameKg: 'Телефон',
      nameRu: 'Телефон',
      icon: Phone,
      value: '+996 555 123 456',
      description: t.language === 'kg' ? 'Дайыма жеткиликтүү' : 'Всегда доступен',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: t.language === 'kg' ? 'Email' : 'Email',
      nameKg: 'Email',
      nameRu: 'Email',
      icon: Mail,
      value: 'help@storeclient.kg',
      description: t.language === 'kg' ? '24 саат ичинде жооп' : 'Ответ в течение 24 часов',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: t.language === 'kg' ? 'Чат' : 'Чат',
      nameKg: 'Чат',
      nameRu: 'Чат',
      icon: MessageCircle,
      value: t.language === 'kg' ? 'Онлайн чат' : 'Онлайн чат',
      description: t.language === 'kg' ? 'Дайыма жеткиликтүү' : 'Всегда доступен',
      color: 'bg-purple-500'
    }
  ]

  const workingHours = [
    {
      day: t.language === 'kg' ? 'Дүйшөмбү - Жума' : 'Понедельник - Пятница',
      time: '09:00 - 18:00'
    },
    {
      day: t.language === 'kg' ? 'Ишемби' : 'Суббота',
      time: '10:00 - 16:00'
    },
    {
      day: t.language === 'kg' ? 'Жекшемби' : 'Воскресенье',
      time: t.language === 'kg' ? 'Дем алыш' : 'Выходной'
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
              {t.language === 'kg' ? 'Көмөк' : 'Помощь'}
            </h1>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.language === 'kg' ? 'Сизге көмөк керекпи?' : 'Нужна помощь?'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.language === 'kg' 
              ? 'Биз сизге жардам берүүгө дайымыз! Сорууларыңыздын жообун бул жерден табасыз.'
              : 'Мы готовы помочь вам! Найдите ответы на свои вопросы здесь.'
            }
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t.language === 'kg' ? 'Сорууларыңызды издөө...' : 'Поиск вопросов...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method) => (
            <div key={method.id} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.name}</h3>
              <p className="text-gray-600 mb-2">{method.value}</p>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ Categories */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.language === 'kg' ? 'Көп берилүүчү суроолор' : 'Часто задаваемые вопросы'}
          </h3>
          
          {searchQuery ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg shadow-sm">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <span className="text-sm text-orange-500 font-medium">{faq.categoryName}</span>
                      <h4 className="text-lg font-semibold text-gray-900 mt-1">{faq.question}</h4>
                    </div>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {faqCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSearchQuery(category.name)}
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {category.faqs.length} {t.language === 'kg' ? 'суроо' : 'вопросов'}
                  </p>
                  <div className="flex items-center text-orange-500 text-sm font-medium">
                    <span>{t.language === 'kg' ? 'Көрүү' : 'Смотреть'}</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="w-6 h-6 text-orange-500" />
            <h3 className="text-2xl font-bold text-gray-900">
              {t.language === 'kg' ? 'Иш убактысы' : 'Время работы'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workingHours.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{schedule.day}</span>
                <span className="text-gray-600">{schedule.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t.language === 'kg' ? 'Тез көмөк' : 'Быстрая помощь'}
            </h3>
            <p className="text-orange-100 mb-6">
              {t.language === 'kg' 
                ? 'Сиздин сурооңуз бул жерде жокбу? Биз менен түз байланышыңыз!'
                : 'Не нашли ответ на свой вопрос? Свяжитесь с нами напрямую!'
              }
            </p>
            <button
              onClick={() => router.push('/contact')}
              className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t.language === 'kg' ? 'Байланышуу' : 'Связаться'}
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t.language === 'kg' ? 'Заказ статусу' : 'Статус заказа'}
            </h3>
            <p className="text-blue-100 mb-6">
              {t.language === 'kg' 
                ? 'Сиздин заказыңыздын статусун текшерүү үчүн заказ номериңизди киргизиңиз.'
                : 'Введите номер заказа для проверки статуса вашего заказа.'
              }
            </p>
            <button className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t.language === 'kg' ? 'Текшерүү' : 'Проверить'}
            </button>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="text-center bg-gray-100 rounded-lg p-8">
          <CheckCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t.language === 'kg' ? 'Дагы көмөк керекпи?' : 'Все еще нужна помощь?'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t.language === 'kg' 
              ? 'Эгерде сиздин сурооңуз бул жерде жок болсо, биздин команда сизге жардам берүүгө дайымыз. Биз менен байланышыңыз!'
              : 'Если вашего вопроса здесь нет, наша команда готова помочь вам. Свяжитесь с нами!'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/contact')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              {t.language === 'kg' ? 'Байланышуу' : 'Связаться'}
            </button>
            <button className="border border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
              {t.language === 'kg' ? 'Чат ачуу' : 'Открыть чат'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
