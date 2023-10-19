import { tweetDetailController } from "./tweetDetailController.js";



document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(window.location.search);
  const tweetId = params.get("id");


  const tweetDetail = document.querySelector('#tweetDetail');
  tweetDetailController(tweetDetail, tweetId);


})