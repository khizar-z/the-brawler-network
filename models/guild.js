const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
  guildID: String,
  guildName: String,
  isClubVerified: Boolean,
  isGangVerified: Boolean,
  tbnChannelID: String,
  tbnAnnounceChannelID: String,
  isServerMuted: Boolean,
  webhook: Object
})

module.exports = mongoose.model('Guilds', guildSchema);