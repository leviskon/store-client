'use client'

import { useNotification } from '@/context/NotificationContext'
import NotificationToast from './NotificationToast'

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{
            transform: `translateY(${index * 10}px)`,
            zIndex: 9999 - index
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
  )
}
