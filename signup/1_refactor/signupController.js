/**
 * el controlador se encanrga de :
 * - gestinonar un nodo del DOM
 * 
 * signupController contralará el formulario
 */

/**
 * para que funcione de alguna forma tiene que recibir signupForm.
 * para eso creo un index.js
 * para ello exportamos la función a index.js
 */

/**
 * 1. hay que escuchar el evento del html cuando el formulario se haya rellenado para ejecutar cosas
 * 2. ¿cual es el evento que sucede cuando un formulario se rellena? --> submit
 * @param {*} signupForm 
 */


export const signupController = (signupForm) => {

    // escuchador al formulario evento (para saber cuando se rellena)
    signupForm.addEventListener("submit", (event) => {
        /** 
         * Al usar event.preventDefault(); en el controlador del evento submit, estás indicando al navegador 
         * que no ejecute la acción predeterminada de enviar el formulario. Esto te da la oportunidad de 
         * realizar tareas adicionales con JavaScript, como validar el contenido del formulario, antes de 
         * decidir si deseas enviarlo o no. En resumen, event.preventDefault(); evita que el formulario se 
         * envíe automáticamente, lo que te permite tener un control más preciso sobre cuándo y cómo se 
         * envía el formulario (por ejemplo, puedes decidir enviarlo de forma asíncrona usando AJAX).
         * */
        event.preventDefault();

        // extraer datos del formulario
        const email = signupForm.querySelector('#email'); // # para acceder a un "id" del html
        const password = signupForm.querySelector('#password'); // # para acceder a un "id" del html
        const passwordConfirmation = signupForm.querySelector('#password-confirmation'); // # para acceder a un "id" del html
        
        // validar email
        const emailRegExp = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        if (!emailRegExp.test(email.value)){ // si el email no es válido
            alert('El email no es correcto');
            return;
            /**
             * Puse return dentro de los bloques if para finalizar la ejecución de la función callback 
             * en caso de que se encuentre un error en la validación. Si uno de los if se evalúa como 
             * verdadero y se muestra una alerta, la instrucción return asegura que no se ejecute ningún 
             * código que pueda estar después de esos bloques. Si no usas return, y tanto el email como 
             * las contraseñas son inválidos, el usuario recibiría dos alertas consecutivas
             * 
             * Pero OJO no es buena idea hacer un return a mitad de funcion hay que refactorizar
             */
        }

        // validar contraseña
        if (password.value !== passwordConfirmation.value){ 
            alert('Las contraseñas no son iguales');
            return;
        }

        // crear usuario contra Sparrest : feedback al usuario
        createUser(email, password);
    });
}


