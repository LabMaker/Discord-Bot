module.exports = {
  name: 'autoMod',
  description: 'Auto Mods',
  async execute(message, args) {
    const ignoredCategory = '';
    const tempWords = [
      'Scammed',
      'Scammer',
      'scammers',
      'Sceem',
      'Fake Server',
    ];

    const bannedWords = tempWords.map((word) => word.toLowerCase());

    bannedWords.forEach((word) => {
      // if (message.content.includes(word)) {
      //   message.channel.send("This word is in the invalid List");
      // }
    });
  },
};
