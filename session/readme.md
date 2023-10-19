1. añado linea en index.html <!--<nav id="session"></nav>--> para que user pueda navegar.
2. creo archivos en ./session/sessionView.js & sessionController.js
3. en sessionView.js 
4. en index.js general importo controlador import { sessionController } from "./session/sessionController.js";
4.1 cazas el DOM const session = document.getElementById('session');
5. importas import { sessionController } from "./session/sessionController.js"; para que cuando el DOMContentLoaded esté cargado completamente ejecutemos la función para controlar el hecho

resumiento: me he iedo al index.js que es la página que controla el listado de tweets, y lo que hago es.... como tengo ua pieza nueva en esta pantalla pues cojo el nodo del DOM que hay que construir o controlar y se lo paso al controlador de turno.

6. vamos al controlador y lo estructuramos sessionController.js, la responsabilidad de este controlador es pintar algo si el usuario ha entrado a la sesion u no.
   - recibimos como parámetro que le llammamospor ejemplo nav  
   - si user haya iniciado sesión (login) 
   - en caso negativo inyecto el trozo de html en pantalla, es decir inluyo links a login y signup