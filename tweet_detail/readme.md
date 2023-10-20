# Detalle de un Tweet cuando le hacemos click


¿cómo pensáis que podemos hacer para que al clicar un tweet, vayamos a una pantalla nueva.

* Podemos o que un clic en el tweet haga un Windows punto open Por ejemplo, o 
* Podemos convertir el tweet en un enlace para que dado el comportamiento por defecto que tienen los enlaces se abra una pestaña nueva.

Vamos a utilizar la opción del link, sobre todo por temas de Seo. Los navegadores se llevan mucho mejor con un enlace que lleva a una pantalla nueva porque los crowers pueden leer ese código.Y lo del botón. Además, Además, asignar un evento click a un section no tiene mucho sentido, porque el section por natural por naturaleza, no es un elemento clicable de por sí. 

Entonces vamos a tirar por la opción: de convertir nuestros tweets en links vale visualmente van a seguir siendo iguales, ok pero van a ser links entonces teniendo en cuenta quequeremos convertir nuestros tweets, cada 1 de ellos en un link, ¿Qué haríais?

1. vamos a tweetList/tweetListView.js y donde ponía:
```js
    return `
    <span>${tweet.handler}</span>
    <span>${tweet.date}</span>
    <img src="${tweet.photo}" alt="tweet image">
    <p>${tweet.message}</p>
    <p>${tweet.likes}</p>`
```

ahora pondrá
```js
    return `
    <a herf="">
        <span>${tweet.handler}</span>
        <span>${tweet.date}</span>
        <img src="${tweet.photo}" alt="tweet image">
        <p>${tweet.message}</p>
        <p>${tweet.likes}</p>
    </a>`
```

¿Qué va a hacer esto? Que en cualquiera de las partes que clicquemos, como el evento clic se va a propagar hacia arriba. Por ejemplo, si nosotros hacemos clic en el pez, recordad lo de la propagación de eventos que os conté al principio, aunque se haga clic en Sp como está dentro de un elemento que ya tiene configurado, un comportamiento cuando ese evento click se produce en este caso, al ser un enlace ya lo lleva por defecto, esto va a hacer que vayamos a algún sitio


Cuando haga click se irá a una pantalla nueva, entonces creo un html nuevo `tweetDetail.html`


Cuado queramos cargar la página del tweet detalle tendrmeos que ir a buscar el `?id="id del tweet"` y esto lo conseguiremos diciéndole 
```js
    return `
    <a href="./tweetDetail.html?id=${tweet.id}">
        <span>${tweet.handler}</span>
        <span>${tweet.date}</span>
        <img src="${tweet.photo}" alt="tweet image">
        <p>${tweet.message}</p>
        <p>${tweet.likes}</p>
    </a>`
```

sabiendo que esto será dinamico hay que meterle el identificador del tweet que sea. ¿estamos mapeando los id cuando vienen de la BD de Sparrest? NO
el navegador nos devuelve
```sh
http://127.0.0.1:5500/tweetDetail.html?id=undefined
```
entonces vamos a tweetListMOdel.js y añadimos id:tweets.id
```js
    return tweets.map(tweet => ({
        // datos de la vista
        handler : tweet.handler,
        date    : new Date().toISOString(),
        photo   : tweet.image,
        message : tweet.message,
        likes   : tweet.likes.length,
        id      : tweet.id // <------- añadimos id
```

tu cuando le pasas un tweet a un colega, tú lo que le pasas en la url en tener en cuenta que el local estará hecho es local a cada cliente local a cada navegador entonces yo no tendría posibilidad de pasarle la url del detalle de un tweet Si el tweet que tengo que pintar no va en la url

Ahora vamos a montar la logica necesaria para ir a Sparrest

CReamos TweetDetail/index.js

 ese numerito es identificador que había una una clase de Javascript que nos ayudaba a ello que era Url Serge Parans y luego lo que tendríamos que hacer es ir a parres traernos los datos y pintar qué piezas se os ocurren que deberíamos tener aquí o sea queficheros como implementaríais? 


 1. pieza que reciba el id del tweet y devuelve los datos: Sparret tengo este id de tweet, dame los datos para escribirlo. - MODELO
 2. pieza que le mandamos los datos del tweet y nos devuelve el html necesario - VISTA
 3. pieza que renderizas ese html en la pantalla - CONTROLADOR


https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

si te vas a la consola de la inspeccion del browser un abres `window.location` verás 
`href: http://127.0.0.1:5500/tweetDetail.html?id=1` y también veremos `search: "?id=1"` esto sería **window.location.search** = '?id=1'

entonces si te pasamos `const params = new URLSerchParams(window.location.search)`
que esto aquí lo encontrarías en https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams y donde me interesa esto `searchParams.get()` y le paso en nimbre de nuestro parámetro que es id `searchParams.get("id")` y esto me devuelve un **1**.

Es un tratamiento sencillo para hacer la lectura. Entonces en index.js
```js
// sacamos el id del tweet
document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(window.location.search);
  const tweetId = params.get("id");
```
si yo estoy leyendo Tweet Idi, y ese tuit dí es nulo.Hago una redirección. Me salgo de aquí porque ya algo va a ir mal. O sea, si yo entro una pantalla donde tengo que pintar un tuit y no sé qué twit tengo que pintar qué voy a hacer en esa pantalla, Vale, eso lo primero ahí tendríamos que controlar que tenemos que hacer una redirección


or una parte, también otra respuesta válida : Empieza a crear el controlador y haz todo desde ahí. El traerte. Los datos del Tweet, crear la vista o pasarle los datos y pintarlo en pantalla. Así que es lo que vamos a hacer. Creo tweetDetailController.js 

CReo en el html la linea
```html
<section id="tweetDetail"></section>
```

que será el contenedor de que va a pintar aqui
```js
// tweetDetailController.js
export const tweetDetailController = (tweetDetail) => 
```

ahora voy a por ese nodo al DOM
```js
document.addEventListener('DOMContentLoaded', () => {
  
  // Utiliza URLSearchParams para obtener parámetros de la URL actual
  const params = new URLSearchParams(window.location.search);
  // Extrae el valor asociado con la clave "id" de los parámetros de la URL
  const tweetId = params.get("id");

  // Selecciona el elemento con el id 'tweetDetail' del documento
  const tweetDetail = document.querySelector('#tweetDetail');
  // Llama a la función tweetDetailController 
  tweetDetailController(tweetDetail, tweetId);
});

```

monto estructura en tweetDetallController.js
```js
export const tweetDetailController = async (tweetDetail, tweetId) => {
    try {
        const tweet = await getTweet(tweetId);
        console.log(tweet);
    } catch (error) {

    }
}
```

creamos tweetDetailModel.js y aquí no dependemos de ningún click ni dana se hace la acción y se ejecuta al controlador directamente
```JS
export const getTweet = async (tweetId) => {
    const url = `http://localhost:8000/api/tweets/${tweetId}`;

    const response = await fetch(url);
    const tweet = await response.json();
}
```


Comprovamos que funcione en ebrowser

Creo una función parseTweet en el modelo para pintar los tweets en el detalle a partir de BD Sparrest
```js
const parseTweet = (tweet) => {
    return {
      handler: tweet.user.username,
      photo: tweet.image
      message: tweet.message,
      likes: [],
      userId: tweet.user.id,
      id: tweet.id
    }
}

export const getTweet = async (tweetId) => {
    const url = `http://localhost:8000/api/tweets/${tweetId}`;

    const response = await fetch(url);
    const tweet = await response.json();

    // modifico la funcion para capturar error
    try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          const message = data.message || 'Ha ocurrido un error';
          throw new Error(message);
        }
      } catch (error) {
        throw error.message;
      }
}
```

le añado al controlador el alert

```js
export const tweetDetailController = async (tweetDetail, tweetId) => {

    try {
        const tweet = await getTweet(tweetId);
        console.log(tweet);
    } catch (error) {
        alert(error)
    }
}
```

Creo la VISTA tweetDetailView.js
```js
// Exporta una función que construye la estructura HTML de un tweet
export const buildTweet = (tweet) => {

    // Define la estructura base del tweet con su nombre de usuario (handler) y su mensaje
    let tweetTemplate = `
        <span>${tweet.handler}</span>
        <img src="${tweet.photo}" alt="tweet image">
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
```


importo la vista al constrolador
```js
import { getTweet } from "./tweetDetallModel.js";
import { buildTweet } from "./tweetDetailView.js"; // importo la vista


export const tweetDetailController = async (tweetDetail, tweetId) => {

    try {
        const tweet = await getTweet(tweetId);
        tweetDetail.innerHTML = buildTweet(tweet); // ahora quiero pintar el tweet
    } catch (error) {
        alert(error)
        window.location = "./index.html"; // si el tweet no existe ?id=5656 rediccionamos
    }
}
```


Ahora montamos el sistema de notificaciones:

1. HTML

```html
<!--tweetDetail.html-->
<section id="notifications"></section> <!--abro la seccion-->
<link rel="stylesheet" href="./notifications/style.css" /> <!--añado los estilos-->
```

2. Nos vamos al `/tweet_detail/index.js`

```html
<!--tweetDetail.html-->
<body>
    <h1>detalle del tweet</h1>
    
    <section id="notifications"></section>

    <section id="tweetDetail"></section>

    <script type="module" src="./tweet_detail/index.js"></script> <!--puedes pinchar aquí directamente-->
</body>

```

en 

```js
//import { tweetDetailController } from "./tweetDetailController.js";
import { notificationsController } from "../notifications/notificationsController.js";



//document.addEventListener('DOMContentLoaded', () => {

  //const params = new URLSearchParams(window.location.search);
  //const tweetId = params.get("id");

  const notifications = document.querySelector("#notifications"); // identifico la seccion/nodo
  notificationsController(notifications); // muestro notificaciones en el nodo

  //const tweetDetail = document.querySelector('#tweetDetail');
  //tweetDetailController(tweetDetail, tweetId);
})
```

lo que quiero es que cuando dentro de `tweetDetailController(tweetDetail, tweetId);` se detecte un error en la carga del tweet, tengo que disarar un evento para que le padre diga, "" me ha llegado un evento de carga tweet erroneo." pues voy a mostrar mensaje através de una notificacion.

Pues vamos al CONTROLADOR y disparar un evento. Ya hemos creado una utilidad para disarar eventos utils/dispatchEvent.js
El nombre del evento me lo invento `tweetLoaded` , este `tweetDetail` es el nodo que queremos que dispare el evento.
```JS
//`tweetDetailControler.js`

//import { getTweet } from "./tweetDetallModel.js";
//import { buildTweet } from "./tweetDetailView.js"; 
import { dispatchEvent } from "../utils/dispatchEvent.js";


// export const tweetDetailController = async (tweetDetail, tweetId) => {

//     try {
//         const tweet = await getTweet(tweetId);
//         tweetDetail.innerHTML = buildTweet(tweet); // ahora quiero pintar el tweet
//     } catch (error) {
//         alert(error)
//         window.location = "./index.html"; // si el tweet no existe ?id=5656 rediccionamos
        // datos que quiero que viajen en el evento
        dispatchEvent('tweetLoaded', { type: "error", message: "El tweet no existe" }, tweetDetail);
//     }
// }
```

Ahora en el index.js defino los escuchadores. Acuerdate que lo hemos llamado dispatchEvent( **'tweetLoaded'** )


```js
// import { tweetDetailController } from "./tweetDetailController.js";
// import { notificationsController } from "../notifications/notificationsController.js";


// document.addEventListener('DOMContentLoaded', () => {
//   const params = new URLSearchParams(window.location.search);
//   const tweetId = params.get("id");

//   const notifications = document.querySelector("#notifications"); 
   const showNotification = notificationsController(notifications);

//   const tweetDetail = document.querySelector('#tweetDetail');
//   tweetDetailController(tweetDetail, tweetId);

  tweetDetail.addEventListener('tweetLoaded', (event) => {
    showNotification(event.detail.message,   // dentro del dispatchEvent ejecuto la función showNotification
                     event.detail.type
                    );
  })

//})
```

para no tener problemas de orden de eejecución bajamos la linea `tweetDetailController(tweetDetail, tweetId);` al final

```js
// import { tweetDetailController } from "./tweetDetailController.js";
// import { notificationsController } from "../notifications/notificationsController.js";


// document.addEventListener('DOMContentLoaded', () => {
//   const params = new URLSearchParams(window.location.search);
//   const tweetId = params.get("id");

//   const notifications = document.querySelector("#notifications"); 
   const showNotification = notificationsController(notifications);

//   const tweetDetail = document.querySelector('#tweetDetail');

  tweetDetail.addEventListener('tweetLoaded', (event) => {
      showNotification(event.detail.message,   // dentro del dispatchEvent ejecuto la función showNotification
                     event.detail.type
                    );
  })

  tweetDetailController(tweetDetail, tweetId);
//})
```






















