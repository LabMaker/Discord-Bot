module.exports = {
  name: 'activity',
  description: 'Clear Messages',
  async execute(message, args) {
    const User = message.mentions.users.first(); // Getting user by ID
    if (
      !User.presence.activities[0] ||
      User.presence.activities[0].name !== 'Spotify'
    )
      return false; // Checking if the user is listening to spotify.
    message.channel.send('Presence: ' + User.presence);
    console.log(User.presence.activities); // Logging the artist and the song.
    // Output --> Jakye#0000 is listening to: Sabaton - The Red Baron
  },
};
