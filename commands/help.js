const Discord = require('discord.js');
const guildSchema = require('../models/guild.js')

exports.run = (bot, message, args, queue, prefix) => {
  message.channel.send("https://docs.google.com/document/d/1-AmLPqVxLoafNNws1zB2Ze2ZFOOibqWH3yjl8wHoolM/edit?usp=sharing")
}

exports.help = {

  name: "help",

  description: "Lists all the available commands",

  usage: "help <command name or command section>"

}



exports.aliases = ["cmds", "commands"]
