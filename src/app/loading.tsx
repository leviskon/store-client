export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Loading Spinner */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-orange-100 rounded-full mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Загрузка...
          </h2>
          <p className="text-gray-600">
            Пожалуйста, подождите, пока мы загружаем контент.
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
