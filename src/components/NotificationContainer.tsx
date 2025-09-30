'use client'

import { useNotification } from '@/context/NotificationContext'
import NotificationToast from './NotificationToast'

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="fixed top-4 right-4 left-4 md:left-auto z-[9999] pointer-events-none">
      <div className="flex flex-col gap-3 items-end">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className="pointer-events-auto transform-gpu w-full md:w-auto notification-stack"
            style={{
              animationDelay: `${index * 100}ms`,
              zIndex: 9999 - index,
              transform: `translateY(${index * 8}px)`
            }}
          >
            <NotificationToast
              type={notification.type}
              message={notification.message}
              productName={notification.productName}
              isVisible={true}
              onClose={() => removeNotification(notification.id)}
              duration={notification.duration}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
