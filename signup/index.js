/**
 * 
 * el html pintará el formulario porque lo hemos comunicado con index.js desde la linea html:
 * <script type="module" src="./signup/index.js"></script>
 * 
 * aquí querySelector('#signup') recoje los datos del html desde el nodo <form id="signup">
*/



import { signupController } from "./signupController.js";
import { notificationController } from "../notifications/notificationsController.js"


// abrimos las cajas del DOM
const signupForm = document.querySelector('#signup'); // <form id="signup">
const notificationSections = document.querySelector('#notifications'); // <section id="notifications"></section>

const showNotification = notificationController(notificationSections); // con esto ya tenemos las notificaciones en la página de signup
signupController(signupForm); // ejecutamos el controlador con los datos de nuestro nodo <form id="signup">

// yo estoy escuchando un evento de qué nodo? signupForm
signupForm.addEventListener('userCreated', (event) => {
    showNotification(
        event.detail.message,  // viene de signupController.js / dispatchEvent --> detail: data
        event.detail.type
        )
})


