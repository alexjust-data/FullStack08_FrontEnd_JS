import { tweetCreationController } from "./tweetCreationController.js"


const token = localStorage.getItem('token');
if (!token) {
  window.location = './index.html';
}


document.addEventListener('DOMContentLoaded', () => {
    const tweetCreation = document.querySelector('#tweetCreation')
    tweetCreationController(tweetCreation);
  })