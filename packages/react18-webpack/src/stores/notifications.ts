import { create } from 'zustand'
import { uuid } from '@liutsing/utils'

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message?: string
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  dismissNotification: (id: string) => void
}
/**
 * 管理notification数组
 */
export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    set((state) => ({ notifications: [...state.notifications, { id: uuid(), ...notification }] }))
  },
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),
}))
