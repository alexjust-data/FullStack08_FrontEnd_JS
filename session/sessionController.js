import { buildUnauthorizedSession, buildAuthenticatedSession  } from "./sessionView.js";

export const sessionController = (nav) => {

  if (isUserLoggedIn()) {
    nav.innerHTML = buildAuthenticatedSession();
    const logoutButton = nav.querySelector('button');
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      sessionController(nav);
    })
  } else {
    nav.innerHTML = buildUnauthorizedSession();
  }
}

const isUserLoggedIn = () => {
  return localStorage.getItem('token');
}