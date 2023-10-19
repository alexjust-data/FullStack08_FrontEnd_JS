
Vamos añadir icono de ruelta de espra para cada acción que haga el usuario mientras de carga.

1. creo estila css buscando alguna ruleta de espera que me guste por internet
2. creo folder loader y creo archivo controlador y vista
3. el loaderControlador:
   
  - Este va a ser un controlador que vamos a usar bajo demanda en función de las acciones
  de otros controladores. Recuerda que se activa la ruleta de carga cada vez que se 
  inicia un evento o finaliza un evento surante el tiempo de espera.

  - tendrá que exportar funciones para que el index.js que se encarga de escuchar los otros eventos
  cuando esos eventos sucedan, ejecuten esa función. Por ejemplo cuando index.js ejecuta notificationsController(notifications); lo que hace si miras dentro es ejecutar la función que devuelve notificationsController(); y ese showNotification lo usamos como sonsecuencia de que los tweets se hayan cargado, entonces ejecuto el metodo show para mostrar notificacion de acces o error

  - loaderControlador funciona de una forma similar. Cuantas funciones tendremos dentro de controlador? una para mostrar la ruleta o otra para ocultar la ruleta


  - en el caso de notificationController la notificación se oculta a los tres segundos. Deberíamos ocultar la ruleta una vez el controlador ha termiando. Sólo el controlador de turno tiene ese conocimiento. Entonces necesitamos esas dos funciones.
  - showLoader
  - hideLoader
  
4. me voy al index.html y crea linea <!--<section id="loader"></section>-->
5. en nuestro escuchador de index.js me traigo el objeto con los métodos
```sh
const { show, hide } =  loaderController(loader);
```
se utilizarán cuando empecemos a cargar los tweets y cuando los tweets se empiecen a cargar y cuando 

```sh
  tweetList.addEventListener('startLoadingTweets', () => {
    show();
  })
  tweetList.addEventListener('finishLoadingTweets', () => {
    hide();
  })
```