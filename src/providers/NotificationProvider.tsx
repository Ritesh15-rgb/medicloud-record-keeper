
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
  
  // Initialize with some sample notifications for demo purposes
  useEffect(() => {
    setNotifications([
      {
        id: '1',
        title: 'Project Deadline',
        message: 'Your "Marketing Campaign" project is due tomorrow',
        type: 'warning',
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
      },
      {
        id: '2',
        title: 'New Message',
        message: 'You received a new message from Sarah',
        type: 'info',
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 60 * 3) // 3 hours ago
      },
      {
        id: '3',
        title: 'System Update',
        message: 'System will be under maintenance this weekend',
        type: 'info',
        read: true,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
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
