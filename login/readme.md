
Este Readme define el proceso que he llevado a cabo para construir el codigo. Cada carpeta refactoring es la evolución hasta el codigo final fuera de las carpetas refactoring.


---


** Creamos html template **
1. añado linea final del body <!-- <script type="module" src="./login/index.js"></script> -->
2. ¿estático o dinámico? es algo que deberíamos cargar en tiempo de ejecución de JS o es un html que va a estar ahí por defecto. 
3. Estático. Pues creamos el <!-- <form id="login"> -->

** CREAMOS CARPETA LOGIN **
1. creo index.js --> cargo el DOM con 'DOMContentLoaded' y cargado con la función hacemos cositas:
2. recibo html del Formulario de inicio de sesion <!-- const loginForm = document.querySelector('#login'); -->
3. creo loginController.js porque en index.js debo 
4. en loginController.js creo controlador **loginControler (loginForm)** recibiendo los datos **loginForm** del Formulario '#login'
5. en index.js importo { loginController } from "./loginController.js"; y lo ejecutamos dentro del document.addEventListener 'DOMContentLoaded', () =>  pasando los datos del html: loginControler(loginForm)

Ya tenemos un pequeño esquema de lo que haremos. ¿qué hace el controlador ?
6. creamos funciones en loginControler:
   - getLoginData : que extraiga datos del Formulario (loginForm)
   - submitLogin : que se comunique con BD Sparrest
   - 
7. Para que se comunique Login vs BD Sparrest creamos loginModel.js
   - creamos export const **loginUser** que recibirá cosas y hará más cosas
   - hemos de conectar BD utilizando un POST, Sparrest admite un modelo y nos hems de adaptar a su modelo 
   - Login to obtain your JWT token: POST /auth/login { username: "luke", password: "skywalker" }
8. en loginController:
   - try{loginUser(email, password) alert('login OK')} catch(error) {alert(error)}


** Conecto con Sparrest**
1. creo fichero loginModel.js
2. 
     - Obtener Referencias de Elementos : <!-- #login y #loader-->
     - Inicializar Controlador del Loader : <!--loaderController(loader)-->
     - Configurar Escuchadores para el Inicio y Finalización del Inicio de Sesión <!--star & finish-->
     - Inicializar Controlador de Inicio de Sesión : pasando el formulario de inicio de sesión (loginForm)


** notas **
- El token jwt <!--const jwt = await loginUser(email, password);--> será el token que guardaremos para identificar al usuario siempre. Si creamos un tweets la app ha de saber quien es el usuario.
- ¿Cuando creamos una variable en JS, ¿cuál es su tiempo de vida? Mientras la función deonde se haya definido esa variable siga en ejecución.