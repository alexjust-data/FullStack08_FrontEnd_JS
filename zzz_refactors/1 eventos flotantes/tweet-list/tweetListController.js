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
    // esta linea es porque se acumulan los mismo tweets cada vez que aprieto el botón cargar tweets
    tweetlist.innerHTML = "";
    let tweets = []; // inicializo variable pq está dentro del try

    try{
        tweets = await getTweets(); // viene del tweetListModel.js
    } catch (error) {
        // este error lo arrastro del throw error 
        // crear evento para infromar del error 
        const event = new CustomEvent("tweetsLoaded", {
            detail: {
                type: 'error',
                message: 'Error al cargar tweets'
            }
        });
    }

    if (tweets.length === 0){
        //window.alert("No hay tweets");
        tweetlist.innerHTML = emptyTweets();
    } else {
        tweets.forEach(tweet => {
            const tweetContainer = document.createElement('div'); 
            tweetContainer.classList.add('tweet'); // le añado la clase tweet paarq eu se aplique 
            
            tweetContainer.innerHTML = builtTweet(tweet);
            
            tweetlist.appendChild(tweetContainer)
        })
        
        // aquí sabemos que los tweets se han cargado, 
        // dispararemos CustomEvent y en index.js le ponemos su escuchador
        // además le puedo pasar un segundo argumento con la propiedad detail:
        // para pasar los datos que yo quiera
        const event = new CustomEvent("tweetsLoaded", {
            detail: {
                type: 'sucess',
                message: 'Tweets cargados correctamente'
            }
        });
        tweetlist.dispatchEvent(event);
    } 

}


