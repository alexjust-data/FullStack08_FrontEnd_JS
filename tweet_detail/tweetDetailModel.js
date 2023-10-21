import { sparrestApi } from "../utils/sparrestApi.js";




/** Transforma la estructura de un tweet a un formato específico.
 * 
 * @param {Object} tweet - El objeto tweet original.
 * @returns {Object} - Retorna un objeto con la estructura reformateada.
 */
const parseTweet = (tweet) => {
    return {
      handler: tweet.user.username,  // Nombre de usuario del autor del tweet.
      message: tweet.message,        // Mensaje del tweet.
      likes: [],                     // Inicialmente define los likes como un arreglo vacío.
      userId: tweet.user.id,         // ID del usuario que creó el tweet.
      id: tweet.id                   // ID del tweet.
    }
  }
  
  /** Obtiene un tweet específico desde el servidor por su ID, y expande el objeto usuario.
   * 
   * @param {number} tweetId - El ID del tweet a recuperar.
   * @returns {Object} - Retorna el tweet solicitado ya transformado.
   * @throws {Error} - Lanza un error si la respuesta no es exitosa o si hay otros problemas.
   */
  export const getTweet = async (tweetId) => {
    const endpoint = `api/tweets/${tweetId}?_expand=user`; // Define el endpoint incluyendo la expansión del usuario.
  
    // Usa la función sparrestApi para hacer una solicitud GET al servidor.
    const tweet = await sparrestApi().get(endpoint);
  
    return parseTweet(tweet); // Retorna el tweet transformado.
  }
  
  /** Elimina un tweet específico del servidor usando su ID.
   * 
   * @param {number} tweetId - El ID del tweet a eliminar.
   * @throws {Error} - Lanza un error si la respuesta no es exitosa.
   */
  export const deleteTweet = async (tweetId) => {
    const endpoint = `api/tweets/${tweetId}`; // Define el endpoint para eliminar el tweet.
  
    await sparrestApi().delete(endpoint); // sparrestApi() para hacer una solicitud DELETE al servidor.
  }