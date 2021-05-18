module.exports = {
  name: "pay",
  description: "Sends Payment",
  async execute(message, args) {
    if (!args[0]) return message.channel.send("Usage: !pay <PaymentMethod>");
    methodType = args[0].toLowerCase();
    if (methodType == "cashapp") {
      message.channel.send(`Cashapp is currently unavailable`);
    } else if (methodType == "crypto") {
      message.channel.send(`ETH: 0xB8118058a4d024086A05C582c479E58E4b8B797a`);
      message.channel.send(`BTC: Ask <@814192395809456178> as it changes alot`);
      message.channel.send(
        `If You have Another Crypto Coin Ask & we will see if we can do it`
      );
    } else if (methodType == "eth") {
      message.channel.send(`ETH: 0xB8118058a4d024086A05C582c479E58E4b8B797a`);
    } else if (methodType == "btc") {
      message.channel.send(
        `BTC: Please Ask <@814192395809456178> as the BTC wallet changes`
      );
    } else if (methodType == "ltc") {
      message.channel.send(`LTC: MAJpuKoFNryf6AVxWqwPkBcFNmAoqUnAkR`);
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
