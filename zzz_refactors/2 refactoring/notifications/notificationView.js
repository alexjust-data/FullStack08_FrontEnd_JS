/**
 * Genera una cadena de texto en HTML representando una notificación.
 * 
 * @param {string} message - El contenido o mensaje de la notificación.
 * @param {string} type - El tipo o categoría de la notificación (por ej., 'success', 'error', etc.).
 *                        Determina la clase CSS y, por lo tanto, el estilo visual de la notificación.
 * 
 * @returns {string} Una cadena en HTML representando la notificación con estilo.
 * 
 * @example
 * 
 * // Devuelve: '<div class="notification success"><p>¡Operación exitosa!</p></div>'
 * buildNotification('Tweets cargados correctamente', 'success');
 * 
 * // Devuelve: '<div class="notification error"><p>¡Operación fallida!</p></div>'
 * buildNotification('Error al cargar tweets', 'error');
 * 
 */
export const buildNotification = (message, type) => {
    return `
    <div class="notification ${type}">
        <p>${message}</p>
    </div>    
    `
}

