'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageCircle, Send, Instagram, Facebook, Twitter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ContactPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const contactInfo = [
    {
      id: 1,
      title: t.language === 'kg' ? 'Телефон' : 'Телефон',
      titleKg: 'Телефон',
      titleRu: 'Телефон',
      value: '+996 555 123 456',
      description: t.language === 'kg' ? 'Дайыма жеткиликтүү' : 'Всегда доступен',
      icon: Phone,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: t.language === 'kg' ? 'Электрондук почта' : 'Электронная почта',
      titleKg: 'Электрондук почта',
      titleRu: 'Электронная почта',
      value: 'info@storeclient.kg',
      description: t.language === 'kg' ? '24 саат ичинде жооп' : 'Ответ в течение 24 часов',
      icon: Mail,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: t.language === 'kg' ? 'Дареги' : 'Адрес',
      titleKg: 'Дареги',
      titleRu: 'Адрес',
      value: t.language === 'kg' 
        ? 'Бишкек шаары, Чүй проспекти 123'
        : 'г. Бишкек, пр. Чуй 123',
      description: t.language === 'kg' ? 'Дүкөн дареги' : 'Адрес магазина',
      icon: MapPin,
      color: 'bg-orange-500'
    },
    {
      id: 4,
      title: t.language === 'kg' ? 'Иш убактысы' : 'Время работы',
      titleKg: 'Иш убактысы',
      titleRu: 'Время работы',
      value: t.language === 'kg' ? '09:00 - 18:00' : '09:00 - 18:00',
      description: t.language === 'kg' ? 'Дүйшөмбү - Жума' : 'Понедельник - Пятница',
      icon: Clock,
      color: 'bg-purple-500'
    }
  ]

  const departments = [
    {
      id: 1,
      name: t.language === 'kg' ? 'Кардарларды тейлөө' : 'Служба поддержки',
      nameKg: 'Кардарларды тейлөө',
      nameRu: 'Служба поддержки',
      email: 'support@storeclient.kg',
      phone: '+996 555 123 456',
      description: t.language === 'kg' 
        ? 'Заказлар, жеткирүү жана кайтаруу боюнча суроолор'
        : 'Вопросы по заказам, доставке и возвратам'
    },
    {
      id: 2,
      name: t.language === 'kg' ? 'Сатуу бөлүмү' : 'Отдел продаж',
      nameKg: 'Сатуу бөлүмү',
      nameRu: 'Отдел продаж',
      email: 'sales@storeclient.kg',
      phone: '+996 555 123 457',
      description: t.language === 'kg' 
        ? 'Жаңы товарлар жана акциялар жөнүндө маалымат'
        : 'Информация о новых товарах и акциях'
    },
    {
      id: 3,
      name: t.language === 'kg' ? 'Техникалык көмөк' : 'Техническая поддержка',
      nameKg: 'Техникалык көмөк',
      nameRu: 'Техническая поддержка',
      email: 'tech@storeclient.kg',
      phone: '+996 555 123 458',
      description: t.language === 'kg' 
        ? 'Сайт жана техникалык көйгөйлөр'
        : 'Проблемы с сайтом и технические вопросы'
    }
  ]

  const socialMedia = [
    {
      id: 1,
      name: 'Instagram',
      url: 'https://instagram.com/storeclient',
      icon: Instagram,
      color: 'bg-pink-500'
    },
    {
      id: 2,
      name: 'Facebook',
      url: 'https://facebook.com/storeclient',
      icon: Facebook,
      color: 'bg-blue-600'
    },
    {
      id: 3,
      name: 'Twitter',
      url: 'https://twitter.com/storeclient',
      icon: Twitter,
      color: 'bg-blue-400'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

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
              {t.language === 'kg' ? 'Байланышуу' : 'Контакты'}
            </h1>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.language === 'kg' ? 'Биз менен байланышыңыз' : 'Свяжитесь с нами'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.language === 'kg' 
              ? 'Сорууларыңыз барбы? Биз сизге жардам берүүгө дайымыз! Биз менен ар кандай ыкма менен байланышыңыз.'
              : 'Есть вопросы? Мы готовы помочь вам! Свяжитесь с нами любым удобным способом.'
            }
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info) => (
            <div key={info.id} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <info.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-600 mb-2">{info.value}</p>
              <p className="text-sm text-gray-500">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t.language === 'kg' ? 'Бизге кат жөнөтүңүз' : 'Отправьте нам сообщение'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.language === 'kg' ? 'Атыңыз' : 'Ваше имя'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t.language === 'kg' ? 'Атыңызды киргизиңиз' : 'Введите ваше имя'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.language === 'kg' ? 'Электрондук почта' : 'Электронная почта'} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t.language === 'kg' ? 'email@example.com' : 'email@example.com'}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.language === 'kg' ? 'Телефон номери' : 'Номер телефона'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+996 555 123 456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.language === 'kg' ? 'Тема' : 'Тема'} *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">
                      {t.language === 'kg' ? 'Теманы тандаңыз' : 'Выберите тему'}
                    </option>
                    <option value="order">
                      {t.language === 'kg' ? 'Заказ жөнүндө' : 'О заказе'}
                    </option>
                    <option value="delivery">
                      {t.language === 'kg' ? 'Жеткирүү жөнүндө' : 'О доставке'}
                    </option>
                    <option value="return">
                      {t.language === 'kg' ? 'Кайтаруу жөнүндө' : 'О возврате'}
                    </option>
                    <option value="technical">
                      {t.language === 'kg' ? 'Техникалык көмөк' : 'Техническая поддержка'}
                    </option>
                    <option value="other">
                      {t.language === 'kg' ? 'Башка' : 'Другое'}
                    </option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.language === 'kg' ? 'Кат' : 'Сообщение'} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={t.language === 'kg' 
                    ? 'Сиздин катыңызды бул жерге жазыңыз...'
                    : 'Напишите ваше сообщение здесь...'
                  }
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{t.language === 'kg' ? 'Кат жөнөтүү' : 'Отправить сообщение'}</span>
              </button>
            </form>
          </div>

          {/* Departments and Social Media */}
          <div className="space-y-8">
            {/* Departments */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t.language === 'kg' ? 'Бөлүмдөр' : 'Отделы'}
              </h3>
              <div className="space-y-6">
                {departments.map((dept) => (
                  <div key={dept.id} className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{dept.name}</h4>
                    <p className="text-gray-600 mb-3">{dept.description}</p>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{dept.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{dept.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t.language === 'kg' ? 'Социалдык тармактар' : 'Социальные сети'}
              </h3>
              <p className="text-gray-600 mb-6">
                {t.language === 'kg' 
                  ? 'Биздин социалдык тармактарда биз менен байланышыңыз жана жаңылыктарды алыңыз.'
                  : 'Свяжитесь с нами в социальных сетях и получайте новости.'
                }
              </p>
              <div className="flex space-x-4">
                {socialMedia.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                {t.language === 'kg' ? 'Тез байланыш' : 'Быстрая связь'}
              </h3>
              <p className="text-orange-100 mb-6">
                {t.language === 'kg' 
                  ? 'Тез жооп керекпи? Биздин телефон номерин колдонуңуз!'
                  : 'Нужен быстрый ответ? Используйте наш номер телефона!'
                }
              </p>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6" />
                <span className="text-xl font-semibold">+996 555 123 456</span>
              </div>
              <div className="mt-4">
                <span className="text-orange-100 text-sm">
                  {t.language === 'kg' ? 'Дайыма жеткиликтүү' : 'Всегда доступен'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t.language === 'kg' ? 'Биздин жайгашкан жери' : 'Наше местоположение'}
          </h3>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {t.language === 'kg' 
                  ? 'Карта бул жерде көрсөтүлөт'
                  : 'Карта будет отображаться здесь'
                }
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {t.language === 'kg' 
                  ? 'Бишкек шаары, Чүй проспекти 123'
                  : 'г. Бишкек, пр. Чуй 123'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
