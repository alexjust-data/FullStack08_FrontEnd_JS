/***
 * MODELO: Representa la lógica de negocio y los datos. 
 * Interactúa con la base de datos y actualiza la vista 
 * cuando los datos cambian.
 */


// exportamos 
export const tweets = [{
    handler: "@usuario1",
    date: new Date().toISOString(),
    message: 'Estoy estudiando en KeepCoding',
    likes: 20,
},
{
    handler: "@usuario2",
    date: new Date().toISOString(),
    message: 'Louis Vuitton ha bajado el precio 30%',
    likes: 4,
},
{
    handler: "@usuario3",
    date: new Date().toISOString(),
    message: 'El barça es el millor',
    likes: 34,
},
{
    handler: "@usuario4",
    date: new Date().toISOString(),
    message: 'Viva la paepa',
    likes: 400,
}];

/**
 * LA API https://fake-tweets-api-kc.vercel.app/posts HA DEVUELTO :
 * "tweets":[{"id":0,
 *            "author":"TechCrunch",
 *            "image":"https://www.smartworld.it/wp-content/uploads/2018/07/Facebook-Mark-Zuckerberg.jpg",
 *            "message":"Facebook now lets everyone unsend messages for up to 10 minutes https://techcrunch.com/2019/02/05/facebook-messenger-remove/ … by @JoshConstine",
 *            "likes":["markZuck","donnie","EduardoSaverin","DMoskovitz"]},} tweets 
 * ENTONCES transformemos los datos 
 */

// transformamos la info que nos llega de la api
const transforTweets = (tweets) => {
    return tweets.map(tweet => ({
        // datos de la vista
        handler : tweet.autor,
        date    : new Date().toISOString(),
        message : tweet.message,
        likes   : tweet.likes.length

    }))
} 


/**
 * Cuando tengas dudas de donde se coloca el async::
 * siempre se coloca en la función más práxima al await:: 
 */

// función asincrónica async indica que la función maneja promesas con await.
export const getTweets = async () => {
    const url = "https://fake-tweets-api-kc.vercel.app/posts";
    const response = await fetch(url);    // Usando fetch(), estamos solicitando datos de la URL previamente definida.
                                          // Dado que fetch devuelve una promesa, uso await para esperar que se resuelva la promesa
    const tweets = await response.json(); // Convertimos promea a objeto JavaScript
                                          // .json() devuelve una promesa, así que usamos await para esperar a que se complete la conversión.
    const parseTweets = transforTweets(tweets); // transformamos los tweets
    return parseTweets;
}
