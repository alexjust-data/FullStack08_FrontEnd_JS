/***
 * VISTA: Es lo que el usuario ve, la interfaz gráfica. 
 * Muestra los datos del modelo al usuario y envía comandos al controlador.
 */

// necesitamos retornar el html completo

export const builtTweet = () => {
    return `
    <span>${tweet.handler}</span>
    <span>${tweet.date}</span>
    <p>${tweet.message}</p>
    <p>${tweet.likes}</p>`
}