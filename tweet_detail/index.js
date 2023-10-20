import { tweetDetailController } from "./tweetDetailController.js";
import { notificationsController } from "../notifications/notificationsController.js";



document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(window.location.search);
  const tweetId = params.get("id");


  const notifications = document.querySelector("#notifications"); // identifico la seccion/nodo
  const showNotification = notificationsController(notifications); // muestro notificaciones en el nodo


  const tweetDetail = document.querySelector('#tweetDetail');
  tweetDetailController(tweetDetail, tweetId);

  tweetDetail.addEventListener('tweetLoaded', (event) => {
    showNotification(event.detail.message, event.detail.type);
  })
  
})