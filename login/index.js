import { loginController } from "./loginController.js";



// cuando el formulario se haya cargado hacemos => {}
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login');

    loginController(loginForm);
})