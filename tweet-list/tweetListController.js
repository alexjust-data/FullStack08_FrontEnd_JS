

import { getTweets } from "./tweetListModel.js"; 
import { builtTweet, emptyTweets } from "./tweetListView.js"; 



export const tweetListController = async (tweetlist) => {
    tweetlist.innerHTML = "";
    let tweets = []; 

    try{
        tweets = await getTweets(); 
    } catch (error) {
        const event = createCustomEvent('error', 'Error al cargar tweets')
        tweetlist.dispatchEvent(event);
    }

    if (tweets.length === 0){
        tweetlist.innerHTML = emptyTweets();
    } else {
        renderTweets(tweets, tweetlist);
        const event = createCustomEvent('sucess', 'Tweets cargados correctamente')
        tweetlist.dispatchEvent(event);
    } 
    
}

const renderTweets = (tweets, tweetlist) => {
    tweets.forEach(tweet => {
        const tweetContainer = document.createElement('div'); 
        tweetContainer.classList.add('tweet');  
        tweetContainer.innerHTML = builtTweet(tweet);
        tweetlist.appendChild(tweetContainer)
    })
}

const createCustomEvent = (type, message) => {
    const event = new CustomEvent("tweetsLoaded", {
        detail: {
            type: type,
            message: message
        }
    });
    return event
}