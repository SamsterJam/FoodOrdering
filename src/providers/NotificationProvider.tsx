import { PropsWithChildren, useEffect, useState } from 'react';
import { registerForPushNotificationsAsync } from '../lib/notifications';
import { ExpoPushToken } from 'expo-notifications';

export default function NotificationProvider({ children }: PropsWithChildren) {
  const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
  }, []);

  return <>{children}</>;
}
