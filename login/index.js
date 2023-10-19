import { loginController } from "./loginController.js";
import { loaderController } from '../loader/loaderController.js';



// cuando el formulario se haya cargado hacemos => {}
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login');

    loginController(loginForm);


    const loader = document.querySelector('#loader');
    const { show, hide } = loaderController(loader);

    loginForm.addEventListener('startLoginUser', () => {
        show();
    });
    loginForm.addEventListener('finishLoginUser', () => {
        hide();
    });
    
    loginController(loginForm);
})