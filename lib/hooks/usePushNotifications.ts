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

  const cancelNotification = useCallback(async (contentId: string) => {
    try {
      // Gather every scheduled notification tied to this content ID, even if the in-memory
      // map was cleared by an app restart, so we don't leave behind duplicates.
      const allScheduled =
        await Notifications.getAllScheduledNotificationsAsync();
      const ids = new Set<string>();

      const idFromMap = scheduledNotifications.current.get(contentId);
      if (idFromMap) {
        ids.add(idFromMap);
      }

      allScheduled
        .filter((notif) => notif.content.data?.contentId === contentId)
        .forEach((notif) => ids.add(notif.identifier));

      await Promise.all(
        Array.from(ids).map((id) =>
          Notifications.cancelScheduledNotificationAsync(id)
        )
      );

      scheduledNotifications.current.delete(contentId);
    } catch (err) {
      console.error("❌ Error canceling notification:", err);
    }
  }, []);

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
        console.warn("⚠️ Reminder time must be a future time");
        return;
      }

      try {
        await cancelNotification(contentId);

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
    [cancelNotification]
  );

  const cancelNotificationsByContentIds = useCallback(
    async (contentIds: string[]) => {
      try {
        const allScheduled =
          await Notifications.getAllScheduledNotificationsAsync();
        const notificationsToCancel = allScheduled.filter((notif) => {
          const contentId = notif.content.data?.contentId;
          return contentId && contentIds.includes(contentId as string);
        });

        for (const notif of notificationsToCancel) {
          await Notifications.cancelScheduledNotificationAsync(
            notif.identifier
          );
          const contentId = notif.content.data?.contentId as string;
          scheduledNotifications.current.delete(contentId);
        }
      } catch (err) {
        console.error("❌ Error canceling notifications by content IDs:", err);
      }
    },
    []
  );

  const cancelAllNotifications = useCallback(async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      scheduledNotifications.current.clear();
    } catch (err) {
      console.error("❌ Error canceling all notifications:", err);
    }
  }, []);

  return {
    expoPushToken,
    notification,
    schedulePushNotification,
    cancelNotification,
    cancelNotificationsByContentIds,
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
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  }

  return token;
}
