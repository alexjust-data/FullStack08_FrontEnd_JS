// Importa la función buildLoader desde el módulo loaderView.js
import { buildLoader } from './loaderView.js'

// Exporta la función loaderController que controla la visualización del loader
export const loaderController = (loader) => {

  // Método para mostrar el loader
  const showLoader = () => {
    loader.classList.add('active');           // Añade la clase 'active' al elemento loader para hacerlo visible
    loader.innerHTML = buildLoader();         // Inserta el HTML del loader en el elemento
  }

  // Método para ocultar el loader
  const hideLoader = () => {
    loader.classList.remove('active');        // Elimina la clase 'active' del elemento loader para ocultarlo
    loader.innerHTML = '';                    // Limpia el contenido interno del elemento loader
  }

  // Retorna un objeto con dos métodos: show y hide para controlar el loader
  return {
    show: showLoader,                        // Propiedad show: contiene el método showLoader
    hide: hideLoader                         // Propiedad hide: contiene el método hideLoader
  }

}

/** loader.classList.remove('active');
 * La línea loader.classList.add('active'); agrega la clase CSS active al elemento loader.
 * <section id="loader"></section>
 * Esto se hace para que cuando se usa el css de la ruleta de espera, mientras está la ruleta
 * no utilice y cope todo el id=loader, de esta forma le decimos que los estiles de la ruleta
 * se especifiquen solo en #loader.active y lo hacemos desde el style.css
 * #loader.active {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(220, 220, 200, 0.3);
  }
 * */
