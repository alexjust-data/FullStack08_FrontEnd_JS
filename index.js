
import { tweetListController } from "./tweet-list/tweetListController.js";
import { notificationController } from "./notifications/notificationsControler.js";


const notifications = document.getElementById('notifications');
const showNotification = notificationController(notifications);

document.addEventListener('DOMContentLoaded', () => {
    const tweetlist = document.getElementById('tweets');
    tweetListController(tweetlist);

    tweetlist.addEventListener('tweetsLoaded', (event) => {
        showNotification(event.detail.message, event.detail.type);
    });
})

window.addEventListener('offline', () => {
    showNotification('Se ha perdido la conexion', 'error')
})


