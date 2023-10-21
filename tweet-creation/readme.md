
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





