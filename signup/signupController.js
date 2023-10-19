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
const validateForm = async (event, signupForm) => {
    event.preventDefault();
  
    const email = signupForm.querySelector('#email');
    const password = signupForm.querySelector('#password');
    const passwordConfirmation = signupForm.querySelector('#password-confirmation');
  
    try {
      if (isFormValid(email, password, passwordConfirmation)) {
        await createUser(email.value, password.value);
        dispatchEvent('userCreated', {
          type: "success",
          message: 'Usuario creado correctamente',
        }, signupForm)
        window.location = './login.html'; // cuando el usuario tiene el ok! lo enviamos a login Form
      }
    } catch (error) {
      dispatchEvent('userCreated', {
        type: "error",
        message: error,
      }, signupForm)
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
    const emailValidation =  isEmailValid(email);
    const passwordValidation = isPasswordValid(password, passwordConfirmation);
    return emailValidation && passwordValidation;
  }

/**
* Comprueba si el correo electrónico es válido.
* @param {HTMLInputElement} email - Campo de correo electrónico a validar.
* @returns {boolean} - Verdadero si el correo es válido, falso de lo contrario.
*/
const isEmailValid = (email) => {
    const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    let result = true;
  
    if (!emailRegExp.test(email.value)) {
      throw 'El email no es correcto';
    }
  
    return result;
  }

/**
* Comprueba si las contraseñas ingresadas coinciden.
* @param {HTMLInputElement} password - Campo de contraseña.
* @param {HTMLInputElement} passwordConfirmation - Campo de confirmación de contraseña.
* @returns {boolean} - Verdadero si las contraseñas coinciden, falso de lo contrario.
*/
const isPasswordValid = (password, passwordConfirmation) => {
    let result = true;
  
    if (password.value !== passwordConfirmation.value) {
      throw 'las contraseñas no son iguales';
    }
  
    return result;
  }


/**
 * Función para despachar un evento personalizado en un formulario.
 * 
 * @param {string} eventName - Nombre del evento personalizado a despachar.
 * @param {*} data - Datos o detalles que se quieran pasar con el evento.
 * @param {HTMLElement} signupForm - Elemento del formulario al que se le despachará el evento.
 */
const dispatchEvent = (eventName, data, signupForm) => {
    
  // Creación de un evento personalizado con el nombre y detalles proporcionados.
  const event = new CustomEvent(eventName, {
    detail: data
  });

  // Despachando (emitiendo) el evento personalizado en el formulario especificado.
  signupForm.dispatchEvent(event);
}

