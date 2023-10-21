
/**
 * esto sería realizar una CLASE de manual pero como no lo hemos dado
 * los hacemos así
 */

// Define un módulo que interactúa con la API de Sparrest.
export const sparrestApi = () => {
    
    const baseUrl = "http://localhost:8000/"; // Establece la URL base del servidor. (en ago comun)
  
    // Función asíncrona para realizar peticiones GET a un endpoint específico.
    const get = async (endpoint) => {
      const url = baseUrl + endpoint;          // Construye la URL completa.
      try {
        const response = await fetch(url);     // Intenta obtener datos del servidor.
        if (response.ok) {
          const data = await response.json();  // convierte el cuerpo a JSON y devuélvelo.
          return data;
        } else {
          const message = data.message || 'Ha ocurrido un error';
          throw new Error(message);
        }
      } catch (error) {
        throw error.message; // Propaga el mensaje de error para ser manejado externamente.
      }
    };
  
    // Función asíncrona para eliminar un recurso en un endpoint específico.
    const remove = async (endpoint) => {
      const url = baseUrl + endpoint;
      // Obtiene el token del almacenamiento local, necesario para autenticar la petición DELETE.
      const token = localStorage.getItem('token');
  
      try {
        // Intenta eliminar el recurso.
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          // Si hay un error, intenta obtener el mensaje del servidor o usa un mensaje por defecto.
          const data = await response.json();
          const message = data.message || 'No ha sido posible borrar el elemento';
          throw new Error(message);
        }
      } catch (error) {
        // Propaga el mensaje de error para ser manejado externamente.
        if (error.message) {
          throw error.message;
        } else {
          throw error;
        }
      }
    }
  
    // Devuelve las funciones 'get' y 'delete' para ser utilizadas externamente.
    return {
      get: get,
      delete: remove
    }
}