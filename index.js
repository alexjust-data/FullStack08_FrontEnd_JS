import { tweetListController } from "./tweet-list/tweetListController.js";


const tweetlist = document.getElementById('tweets');
tweetListController(tweetlist); // ejecuto el controlador


const oldtweetlist = document.getElementById('tweets');
tweetListController(oldtweetlist); // ejecuto el controlador