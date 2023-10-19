import { buildUnauthorizedSession, buildAuthenticatedSession  } from "./sessionView.js";

export const sessionController = (nav) => {

  if (isUserLoggedIn()) {
    /**
     * Para añadir un evento a un nodo [botón o a cualquier elemento del DOM] que hemos añadido
     * dinámicamente, ese momento es después de añadir ese nodo al DOM.
     * Piensa que desde View hemos añadidod buildAuthenticatedSession <button>Cerrar sesión</button>
     */
    nav.innerHTML = buildAuthenticatedSession();      // aquí inyectamos el botón/nodo
    const logoutButton = nav.querySelector('button'); // capturo el nodo añadido dinámicamente
    logoutButton.addEventListener('click', () => {    // agrego escuchador de evento al boton/nodo
      localStorage.removeItem('token');               // elimino el token
      sessionController(nav);                         // recargo página para ver cambios y ya no entrará al if
    })
  } else {
    nav.innerHTML = buildUnauthorizedSession();
  }
}

// nos devuelve el token del usuario, si lo tiene
const isUserLoggedIn = () => {
  return localStorage.getItem('token');
}