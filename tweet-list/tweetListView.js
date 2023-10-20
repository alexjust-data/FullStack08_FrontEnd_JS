/***
 * VISTA: Es lo que el usuario ve, la interfaz gráfica. 
 * Muestra los datos del modelo al usuario y envía comandos al controlador.
 */

// necesitamos retornar el html completo

export const builtTweet = (tweet) => {
    return `
    <a href="./tweetDetail.html?id=${tweet.id}">
        <span>${tweet.handler}</span>
        <span>${tweet.date}</span>
        <p>${tweet.message}</p>
    </a>`
}


export const emptyTweets = () => {
    return `<h3>No hay tweets disponibles</h3>`
}