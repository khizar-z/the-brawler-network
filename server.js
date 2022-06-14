// Packages
const Discord = require('discord.js');
const bot = new Discord.Client();
const moment = require('moment');
const ms = require('parse-ms');
const Canvas = require('canvas');
const mongoose = require('mongoose');
const chalk = require('chalk');

const queue = new Map();
let webhooks = []

const guildSchema = require('./models/guild.js');
const authorSchema = require('./models/author.js');
// this works well! hm, i'm pretty happy with this purchase. :) 
require('dotenv').config()

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
// bot.login(process.env.BOT_TOKEN);

require("fs").readdir("./events/", (err, files) => {
  if (err) return console.error(err);

  process.stdout.write(chalk.magenta(`\n\nLoading ${files.length} Events!\n`));
  files.forEach((f, i) => {
    if (!f.endsWith(".js")) return;

    const event = require(`./events/${f}`);

    process.stdout.write(chalk.blue(`${i + 1}: ${f} loaded!\n`));

    let eventName = f.split(".")[0];

    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${f}`)];
  });
});

const recursive = require("recursive-readdir");

recursive("./commands/", function (err, files) {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    process.stdout.write("Do you mind making the commands first?\n".red);
    return;
  }

  process.stdout.write(chalk.gray(`\n\nLoading ${jsfiles.length} commands!\n`));

  jsfiles.forEach((f, i) => {
    delete require.cache[require.resolve(`./${f}`)];
    let props = require(`./${f}`);
    process.stdout.write(chalk.cyan(`${i + 1}: ${f} loaded!\n`));
    bot.commands.set(props.help.name, props);
    props.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
});
});

process.on("unhandledRejection", error => {
  process.stdout.write(`Unhandled Error Found! \n ${error.stack}`);
})

const express = require('express');
const app = express();
const https = require('http')
app.get("/", (request, response) => {
  process.stdout.write(Date.now() + " Ping Received\n");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  https.get(`http://bottlenose-physician.glitch.me/`);
}, 300000);


mongoose.connect(process.env.MONGO_TOKEN, {useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log("Synced to Mongoose and MongoDB servers.") },
  err => { console.log(err) }
);

// On Ready Listener
bot.on("ready", () => {
  console.log('Successfully interconnected all of the gangs. Let\'s see what drama plays out.');
  bot.user.setPresence({
    game: {
        name: 'for .help',
        type: "WATCHING"
  }})
});

bot.on('message', message =>{
    if (message.author.bot) return;

  let prefix = "."

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length).toLowerCase());
  if (cmd) {
    cmd.run(bot, message, args, queue, prefix)
  }

      if (bot.aliases.has(command.slice(prefix.length).toLowerCase())) {
        bot.commands.get(bot.aliases.get(command.slice(prefix.length).toLowerCase())).run(bot, message, args, queue, prefix)
    }
});

bot.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
    authorSchema.findOne({ userID: message.author.id }, (err, res) => {
    if (!res) {
      new authorSchema({
        name: message.author.tag,
        userID: message.author.id,
        isMuted: false
      })
        .save()
        .then(result => {
          console.log(result);
        });
    }
  });
})

// Bot Initiation
// bot.login(process.env.BOT_TOKEN);