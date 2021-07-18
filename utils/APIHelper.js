require("dotenv").config();
const axios = require("axios");
const fetch = require("node-fetch");
let domain = "https://reddit-api-bot.herokuapp.com/bot/";

if (process.env.DEV_MODE) {
  domain = "http://localhost:3000/bot/";
}

// export const PostConfig = async (pmBody) => {
//   axios.post(domain + "updateMessage", pmBody).catch();
// };

module.exports.GetConfig = async () => {
  let response = await fetch(domain + "config");
  let data = await response.json();
  return data[0];
};
