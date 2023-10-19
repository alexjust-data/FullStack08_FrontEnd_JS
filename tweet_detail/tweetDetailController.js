
import { getTweet } from "./tweetDetallModel.js";

export const tweetDetailController = async (tweetDetail, tweetId) => {

    try {
        const tweet = await getTweet(tweetId);
        console.log(tweet);
    } catch (error) {

    }
}