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

export const getTweets = () => {
    const url = "https://fake-tweets-api-kc.vercel.app/posts";

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(tweets => {
                const parseTweets = transforTweets(tweets)
                resolve(parseTweets)
            })
    });
}
