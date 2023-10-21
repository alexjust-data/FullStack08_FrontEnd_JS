
import { deleteTweet, getTweet } from "./tweetDetailModel.js"
import { buildTweet } from "./tweetDetailView.js"; 
import { dispatchEvent } from "../utils/dispatchEvent.js";
import { decodeToken } from "../utils/decodeToken.js"

export const tweetDetailController = async (tweetDetail, tweetId) => {

    try {
        const tweet = await getTweet(tweetId);
        tweetDetail.innerHTML = buildTweet(tweet); // ahora quiero pintar el tweet
        handleDeleteTweet(tweet, tweetDetail); // Evalúa si el usuario tiene permiso para eliminar un tweet
    } catch (error) {
        // alert(error)
        // datos que quiero que viajen en el evento
        dispatchEvent('tweetLoaded', 
                      { type: "error", message: "El tweet no existe" }, 
                      tweetDetail);
        setTimeout(() => {
            window.location = './index.html'; // si el tweet no existe ?id=5656 rediccionamos
          }, 3000);
    }
}


/** Evalúa si el usuario tiene permiso para eliminar un tweet y, si es así, añade el botón de eliminación.
 * 
 * @param {Object} tweet - El objeto tweet.
 * @param {HTMLElement} tweetDetail - El elemento DOM que representa el tweet.
 */
const handleDeleteTweet = (tweet, tweetDetail) => {
    // Obtiene el token JWT del almacenamiento local.
    const token = localStorage.getItem('token');
  
    if (token) {
      // Decodifica el token para obtener el ID del usuario.
      const { userId } = decodeToken(token);
  
      // Si el ID del usuario coincide con el autor del tweet, agrega el botón de eliminación.
      if (userId === tweet.userId) {
        addDeleteTweetButton(tweet, tweetDetail);
      }
    }
}

/** Añade un botón de eliminación al tweet.
 * 
 * @param {Object} tweet - El objeto tweet.
 * @param {HTMLElement} tweetDetail - El elemento DOM que representa el tweet.
 */
const addDeleteTweetButton = (tweet, tweetDetail) => {
    // Crea un nuevo botón.
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar tweet';

    // Añade un evento al botón para manejar la eliminación del tweet.
    deleteButton.addEventListener('click', async () => {
      if (confirm('¿Seguro que quieres borrar el tweet?')) {
        await deleteTweet(tweet.id);
        window.location = 'index.html';
      }
    })

    // Añade el botón al elemento DOM del tweet.
    tweetDetail.appendChild(deleteButton);
}
