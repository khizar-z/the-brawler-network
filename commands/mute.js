const Discord = require("discord.js");
const guildSchema = require("../models/guild.js");
const authorSchema = require("../models/author.js");
exports.run = (bot, message, args, queue, prefix) => {
  const guild = bot.guilds.get("428686709656387585");
  let theMember = guild.members.get(message.author.id);
  if (theMember.roles.has("625693505003585536")) {
    if (!message.mentions.members.first()) {
      return message.channel.send("Tell me the member to mute!");
    }
    authorSchema.findOne(
      { userID: message.mentions.members.first().id },
      (err, res) => {
        if (!res) {
          return message.channel.send("404 User not found.");
        } else if (res.isMuted === true) {
          return message.channel.send("User already muted.");
        } else {
          authorSchema.updateOne(
            { userID: message.mentions.members.first().id },
            { $set: { isMuted: true } },
            function(err, outcome) {
              if (err) console.log(err);
            }
          );
          message.channel.send("Muted user.");
        }
      }
    );
  } else return;
};

exports.help = {
  name: "mute",

  description: "Mutes a user from using .send",

  usage: "mute <user>"
};

exports.aliases = ["ban", "blacklist"];
