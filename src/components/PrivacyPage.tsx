'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Shield, Lock, Eye, User, Database, AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PrivacyPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const privacySections = [
    {
      id: 1,
      title: t.dataCollection,
      icon: Database,
      content: [
        {
          subtitle: t.personalInfo,
          text: t.personalInfoDesc
        },
        {
          subtitle: t.technicalInfo,
          text: t.technicalInfoDesc
        }
      ]
    },
    {
      id: 2,
      title: t.dataUsage,
      icon: User,
      content: [
        {
          subtitle: t.serviceProvision,
          text: t.serviceProvisionDesc
        },
        {
          subtitle: t.notifications,
          text: t.notificationsDesc
        }
      ]
    },
    {
      id: 3,
      title: t.dataSharing,
      icon: Eye,
      content: [
        {
          subtitle: t.thirdParties,
          text: t.thirdPartiesDesc
        },
        {
          subtitle: t.employees,
          text: t.employeesDesc
        }
      ]
    },
    {
      id: 4,
      title: t.security,
      icon: Lock,
      content: [
        {
          subtitle: t.dataProtection,
          text: t.dataProtectionDesc
        },
        {
          subtitle: t.encryption,
          text: t.encryptionDesc
        }
      ]
    }
  ]

  const userRights = [
    {
      id: 1,
      title: t.accessRight,
      description: t.accessRightDesc,
      icon: Eye,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      title: t.editRight,
      description: t.editRightDesc,
      icon: User,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 3,
      title: t.deleteRight,
      description: t.deleteRightDesc,
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-800'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header как на странице Возвратов */}
      <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <h1 className="text-lg font-medium text-white">{t.privacy}</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t.privacy}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto">
            {t.privacyDescription}
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          {privacySections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <section.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{section.title}</h3>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {section.content.map((item, index) => (
                  <div key={index} className="border-l-4 border-orange-200 pl-4 sm:pl-6">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {item.subtitle}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Rights */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            {t.yourRights}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {userRights.map((right) => (
              <div key={right.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <right.icon className="w-6 h-6 text-orange-500" />
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900">{right.title}</h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  {right.description}
                </p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${right.color}`}>
                  {t.important}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t.contactInfo}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t.contactInfoDesc}
          </p>
        </div>

      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  )
}