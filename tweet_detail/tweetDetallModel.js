


/** Convierte la estructura de un tweet a un formato específico.
 * 
 * @param {Object} tweet - El objeto tweet original.
 * @returns {Object} - Retorna un objeto con la estructura reformateada.
 */
const parseTweet = (tweet) => {
    return {
      handler: tweet.author.toUpperCase(),   // Nombre de usuario del autor del tweet.
      photo: tweet.image,
      message: tweet.message,         // Contenido del tweet.
      likes: [],                      // Inicializa un array vacío para los 'likes'.
      //userId: tweet.user.id,          // ID del usuario que publicó el tweet.
      id: tweet.id                    // ID del tweet.
    }
}


/** Obtiene un tweet específico desde el backend por su ID.
 * 
 * @param {number} tweetId - El ID del tweet a recuperar.
 * @returns {Object} - Retorna el tweet solicitado.
 * @throws {Error} - Lanza un error si la respuesta no es exitosa o si hay otros problemas.
 */
export const getTweet = async (tweetId) => {
    // Define la URL para obtener el tweet basada en el ID proporcionado.
    const url = `http://localhost:8000/api/tweets/${tweetId}`;

    let tweet;

    try {
        // Realiza una solicitud GET al servidor para obtener el tweet.
        const response = await fetch(url);

        // Verifica si la respuesta es exitosa.
        if (response.ok) {
          // Convierte la respuesta a un objeto JSON y la retorna.
          tweet = await response.json();
          //return data;
        } else {
          // Si la respuesta no es exitosa, extrae el mensaje de error o usa un mensaje por defecto.
          //const message = tweet.message || 'Ha ocurrido un error';
          throw new Error("caca message");
        }
    } catch (error) {
        // Propaga el error para ser manejado en otro lugar.
        throw error.message;
    }

    return parseTweet(tweet);
}
