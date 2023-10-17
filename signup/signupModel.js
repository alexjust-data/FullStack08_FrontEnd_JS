/**
 * Sparrest que es nuestra BBDD recibirá:
 * Register a user with POST /auth/register { username: "luke", password: "skywalker" }
 * 
 * "Modelo" : el modelo es la "M" en MVC y se ocupa de todo lo relacionado con los datos y la lógica de negocio. 
 * La "Vista" (View) se encarga de mostrar la información al usuario y recoger sus entradas, 
 * "Controlador" (Controller) actúa como intermediario, tomando entradas de la vista, procesándolas a través del 
 * modelo y luego actualizando la vista en consecuencia.
 */



/**
 * Crea un nuevo usuario en el sistema.
 * La función envía una solicitud POST a la API de autenticación
 * para registrar un nuevo usuario utilizando su correo electrónico y contraseña.
 *
 * @param {string} email - Dirección de correo electrónico del nuevo usuario.
 * @param {string} password - Contraseña del nuevo usuario.
 * @returns {Promise<void>} - No devuelve nada, pero es una función asincrónica 
 *                            por lo que devuelve una promesa.
 */
export const createUser = async(email, password) => {
    // URL de la API endpoint donde se registra un nuevo usuario.
    const url = "http://localhost:8000/auth/register"

    // Preparación del cuerpo de la solicitud. 
    // La estructura del objeto body está diseñada para ser compatible con la expectativa de la API.
    const body = {
        username: email,
        password: password
    }

    // Envío de la solicitud HTTP POST a la API utilizando fetch.
    // Se envían los datos del usuario en formato JSON y se especifica en los encabezados que el contenido es JSON.
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body), // El objeto body debe ser convertido a una cadena JSON.
        headers: {
            'content-type': 'application/json'
        }
    })

    // Extrae y parsea el cuerpo de la respuesta en formato JSON.
    // Dependiendo de la implementación de la API, podría contener detalles del usuario creado,
    // un token de autenticación, mensajes de error, etc.
    const data = await response.json();

    // Nota: En esta función, después de parsear la respuesta, no se hace nada con los datos.
    // Dependiendo de las necesidades, podrías querer devolver estos datos, manejar errores 
    // basados en el código de respuesta HTTP, entre otros.
}
