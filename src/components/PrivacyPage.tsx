'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Shield, Lock, Eye, User, Database, AlertTriangle, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PrivacyPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const privacySections = [
    {
      id: 1,
      title: t.language === 'kg' ? 'Маалымат топтоо' : 'Сбор информации',
      titleKg: 'Маалымат топтоо',
      titleRu: 'Сбор информации',
      icon: Database,
      content: [
        {
          subtitle: t.language === 'kg' ? 'Жеке маалымат' : 'Личная информация',
          text: t.language === 'kg' 
            ? 'Биз сиздин атыңыз, электрондук почтаңыз, телефон номериңиз, дарегиңиз жана башка жеке маалыматтарыңызды топтойбуз.'
            : 'Мы собираем ваше имя, электронную почту, номер телефона, адрес и другую личную информацию.'
        },
        {
          subtitle: t.language === 'kg' ? 'Техникалык маалымат' : 'Техническая информация',
          text: t.language === 'kg' 
            ? 'Биз сиздин браузериңиздин маалыматын, IP дарегиңизди, кукилерди жана башка техникалык маалыматтарды топтойбуз.'
            : 'Мы собираем информацию о вашем браузере, IP-адрес, куки и другую техническую информацию.'
        }
      ]
    },
    {
      id: 2,
      title: t.language === 'kg' ? 'Маалыматты колдонуу' : 'Использование информации',
      titleKg: 'Маалыматты колдонуу',
      titleRu: 'Использование информации',
      icon: User,
      content: [
        {
          subtitle: t.language === 'kg' ? 'Кызмат көрсөтүү' : 'Предоставление услуг',
          text: t.language === 'kg' 
            ? 'Биз сиздин маалыматтарыңызды кызмат көрсөтүү үчүн колдонобуз.'
            : 'Мы используем вашу информацию для предоставления услуг.'
        },
        {
          subtitle: t.language === 'kg' ? 'Билдирүүлөр' : 'Уведомления',
          text: t.language === 'kg' 
            ? 'Биз сизге заказ статусу, жаңы товарлар жана акциялар жөнүндө билдирүүлөр жөнөтөбиз.'
            : 'Мы отправляем вам уведомления о статусе заказа, новых товарах и акциях.'
        }
      ]
    },
    {
      id: 3,
      title: t.language === 'kg' ? 'Маалыматты бөлүшүү' : 'Обмен информацией',
      titleKg: 'Маалыматты бөлүшүү',
      titleRu: 'Обмен информацией',
      icon: Eye,
      content: [
        {
          subtitle: t.language === 'kg' ? 'Үчүнчү тараптар' : 'Третьи стороны',
          text: t.language === 'kg' 
            ? 'Биз сиздин маалыматтарыңызды үчүнчү тараптарга бере албайбыз, эгерде мыйзам талап кылбаса.'
            : 'Мы не передаем вашу информацию третьим лицам, если этого не требует закон.'
        },
        {
          subtitle: t.language === 'kg' ? 'Кызматкерлер' : 'Сотрудники',
          text: t.language === 'kg' 
            ? 'Биздин кызматкерлер сиздин маалыматтарыңызды кызмат көрсөтүү үчүн гана колдонушу мүмкүн.'
            : 'Наши сотрудники могут использовать вашу информацию только для предоставления услуг.'
        }
      ]
    },
    {
      id: 4,
      title: t.language === 'kg' ? 'Коопсуздук' : 'Безопасность',
      titleKg: 'Коопсуздук',
      titleRu: 'Безопасность',
      icon: Lock,
      content: [
        {
          subtitle: t.language === 'kg' ? 'Маалыматты коргоо' : 'Защита информации',
          text: t.language === 'kg' 
            ? 'Биз сиздин маалыматтарыңызды коргоо үчүн бардык зарыл чараларды көрөбүз.'
            : 'Мы принимаем все необходимые меры для защиты вашей информации.'
        },
        {
          subtitle: t.language === 'kg' ? 'Шифрлөө' : 'Шифрование',
          text: t.language === 'kg' 
            ? 'Биздин сайт SSL шифрлөөсүн колдонот жана бардык маалыматтар коопсуз ташылат.'
            : 'Наш сайт использует SSL-шифрование и все данные передаются безопасно.'
        }
      ]
    }
  ]

  const userRights = [
    {
      id: 1,
      title: t.language === 'kg' ? 'Маалыматты көрүү' : 'Просмотр информации',
      titleKg: 'Маалыматты көрүү',
      titleRu: 'Просмотр информации',
      description: t.language === 'kg' 
        ? 'Сиз биздин сиз жөнүндө топтоган маалыматты көрө аласыз.'
        : 'Вы можете просмотреть информацию, которую мы собрали о вас.',
      icon: Eye
    },
    {
      id: 2,
      title: t.language === 'kg' ? 'Маалыматты өзгөртүү' : 'Изменение информации',
      titleKg: 'Маалыматты өзгөртүү',
      titleRu: 'Изменение информации',
      description: t.language === 'kg' 
        ? 'Сиз өз маалыматтарыңызды каалаган убакта өзгөртө аласыз.'
        : 'Вы можете изменить свою информацию в любое время.',
      icon: User
    },
    {
      id: 3,
      title: t.language === 'kg' ? 'Маалыматты жок кылуу' : 'Удаление информации',
      titleKg: 'Маалыматты жок кылуу',
      titleRu: 'Удаление информации',
      description: t.language === 'kg' 
        ? 'Сиз өз маалыматтарыңызды жок кылууну сурай аласыз.'
        : 'Вы можете запросить удаление своей информации.',
      icon: Database
    },
    {
      id: 4,
      title: t.language === 'kg' ? 'Маалыматты экспорттоо' : 'Экспорт информации',
      titleKg: 'Маалыматты экспорттоо',
      titleRu: 'Экспорт информации',
      description: t.language === 'kg' 
        ? 'Сиз өз маалыматтарыңызды экспорттоо мүмкүнчүлүгүнө ээсиз.'
        : 'У вас есть возможность экспортировать свою информацию.',
      icon: Database
    }
  ]

  const cookies = [
    {
      type: t.language === 'kg' ? 'Зарыл кукилер' : 'Необходимые куки',
      typeKg: 'Зарыл кукилер',
      typeRu: 'Необходимые куки',
      description: t.language === 'kg' 
        ? 'Бул кукилер сайттын иштөөсү үчүн зарыл.'
        : 'Эти куки необходимы для работы сайта.',
      required: true
    },
    {
      type: t.language === 'kg' ? 'Функционалдык кукилер' : 'Функциональные куки',
      typeKg: 'Функционалдык кукилер',
      typeRu: 'Функциональные куки',
      description: t.language === 'kg' 
        ? 'Бул кукилер сайттын функцияларын жакшыртат.'
        : 'Эти куки улучшают функции сайта.',
      required: false
    },
    {
      type: t.language === 'kg' ? 'Аналитикалык кукилер' : 'Аналитические куки',
      typeKg: 'Аналитикалык кукилер',
      typeRu: 'Аналитические куки',
      description: t.language === 'kg' 
        ? 'Бул кукилер сайттын иштөөсүн анализдөө үчүн колдонулат.'
        : 'Эти куки используются для анализа работы сайта.',
      required: false
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
              {t.language === 'kg' ? 'Жеке маалыматтын коопсуздугу' : 'Конфиденциальность'}
            </h1>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t.language === 'kg' ? 'Жеке маалыматтын коопсуздугу' : 'Конфиденциальность'}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t.language === 'kg' 
              ? 'Биз сиздин жеке маалыматтарыңызды коргоону маанилүү деп эсептейбиз. Бул саясат сиздин маалыматтарыңызды кантип топтоп, колдонуп, коргой турганыбызды түшүндүрөт.'
              : 'Мы считаем важным защиту ваших личных данных. Эта политика объясняет, как мы собираем, используем и защищаем вашу информацию.'
            }
          </p>
          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
            {t.language === 'kg' ? 'Акыркы жаңылануу: 2024-жыл 1-январь' : 'Последнее обновление: 1 января 2024 года'}
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          {privacySections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <section.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{section.title}</h3>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {section.content.map((item, index) => (
                  <div key={index}>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">{item.subtitle}</h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Rights */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.language === 'kg' ? 'Кардардын укуктары' : 'Права пользователя'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userRights.map((right) => (
              <div key={right.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <right.icon className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{right.title}</h4>
                    <p className="text-gray-600">{right.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cookies Policy */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t.language === 'kg' ? 'Куки саясаты' : 'Политика куки'}
          </h3>
          <p className="text-gray-600 mb-6">
            {t.language === 'kg' 
              ? 'Биздин сайт кукилерди колдонот. Кукилер - бул сиздин компьютерде сакталган кичинекей файлдар.'
              : 'Наш сайт использует куки. Куки - это небольшие файлы, сохраняемые на вашем компьютере.'
            }
          </p>
          <div className="space-y-4">
            {cookies.map((cookie, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {cookie.required ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{cookie.type}</h4>
                  <p className="text-gray-600 text-sm">{cookie.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    cookie.required 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cookie.required 
                      ? (t.language === 'kg' ? 'Зарыл' : 'Необходимо')
                      : (t.language === 'kg' ? 'Опционалдык' : 'Опционально')
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t.language === 'kg' ? 'Маалыматты сактоо мөөнөтү' : 'Срок хранения данных'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {t.language === 'kg' ? 'Жеке маалымат' : 'Личная информация'}
              </h4>
              <p className="text-gray-600">
                {t.language === 'kg' 
                  ? 'Сиздин жеке маалыматтарыңыз сиздин аккаунтуңуз активдүү болгондо гана сакталат.'
                  : 'Ваши личные данные хранятся только пока ваш аккаунт активен.'
                }
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {t.language === 'kg' ? 'Техникалык маалымат' : 'Техническая информация'}
              </h4>
              <p className="text-gray-600">
                {t.language === 'kg' 
                  ? 'Техникалык маалымат 2 жылга чейин сакталат.'
                  : 'Техническая информация хранится в течение 2 лет.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-4">
            {t.language === 'kg' ? 'Байланыш маалыматы' : 'Контактная информация'}
          </h3>
          <p className="text-orange-100 mb-6">
            {t.language === 'kg' 
              ? 'Конфиденциальность боюнча суроолоруңуз барбы? Биз менен байланышыңыз!'
              : 'Есть вопросы по конфиденциальности? Свяжитесь с нами!'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">
                {t.language === 'kg' ? 'Электрондук почта' : 'Электронная почта'}
              </h4>
              <p className="text-orange-100">privacy@storeclient.kg</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {t.language === 'kg' ? 'Телефон' : 'Телефон'}
              </h4>
              <p className="text-orange-100">+996 555 123 456</p>
            </div>
          </div>
        </div>

        {/* Changes to Policy */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                {t.language === 'kg' ? 'Саясаттын өзгөрүшү' : 'Изменения в политике'}
              </h4>
              <p className="text-yellow-700">
                {t.language === 'kg' 
                  ? 'Биз бул саясатты каалаган убакта өзгөртө алабыз. Өзгөрүүлөр тууралуу сизди электрондук почта аркылуу билдиребиз.'
                  : 'Мы можем изменить эту политику в любое время. О изменениях мы уведомим вас по электронной почте.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
