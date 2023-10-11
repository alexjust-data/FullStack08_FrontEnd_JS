import { tweetListController } from "./tweet-list/tweetListController.js";


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
 * #tweet.hidden {
 *      display: none; 
 * }
 */