const Discord = require("discord.js");

const guildSchema = require("../models/guild.js");
const authorSchema = require("../models/author.js");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Filter = require("bad-words"),
  filter = new Filter();

module.exports = async (bot, message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;


  guildSchema.findOne({ guildID: message.guild.id }, (err, res) => {
    if (res.tbnChannelID === message.channel.id) {
      authorSchema.findOne({ userID: message.author.id }, (err, restwo) => {
        if (restwo && restwo.isMuted === true) {
          message
            .delete()
            .then(msg =>
              console.log(`Deleted message from ${msg.author.username}`)
            )
            .catch(console.error);
          return message.channel.send(
            "<@" +
              message.author.id +
              ">, " +
              "you're muted! Please send an appeal to one of our TBN Moderators to gain access to the commands again."
          );
        }
        filter.removeWords("god");
        filter.addWords("jerkopes", "kinkopes");
        let checkedArgs = filter.clean(message.content);
        guildSchema.findOne({ guildID: message.guild.id }, (err, restwo) => {
          if (restwo.isGangVerified === false) {
            message.channel.send(
              "Sorry mate, only official Gang servers can use this command. If this is an official Brawler Gang server, tell the owner to contact EBB#5732, Cxllm#8688, or ThatMajesticGuy#7530!"
            );
            return;
          } else {
            guildSchema.find({}, function(err, docs) {
          
                  let embed = new Discord.RichEmbed()
                  .setColor("#0099ff")
                  .setAuthor(
                    `Sent by ${message.author.tag}`,
                    message.author.avatarURL
                  )
                  .setTimestamp()
                  .setDescription(message.content)
                  .setFooter(
                    `Sent from ${message.guild.name}`,
                    message.guild.iconURL
                  );
              
              if (message.attachments.first()) {
                  embed.setImage(message.attachments.first().proxyURL);
                }
              
                /*
                Use this code later or something, not sure what to do with it lol - ThatMajesticGuy
                Replace pinchannel with the TBN channel
                
                if (message.attachments.size > 0) {
      if  (message.attachments.array()[0].width === undefined) {
        pinchannel.send(`**${message.author.tag}**'s post`, {files: [message.attachments.array()[0].url]})
      } else if (message.attachments.array()[0].url.endsWith("mp4") || message.attachments.array()[0].url.endsWith("mov")) {
        pinchannel.send(`**${message.author.tag}**'s post`, {files: [message.attachments.array()[0].url]})
        } else {
          if (message.attachments.array()[0].filename.startsWith("SPOILER_")) {
            pinchannel.send(`**${message.author.tag}**'s post`, {files: [message.attachments.array()[0].url]})
          } else embed.setImage(message.attachments.array()[0].url)
      }
      }
                */
                if (message.author.id === "252268366079852584") {
                  embed.setAuthor(
                    `Sent by ${message.author.tag} - TBN Bot Creator`,
                    message.author.avatarURL
                  );
                  
                }
                if (message.author.id === "536949735299219467" || message.author.id === "262410813254402048") {
                  embed.setAuthor(
                    `Sent by ${message.author.tag} - TBN Co-Developer`,
                    message.author.avatarURL
                  );
                }
                if (checkedArgs === "" || null || undefined) {
                  message.delete();
                  return;
                }
              
              docs.forEach(restwo => {
                // if (!restwo.webhook) return;
                 let theChannel = bot.channels.get(restwo.tbnChannelID) || bot.channels.get(ch => ch.channel.contains("tbn-chat"))
                
                 if(!theChannel) return;
                 // const webhook = new Discord.WebhookClient(restwo.webhook.id, restwo.webhook.token)
                 // if (!webhook) return;
                 // webhook.send(embed).catch(e =>{console.log(e)});
                 theChannel.send(embed).catch(e =>{console.log(e)});
              });
                  
  
             // webhooks.forEach(webhook => webhook.send(embed))
            });
            message
              .delete()
              .then(msg =>
                console.log(`Deleted message from ${msg.author.username}`)
              )
              .catch(console.error);
          }
        });
      });
    } else {
      return;
    }
  });
};
