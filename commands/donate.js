const Discord = require("discord.js")
const guildSchema = require("../models/guild.js")
const authorSchema = require('../models/author.js')

exports.run = (bot, message, args, queue, prefix) => {
  if (message.guild.id === "428686709656387585") {
    return;
  } else {
    message.channel.send("You have to use this command in the TBN Official server to donate/get premium! https://discord.gg/xdXJ9Gk")
  }
}

exports.help = {
  name: "donate",
  description: "Donate to TBN for Premium!",
  usage: "donate"
}

exports.aliases = []