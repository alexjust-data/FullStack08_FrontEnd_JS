export const getTweet = async (tweetId) => {
    const url = `http://localhost:8000/api/tweets/${tweetId}`;

    const response = await fetch(url);
    const tweet = await response.json();
}