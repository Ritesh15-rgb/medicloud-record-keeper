
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
  
  // Initialize with medical-specific notifications
  useEffect(() => {
    setNotifications([
      {
        id: '1',
        title: 'Medication Reminder',
        message: 'Time to take your prescribed antibiotics (2 pills)',
        type: 'warning',
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        id: '2',
        title: 'Appointment Scheduled',
        message: 'Dr. Smith confirmed your cardiology appointment for tomorrow at 10:00 AM',
        type: 'info',
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        id: '3',
        title: 'Lab Results Ready',
        message: 'Your recent blood work results are now available in your records',
        type: 'info',
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
      },
      {
        id: '4',
        title: 'Prescription Refill',
        message: 'Your hypertension medication needs to be refilled within 3 days',
        type: 'warning',
        read: true,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
      },
      {
        id: '5',
        title: 'Health Insurance Update',
        message: 'Your insurance claim for the recent MRI has been approved',
        type: 'info',
        read: true,
        date: new Date(Date.now() - 1000 * 60 * 60 * 36) // 1.5 days ago
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
