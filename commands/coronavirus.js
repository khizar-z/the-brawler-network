const Discord = require('discord.js');
exports.run = async (bot, message, args) => {
  if(!args[0]){
   const res = await require('node-fetch')(`https://corona.lmao.ninja/countries`);
    const data = await res.json();

    const cases = data.map(d => d.cases).reduce((a, b) => a + b);
    // console.log(data.reduce((a, b) => a + b));
    const casesToday = data.map(d => d.todayCases).reduce((a, b) => a + b);
    const deaths = data.map(d => d.deaths).reduce((a, b) => a + b);
    const deathsToday = data.map(d => d.todayDeaths).reduce((a, b) => a + b);
    const recovered = data.map(d => d.recovered).reduce((a, b) => a + b);
    const critical = data.map(d => d.critical).reduce((a, b) => a + b);
  const embed = new Discord.RichEmbed()
  .setTitle("Coronavirus (COVID-19) Information")
  .addField("Confirmed Cases", parseInt(cases).toLocaleString('en'), true)
  .addField("Cases Today", parseInt(casesToday).toLocaleString('en'), true)
  .addField("Total Deaths", parseInt(deaths).toLocaleString('en'), true)
  .addField("Deaths Today", parseInt(deathsToday).toLocaleString('en'), true)
  .addField("Total Recovered", parseInt(recovered).toLocaleString('en'), true)
  .addField("Critical Cases", parseInt(critical).toLocaleString('en'), true)
  .addField("Active Cases", parseInt(cases - deaths - recovered).toLocaleString('en'), true)
  .addField("Current Fatality Rate", Math.round((deaths / cases * 100) * 10)/10 + "%", true)
  .setColor("#00aaff")
  .setFooter("Make sure to follow advice of the WHO and your government to stay safe\nThis command uses https://www.worldometers.info/coronavirus/")
  message.channel.send(embed
                       )
  } else{
    const res = await require('node-fetch')(`https://corona.lmao.ninja/countries`);
    const data = await res.json();

    if (!args[0]) return message.channel.send(`Please provide a country name.`);
    const country = data.find(c => c.country.toLowerCase().includes(args.join(" ").toLowerCase()));
    if (!country) return message.channel.send(`That country does not exist, or does not have the virus yet.`);
  const embed = new Discord.RichEmbed()
  .setTitle("Coronavirus information in " + country.country)
  .addField("Confirmed Cases", parseInt(country.cases).toLocaleString('en'), true)
  .addField("Cases Today", parseInt(country.todayCases).toLocaleString('en'), true)
  .addField("Total Deaths", parseInt(country.deaths).toLocaleString('en'), true)
  .addField("Deaths Today", parseInt(country.todayDeaths).toLocaleString('en'), true)
  .addField("Total Recovered", parseInt(country.recovered).toLocaleString('en'), true)
  .addField("Critical Cases", parseInt(country.critical).toLocaleString('en'), true)
  .addField("Active Cases", parseInt(country.cases - country.deaths - country.recovered).toLocaleString('en'), true)
    .addField(country.country +"'s Current Fatality Rate", Math.round((country.deaths / country.cases * 100) * 10)/10 + "%", true)
  .setFooter("Make sure to follow advice of the WHO and your government to stay safe\nThis command uses https://www.worldometers.info/coronavirus/")
  .setColor("#00aaff")
  if(country.country === "Diamond Princess"){
    embed.setTitle("Coronavirus Cases on the Diamond Princess cruise ship in Yokohama")}
  message.channel.send(embed)
  }
}
exports.help = {

  name: "coronavirus",

  description: "Lists all cases of coronavirus or in a certain country",

  usage: "coronavirus [country (optional)]"

}
exports.aliases = ["corona", "covid", "cv"]