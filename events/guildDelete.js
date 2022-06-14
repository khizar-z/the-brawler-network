const Discord = require('discord.js');
const guildSchema = require('../models/guild.js')
const authorSchema = require('../models/author.js')

module.exports = (bot, guild) => { 
  guildSchema.deleteOne({ guildID: guild.id}, function (err) {
     console.log(err)
   })
}