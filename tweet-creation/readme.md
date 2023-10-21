
1. creamos index.js 
2. creamos html y en
```html
<script type="module" src="./tweet-creation/index.js"></script>
```

3. index.js 

```js
document.addEventListener('DOMContentLoaded', () => {
  // dentro de la función se ejecuta un CONTROLADOR ¿cuál? El de la creación de los Tweets
})
```

4. creamos CONTROLADOR archivo tweetCreationController.js

```js
// esta función recibe el nodo <form id="tweetCreation">
export const tweetCreationController = (tweetCreation) => {

}
```

5. index y vamos a por el nodo Formuladio `id="tweetCreation">` y se lo pasamos al controlador (loimportamos)
```js
import { tweetCreationController } from "./tweetCreationController.js"


document.addEventListener('DOMContentLoaded', () => {
    // vamos a por el nodo Formulario y se lo pasamos al CONTROLADOR
   const tweetCreation = document.querySelector('#tweetCreation')
   tweetCreationController(tweetCreation); // le pasamos el nodo
})
```

6. En el formulario tenemos un botón, cuando se pulse hace dos cosas::: escuchamos a sumit `<button type="submit">Crear tweet</button>` y sacamos los datos de ese formulario. Recordad que para esto, ya en el formulario de Login utilizamos una clase que se llamaba `FormData`, que recibe el nodo del formulario y nos permite sacar los valores de una forma más sencilla 
```js
// esta función recibe el nodo <form id="tweetCreation">
export const tweetCreationController = (tweetCreation) => {
    const formData = new FormData(tweetCreation);
    const message = formData.get("message"); // lo que haya escrito user
}
```

7. Ahora consumimos un nuevo ENDPoint de Sparrest que nos permita crear un tweet. Para ello creamos un fichero que sea el MODELO --> `tweetCreationMOdel.js`

```js
export const createTweet = async (message) => {
    // ¿qué método de http nos permite hacer creación en un api ? POST
    const url = "http://localhost:8000/api/tweets"; // url para crear un tweet en Sparrest

    // defino el cuerpo
    const body = {
        message: message
    }

    let response;
    try {
        response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
}
```

8. Esto lo ejecutamos en el CONTROLADOR

```js
import { createTweet } from "./tweetCreationModel.js";


// export const tweetCreationController = (tweetCreation) => {

//     tweetCreation.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const formData = new FormData(tweetCreation);
//         const message = formData.get("message"); 

        await createTweet(message);
//     })
// }
```

Si pruebas esto en el browser verás que aparece el boton y una caja vacía. Además no deberías permitir que se cree un formulario vacío... si vete al html y ponle required al text area. Pero como no le has dicho quien ers a Sparest BD este te contesta esto si lo inspeccionas en Netwrok Preview

```json
{status: 401, message: "Wrong access token"}
message :  "Wrong access token"
status :  401
```

de alguna manera a través de la peticion htpp le tenemos que decir quién somos, y es lo que se suele hacer en una cabecera. Le tenemos que mandar en `acces token` a través de una cabecera http. `'Authorization': `Bearer ${token}``


```js
export const createTweet = async (message) => {
    const url = "http://localhost:8000/api/tweets"; 
    // cuando contactamos con Sparrest lo primero que hacemos es sacar el token
    const token = localStorage.getItem('token');


    const body = {
        message: message
    }

    let response;
    try {
        response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}` // cuando hacemos la petición le decimos que soy YO y la BD sabré que user es
        }
      });
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
}
```

Voy al Browser y creo un tweet y me contesta Network -- Response

```json
{
  "message": "Primer tweet desde Sparest",
  "userId": 1,
  "updatedAt": "2023-10-20T18:45:10.221Z",
  "id": 4
}
```


Fíjate ahora que es la BD de sparest hay diferentes estructuras y esto es mortal

```json
"tweets": [
    // {
    //   "id": 0,
    //   "author": "TechCrunch",
    //   "image": "https://pbs.twimg.com/media/D1KNUQ8VAAAEx8L.jpg",
    //   "message": "Facebook now lets everyone unsend messages for up to 10 minutes https://techcrunch.com/2019/02/05/facebook-messenger-remove/ … by @JoshConstine",
    //   "likes": ["markZuck", "donnie", "EduardoSaverin", "DMoskovitz"]
    // },
    // {
    //   "id": 1,
    //   "author": "JoshConstine",
    //   "image": "https://pbs.twimg.com/media/D1KNUQ8VAAAEx8L.jpg",
    //   "message": "THREAD: After writing hundreds of articles about about apps this year, here’s my wishlist of feature launches like Twitter DM search & Uber “Quiet Ride”. First up, Instagram... 1/",
    //   "likes": ["nick", "steve2"]
    // },
    {
      "message": "dede",
      "userId": 22,
      "updatedAt": "2023-10-20T18:10:40.793Z",
      "id": 2
    },
    {
      "message": "dede",
      "userId": 22,
      "updatedAt": "2023-10-20T18:10:49.816Z",
      "id": 3
    }
  ]
}
```

como esto lo utilizabamos para pintar cosas lo voy a borrar en Sparretd y mantenemos los tweets con nuestro modelo de datos. Y la mitad del proyecto se va a fastidiar porque hemos organizado hasta ahora con el modelo antiguo. MIralo en la web, no carga. POrque estamos accediento a propiedades queno existen 

Vamos a cambiar esto en el `tweetListModel.js`

```js
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
```

por esto

```js
// transformamos la info que nos llega de la api
const transformTweets = (tweets) => {
    return tweets.map(tweet => ({
      handler: tweet.author,
      date: new Date().toISOString(),
      message: tweet.message,
      id: tweet.id
    }))
  }
```

Voy a la vista y le cambio tbn `tweetListView.js`

```js
// necesitamos retornar el html completo

export const builtTweet = (tweet) => {
    return `
    <a href="./tweetDetail.html?id=${tweet.id}">
        <span>${tweet.handler}</span>
        <span>${tweet.date}</span>
        <p>${tweet.message}</p>
    </a>`
}
```


Ahora vamos a pedir a Sparrest que en la peticion de que le estamos haciendo nos compnga la respuesta con los datos del usuario que es creadro del tweet

si cuando consume el tweet le paso `_expand=user` y le decimos "completame con los datos de user" porque recuerda que en la BD habia una coleecion de users y otra de tweets entonces le estamos diciendo que nos vitamite con esos datos la respuesta

```js
// tweetListModel.js
// función asincrónica async indica que la función maneja promesas con await.
export const getTweets = async () => {
    const url = "http://127.0.0.1:8000/api/tweets?_expand=user";
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
```

si lo pones en el navegador `http://127.0.0.1:8000/api/tweets?_expand=user` verás esto, enchufa los datos del usuario que puso el tweet, junta las dos keys.

```json
[
  {
    "message": "dede",
    "userId": 22,
    "updatedAt": "2023-10-20T18:10:40.793Z",
    "id": 2,
    "user": {
      "username": "alexjustbarcelona1111@gmail.com",
      "password": "$2b$10$3Tb7dxJdJFSwTuEXfVOBpOicnzm74ySMcm9vt91yNBhoDCCTDiTgG",
      "id": 22
    }
  },
  {
    "message": "dede",
    "userId": 22,
    "updatedAt": "2023-10-20T18:10:49.816Z",
    "id": 3,
    "user": {
      "username": "alexjustbarcelona1111@gmail.com",
      "password": "$2b$10$3Tb7dxJdJFSwTuEXfVOBpOicnzm74ySMcm9vt91yNBhoDCCTDiTgG",
      "id": 22
    }
  }
]
```

ahora podemos cambiar el nombre del usuario en el MODELO

```js
// transformamos la info que nos llega de la api
// const transformTweets = (tweets) => {
//     return tweets.map(tweet => ({
      handler: tweet.user.name,
  //     date: new Date().toISOString(),
  //     message: tweet.message,
  //     id: tweet.id
  //   }))
  // }
```

¿cuando hemos de dejar al usuario que vea un botón para la creación de tweets? cuando se loguea
¿tenemos alguna funcion que pinto algo en funcion si el usuario está logado o no? ./SESSION/sessionView

```js
// export const buildAuthenticatedSession = () => {
// return `
<a href="./tweet-creation.html">Create tweet</a>
//<button>Cerrar sesión</button>`
```


PROTECCINOES: ahora mismo si  pones [/tweet-creation.html ](http://127.0.0.1:5500/tweet-creation.html)

accedes directamente la página  ¿como lo protejes? miramos si tiene un token

a primer nivel /twwet-creation/index.js

```js
const token = localStorage.getItem('token');
if (!token) {
  window.location = './index.html';
}
```

Integramos el sistema de notificaciones en la creacion de tweets


```html
<!--tweet-creation.html-->
<section id="notifications"></section>
```

```js
// index.js
// import { tweetCreationController } from "./tweetCreationController.js"
import { notificationsController } from "./notifications/notificationController.js"


// const token = localStorage.getItem('token');
// if (!token) {
//   window.location = './index.html';
// }


// document.addEventListener('DOMContentLoaded', () => {
//     const tweetCreation = document.querySelector('#tweetCreation')
//     tweetCreationController(tweetCreation);

    const notifications = document.querySelector('#notifications');
    const showNotification = notificationsController(notifications);

  // })
```


```js
// import { createTweet } from "./tweetCreationModel.js";
import { dispatchEvent } from "../utils/dispatchEvent.js";

// export const tweetCreationController = (tweetCreation) => {

//   tweetCreation.addEventListener('submit', async (event) => {
//     event.preventDefault();

    // const formData = new FormData(tweetCreation);
    // const message = formData.get("message");

    try {
      await createTweet(message);
      // disparamos evento
      dispatchEvent('tweetCreated',  // nombre propio del evento
                    { type: "success", message: "Tweet creado correctamente" }, // tipo según botón del DOM
                     tweetCreation); // nombre del nodo <form id="tweetCreation">
      setTimeout(() => {
        window.location = "index.html";
      }, 2000);
    } catch (error) {
      dispatchEvent('tweetCreated', 
                    { type: "error", message: "Error creando tweet" }, 
                    tweetCreation);      
    }

//   })
// }
```

Ahora tenemos que escuchar lo que pasa desde el index.js


```js
// import { tweetCreationController } from "./tweetCreationController.js";
// import { notificationsController } from "../notifications/notificationsController.js";

// const token = localStorage.getItem('token');
// if (!token) {
//   window.location = './index.html';
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const tweetCreation = document.querySelector('#tweetCreation');

//   const notifications = document.querySelector('#notifications');
//   const showNotification = notificationsController(notifications);

  tweetCreation.addEventListener('tweetCreated', (event) => { // `nombre propio del evento dispatchEvent('tweetCreated')` 
    showNotification(event.detail.message, event.detail.type); // función manejadora del evento
  });

  tweetCreationController(tweetCreation); // hemos bajado al final la creación del tweet

// })
```

Si te fijas te dice que no existe e tweet, esto es porque hemos actualizado e modelo de datos en el listado de tweets, pero no hemos hecho en el detalle del tweet.

Vamos al detalle del tweet: tweetDetailModels.js

```js

const parseTweet = (tweet) => {
    return {
      handler: tweet.author.toUpperCase(),   // <----- aquí te peta
      photo: tweet.image,
      message: tweet.message,         // Contenido del tweet.
      likes: [],                      // Inicializa un array vacío para los 'likes'.
      //userId: tweet.user.id,          // ID del usuario que publicó el tweet.
      id: tweet.id                    // ID del tweet.
    }
}


export const getTweet = async (tweetId) => {
    // Define la URL para obtener el tweet basada en el ID proporcionado.
    const url = `http://localhost:8000/api/tweets/${tweetId}`;
```

de esto pasamos a esto 

```js
/*Convierte la estructura de un tweet a un formato específico.*/
const parseTweet = (tweet) => {
  return {
    handler: tweet.user.username,
    message: tweet.message,
    likes: [],
    userId: tweet.user.id,
    id: tweet.id
  }
}


export const getTweet = async (tweetId) => {
    const url = `http://localhost:8000/api/tweets/${tweetId}?_expand=user`;

```

ahora el **end point** ya ha cambiado `http://127.0.0.1:5500/tweetDetail.html?id=2`


**BORRADO DEL TWEET**
sabemos si estamos logados o no pero necesitamos cierta informacion del user que está logado ¿hemos visto datos del user que ha inicializado sesion? Tenemos el token, si vas a https://jwt.io/ puedes ver que el token nos da esta infromacion 

```json
{
  "userId": 1,
  "username": "alexjustbarcelona@gmail.com",
  "iat": 1697878336,
  "exp": 1697964736
}
```

si podemos leer los datos del token desde js tendríamos capacidad de saber de quien es el tweet. Si te fijas antes veíamos esto si lo pones en el navegador `http://127.0.0.1:8000/api/tweets?_expand=user` 

```json
[
  {
    "message": "dede",
    "userId": 22,
    "updatedAt": "2023-10-20T18:10:40.793Z",
    "id": 2,
    "user": {
      "username": "alexjustbarcelona1111@gmail.com",
      "password": "$2b$10$3Tb7dxJdJFSwTuEXfVOBpOicnzm74ySMcm9vt91yNBhoDCCTDiTgG",
      "id": 22
    }
  }
]
```

es decir por una parte nos dice tanto el id, como el correo del que creó el tweet y por otra parte tenemos un token que so lo decodificamos vamosa saber si userIda como el user.

Lo que vamos hacer ahora es que vamos a decodificar el token vía JS, es sencillo porque es base64, pero lo correcto que es BD Sparrest tenga un endpont con el token en la cabecera , que haga la decodificacion por mi, normalmente lo hace la BD.

Las medidas de SEGURIDAD siempre han de estar implementadas en la capa SERVIDOR; otra cosa es que adicionalmente en tu página web tu hagas ciertas comprovaciobnes para evitarle operaciones al usuario que tu sabes que no van a salir bien para que no tengan fustraciones ¿para que vas a montar un botón al usuario para un tweet que no es el suyo y no va a poder borrarlo? es como ... si el user no ha iniciado sesión para qué le voy a mostrar un botón de logado o cerrar sesión?

Pero ahora vamos a usar esto ./utils/decodeToken.js :

```js
export const decodeToken = (token) => {
  let decodedToken;

  try {
    const stringifiedToken = atob(token.split(".")[1]); // nos interesa el segundo del json token
    decodedToken = JSON.parse(stringifiedToken);
  } catch (error) {
    return null;
  }

  return decodedToken;
}
```

```json
// {
//   "userId": 1,
  "username": "alexjustbarcelona@gmail.com", // nos interesa este por eso token.split(".")[1]
//   "iat": 1697878336,
//   "exp": 1697964736
// }
```

nos creamos en `tweetDetailController.js`

```js
import { deleteTweet, getTweet } from "./tweetDetailModel.js"
// import { buildTweet } from "./tweetDetailView.js"; 
// import { dispatchEvent } from "../utils/dispatchEvent.js";
import { decodeToken } from "../utils/decodeToken.js"

// export const tweetDetailController = async (tweetDetail, tweetId) => {

//     try {
//         const tweet = await getTweet(tweetId);
//         tweetDetail.innerHTML = buildTweet(tweet); // ahora quiero pintar el tweet
        handleDeleteTweet(tweet, tweetDetail); // Evalúa si el usuario tiene permiso para eliminar un tweet
//     } catch (error) {
//         // alert(error)
//         // datos que quiero que viajen en el evento
//         dispatchEvent('tweetLoaded', 
//                       { type: "error", message: "El tweet no existe" }, 
//                       tweetDetail);
//         setTimeout(() => {
//             window.location = './index.html'; // si el tweet no existe ?id=5656 rediccionamos
//           }, 3000);
//     }
// }


/** Evalúa si el usuario tiene permiso para eliminar un tweet y, si es así, añade el botón de eliminación.*/
const handleDeleteTweet = (tweet, tweetDetail) => {
    // Obtiene el token JWT del almacenamiento local.
    const token = localStorage.getItem('token');
  
    if (token) {
      // Decodifica el token para obtener el ID del usuario.
      const { userId } = decodeToken(token);
  
      // Si el ID del usuario coincide con el autor del tweet, agrega el botón de eliminación.
      if (userId === tweet.userId) {
        addDeleteTweetButton(tweet, tweetDetail);
      }
    }
}

/** Añade un botón de eliminación al tweet.*/
const addDeleteTweetButton = (tweet, tweetDetail) => {
    // Crea un nuevo botón.
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar tweet';

    // Añade un evento al botón para manejar la eliminación del tweet.
    deleteButton.addEventListener('click', async () => {
      if (confirm('¿Seguro que quieres borrar el tweet?')) {
        await deleteTweet(tweet.id);
        window.location = 'index.html';
      }
    })
    // Añade el botón al elemento DOM del tweet.
    tweetDetail.appendChild(deleteButton);
}
```

Creo en el MODELO y creo la función que ya he puesto anteriormente  `deleteTweet.js`

```js
export const delete = async (tweetId) => { 
};
```

Para borrar el recurso de un api se utiliza DELETE.

pego dentro de la funcion --> Me copio el POST de creación del archivo `tweetCreationModel.js` 


```js
export const deleteTweet = async (tweetId) => {

    // Me copio el POST de creación del archivo `tweetCreationModel.js` 

    const url = `http://localhost:8000/api/tweets/${tweetId}`; 
    const token = localStorage.getItem('token');

    
    // const body = {
    //     message: message
    // }

    let response;
    try {
        response = await fetch(url, {
        method: "DELETE",
        // body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
};
```



PREGUNTA

El opcional de la práctica del Update sería más menos el mismo proceso que esto para mostrar el botón y en el uthdate lo que haríamos sería el mismo formulario del create, pero cargando los valores con los valores del producto que te traiga.

p:Sí, ahí yo te recomiendo que primero lo que haga sea duplicar el formulario. ¿Vale?Vale.Y luego intentes, hacer un refactor reutilizandolos, es relativamente sencillo. ¿Vale? Puedes muy fácilmente útiles reutilizar el controlador, que es lo más lo que debe reutilizar, porque ya el controlador engancha con el modelo y con la vista vale , ahí lo que deberías hacer es el controlador que reciba un parámetro más si es que estás en odo edicion. 

El mismo controlador del crite se refiere? y ya para no duplicar el controlador con un Utdate.?

p:Pero tú deberías darle la potestad a ese controlador. De decir, vale, ¿estoy en modo edición. O estoy en modo creación.? Para.Vale si estoy en modo edición, pues lo primero que voy a hacer es tú. Me tienes que pasar unos datos de fuera.Si tú quieres modificar un tweet, tú me tienes que pasar lo que está escrito en el tweet.

Entonces.sería duplicar el Html. Eso sí, hay que duplicarlo para que te lleve una página que sea uptate, o tampoco sería necesario.

p:tienes que la vista, la tienes que duplicar.La tienes que duplicar.Pero bueno, no te viene mal porque te quitan lógica de pintar el típico mensaje de venga actualiza.Sí.El tweet Vale, este tipo de tonterías. El botón, por ejemplo, que pongo a guardar en vez de crear sabes, eso es lógica que al final te quitas pero el controlador el controlador tú sí deberías utilizar el mismo formulario aunque esté duplicado, aunque tengas un formulario de creación y un formulario de edición esté controlado por el mismocontrolador. 

Así lo puedes regularizar.Sí que en el formulario de edición, lo que hago es cargar el index de creación y pasar pasándole un argumento.

p:O no no tendrá. O sea tú ten en cuenta que los Index Js van por pantalla, Vale, si tú tienes una pantalla de creación y una pantalla edición, tú vas a tener 2 index.Js: Vale, eso Sí, sin mantenerlo.Separado. Lo vemos.

Pero desde Linda Jss, desde edición llamo al controlador desde creación, pero con el argumento extra, que es una edición que.Exacto. 

p:De hecho, yo ya lo siguiente que haría sería renombrar ese controlador. 

En vez de createte, pues así le pone algo más descriptivo, Sí, porque no lo está usando solo para la creación, sino también para palo.Sí que es prácticamente lo mismo.

p:Entonces tú ya a ese controlador le tendrías que lo tendrías que vitaminar vale para que, además de crear que ya está creando, sea lo suficientemente inteligente para poder editar entonces si tú le pasa y tú le pasas ya un tuit que existe para que lo edite lo primero que tendrás que hacer será meterle una lógica adicional para que te inicialice el formulario con los datos delTweet ya te pinte, Por ejemplo, si lo único que podemos modificar de un tweet es el texto, pues que el test área ya no aparezca en blanco que aparezca con ese valor por defecto que tenemos que al final del curso válido.

Si sería cambiando los valores de cada input para que te salgan.Exacto exacto ¿vale? Y a partir de ahí, ya, pues recto.Sí puede reutilizar toda la lógica si el modelo lo pueda reutilizar, porque bueno es para otro.En Point, sino el método. Sería un pacho.Sí. 

p: Pero claro, al final tú, en ese controlador tendrás un Nif que sea. Estoy en modo creación, pues llamo al create Tweet.O sea.Estoy en modo edición. Consumo, él Edith Tweet, y hasta van a hacer métodos diferentes de tu modelo.


Sí, en vez del método. Bueno, métodos en vez del post hace un puto. Ok, Ok.Un port alcalde de un foro masculino o un a que ahí a poco que le des un poquito de vuelta, lo saca.No es complicado.Si es que lo estuve pensando? Y, bueno, no tienes que repetir tampoco mucho código. Por eso te lo he preguntado.


----


Paro los que hagan los opcionales leeros esto https://www.npmjs.com/package/json-server

stoy compartiendo. Siempre estuve igual.Vale, Jason sirve para los que os vengáis arriba y queráis hacerlos requisitos opcionales.Importante que esto lo leáis vale. Por ejemplo, el expand que yo he utilizado a salido de leerse, esto.Si aquí buscáis, expand, Vale, te dice para incluir un paren risas, o sea, un recurso padre, utiliza Alexand.Vale. Entonces, bueno, aquí hace un símil, con qué hay comentarios de un post, pues aquí serían los tweets y el usuario.Para que osáis una idea. Esto. Si os queréis hacer los requisitos opcionales.Es de obligada lectura. Bien, ¿vale?Ya hemos visto todo el temario que teníamos que ver


**Refactorización de la pueza**

vamos a refactorizar esto del modelo

```js
// /** Convierte la estructura de un tweet a un formato específico.
//  * 
//  * @param {Object} tweet - El objeto tweet original.
//  * @returns {Object} - Retorna un objeto con la estructura reformateada.
//  */
// const parseTweet = (tweet) => {
//   return {
//     handler: tweet.user.username,
//     message: tweet.message,
//     likes: [],
//     userId: tweet.user.id,
//     id: tweet.id
//   }
// }


// /** Obtiene un tweet específico desde el backend por su ID.
//  * 
//  * @param {number} tweetId - El ID del tweet a recuperar.
//  * @returns {Object} - Retorna el tweet solicitado.
//  * @throws {Error} - Lanza un error si la respuesta no es exitosa o si hay otros problemas.
//  */
export const getTweet = async (tweetId) => {
    // Define la URL para obtener el tweet basada en el ID proporcionado.
    const url = `http://localhost:8000/api/tweets/${tweetId}?_expand=user`;

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


export const deleteTweet = async (tweetId) => {

  // Me copio el POST de creación del archivo `tweetCreationModel.js` 
  // modifico cosas

  const url = `http://localhost:8000/api/tweets/${tweetId}`; 
  const token = localStorage.getItem('token');

  let response;
  try {
      response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message);
    }
  } catch (error) {
    if (error.message) {
      throw error.message;
    } else {
      throw error;
    }
  }
};
```

y vamos hace una pieza y que esta pieza sea parametrizable con el EndPoint, datos , el cerbo, etc
Lo haremos en ./utils/sparrestApi.js

```js
// Define un módulo que interactúa con la API de Sparrest.
export const sparrestApi = () => {
    
    const baseUrl = "http://localhost:8000/"; // Establece la URL base del servidor. (en ago comun)
  
    // Función asíncrona para realizar peticiones GET a un endpoint específico.
    const get = async (endpoint) => {
      const url = baseUrl + endpoint;          // Construye la URL completa.
      try {
        const response = await fetch(url);     // Intenta obtener datos del servidor.
        if (response.ok) {
          const data = await response.json();  // convierte el cuerpo a JSON y devuélvelo.
          return data;
        } else {
          const message = data.message || 'Ha ocurrido un error';
          throw new Error(message);
        }
      } catch (error) {
        throw error.message; // Propaga el mensaje de error para ser manejado externamente.
      }
    };
  
    // Función asíncrona para eliminar un recurso en un endpoint específico.
    const remove = async (endpoint) => {
      const url = baseUrl + endpoint;
      // Obtiene el token del almacenamiento local, necesario para autenticar la petición DELETE.
      const token = localStorage.getItem('token');
  
      try {
        // Intenta eliminar el recurso.
        response = await fetch(url, {
          method: "DELETE",
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          // Si hay un error, intenta obtener el mensaje del servidor o usa un mensaje por defecto.
          const data = await response.json();
          const message = data.message || 'No ha sido posible borrar el elemento';
          throw new Error(message);
        }
      } catch (error) {
        // Propaga el mensaje de error para ser manejado externamente.
        if (error.message) {
          throw error.message;
        } else {
          throw error;
        }
      }
    }
  
    // Devuelve las funciones 'get' y 'delete' para ser utilizadas externamente.
    return {
      get: get,
      delete: remove
    }
}
```


Entonces en el MODELO refectorizamos así


```JS
import { sparrestApi } from "../utils/sparrestApi.js"



/** Transforma la estructura de un tweet a un formato específico.*/
const parseTweet = (tweet) => {
  return {
    handler: tweet.user.username,  // Nombre de usuario del autor del tweet.
    message: tweet.message,        // Mensaje del tweet.
    likes: [],                     // Inicialmente define los likes como un arreglo vacío.
    userId: tweet.user.id,         // ID del usuario que creó el tweet.
    id: tweet.id                   // ID del tweet.
  }
}

/** Obtiene un tweet específico desde el servidor por su ID, y expande el objeto usuario. */
export const getTweet = async (tweetId) => {
  const endpoint = `api/tweets/${tweetId}?_expand=user`; // Define el endpoint incluyendo la expansión del usuario.
  // Usa la función sparrestApi para hacer una solicitud GET al servidor.
  const tweet = await sparrestApi().get(endpoint);

  return parseTweet(tweet); // Retorna el tweet transformado.
}

/** Elimina un tweet específico del servidor usando su ID */
export const deleteTweet = async (tweetId) => {
  const endpoint = `api/tweets/${tweetId}`; // Define el endpoint para eliminar el tweet.
  await sparrestApi().delete(endpoint); // sparrestApi() para hacer una solicitud DELETE al servidor.
}
```




**Subir una imagen a un proveeder de tereros y se guarde en una BBDD**



