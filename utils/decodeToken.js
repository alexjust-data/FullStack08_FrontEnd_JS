/**
 * Si el usuario logado a puesto el tweet muestro este botón
 * 
 * @param {*} token 
 * @returns 
 */

// Esta función es para decodificar un token JWT (JSON Web Token).
export const decodeToken = (token) => {
    // 'decodedToken' se inicializa pero aún no se le asigna un valor.
    let decodedToken;
  
    try {
      // El token se divide en tres partes (encabezado, carga útil y firma) usando '.' como delimitador.
      // 'token.split(".")[1]' selecciona la segunda parte (carga útil), que está codificada en base64.
      const stringifiedToken = atob(token.split(".")[1]);
      
      // 'atob' decodifica la cadena de base64 a una cadena de texto.
      // 'JSON.parse' convierte la cadena de texto en un objeto JavaScript.
      // 'decodedToken' ahora contiene el objeto JavaScript obtenido de la decodificación y parseo del token.
      decodedToken = JSON.parse(stringifiedToken);
    } catch (error) {
      // Si ocurre un error durante la decodificación o el parseo, la función retorna 'null'.
      // Esto podría suceder si el token no es válido o está mal formado.
      return null;
    }
  
    // Si todo sale bien, se retorna el objeto JavaScript decodificado.
    return decodedToken;
  }
  