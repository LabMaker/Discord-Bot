const { MessageButton } = require("discord-buttons");
const { GetPayments } = require("../utils/APIHelper.js");
module.exports = {
  name: "pay",
  description: "Sends Payment",
  async execute(message, args) {
    await GetPayments().then((payments) => {
      let buttonTypes = [];
      let types = [];

      payments.forEach((payment) => {
        if (!types.includes(payment.type)) {
          let tempButton = new MessageButton()
            .setStyle("blurple")
            .setLabel(payment.type)
            .setID(payment.type);

          buttonTypes.push(tempButton);
          types.push(payment.type);
        }
      });

      message.channel.send("Our Payment Methods", {
        buttons: buttonTypes,
      });
    });
  },
};
