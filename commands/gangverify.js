const Discord = require('discord.js');
const guildSchema = require('../models/guild.js')

exports.run = (bot, message, args, queue, prefix) => {
  if (message.author.id !== "252268366079852584" || message.author.id !== "262410813254402048") {
      if (message.author.id == "536949735299219467") {
       guildSchema.findOne({ guildID: message.guild.id }, (err, res) => {
    if (res.isGangVerified === true) {
      return message.channel.send("My lord, this server is already verified!");
    } else {
      console.log(`Verified a gang server: ${message.guild.name}`)
      message.channel.send("Verified server. ")
      guildSchema.updateOne({ guildID: message.guild.id }, { $set : {isGangVerified: true} }, function (err, outcome) {
        if (err) console.log(err)
      })
    }
  })
      }
    
      
    return;
  }
  
  guildSchema.findOne({ guildID: message.guild.id }, (err, res) => {
    if (res.isGangVerified === true) {
      return message.channel.send("My lord, this server is already verified!");
    } else {
      console.log(`Verified a gang server: ${message.guild.name}`)
      message.channel.send("Verified server. ")
      guildSchema.updateOne({ guildID: message.guild.id }, { $set : {isGangVerified: true} }, function (err, outcome) {
        if (err) console.log(err)
      })
    }
  })
}

exports.help = {

  name: "gangverify",

  description: "Verifies a server into a gang server.",

  usage: "gangverify"

}



exports.aliases = ["cmds", "commands"]
