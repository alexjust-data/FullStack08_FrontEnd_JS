/**
 * en utils añadimos funciones genericas que utillizamos en varias páginas
 */


export const dispatchEvent = (eventName, data, element) => {
    const event = new CustomEvent(eventName, {
      detail: data
    });
  
    element.dispatchEvent(event);
  }