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
const transformTweets = (tweets) => {
    return tweets.map(tweet => ({
        // datos de la vista
        handler : tweet.author,
        date    : new Date().toISOString(),
        message : tweet.message,
        likes   : tweet.likes.length,
        photo   : tweet.image,
        id      : tweet.id
    }))
} 


/**
 * Cuando tengas dudas de donde se coloca el async::
 * siempre se coloca en la función más práxima al await:: 
 */

// función asincrónica async indica que la función maneja promesas con await.
export const getTweets = async () => {
    const url = "http://127.0.0.1:8000/api/tweets";
    let parsedTweets = [];  // Inicializa parsedTweets

    try {
        const response = await fetch(url);    
        const tweets = await response.json(); 
        parsedTweets = transformTweets(tweets);  // Usa parsedTweets y transformTweets
    
    } catch (error) {
        throw error // el error así se lanza al controlador. De esta forma el controlador craré un evento para informar
        // console.log('algo malo ocurrió:', error);  // Puedes agregar el error para tener más detalles
        //return null;  // Devuelve null en caso de error (o maneja el error como prefieras)
    }
    
    return parsedTweets;  // Devuelve parsedTweets que ahora está definido en el ámbito de la función.
}


