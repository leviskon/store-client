'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Truck, Clock, MapPin, Phone, Mail, CheckCircle, AlertCircle, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeliveryPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [trackingNumber, setTrackingNumber] = useState('')

  const deliveryZones = [
    {
      id: 1,
      name: language === 'kg' ? 'Бишкек шаары' : 'Город Бишкек',
      nameKg: 'Бишкек шаары',
      nameRu: 'Город Бишкек',
      deliveryTime: language === 'kg' ? '1-2 күн' : '1-2 дня',
      cost: language === 'kg' ? '200 с.' : '200 с.',
      freeFrom: language === 'kg' ? '5000 с.' : '5000 с.',
      icon: '🏙️'
    },
    {
      id: 2,
      name: language === 'kg' ? 'Чүй облусу' : 'Чуйская область',
      nameKg: 'Чүй облусу',
      nameRu: 'Чуйская область',
      deliveryTime: language === 'kg' ? '2-3 күн' : '2-3 дня',
      cost: language === 'kg' ? '300 с.' : '300 с.',
      freeFrom: language === 'kg' ? '7000 с.' : '7000 с.',
      icon: '🏘️'
    },
    {
      id: 3,
      name: language === 'kg' ? 'Башка облустар' : 'Другие области',
      nameKg: 'Башка облустар',
      nameRu: 'Другие области',
      deliveryTime: language === 'kg' ? '3-5 күн' : '3-5 дней',
      cost: language === 'kg' ? '500 с.' : '500 с.',
      freeFrom: language === 'kg' ? '10000 с.' : '10000 с.',
      icon: '🌄'
    }
  ]

  const deliveryMethods = [
    {
      id: 1,
      name: language === 'kg' ? 'Курьер жеткирүү' : 'Курьерская доставка',
      nameKg: 'Курьер жеткирүү',
      nameRu: 'Курьерская доставка',
      description: language === 'kg' 
        ? 'Курьер сиздин көрсөткөн дарегиңизге товарды жеткирет'
        : 'Курьер доставит товар по указанному вами адресу',
      icon: Truck,
      features: [
        language === 'kg' ? 'Үйгө жеткирүү' : 'Доставка на дом',
        language === 'kg' ? 'Текшерүү мүмкүнчүлүгү' : 'Возможность проверки',
        language === 'kg' ? 'Төлөмдүн түрүн тандоо' : 'Выбор способа оплаты'
      ],
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: language === 'kg' ? 'Почта аркылуу' : 'Почтовая доставка',
      nameKg: 'Почта аркылуу',
      nameRu: 'Почтовая доставка',
      description: language === 'kg' 
        ? 'Товарды почта аркылуу жеткирүү'
        : 'Доставка товара почтой',
      icon: Package,
      features: [
        language === 'kg' ? 'Арзан баа' : 'Низкая цена',
        language === 'kg' ? 'Бардык жерге жеткирүү' : 'Доставка везде',
        language === 'kg' ? 'Кутучада сакталуу' : 'Сохранность в упаковке'
      ],
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: language === 'kg' ? 'Дүкөндөн алуу' : 'Самовывоз',
      nameKg: 'Дүкөндөн алуу',
      nameRu: 'Самовывоз',
      description: language === 'kg' 
        ? 'Товарды дүкөндөн өзүңүз алып кетесиз'
        : 'Вы сами забираете товар из магазина',
      icon: MapPin,
      features: [
        language === 'kg' ? 'Акысыз' : 'Бесплатно',
        language === 'kg' ? 'Тез алуу' : 'Быстрое получение',
        language === 'kg' ? 'Текшерүү мүмкүнчүлүгү' : 'Возможность проверки'
      ],
      color: 'bg-orange-500'
    }
  ]

  const deliverySteps = [
    {
      step: 1,
      title: language === 'kg' ? 'Заказ жасоо' : 'Оформление заказа',
      titleKg: 'Заказ жасоо',
      titleRu: 'Оформление заказа',
      description: language === 'kg' 
        ? 'Товарды тандап, заказды толуктаңыз'
        : 'Выберите товар и завершите заказ',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      step: 2,
      title: language === 'kg' ? 'Обработка' : 'Обработка',
      titleKg: 'Обработка',
      titleRu: 'Обработка',
      description: language === 'kg' 
        ? 'Биз сиздин заказыңызды даярдайбыз'
        : 'Мы подготавливаем ваш заказ',
      icon: Package,
      color: 'text-blue-500'
    },
    {
      step: 3,
      title: language === 'kg' ? 'Жөнөтүү' : 'Отправка',
      titleKg: 'Жөнөтүү',
      titleRu: 'Отправка',
      description: language === 'kg' 
        ? 'Товарды жөнөтүүгө жиберилди'
        : 'Товар отправлен в доставку',
      icon: Truck,
      color: 'text-orange-500'
    },
    {
      step: 4,
      title: language === 'kg' ? 'Жеткирүү' : 'Доставка',
      titleKg: 'Жеткирүү',
      titleRu: 'Доставка',
      description: language === 'kg' 
        ? 'Товар сизге жеткирилди'
        : 'Товар доставлен вам',
      icon: CheckCircle,
      color: 'text-green-500'
    }
  ]

  const deliveryFeatures = [
    {
      id: 1,
      title: language === 'kg' ? 'Тез жеткирүү' : 'Быстрая доставка',
      titleKg: 'Тез жеткирүү',
      titleRu: 'Быстрая доставка',
      description: language === 'kg' 
        ? 'Бишкек шаарында 1-2 күндө жеткиребиз'
        : 'В Бишкеке доставляем за 1-2 дня',
      icon: Clock,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      title: language === 'kg' ? 'Коопсуз жеткирүү' : 'Безопасная доставка',
      titleKg: 'Коопсуз жеткирүү',
      titleRu: 'Безопасная доставка',
      description: language === 'kg' 
        ? 'Товар коопсуз жана сакталуу менен жеткирилет'
        : 'Товар доставляется безопасно и в сохранности',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 3,
      title: language === 'kg' ? 'Текшерүү мүмкүнчүлүгү' : 'Возможность проверки',
      titleKg: 'Текшерүү мүмкүнчүлүгү',
      titleRu: 'Возможность проверки',
      description: language === 'kg' 
        ? 'Товарды алуудан мурун текшере аласыз'
        : 'Можете проверить товар перед получением',
      icon: Package,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: 4,
      title: language === 'kg' ? 'Акысыз жеткирүү' : 'Бесплатная доставка',
      titleKg: 'Акысыз жеткирүү',
      titleRu: 'Бесплатная доставка',
      description: language === 'kg' 
        ? 'Белгилүү суммадан жогору заказдарда акысыз'
        : 'Бесплатно при заказе на определенную сумму',
      icon: CheckCircle,
      color: 'bg-purple-100 text-purple-800'
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
                {language === 'kg' ? 'Артка' : 'Назад'}
              </span>
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              {language === 'kg' ? 'Жеткирүү' : 'Доставка'}
            </h1>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'kg' ? 'Жеткирүү кызматы' : 'Служба доставки'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'kg' 
              ? 'Биз сиздин заказыңызды тез жана коопсуз жеткиребиз. Бардык жерге жеткирүү мүмкүнчүлүгү бар.'
              : 'Мы быстро и безопасно доставим ваш заказ. Доставка возможна везде.'
            }
          </p>
        </div>

        {/* Delivery Zones */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {language === 'kg' ? 'Жеткирүү зоналары' : 'Зоны доставки'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryZones.map((zone) => (
              <div key={zone.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4 text-center">{zone.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">{zone.name}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {language === 'kg' ? 'Убакыт:' : 'Время:'}
                    </span>
                    <span className="font-semibold text-gray-900">{zone.deliveryTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {language === 'kg' ? 'Акысы:' : 'Стоимость:'}
                    </span>
                    <span className="font-semibold text-gray-900">{zone.cost}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {language === 'kg' ? 'Акысыз:' : 'Бесплатно:'}
                    </span>
                    <span className="font-semibold text-orange-500">{zone.freeFrom}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Methods */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {language === 'kg' ? 'Жеткирүү ыкмалары' : 'Способы доставки'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3 text-center">{method.name}</h4>
                <p className="text-gray-600 mb-4 text-center">{method.description}</p>
                <ul className="space-y-2">
                  {method.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Process */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {language === 'kg' ? 'Жеткирүү процесси' : 'Процесс доставки'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((step) => (
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

        {/* Delivery Features */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {language === 'kg' ? 'Жеткирүү мүмкүнчүлүктөрү' : 'Возможности доставки'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryFeatures.map((feature) => (
              <div key={feature.id} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <feature.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
                <div className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${feature.color}`}>
                  {language === 'kg' ? 'Жеткиликтүү' : 'Доступно'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {language === 'kg' ? 'Заказды көзөмөлдөө' : 'Отслеживание заказа'}
          </h3>
          <div className="max-w-md mx-auto">
            <div className="flex space-x-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={language === 'kg' ? 'Заказ номериңизди киргизиңиз' : 'Введите номер заказа'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                {language === 'kg' ? 'Көзөмөлдөө' : 'Отследить'}
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-4 text-center">
              {language === 'kg' 
                ? 'Заказ номериңизди киргизип, анын статусун текшериңиз'
                : 'Введите номер заказа и проверьте его статус'
              }
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-4">
            {language === 'kg' ? 'Жеткирүү боюнча көмөк' : 'Помощь по доставке'}
          </h3>
          <p className="text-orange-100 mb-6">
            {language === 'kg' 
              ? 'Жеткирүү боюнча суроолоруңуз барбы? Биз менен байланышыңыз!'
              : 'Есть вопросы по доставке? Свяжитесь с нами!'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6" />
              <div>
                <div className="font-semibold">+996 555 123 456</div>
                <div className="text-orange-100 text-sm">
                  {language === 'kg' ? 'Дайыма жеткиликтүү' : 'Всегда доступен'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6" />
              <div>
                <div className="font-semibold">delivery@storeclient.kg</div>
                <div className="text-orange-100 text-sm">
                  {language === 'kg' ? '24 саат ичинде жооп' : 'Ответ в течение 24 часов'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                {language === 'kg' ? 'Маанилүү маалымат' : 'Важная информация'}
              </h4>
              <ul className="text-blue-700 space-y-2">
                <li>• {language === 'kg' ? 'Жеткирүү убактысы иш күндөрүндө эсептелет' : 'Время доставки считается в рабочие дни'}</li>
                <li>• {language === 'kg' ? 'Товарды алуудан мурун текшериңиз' : 'Проверьте товар перед получением'}</li>
                <li>• {language === 'kg' ? 'Кайтаруу 14 күн ичинде мүмкүн' : 'Возврат возможен в течение 14 дней'}</li>
                <li>• {language === 'kg' ? 'Кошумча суроолор үчүн биз менен байланышыңыз' : 'По дополнительным вопросам свяжитесь с нами'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
