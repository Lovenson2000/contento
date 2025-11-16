import { useState, useEffect, useRef, useCallback } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  const scheduledNotifications = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  const schedulePushNotification = useCallback(
    async (remindAt: Date, title: string, contentId: string) => {
      if (remindAt <= new Date()) {
        console.warn("Reminder time must be a future time");
        return;
      }

      try {
        const existingNotificationId =
          scheduledNotifications.current.get(contentId);
        if (existingNotificationId) {
          await Notifications.cancelScheduledNotificationAsync(
            existingNotificationId
          );
          console.log(`Canceled old notification for content: ${contentId}`);
        }

        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: title || "Reminder",
            body: `Time to enjoy your content! ${title}`,
            data: { remindAt: remindAt.toISOString(), contentId: contentId },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: remindAt,
          },
        });

        scheduledNotifications.current.set(contentId, notificationId);
        return notificationId;
      } catch (err) {
        console.error("❌ Error scheduling notification:", err);
      }
    },
    []
  );

  const cancelNotification = useCallback(async (contentId: string) => {
    const notificationId = scheduledNotifications.current.get(contentId);
    if (notificationId) {
      try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        scheduledNotifications.current.delete(contentId);
      } catch (err) {
        console.error("Error canceling notification:", err);
      }
    }
  }, []);

  const cancelAllNotifications = useCallback(async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      scheduledNotifications.current.clear();
    } catch (err) {
      console.error("Error canceling all notifications:", err);
    }
  }, []);

  return {
    expoPushToken,
    notification,
    schedulePushNotification,
    cancelNotification,
    cancelAllNotifications,
  };
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
