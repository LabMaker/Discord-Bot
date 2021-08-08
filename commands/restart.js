module.exports = {
  name: 'restart',
  description: 'restarts bot',
  async execute(message, args) {
    message.channel
      .send('Restarting...')
      .then(() => client.destroy())
      .then(() => {
        client.login(process.env.token);
      });
  },
};
