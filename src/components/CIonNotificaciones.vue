<template>
  <ion-content>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title size="small">
          Notificaciones
          <ion-badge color="danger" class="notification-badge" v-if="unreadNotificationsCount">
            {{ unreadNotificationsCount }}
          </ion-badge>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-list class="notification-list" lines="full">
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        :id="notification.id"
        :title="notification.title"
        :message="notification.message"
        :read="notification.read"
        :timestamp="notification.timestamp"
        @mark-read="markAsRead"
        @delete="deleteNotification"
      />
      
      <div v-if="notifications.length === 0" class="no-notifications">
        <p>No tiene notificaciones</p>
      </div>
    </ion-list>

    <!-- Cambia aria-hidden a inert en el ion-backdrop para evitar problemas de accesibilidad -->
    <!-- <ion-backdrop part="backdrop" tabindex="-1" inert class="ios"></ion-backdrop> -->
  </ion-content>
</template>

<script>
import { IonTitle, IonToolbar, IonBadge, IonHeader, IonList, IonContent,  popoverController, }    from '@ionic/vue'
import NotificationItem from './NotificationItem.vue'

export default {
  components: {
    IonTitle, IonToolbar, IonBadge, IonHeader, IonList, IonContent,
    NotificationItem
  },
  data() {
    return {
      notifications: [
        {
          id       : 1,
          title    : 'New Message',
          message  : 'You have a new message from John',
          read     : false,
          timestamp: '5 min ago'
        },
        {
          id       : 2,
          title    : 'System Update',
          message  : 'Your system has been updated successfully',
          read     : true,
          timestamp: '1 hour ago'
        },
        {
          id       : 3,
          title    : 'Meeting Reminder',
          message  : 'Team meeting in 30 minutes',
          read     : false,
          timestamp: '30 min ago'
        },
        {
          id       : 3,
          title    : 'Meeting Reminder',
          message  : 'Team meeting in 30 minutes',
          read     : false,
          timestamp: '30 min ago'
        },
        {
          id       : 3,
          title    : 'Meeting Reminder',
          message  : 'Team meeting in 30 minutes',
          read     : false,
          timestamp: '30 min ago'
        },
        {
          id       : 3,
          title    : 'Meeting Reminder',
          message  : 'Team meeting in 30 minutes',
          read     : false,
          timestamp: '30 min ago'
        },
      ]
    }
  },
  computed: {
    unreadNotificationsCount() {
      return this.notifications.filter(n => !n.read).length
    }
  },
  methods: {
    markAsRead(id) {
      const notification = this.notifications.find(n => n.id === id)
      if (notification) {
        notification.read = true
      }
      this.dismiss()
    },
    deleteNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
      this.dismiss()
    },
    dismiss() {
      popoverController.dismiss()
    }
  }
}
</script>

<style scoped>
.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-badge {
  margin-left: 5px;
}

.no-notifications {
  padding: 20px;
  text-align: center;
  color: var(--ion-color-medium);
}

ion-content {
  --background: var(--ion-background-color);
  width: 225px;
}

ion-header {
  background: var(--ion-background-color);
}
</style>
