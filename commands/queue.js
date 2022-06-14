	const Discord = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(`AIzaSyC8GHxFJ17uRpUYuyUngZ4lrlWNV_P85-w`);
const cooldown = new Set();

module.exports = {
  aliases: ['q'],
  run: async (client, message, args, queue) => {  
    const msg = message
  const searchString = args.slice(0).join(' ');

	const serverQueue = queue.get(msg.guild.id);
    if (!serverQueue) return msg.channel.send('There is nothing playing.');
    if(serverQueue.songs.length === 0) return msg.channel.send('There is nothing playing.');
       let index = 0;
   msg.channel.send(`🎧 Server Queue\n${serverQueue.songs.map(song => ` ${++index} - ${song.title} by ${song.author} - ${song.duration} `) .splice(0, 5).join('\n')}
${serverQueue.songs.length <= 5 ? "" : `And ${serverQueue.songs.length - 5} more..`}`)

    }
    }
module.exports.help = {
  name: "queue",

  description: "Shows the server queue",

  usage: "queue"
};

