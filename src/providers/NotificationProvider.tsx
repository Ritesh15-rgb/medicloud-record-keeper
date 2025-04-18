import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the notification type
export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  read: boolean;
  date: Date;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Calculate unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'date' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Clear/remove a notification
  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  // Initialize with dental-specific notifications
  useEffect(() => {
    setNotifications([
      {
        id: '1',
        title: 'Upcoming Appointment',
        message: 'Root canal treatment with Dr. Smith tomorrow at 2:00 PM',
        type: 'warning',
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 30)
      },
      {
        id: '2',
        title: 'Dental Records Updated',
        message: 'Your dental X-rays have been added to your records',
        type: 'info',
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 60 * 2)
      },
      {
        id: '3',
        title: 'Treatment Plan',
        message: 'New treatment plan for cavity filling has been created',
        type: 'info',
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 60 * 5)
      }
    ]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
