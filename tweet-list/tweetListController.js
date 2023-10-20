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
export const tweetListController = async (tweetList) => {
    // Inicializamos la lista de tweets a un estado vacío.
    tweetList.innerHTML = "";
    let tweets = []; 

    // Intentamos recuperar los tweets. En caso de error, emitimos un evento personalizado.
    try{
        // dispara el evento 'startLoadingTweets' (nombreinventado) ruleta de carga
        dispatchEvent('startLoadingTweets', null, tweetList); // para mostrar ruleta de carga
        tweets = await getTweets(); 
    } catch (error) {
        const event = createCustomEvent('error', 'Error al cargar tweets');
        // cuando da error oculto la ruleta de carga
        tweetList.dispatchEvent(event);
    // a partir de aquí yo ya se que los tweets están cargados sin exepcion
    // cuando se termine de ir a BD a por los tweets ocuto la ruleta de carga
    } finally {
        dispatchEvent('finishLoadingTweets', null, tweetList);
      } /**
         * como he cargado estos eventos 'startLoadingTweets' y 'finishLoadingTweets'
         * ahora voy a index.js y añado unos escuchadores a estos eventos
         * tweetList.addEventListener('startLoadingTweets'
         */

    // Si no hay tweets, mostramos un mensaje. De lo contrario, renderizamos los tweets y emitimos un evento de éxito.
    if (tweets.length === 0){
        tweetList.innerHTML = emptyTweets();
    } else {
        renderTweets(tweets, tweetList);
        const event = createCustomEvent('success', 'Tweets cargados correctamente');
        tweetList.dispatchEvent(event);
    } 
}

/**
 * Renderiza una lista de tweets en un contenedor del DOM.
 *
 * @param {Array} tweets - Lista de tweets a renderizar.
 * @param {HTMLElement} tweetlist - Elemento del DOM donde se mostrarán los tweets.
 */
const renderTweets = (tweets, tweetList) => {
    tweets.forEach(tweet => {
        const tweetContainer = document.createElement('div'); 
        tweetContainer.classList.add('tweet');  // Añadimos estilos a cada tweet.
        tweetContainer.innerHTML = builtTweet(tweet);  // Construimos la representación HTML del tweet.
        tweetList.appendChild(tweetContainer);  // Añadimos el tweet al contenedor principal.
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


/**
 * Función para despachar un evento personalizado en un formulario.
 * 
 * @param {string} eventName - Nombre del evento personalizado a despachar.
 * @param {*} data - Datos o detalles que se quieran pasar con el evento.
 * @param {HTMLElement} element - Elemento del formulario al que se le despachará el evento.
 */
const dispatchEvent = (eventName, data, element) => {
    
    // Creación de un evento personalizado con el nombre y detalles proporcionados.
    const event = new CustomEvent(eventName, {
      detail: data
    });
  
    // Despachando (emitiendo) el evento personalizado en el formulario especificado.
    element.dispatchEvent(event);
}



