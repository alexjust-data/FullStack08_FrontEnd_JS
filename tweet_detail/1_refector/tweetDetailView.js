


// Exporta una función que construye la estructura HTML de un tweet
export const buildTweet = (tweet) => {

    // Define la estructura base del tweet con su nombre de usuario (handler) y su mensaje
    let tweetTemplate = `
        <span>${tweet.handler}</span>
        <p>${tweet.message}</p>
    `;
  
    // Si el tweet tiene likes (es decir, el array de likes tiene elementos)
    if (tweet.likes.length > 0) {
      // Añade a la estructura del tweet una lista de usuarios que le han dado like
      tweetTemplate += `<p> estos usuarios: ${tweet.likes.join(', ')} han dado like al tweet</p>`;
    }
  
    // Retorna la estructura completa del tweet
    return tweetTemplate;
  }
  