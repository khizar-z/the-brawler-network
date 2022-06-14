const Discord = require("discord.js");
const guildSchema = require("../models/guild.js");
const authorSchema = require("../models/author.js");

exports.run = (bot, message, args, queue, prefix) => {
  const guild = bot.guilds.get("428686709656387585");
  let theMember = guild.members.get(message.author.id);
  if (theMember.roles.has("625693505003585536")) {
    if (!message.mentions.members.first()) {
      return message.channel.send("Tell me who to unmute!");
    }
    authorSchema.findOne(
      { userID: message.mentions.members.first().id },
      (err, res) => {
        if (res.isMuted === true) {
          authorSchema.updateOne(
            { userID: message.mentions.members.first().id },
            { $set: { isMuted: false } },
            function(err, outcome) {
              if (err) console.log(err);
            }
          );
          message.channel.send(
            `<@${
              message.mentions.members.first().id
            }> has been released from the Dungeon.`
          );
        } else if (res.isMuted === false) {
          message.channel.send("That user is already unmuted!");
        }
      }
    );
  }
};

exports.help = {
  name: "unmute",

  description: "Unmutes a muted person.",

  usage: "unmute <person>"
};

exports.aliases = ["unban"];
