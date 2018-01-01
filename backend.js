//create an alias for the module discord.js caled Discord
const Discord = require('discord.js')
//voice support
const Opus = require('node-opus')

//create a Discord Client object called client
const client = new Discord.Client()
const token = require('./secret/settings.json').token


client.on("ready",() => {
  console.log("I'm Online")
})

client.on("message", (message) => {
  if(message.content.startsWith("ping")){
    client.user.setStatus(result != "" ? result  : "online")
    message.channel.sendMessage("pong")
  }
})

client.login(token);
