module.exports = {
  name: "pay",
  description: "Sends Payment",
  async execute(message, args) {
    if (!args[0]) return message.channel.send("Usage: !pay <PaymentMethod>");
    methodType = args[0].toLowerCase();
    if (methodType == "cashapp") {
      message.channel.send(`Cashapp is currently unavailable`);
    } else if (methodType == "crypto") {
      message.channel.send(`ETH: 0xCb3fA82D02751Db19ca9F891D99225FD70bb9c26`);
      message.channel.send(`BTC: 3BomLGxJbTKJ648hkWzHA9MX6vgfhPX3A9`);
      message.channel.send(`LTC: MFn7mwJXkCGUVDxKRsLX1f8XSe2hrt916W`);
      message.channel.send(
        `If You have Another Crypto Coin Ask & we will see if we can do it`
      );
    } else if (methodType == "eth") {
      message.channel.send(`ETH: 0xCb3fA82D02751Db19ca9F891D99225FD70bb9c26`);
    } else if (methodType == "btc") {
      message.channel.send(`BTC: 3BomLGxJbTKJ648hkWzHA9MX6vgfhPX3A9`);
    } else if (methodType == "ltc") {
      message.channel.send(`LTC: MFn7mwJXkCGUVDxKRsLX1f8XSe2hrt916W`);
    } else if (methodType == "paypal") {
      message.channel.send(
        `Paypal is only available to our verified customers as alot of new customers end up chargebacking after receiving the work`
      );
    } else {
      message.channel.send(
        `Your payment method is currently not supported. We will look into it and try to support it`
      );
    }
  },
};
