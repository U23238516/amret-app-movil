<script setup>
import { ref } from 'vue'
import { 
  IonList, 
  IonItem, 
  IonLabel, 
  IonBadge,
  IonIcon
} from '@ionic/vue'
import { notifications } from 'ionicons/icons'
import NotificationItem from './NotificationItem.vue'

const notificationsList = ref([
  {
    id: 1,
    title: 'New Message',
    message: 'You have a new message from John',
    read: false,
    timestamp: '5 min ago'
  },
  {
    id: 2,
    title: 'System Update',
    message: 'Your system has been updated successfully',
    read: true,
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    title: 'Meeting Reminder',
    message: 'Team meeting in 30 minutes',
    read: false,
    timestamp: '30 min ago'
  }
])

const markAsRead = (id) => {
  const notification = notificationsList.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const deleteNotification = (id) => {
  notificationsList.value = notificationsList.value.filter(n => n.id !== id)
}
</script>

<template>
  <ion-list>
    <ion-item class="notification-header">
      <ion-icon :icon="notifications" slot="start"></ion-icon>
      <ion-label>Notifications</ion-label>
      <ion-badge color="danger">
        {{ notificationsList.filter(n => !n.read).length }}
      </ion-badge>
    </ion-item>

    <NotificationItem
      v-for="notification in notificationsList"
      :key="notification.id"
      v-bind="notification"
      @mark-read="markAsRead"
      @delete="deleteNotification"
    />
  </ion-list>
</template>

<style scoped>
.notification-header {
  --background: var(--ion-color-light);
  font-weight: bold;
}

ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 8px;
  --padding-bottom: 8px;
}
</style>
