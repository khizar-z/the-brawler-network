	const Discord = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(`AIzaSyC8GHxFJ17uRpUYuyUngZ4lrlWNV_P85-w`);
const cooldown = new Set();

module.exports = {
  aliases: ['disconnect'],
  run: async (client, message, args, queue) => {  
const msg = message
const serverQueue = queue.get(msg.guild.id)
    	if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
if(msg.guild.me.voiceChannel){
  if(msg.guild.me.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send("You need to be in the same voice channel as me to stop a song");
}
 	serverQueue.songs = [];
    msg.channel.send("Disconnecting")
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
  }
}
module.exports.help = {
  name: "stop",

  description: "End the music playing",

  usage: "stop"
};