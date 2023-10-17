import { buildNotification } from "./notificationView.js";



// el nodo del DOM que se encarga de pitar todas las notificaciones : <section id="notifications"></section>
// si devuelve una funcion para el tweetlist.addEventListener('tweetsLoaded' del index.js
export const notificationController = (notificaciones) => {
    // la siguiente funcion es la que devuelve notificationController()
    // que se ejecuta cuando el evento 'tweetsLoaded' sucede tweetlist.addEventListener('tweetsLoaded', () => { index.js
    // esta función va a meter en el <section id="notifications"></section> el trozo de html que construimos
    const showNotification = (message) => {
        notifications.innerHTML = buildNotification(message) // funcion importada de notificationView.js

        // ahora construimos el limite de tiempo del mensaje
        setTimeout(() => {
            notifications.innerHTML = ""; // vaciando el contenedor
        }, 3000);
    }

    return showNotification;
    
}
