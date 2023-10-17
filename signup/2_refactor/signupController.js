import { createUser } from "./signupModel.js";



/**
 * Módulo que se encarga de la validación y manejo del formulario de registro.
 * Sólo exporta la función signupController; las demás funciones son privadas.
 * 
 * Fíjate que le pasamos event a validateForm() porque event no es de su alcance
 * 
 * @param {HTMLFormElement} signupForm - Formulario de registro a validar y manejar.
 */
export const signupController = (signupForm) => {
    // Asigna el evento "submit" del formulario a la función de validación.
    signupForm.addEventListener("submit", (event) => validateForm(event, signupForm));
}

/**
 * Maneja el evento submit del formulario, validando los campos ingresados.
 * @param {Event} event - Evento submit del formulario.
 * @param {HTMLFormElement} signupForm - Formulario a validar.
 */
const validateForm = (event, signupForm) => {
    event.preventDefault();

    const email = signupForm.querySelector('#email');
    const password = signupForm.querySelector('#password');
    const passwordConfirmation = signupForm.querySelector('#password-confirmation');
    
    if (isFormValid(email, password, passwordConfirmation)){
        createUser(email.value, password.value);  // Asumiendo que esta función está definida en alguna parte.
    }
}

/**
 * Comprueba si los campos del formulario son válidos.
* @param {HTMLInputElement} email - Campo de correo electrónico.
* @param {HTMLInputElement} password - Campo de contraseña.
* @param {HTMLInputElement} passwordConfirmation - Campo de confirmación de contraseña.
* @returns {boolean} - Verdadero si ambos campos son válidos, falso de lo contrario.
*/
const isFormValid = (email, password, passwordConfirmation) => {
    const emailValidation = isEmailValid(email);
    const passwordValidation = isPasswordValid(password, passwordConfirmation);
   return emailValidation && passwordValidation;
}

/**
* Comprueba si el correo electrónico es válido.
* @param {HTMLInputElement} email - Campo de correo electrónico a validar.
* @returns {boolean} - Verdadero si el correo es válido, falso de lo contrario.
*/
const isEmailValid = (email) => {
   const emailRegExp = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
   if (!emailRegExp.test(email.value)) {
       alert('El email no es correcto');
       return false;
   }
   return true;
}

/**
* Comprueba si las contraseñas ingresadas coinciden.
* @param {HTMLInputElement} password - Campo de contraseña.
* @param {HTMLInputElement} passwordConfirmation - Campo de confirmación de contraseña.
* @returns {boolean} - Verdadero si las contraseñas coinciden, falso de lo contrario.
*/
const isPasswordValid = (password, passwordConfirmation) => {
   if (password.value !== passwordConfirmation.value) {
       alert('Las contraseñas no son iguales');
       return false;
   }
   return true;
}