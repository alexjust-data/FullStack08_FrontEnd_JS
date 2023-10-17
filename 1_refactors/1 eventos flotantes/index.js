import { tweetListController } from "./tweet-list/tweetListController.js";
import { notificationController } from "./notifications/notificationsControler.js";


// // Encuentra y selecciona el botón con el ID 'loadTweets' en el documento HTML.
// const loadTweetsButton = document.querySelector('#loadTweets');

// // Añade un escuchador de eventos al botón para detectar los clics. "addEventListener('click', function)""
// loadTweetsButton.addEventListener('click', () => {

//     // Encuentra y selecciona un elemento con el ID 'tweets' en el documento.
//     const tweetlist = document.getElementById('tweets');

//     // Ejecuta la función 'tweetListController' pasándole el elemento 'tweetlist' como argumento.
//     tweetListController(tweetlist); // ejecuto el controlador
// });




const loadTweetsButton = document.querySelector('#loadTweets'); // #almohadillapq es id= en <button id="loadTweets">Cargar tweets</button>
const removeTweetsButton = document.querySelector('#removeTweets');
const hideTweetsButton = document.querySelector('#hideTweets');

const tweetlist = document.getElementById('tweets');
const notifications = document.getElementById('notifications');

// cuando el usuario a creado el tweet
const showNotification = notificationController(notifications);

loadTweetsButton.addEventListener('click', () => {
    tweetListController(tweetlist); // ejecuto el controlador en <section id="tweets"></section>
});

removeTweetsButton.addEventListener('click', () => {
    tweetlist.innerHTML = ""; // vacío <section id="tweets"></section>
});

hideTweetsButton.addEventListener('click', () => {
    tweetlist.classList.toggle('hidden'); // hidden es un nombre comun para la clase
});
/** LE DOY STiLo EN <style> del html
 * #tweet.hidden {                      <-- fíjate que pongo almohadilla pq section es id=
 *      display: none; 
 * }
 */


// estamos escuchando la recepcion del CustomEvent('tweetsLoaded')
// cuando el usuario a creado el tweet
tweetlist.addEventListener('tweetsLoaded', (event) => {
    showNotification(event.detail.message)
})
/**
 * event.detail.message --> viene de tweetListController.js
 *         del evento "tweetsLoaded", {
            detail: {
                type: 'sucess',
                message: 'Tweets cargados correctamente'
            }
 */