<script setup>
import { 
  IonItem, 
  IonLabel, 
  IonButton, 
  IonIcon,
  toastController
} from '@ionic/vue'
import { checkmark, trash } from 'ionicons/icons'

// No es necesario definir Props y tipos explícitos en JavaScript

const props = defineProps({
  id: Number,
  title: String,
  message: String,
  read: Boolean,
  timestamp: String
})
const emit = defineEmits(['mark-read', 'delete'])

const showToast = async (message, color) => {
  const toast = await toastController.create({
    message,
    duration: 3000,
    position: 'bottom',
    color
  })
  await toast.present()
}

const handleMarkAsRead = async () => {
  emit('mark-read', props.id)
  await showToast('Marked as read', 'success')
}

const handleDelete = async () => {
  emit('delete', props.id)
  await showToast('Notification deleted', 'danger')
}
</script>

<template>
  <ion-item :class="{ 'notification-read': read }" lines="full">
    <ion-label>
      <h3 class="notification-title">{{ title }}</h3>
      <p class="notification-message">{{ message }}</p>
      <p class="notification-timestamp">{{ timestamp }}</p>
    </ion-label>
    
    <ion-button fill="clear" 
                @click="handleMarkAsRead"
                v-if="!read">
      <ion-icon :icon="checkmark" slot="icon-only" color="success"></ion-icon>
    </ion-button>
    
    <ion-button fill="clear" 
                @click="handleDelete">
      <ion-icon :icon="trash" slot="icon-only" color="danger"></ion-icon>
    </ion-button>
  </ion-item>
</template>

<style scoped>
.notification-read {
  --background: var(--ion-color-light-tint);
  opacity: 0.8;
}

.notification-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.notification-message {
  color: var(--ion-color-dark);
  margin-bottom: 4px;
}

.notification-timestamp {
  font-size: 0.8em;
  color: var(--ion-color-medium);
}

ion-item {
  --padding-start: 16px;
  --padding-end: 8px;
  --padding-top: 12px;
  --padding-bottom: 12px;
}
</style>
