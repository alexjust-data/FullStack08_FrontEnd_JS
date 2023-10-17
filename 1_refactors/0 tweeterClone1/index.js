
/***
 * MODELO
 * 
 * 1. modelo de datos con los tweets (conjunto de tweets que voy a escribir por pantalla)
 */

const tweets = [{
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
 * CONTROLADOR
 */

// 2. recorrer el array de tweets
tweets.forEach(tweet => {

    // 3. crear estructura html para datos de cada tweet

    const tweetContainer = document.createElement('div');   // creo contenedor padre

    // relleno contenedor con 4 hijos
    tweetContainer.innerHTML = 
    /**
     * VISTA
     */
    `                       
        <span>${tweet.handler}</span>
        <span>${tweet.date}</span>
        <p>${tweet.message}</p>
        <p>${tweet.likes}</p>`;

    // 4. añadimos al arbol DOM
    const tweetlist = document.getElementById('tweets');
    tweetlist.appendChild(tweetContainer)
})

