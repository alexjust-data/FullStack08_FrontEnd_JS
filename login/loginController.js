


import { loginUser } from "./loginModel.js";


export const loginController = (loginForm) => {

    /**  Escuchador de evento 'submit' del DOM:
     * se agrega un escuchador al evento 'submit' del formulario loginForm. <button type="submit">Login</button>
     * Cuando el evento se dispara (cuando un usuario hace clic en el botón "Login" del formulario), 
     * el escuchador ejecuta el código que se le ha asignado.
     */
   loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // permite acciones adicionales, antes envío predeterminado
    
        submitLogin(loginForm)  // validar y dar feedback : login <--> sparrest
      })
}

/** Validate and feedback user : login <--> sparrest
 * Asynchronously submits the login form.
 * @param {HTMLElement} loginForm - The form element to be submitted.
 */
const submitLogin = async (loginForm) => {
    const { email, password } = getLoginData(loginForm);  // Extract user credentials from the form
    try {
        //dispatchEvent('startLoginUser', null, loginForm); // Dispatch an event indicating the start of the login process
        const jwt = await loginUser(email, password);     // Attempt to log the user in
        alert('login OK');                                // Notify the user of a successful login
        localStorage.setItem('token', jwt);               // Store the JWT token for future authenticated requests
        window.location = './index.html';                 // Redirect the user to the main page
    } catch (error) {
        alert(error);   }                                  // Handle any login errors by notifying the user
    // } finally {
    //     dispatchEvent('finishLoginUser', null, loginForm);// Dispatch an event indicating the end of the login process
    // }
}


/** Extrae datos de loginForm y los devuelve como objeto
 * Función que extrae los datos de un formulario de inicio de sesión.
 *
 * @param {HTMLFormElement} loginForm - El formulario del que se extraerán los datos.
 * @returns {Object} Un objeto con los datos del formulario (email y contraseña).
 */
const getLoginData = (loginForm) => {
    
    /** Crear FormData a partir del formulario proporcionado.
     * FormData es una interfaz de la API Web que permite construir un conjunto de 
     * pares clave/valor que representan datos de formulario.
     */
    const formData = new FormData(loginForm);
    
    // Extraer el valor del campo '...' del objeto formData
    const email = formData.get('email');
    const password = formData.get('password');
  
    return {     // Retornar un objeto con los datos extraídos.
      email,     // Equivalente a email: email,
      password   // Equivalente a password: password
    };
}
  