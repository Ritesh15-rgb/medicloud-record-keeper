
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { BellRing, Check, X, Pill, Calendar, FileText, AlertTriangle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Notification, useNotifications } from '@/providers/NotificationProvider';

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const { markAsRead, clearNotification } = useNotifications();
  
  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };
  
  // Get the appropriate icon based on notification title
  const getNotificationIcon = (title: string) => {
    if (title.includes('Medication') || title.includes('Prescription')) {
      return <Pill className="h-4 w-4 text-medivault-purple" />;
    } else if (title.includes('Appointment')) {
      return <Calendar className="h-4 w-4 text-medivault-purple" />;
    } else if (title.includes('Lab') || title.includes('Results')) {
      return <FileText className="h-4 w-4 text-medivault-purple" />;
    } else if (title.includes('Insurance')) {
      return <CreditCard className="h-4 w-4 text-medivault-purple" />;
    } else {
      return <AlertTriangle className="h-4 w-4 text-medivault-purple" />;
    }
  };
  
  return (
    <div 
      className={`p-3 cursor-pointer ${!notification.read ? 'bg-muted/30' : ''}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-1">
        <div className="font-medium flex items-center gap-2">
          <div className="rounded-full bg-medivault-soft-purple p-1 flex items-center justify-center">
            {getNotificationIcon(notification.title)}
          </div>
          {notification.title}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            clearNotification(notification.id);
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">{notification.message}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {formatDistanceToNow(notification.date, { addSuffix: true })}
      </p>
    </div>
  );
};

const NotificationsPopover = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellRing className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1.5 py-0.5 h-5 min-w-5 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 max-h-96 overflow-hidden flex flex-col">
        <div className="p-3 flex items-center justify-between">
          <h3 className="font-semibold">Medical Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs flex items-center gap-1"
              onClick={markAllAsRead}
            >
              <Check className="h-3 w-3" /> Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        
        <div className="overflow-y-auto flex-1">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <NotificationItem notification={notification} />
                {index < notifications.length - 1 && <Separator />}
              </React.Fragment>
            ))
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
