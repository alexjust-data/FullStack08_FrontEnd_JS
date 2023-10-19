
// vista usuario NO ha iniciado sesion
export const buildUnauthorizedSession = () => {
    return `<ul>
                <li>
                <a href="./login.html">Login</a>
                <a href="./signup.html">Signup</a>
                </li>
            </ul>`;
}

// vista usuario SI ha iniciado sesion, botones de uso
export const buildAuthenticatedSession = () => {
return `
<a href="./tweet-creation.html">Create tweet</a>
<button>Cerrar sesión</button>`;
}