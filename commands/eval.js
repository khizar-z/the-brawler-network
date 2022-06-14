const inspect = require('util').inspect;
const Discord = require('discord.js');
const guildSchema = require('../models/guild.js')
const authorSchema = require('../models/author.js')
const clean = input => {
    const output = typeof input === 'string' ? input : inspect(input);
    return output.replace(/(@|`)/g, '$1\u200b');
};
const fs = require("fs")

exports.run = async (bot, message, args, queue, prefix) => {
    //only I can use this command!
    if (!["536949735299219467", "252268366079852584", "262410813254402048"].includes(message.author.id)) return;

    const input = args.join(' ');
    if (!input) {
        (await message.channel.send('You must provide some code to evaluate!')).delete(10000);
    }
  


        const output = clean(eval(input));
      if (args[0] == 'config' || message.content.includes('config.token') || message.content.includes('config')) return message.channel.send('This contains sensitive information that should not be visible to others');
    if (args[0] == 'client.token') return message.channel.send('This contains sensitive information that should not be visible to others');
        message.channel.send({
            embed: new Discord.RichEmbed()
                .addField('Input', `\`\`\`javascript\n${input.substr(0, 256)}\n\`\`\``)
                .addField('Output', `\`\`\`javascript\n${output.substr(0, 768)}\n\`\`\``)
                .setFooter(`Requested by ${message.author.tag}`)
                .setColor("#00AAFF")
        })
    }

exports.help = {

  name: "eval",

  description: "Uses function `eval()` on the provided `args`. Can be used by EBB#5732 and Cxllm#8688 only.",

  usage: "eval <code>"

}



exports.aliases = []



