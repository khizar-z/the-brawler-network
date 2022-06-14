const Discord = require("discord.js");
const guildSchema = require("../models/guild.js");

exports.run = (bot, message, args, queue, prefix) => {
  const guild = bot.guilds.get("428686709656387585");
  let theMember = guild.members.get(message.author.id);
  if (theMember.roles.has("614879024333979670")) {
    guildSchema.find({}, function(err, docs) {
      docs.forEach(res => {
        let theChannel = bot.channels.get(res.tbnAnnounceChannelID);
        let embed = new Discord.RichEmbed()
          .setColor("#0099ff")
          .setTitle("Update from TBN HQ :star2:")
          .setTimestamp()
          .setDescription(args.join(" "))
          .setFooter(`Sent by ${message.author.tag}`, message.author.avatarURL);
        if (embed.description === "" || undefined || null) {
          return;
        }
        if(!theChannel) return;
                theChannel.send(embed).catch(e =>{console.log(e)});
      });
    });
    message
      .delete()
      .then(msg => console.log(`Deleted message from ${msg.author.username}`))
      .catch(console.error);
  }
};

exports.help = {
  name: "sendnews",

  description: "Sends a news message to all TBN servers.",

  usage: "sendnews <message>"
};

exports.aliases = [];
