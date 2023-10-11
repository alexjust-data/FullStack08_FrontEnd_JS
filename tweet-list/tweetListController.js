/**
 * El CONTROLADOR, en una app web, es una componente del patrón de diseño Modelo-Vista-Controlador (MVC). 
 * Gestiona la lógica de negocio, procesa las entradas del usuario desde la vista, 
 * interactúa con el modelo y devuelve una respuesta o actualización a la vista. 
 * Esencialmente, actúa como un intermediario entre la vista (UI) y el modelo (datos).
 * 
 * Controlador: Es el nexo de unión entre el modelo y la vista.
 * Recibe las entradas del usuario a través de la vista y ejecuta la acción correspondiente en el modelo.
 * 
 * en nuetro caso gestiona esta sección : <script type="module" src="./index.js"></script>
 * */



import { tweets } from "./tweetListModel" // importo para iterar la variable
import { builtTweet } from "./tweetListView"; // importo vista en la function



tweets.forEach(tweet => {

    const tweetContainer = document.createElement('div'); 

    tweetContainer.innerHTML = builtTweet(tweet);

    const tweetlist = document.getElementById('tweets');
    tweetlist.appendChild(tweetContainer)
})