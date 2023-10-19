
import { tweetListController } from "./tweet-list/tweetListController.js";
import { notificationsController } from "./notifications/notificationsController.js";
import { sessionController } from "./session/sessionController.js";
import { loaderController } from "./loader/loaderController.js";

const notifications = document.getElementById('notifications');
const showNotification = notificationsController(notifications);

const { show, hide } =  loaderController(loader); // nos devuleve un objeto con dos propiedades




document.addEventListener('DOMContentLoaded', () => {
    const tweetList = document.getElementById('tweets');

    // 1. primero escucho los eventos
    tweetList.addEventListener('tweetsLoaded', (event) => {
        showNotification(event.detail.message, event.detail.type)
    })
    tweetList.addEventListener('startLoadingTweets', () => {
        //ejecuto el metido de carga de la ruleta
        show();
    })
    tweetList.addEventListener('finishLoadingTweets', () => {
        // ejecuto el metodo de ocultacion
         hide();
    })

    // 2. luego ejecuto el controlador
    tweetListController(tweetList);

    const session = document.getElementById('session');
    sessionController(session);

})

window.addEventListener('offline', () => {
    showNotification('Se ha perdido la conexion', 'error')
})


