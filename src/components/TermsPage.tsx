'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, User, ShoppingCart, CreditCard, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TermsPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const termsSections = [
    {
      id: 1,
      title: t.language === 'kg' ? 'Колдонуу шарттары' : 'Условия использования',
      titleKg: 'Колдонуу шарттары',
      titleRu: 'Условия использования',
      icon: FileText,
      content: [
        {
          subtitle: t.language === 'kg' ? 'Келишим' : 'Соглашение',
          text: t.language === 'kg' 
            ? 'Бул шарттарды колдонуу менен сиз биздин кызматтарды колдонуу шарттары менен макул экениңизди билдиресиз.'
            : 'Используя наши услуги, вы соглашаетесь с условиями их использования.'
        },
        {
          subtitle: t.language === 'kg' ? 'Өзгөрүүлөр' : 'Изменения',
          text: t.language === 'kg' 
            ? 'Биз бул шарттарды каалаган убакта өзгөртө алабыз. Өзгөрүүлөр тууралуу сизди билдиребиз.'
            : 'Мы можем изменить эти условия в любое время. Мы уведомим вас об изменениях.'
        }
      ]
    },
    {
      id: 2,
      title: t.language === 'kg' ? 'Аккаунт жасоо' : 'Создание аккаунта',
      titleKg: 'Аккаунт жасоо',
      titleRu: 'Создание аккаунта',
      icon: User,
      content: [
        {
          subtitle: t.language === 'kg' ? 'Маалыматтын тууралыгы' : 'Точность информации',
          text: t.language === 'kg' 
            ? 'Сиз аккаунт жасоодо туура маалымат берүүгө милдеттүүсүз.'
            : 'Вы обязаны предоставлять точную информацию при создании аккаунта.'
        },
        {
          subtitle: t.language === 'kg' ? 'Аккаунттун коопсуздугу' : 'Безопасность аккаунта',
          text: t.language === 'kg' 
            ? 'Сиз өз аккаунтуңуздун коопсуздугун камсыз кылууга милдеттүүсүз.'
            : 'Вы обязаны обеспечивать безопасность своего аккаунта.'
        }
      ]
    },
    {
      id: 3,
      title: t.language === 'kg' ? 'Заказ жасоо' : 'Оформление заказа',
      titleKg: 'Заказ жасоо',
      titleRu: 'Оформление заказа',
      icon: ShoppingCart,
      content: [
        {
          subtitle: t.language === 'kg' ? 'Заказдын шарттары' : 'Условия заказа',
          text: t.language === 'kg' 
            ? 'Заказ жасоодо сиз бардык шарттарды кабыл аласыз.'
            : 'При оформлении заказа вы принимаете все условия.'
        },
        {
          subtitle: t.language === 'kg' ? 'Баа жана төлөм' : 'Цена и оплата',
          text: t.language === 'kg' 
            ? 'Баалар өзгөрүшү мүмкүн. Төлөм заказ бекитилгенде алынат.'
            : 'Цены могут изменяться. Оплата взимается при подтверждении заказа.'
        }
      ]
    },
    {
      id: 4,
      title: t.language === 'kg' ? 'Жеткирүү жана кайтаруу' : 'Доставка и возврат',
      titleKg: 'Жеткирүү жана кайтаруу',
      titleRu: 'Доставка и возврат',
      icon: Truck,
      content: [
        {
          subtitle: t.language === 'kg' ? 'Жеткирүү шарттары' : 'Условия доставки',
          text: t.language === 'kg' 
            ? 'Жеткирүү убактысы жана баасы аймакка жараша өзгөрөт.'
            : 'Время и стоимость доставки зависят от региона.'
        },
        {
          subtitle: t.language === 'kg' ? 'Кайтаруу укугу' : 'Право на возврат',
          text: t.language === 'kg' 
            ? 'Товарды алуудан кийин 14 күн ичинде кайтарууга болот.'
            : 'Товар можно вернуть в течение 14 дней после получения.'
        }
      ]
    }
  ]

  const userObligations = [
    {
      id: 1,
      title: t.language === 'kg' ? 'Туура маалымат берүү' : 'Предоставление точной информации',
      titleKg: 'Туура маалымат берүү',
      titleRu: 'Предоставление точной информации',
      description: t.language === 'kg' 
        ? 'Сиз бардык маалыматтарды туура жана толук берүүгө милдеттүүсүз.'
        : 'Вы обязаны предоставлять всю информацию точно и полностью.',
      icon: CheckCircle
    },
    {
      id: 2,
      title: t.language === 'kg' ? 'Төлөмдү убагында жасоо' : 'Своевременная оплата',
      titleKg: 'Төлөмдү убагында жасоо',
      titleRu: 'Своевременная оплата',
      description: t.language === 'kg' 
        ? 'Сиз заказдын төлөмүн убагында жасоого милдеттүүсүз.'
        : 'Вы обязаны своевременно оплачивать заказы.',
      icon: CreditCard
    },
    {
      id: 3,
      title: t.language === 'kg' ? 'Кызматтарды туура колдонуу' : 'Правильное использование услуг',
      titleKg: 'Кызматтарды туура колдонуу',
      titleRu: 'Правильное использование услуг',
      description: t.language === 'kg' 
        ? 'Сиз биздин кызматтарды мыйзамга каршы эмес жол менен колдонууга милдеттүүсүз.'
        : 'Вы обязаны использовать наши услуги законным способом.',
      icon: User
    },
    {
      id: 4,
      title: t.language === 'kg' ? 'Жеке маалыматты коргоо' : 'Защита личных данных',
      titleKg: 'Жеке маалыматты коргоо',
      titleRu: 'Защита личных данных',
      description: t.language === 'kg' 
        ? 'Сиз өз жеке маалыматтарыңызды коргоого милдеттүүсүз.'
        : 'Вы обязаны защищать свои личные данные.',
      icon: CheckCircle
    }
  ]

  const prohibitedActions = [
    {
      id: 1,
      action: t.language === 'kg' ? 'Жалган маалымат берүү' : 'Предоставление ложной информации',
      actionKg: 'Жалган маалымат берүү',
      actionRu: 'Предоставление ложной информации',
      consequence: t.language === 'kg' 
        ? 'Аккаунт жокко чыгарылат'
        : 'Аккаунт будет заблокирован'
    },
    {
      id: 2,
      action: t.language === 'kg' ? 'Кызматтарды бузуу' : 'Нарушение работы сервисов',
      actionKg: 'Кызматтарды бузуу',
      actionRu: 'Нарушение работы сервисов',
      consequence: t.language === 'kg' 
        ? 'Доступ токтотулат'
        : 'Доступ будет приостановлен'
    },
    {
      id: 3,
      action: t.language === 'kg' ? 'Автордук укукту бузуу' : 'Нарушение авторских прав',
      actionKg: 'Автордук укукту бузуу',
      actionRu: 'Нарушение авторских прав',
      consequence: t.language === 'kg' 
        ? 'Мыйзамдык чаралар көрүлөт'
        : 'Будут приняты правовые меры'
    },
    {
      id: 4,
      action: t.language === 'kg' ? 'Башка колдонуучуларды алдау' : 'Обман других пользователей',
      actionKg: 'Башка колдонуучуларды алдау',
      actionRu: 'Обман других пользователей',
      consequence: t.language === 'kg' 
        ? 'Аккаунт жокко чыгарылат'
        : 'Аккаунт будет заблокирован'
    }
  ]

  const liabilityLimitations = [
    {
      id: 1,
      title: t.language === 'kg' ? 'Кызматтын убактылуу токтотулушу' : 'Временная недоступность сервиса',
      titleKg: 'Кызматтын убактылуу токтотулушу',
      titleRu: 'Временная недоступность сервиса',
      description: t.language === 'kg' 
        ? 'Биз техникалык көйгөйлөрдүн учурунан кызмат убактылуу токтолсо, биз жоопкерчилик албайбыз.'
        : 'Мы не несем ответственности за временную недоступность сервиса из-за технических проблем.'
    },
    {
      id: 2,
      title: t.language === 'kg' ? 'Үчүнчү тараптардын иш-аракеттери' : 'Действия третьих лиц',
      titleKg: 'Үчүнчү тараптардын иш-аракеттери',
      titleRu: 'Действия третьих лиц',
      description: t.language === 'kg' 
        ? 'Биз үчүнчү тараптардын иш-аракеттери үчүн жоопкерчилик албайбыз.'
        : 'Мы не несем ответственности за действия третьих лиц.'
    },
    {
      id: 3,
      title: t.language === 'kg' ? 'Колдонуучунун кылыктары' : 'Действия пользователя',
      titleKg: 'Колдонуучунун кылыктары',
      titleRu: 'Действия пользователя',
      description: t.language === 'kg' 
        ? 'Биз колдонуучунун кылыктарынан улам келип чыккан зыян үчүн жоопкерчилик албайбыз.'
        : 'Мы не несем ответственности за ущерб, причиненный действиями пользователя.'
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
              {t.language === 'kg' ? 'Колдонуу шарттары' : 'Условия использования'}
            </h1>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-orange-500" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.language === 'kg' ? 'Колдонуу шарттары' : 'Условия использования'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.language === 'kg' 
              ? 'Бул документ биздин кызматтарды колдонуу шарттарын түшүндүрөт. Кызматтарды колдонуу менен сиз бул шарттар менен макул экениңизди билдиресиз.'
              : 'Этот документ объясняет условия использования наших услуг. Используя услуги, вы соглашаетесь с этими условиями.'
            }
          </p>
          <div className="mt-6 text-sm text-gray-500">
            {t.language === 'kg' ? 'Акыркы жаңылануу: 2024-жыл 1-январь' : 'Последнее обновление: 1 января 2024 года'}
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8 mb-12">
          {termsSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center space-x-4 mb-6">
                <section.icon className="w-8 h-8 text-orange-500" />
                <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
              </div>
              <div className="space-y-6">
                {section.content.map((item, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">{item.subtitle}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Obligations */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.language === 'kg' ? 'Колдонуучунун милдеттенмелери' : 'Обязанности пользователя'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userObligations.map((obligation) => (
              <div key={obligation.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <obligation.icon className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{obligation.title}</h4>
                    <p className="text-gray-600">{obligation.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prohibited Actions */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t.language === 'kg' ? 'Тыйылган иш-аракеттер' : 'Запрещенные действия'}
          </h3>
          <div className="space-y-4">
            {prohibitedActions.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{item.action}</h4>
                  <p className="text-red-700 text-sm">{item.consequence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liability Limitations */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.language === 'kg' ? 'Жоопкерчилик чектөөлөрү' : 'Ограничения ответственности'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liabilityLimitations.map((limitation) => (
              <div key={limitation.id} className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{limitation.title}</h4>
                <p className="text-gray-600 text-sm">{limitation.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t.language === 'kg' ? 'Колдонулуучу мыйзам' : 'Применимое право'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {t.language === 'kg' ? 'Кыргыз Республикасынын мыйзамдары' : 'Законы Кыргызской Республики'}
              </h4>
              <p className="text-gray-600">
                {t.language === 'kg' 
                  ? 'Бул шарттар Кыргыз Республикасынын мыйзамдарына ылайык колдонулат.'
                  : 'Эти условия применяются в соответствии с законами Кыргызской Республики.'
                }
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {t.language === 'kg' ? 'Талаштарды чечүү' : 'Разрешение споров'}
              </h4>
              <p className="text-gray-600">
                {t.language === 'kg' 
                  ? 'Бардык талаштар келишим аркылуу чечилиши керек.'
                  : 'Все споры должны решаться путем переговоров.'
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
              ? 'Бул шарттар боюнча суроолоруңуз барбы? Биз менен байланышыңыз!'
              : 'Есть вопросы по этим условиям? Свяжитесь с нами!'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">
                {t.language === 'kg' ? 'Электрондук почта' : 'Электронная почта'}
              </h4>
              <p className="text-orange-100">legal@storeclient.kg</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {t.language === 'kg' ? 'Телефон' : 'Телефон'}
              </h4>
              <p className="text-orange-100">+996 555 123 456</p>
            </div>
          </div>
        </div>

        {/* Acceptance */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-green-800 mb-2">
                {t.language === 'kg' ? 'Шарттарды кабыл алуу' : 'Принятие условий'}
              </h4>
              <p className="text-green-700">
                {t.language === 'kg' 
                  ? 'Биздин кызматтарды колдонуу менен сиз бул шарттарды толук кабыл аласыз. Эгерде сиз бул шарттар менен макул эмес болсоңуз, кызматтарды колдонбоңуз.'
                  : 'Используя наши услуги, вы полностью принимаете эти условия. Если вы не согласны с этими условиями, не используйте услуги.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
