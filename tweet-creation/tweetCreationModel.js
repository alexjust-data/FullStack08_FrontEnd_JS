
export const createTweet = async (message) => {
    // ¿qué método de http nos permite hacer creación en un api ? POST
    const url = "http://localhost:8000/api/tweets"; // url para crear un tweet en Sparrest
    const token = localStorage.getItem('token');

    // defino el cuerpo
    const body = {
        message: message
    }

    let response;
    try {
        response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.message) {
        throw error.message;
      } else {
        throw error;
      }
    }
}