import { tweetCreationController } from "./tweetCreationController.js"


document.addEventListener('DOMContentLoaded', () => {
    const tweetCreation = document.querySelector('#tweetCreation')
    tweetCreationController(tweetCreation);
  })