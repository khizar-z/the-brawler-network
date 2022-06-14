	const Discord = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(`AIzaSyC8GHxFJ17uRpUYuyUngZ4lrlWNV_P85-w`);
const cooldown = new Set();

module.exports = {
  aliases: [],
  run: async (client, message, args, queue) => {  
const msg = message
const serverQueue = queue.get(msg.guild.id)
    	if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
if(msg.guild.me.voiceChannel){
  if(msg.guild.me.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send("You need to be in the same voice channel as me to skip a song")
}          
		
    msg.channel.send("🎧 Song skipped")
serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
  }
}
module.exports.help = {
  name: "skip",

  description: "Skip a song",

  usage: "skip"
};