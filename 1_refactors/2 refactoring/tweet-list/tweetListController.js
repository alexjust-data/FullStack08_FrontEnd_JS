/**
 * tweetListController.js
 *
 * Este módulo se encarga de la gestión y presentación de la lista de tweets.
 *
 * Dependencias:
 * - tweetListModel.js: Proporciona la función getTweets que recupera la lista de tweets.
 * - tweetListView.js: Ofrece funciones para construir representaciones HTML de los tweets.
 */

// Importaciones
import { getTweets } from "./tweetListModel.js"; 
import { builtTweet, emptyTweets } from "./tweetListView.js"; 

/**
 * Controlador principal para gestionar y mostrar la lista de tweets.
 *
 * @async
 * @param {HTMLElement} tweetlist - Elemento del DOM donde se mostrarán los tweets.
 */
export const tweetListController = async (tweetlist) => {
    // Inicializamos la lista de tweets a un estado vacío.
    tweetlist.innerHTML = "";
    let tweets = []; 

    // Intentamos recuperar los tweets. En caso de error, emitimos un evento personalizado.
    try{
        tweets = await getTweets(); 
    } catch (error) {
        const event = createCustomEvent('error', 'Error al cargar tweets');
        tweetlist.dispatchEvent(event);
    }

    // Si no hay tweets, mostramos un mensaje. De lo contrario, renderizamos los tweets y emitimos un evento de éxito.
    if (tweets.length === 0){
        tweetlist.innerHTML = emptyTweets();
    } else {
        renderTweets(tweets, tweetlist);
        const event = createCustomEvent('success', 'Tweets cargados correctamente');
        tweetlist.dispatchEvent(event);
    } 
}

/**
 * Renderiza una lista de tweets en un contenedor del DOM.
 *
 * @param {Array} tweets - Lista de tweets a renderizar.
 * @param {HTMLElement} tweetlist - Elemento del DOM donde se mostrarán los tweets.
 */
const renderTweets = (tweets, tweetlist) => {
    tweets.forEach(tweet => {
        const tweetContainer = document.createElement('div'); 
        tweetContainer.classList.add('tweet');  // Añadimos estilos a cada tweet.
        tweetContainer.innerHTML = builtTweet(tweet);  // Construimos la representación HTML del tweet.
        tweetlist.appendChild(tweetContainer);  // Añadimos el tweet al contenedor principal.
    })
}

/**
 * Crea un evento personalizado para la gestión de tweets.
 *
 * @param {string} type - Tipo de evento (p. ej., 'error', 'success').
 * @param {string} message - Mensaje detallado del evento.
 * @returns {CustomEvent} - Evento personalizado.
 */
const createCustomEvent = (type, message) => {
    const event = new CustomEvent("tweetsLoaded", {
        detail: {
            type: type,
            message: message
        }
    });
    return event;
}
