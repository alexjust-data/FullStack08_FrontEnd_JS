/***
 * MODELO: Representa la lógica de negocio y los datos. 
 * Interactúa con la base de datos y actualiza la vista 
 * cuando los datos cambian.
 */


// exportamos 
export const tweets = [{
    handler: "@usuario1",
    date: new Date().toISOString(),
    message: 'Estoy estudiando en KeepCoding',
    likes: 20,
},
{
    handler: "@usuario2",
    date: new Date().toISOString(),
    message: 'Louis Vuitton ha bajado el precio 30%',
    likes: 4,
},
{
    handler: "@usuario3",
    date: new Date().toISOString(),
    message: 'El barça es el millor',
    likes: 34,
},
{
    handler: "@usuario4",
    date: new Date().toISOString(),
    message: 'Viva la paepa',
    likes: 400,
}];