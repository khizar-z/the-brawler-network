const Discord = require('discord.js');
const guildSchema = require('../models/guild.js')
const authorSchema = require('../models/author.js')

module.exports = async (bot, guild) => { 
  console.log("Joined a new guild: " + guild.name);
  
  
  let createdTBNID;
  let createdAnnounceID;

      let createdCategoryID;
  const newCat = await guild.createChannel('TBN', { type: 'category' })
  createdCategoryID = newCat.id
    
    const newCh = await guild.createChannel('tbn-chat', { type: 'text' })
    await newCh.setParent(createdCategoryID);
    createdTBNID = newCh.id
    
    const newAnnCh = await guild.createChannel('tbn-announcements', { type: 'text' })
    createdAnnounceID = newAnnCh.id
    await newAnnCh.setParent(createdCategoryID)
    guild.channels.find(channel => channel.id === newAnnCh.id)
    .overwritePermissions(guild.defaultRole, {
      SEND_MESSAGES: false
    })
  
  const webhook = await newCh.createWebhook("The Brawler Network", "https://cdn.discordapp.com/avatars/612408222338514944/7fc2bfe11c2e156113991fd96b369ae0.png?size=2048")
  webhooks.push(webhook)

    await console.log(createdTBNID)
  
  guildSchema.findOne({guildID: guild.id }, (err, res) => {
    if (!res) {
      const guildS = new guildSchema({
      guildID: guild.id,
      guildName: guild.name,
      isClubVerified: false,
      isGangVerified: false,
      tbnChannelID: createdTBNID,
      tbnAnnounceChannelID: createdAnnounceID,
      webhook: {id: webhook.id, token: webhook.token}
    })
    
    guildS.save().then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))
    } else {  
      guildSchema.deleteOne({guildID: guild.id}, function (err) {})
      .then(restwo => {
        const guildS = new guildSchema({
          guildID: guild.id,
          guildName: guild.name,
          isClubVerified: false,
          isGangVerified: false,
          tbnChannelID: createdTBNID,
          tbnAnnounceChannelID: createdAnnounceID,
          webhook: {id: webhook.id, token: webhook.token}
        })
        guildS.save().then(result => {
          console.log(result)
        })
      })
    }
  })
} 