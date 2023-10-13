// Importaciones:
// Se importa el controlador de la lista de tweets, 
// responsable de manejar la lógica relacionada con la lista de tweets.
import { tweetListController } from "./tweet-list/tweetListController.js";
// Se importa el controlador de notificaciones, 
//responsable de mostrar mensajes de notificación en la interfaz.
import { notificationController } from "./notifications/notificationsControler.js";

// Selección de Elementos DOM:
// Se seleccionan y almacenan en constantes los botones y contenedores relacionados con las acciones de tweets y notificaciones.
const loadTweetsButton = document.querySelector('#loadTweets');
const removeTweetsButton = document.querySelector('#removeTweets');
const hideTweetsButton = document.querySelector('#hideTweets');
const tweetlist = document.getElementById('tweets');
const notifications = document.getElementById('notifications');

// Inicialización:
// Se inicializa el controlador de notificaciones, pasando el elemento DOM de notificaciones como argumento.
// La función devuelve una función `showNotification` que se utilizará para mostrar notificaciones.
const showNotification = notificationController(notifications);

// Event Listeners:
// Se añade un listener al botón 'loadTweets'. 
// Al hacer clic en él, se llama al controlador de la lista de tweets.
loadTweetsButton.addEventListener('click', () => {
    tweetListController(tweetlist);
});

// Se añade un listener al botón 'removeTweets'. 
// Al hacer clic en él, se limpia el contenido interno de la lista de tweets.
removeTweetsButton.addEventListener('click', () => {
    tweetlist.innerHTML = "";
});

// Se añade un listener al botón 'hideTweets'. 
// Al hacer clic en él, se alterna la clase 'hidden' del elemento de la lista de tweets.
// Esto probablemente oculta o muestra la lista de tweets en la interfaz.
hideTweetsButton.addEventListener('click', () => {
    tweetlist.classList.toggle('hidden');
});

// Se añade un listener personalizado al elemento de la lista de tweets para el evento 'tweetsLoaded'.
// Cuando se dispare este evento, se mostrará una notificación utilizando la información proporcionada en el objeto del evento.
tweetlist.addEventListener('tweetsLoaded', (event) => {
    showNotification(event.detail.message, event.detail.type);
});
