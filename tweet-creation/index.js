import { tweetCreationController } from "./tweetCreationController.js";
import { notificationsController } from "../notifications/notificationsController.js";

const token = localStorage.getItem('token');
if (!token) {
  window.location = './index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const tweetCreation = document.querySelector('#tweetCreation');

  const notifications = document.querySelector('#notifications');
  const showNotification = notificationsController(notifications);

  tweetCreation.addEventListener('tweetCreated', (event) => { // `nombre propio del evento dispatchEvent('tweetCreated')` 
    showNotification(event.detail.message, event.detail.type); // función manejadora del evento
  });

  tweetCreationController(tweetCreation);

})