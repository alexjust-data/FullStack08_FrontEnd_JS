/**
 * 
 * el html pintará el formulario porque lo hemos comunicado con index.js desde la linea html:
 * <script type="module" src="./signup/index.js"></script>
 * 
 * aquí querySelector('#signup') recoje los datos del html desde el nodo <form id="signup">
*/



import { signupController } from "./signupController.js";



const signupForm = document.querySelector('#signup'); // vamos al DOM a por nuestro nodo <form id="signup">


signupController(signupForm); // ejecutamos el controlador con los datos de nuestro nodo <form id="signup">


