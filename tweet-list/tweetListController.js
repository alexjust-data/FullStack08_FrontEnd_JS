/**
 * El CONTROLADOR, en una app web, es una componente del patrón de diseño Modelo-Vista-Controlador (MVC). 
 * Gestiona la lógica de negocio, procesa las entradas del usuario desde la vista, 
 * interactúa con el modelo y devuelve una respuesta o actualización a la vista. 
 * Esencialmente, actúa como un intermediario entre la vista (UI) y el modelo (datos).
 * 
 * Controlador: Es el nexo de unión entre el modelo y la vista.
 * Recibe las entradas del usuario a través de la vista y ejecuta la acción correspondiente en el modelo.
 * 
 * Lo idela es que el controlador gestione sólo un nodo del DOM en este caso
 * está gestionando la <section>
 * 
 * en nuetro caso gestiona esta sección : <script type="module" src="./index.js"></script>
 * */

// import { tweets, getTweets } from "./tweetListModel.js"; // importo para iterar la variable
// import { builtTweet } from "./tweetListView.js"; // importo vista en la function

// // el controlador index.js ejecuta tweetlist
// export const tweetListController = (tweetlist) => {

//     tweets.forEach(tweet => {
//         const tweetContainer = document.createElement('div'); 
//         tweetContainer.classList.add('tweet'); // le añado la clase tweet paarq eu se aplique 

//         tweetContainer.innerHTML = builtTweet(tweet);

//         tweetlist.appendChild(tweetContainer)
//     })
// } 

import { getTweets } from "./tweetListModel.js"; 
import { builtTweet, emptyTweets } from "./tweetListView.js"; 


// el controlador index.js ejecuta tweetlist
export const tweetListController = async (tweetlist) => {

    const tweets = await getTweets();

    if (tweets.length === 0){
        window.alert("No hay tweets");
        tweetlist.innerHTML = emptyTweets();
    } else {
        tweets.forEach(tweet => {
            const tweetContainer = document.createElement('div'); 
            tweetContainer.classList.add('tweet'); // le añado la clase tweet paarq eu se aplique 
    
            tweetContainer.innerHTML = builtTweet(tweet);
    
            tweetlist.appendChild(tweetContainer)
        })
    } 

}


