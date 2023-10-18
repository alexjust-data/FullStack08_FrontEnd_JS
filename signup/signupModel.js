

/**
 * Crea un nuevo usuario en el sistema.
 * La función envía una solicitud POST a la API de autenticación
 * para registrar un nuevo usuario utilizando su correo electrónico y contraseña.
 *
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {object} - Retorna el objeto de respuesta del servidor o lanza un error.
 */
export const createUser = async(email, password) => {
    // URL del endpoint al que se hará la petición.
    const url = "http://localhost:8000/auth/register";

    /** Construcción del cuerpo de la petición POST.
     * piensa que en db.json de la BD hay esta estructura:
     * { "users": [{"username":     , "password":     }]
     */
    const body = {
        username: email, // le pasamos nuestra variable body
        password: password  // le pasamos nuestra variable password
    };

    try {
        // Realiza una petición POST (enviar/postear) asincrónica al servidor.
        const response = await fetch(url, {
            method: 'POST',
            // Convierte el cuerpo de la petición a formato JSON.
            body: JSON.stringify(body),
            headers: { // colección de encabezados, lee doc de BD que estamos usando https://github.com/kasappeal/sparrest.js
                'content-type': 'application/json', //  Este encabezado informa al servidor que el cuerpo de la petición está en formato JSON
            }
        });

        // Verifica si la respuesta es exitosa (códigos 200-299).
        if (!response.ok) {
            // Intenta parsear la respuesta en caso de que contenga detalles adicionales sobre el error.
            // Si el parseo falla (por ejemplo, si la respuesta no es JSON), usa el texto de estado como mensaje de error.
            const responseData = await response.json().catch(() => ({ error: response.statusText }));
            // Lanza un error personalizado con el mensaje obtenido.
            throw new Error(responseData.message || "Error desconocido"); // .message porque he visto que aquí lo devolvía inspeccionando en network/register/response
        }

        /** Parsea y retorna la respuesta JSON del servidor. ¿qué tipo de mensaje?
         * depende del servidor y de la API con la que estés interactuando, por ejemplo:
         * { "success": true, "message": "Usuario registrado con éxito.", "userId": 12345 }
         */
        const data = await response.json();
        return data;

    } catch (error) {
        // Registra el error en la consola.
        console.error('Error al crear el usuario:', error);
        
        // Propaga el mensaje de error para ser manejado por quien llame a esta función.
        if (error.message) {
            throw error.message;
            /**
             * En JavaScript, muchos objetos de error nativos (como TypeError, ReferenceError, etc.) 
             * tienen una propiedad message que contiene una descripción legible del error. 
             */
        } else {
            throw error;
            /**
             * Puede haber situaciones en las que el error sea simplemente una cadena o incluso otro tipo de objeto. 
             * En ese caso, el código lanza (o re-lanza) el error tal cual fue capturado.
             */
        }
    }
}