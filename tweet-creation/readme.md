
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