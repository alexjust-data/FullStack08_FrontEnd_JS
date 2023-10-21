import { createTweet } from "./tweetCreationModel.js";
import { dispatchEvent } from "../utils/dispatchEvent.js";

export const tweetCreationController = (tweetCreation) => {

  tweetCreation.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(tweetCreation);
    const message = formData.get("message");

    try {
        await createTweet(message);
        // disparamos evento
        dispatchEvent('tweetCreated',  // nombre propio del evento
                      { type: "success", message: "Tweet creado correctamente" }, // tipo según botón del DOM
                       tweetCreation); // nombre del nodo <form id="tweetCreation">
        setTimeout(() => {
          window.location = "index.html";
        }, 2000);
      } catch (error) {
        dispatchEvent('tweetCreated', 
                      { type: "error", message: "Error creando tweet" }, 
                      tweetCreation);      
      }

  })
}