const axios = require("axios");
let domain = "https://reddit-api-bot.herokuapp.com/bot/";
const devMode = true;

if (devMode) {
  devMode = false;
  domain = "http://localhost:3000/bot/";
}

export const PostConfig = async (pmBody) => {
  axios.post(domain + "updateMessage", pmBody).catch();
};
