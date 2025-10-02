'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Package, CheckCircle, XCircle, Phone, Mail, AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AppLayout from '@/components/AppLayout'

export default function ReturnsPage() {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <AppLayout showHeader={false} showBottomNav={true}>
      <div className="min-h-screen bg-gray-50">
      {/* Header как на странице Избранное */}
      <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <h1 className="text-lg font-medium text-white">{t.returns}</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t.returnPolicy}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.returnPolicyDescription}
          </p>
        </div>

        {/* Return Conditions */}
        <div className="grid gap-6 md:gap-8 mb-8">
          {/* Возврат возможен */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-green-50 border-b border-green-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800">{t.returnPossible}</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.onDeliveryReturn}</h4>
                  <p className="text-gray-600">{t.onDeliveryReturnDesc}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.checkOnDelivery}</h4>
                  <p className="text-gray-600">{t.checkOnDeliveryDesc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Возврат невозможен */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-red-50 border-b border-red-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-red-800">{t.noOtherReturns}</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-600">{t.noOtherReturnsDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Return Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            {t.returnSteps}
          </h3>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t.step1Title}</h4>
                <p className="text-gray-600">{t.step1Desc}</p>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-6 h-6 border-r-2 border-b-2 border-gray-300 transform rotate-45"></div>
            </div>
            
            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t.step2Title}</h4>
                <p className="text-gray-600">{t.step2Desc}</p>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-6 h-6 border-r-2 border-b-2 border-gray-300 transform rotate-45"></div>
            </div>
            
            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t.step3Title}</h4>
                <p className="text-gray-600">{t.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 text-white mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">{t.contactSupport}</h3>
            <p className="text-orange-100">{t.contactSupportDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">+996 555 123 456</div>
                <div className="text-orange-100 text-sm">{t.alwaysAvailable}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">support@storeclient.kg</div>
                <div className="text-orange-100 text-sm">{t.responseWithin24h}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">{t.importantNotice}</h4>
              <p className="text-yellow-700">
                {t.returnProcessInfo}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
      </div>
    </AppLayout>
  )
}
