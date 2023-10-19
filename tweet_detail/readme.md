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