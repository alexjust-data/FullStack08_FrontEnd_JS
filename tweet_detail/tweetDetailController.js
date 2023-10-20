
import { getTweet } from "./tweetDetallModel.js";
import { buildTweet } from "./tweetDetailView.js"; 
import { dispatchEvent } from "../utils/dispatchEvent.js";


export const tweetDetailController = async (tweetDetail, tweetId) => {

    try {
        const tweet = await getTweet(tweetId);
        tweetDetail.innerHTML = buildTweet(tweet); // ahora quiero pintar el tweet
    } catch (error) {
        // alert(error)
        // datos que quiero que viajen en el evento
        dispatchEvent('tweetLoaded', { type: "error", message: "El tweet no existe" }, tweetDetail);
        setTimeout(() => {
            window.location = './index.html'; // si el tweet no existe ?id=5656 rediccionamos
          }, 3000);
    }
}