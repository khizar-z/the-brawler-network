	const Discord = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(`AIzaSyC8GHxFJ17uRpUYuyUngZ4lrlWNV_P85-w`);
const cooldown = new Set();

module.exports = {
  aliases: ['p'],
  run: async (client, message, args, queue) => {  
    const msg = message
  const searchString = args.slice(0).join(' ');
	const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

const voiceChannel = msg.member.voiceChannel
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}
    
if(msg.guild.me.voiceChannel){
  if(!msg.guild.me.voiceChannel.id === msg.member.voiceChannel.id) return msg.channel.send("You need to be in the same voice channel as me to play a song")
} 
    if(!searchString) return msg.channel.send("You need to specify a song to play")

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			} 
      const embed = new Discord.RichEmbed()
      .setTitle("Playlist Added to Queue")
      .setDescription(`${playlist.title} has been added to the queue`)
       .setColor("#00aaff")
      msg.channel.send(embed);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					// eslint-disable-next-line max-depth
					const videoIndex = parseInt("1");
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('I couldn\'t find any results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
    }
  async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
  let duration;

if(video.duration.hours < 1){
  if(video.duration.minutes == 0 && video.duration.seconds == 0){duration = "Live Stream";  }
    else if(video.duration.seconds < 10){duration = video.duration.minutes + ":0" + video.duration.seconds}

else duration = video.duration.minutes + ":" + video.duration.seconds}
   else if(video.duration.hours > 0){
      if(video.duration.seconds < 10){duration = "0" + video.duration.hours + ":" + video.duration.minutes + ":0" + video.duration.seconds}
           else if(video.duration.minutes < 10 &&video.duration.seconds < 10){duration = video.duration.hours + ":0" + video.duration.minutes + ":0" + video.duration.seconds}
      else if(video.duration.minutes < 10){duration = "0" + video.duration.hours + ":0" + video.duration.minutes + ":" + video.duration.seconds}
     
else duration = "0" + video.duration.hours + ":" + video.duration.minutes + ":" + video.duration.seconds}
  else if(video.duration.hours === 0 && video.duration.minutes === 0 && video.duration.seconds === 0) duration = "Live Stream";  
	const song = {
		id: video.id,
		title: Discord.Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`,
    author: video.channel.title,
    request: msg.author,
    thumbnail: video.thumbnails.default.url,
    duration: duration
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join()
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		if (playlist) return undefined;
    
		else {
    msg.channel.send(`🎧 Song added to queue - ${song.title} `)
    }

	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
  

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25 })) //{ highWaterMark: 1<<25 }
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
      if (!queue) return;
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
const newsong = new Discord.RichEmbed()
.setTitle(`Now Playing:`)
.addField(`Title`, `[${song.title}](${song.url})`)
.addField(`Author`, song.author)
.addField('Duration', song.duration)
.addField(`Requested by`, song.request.toString())
.setFooter("Queue Length - " + serverQueue.songs.length)
.setThumbnail(`${song.thumbnail}`)
.setColor("#00aaff")
	serverQueue.textChannel.send(`🎧 Now Playing - ${song.title} `);
}
}
}
module.exports.help = {
  name: "play",

  description: "Play a song",

  usage: "play <song/song url/playlist url>"
};
