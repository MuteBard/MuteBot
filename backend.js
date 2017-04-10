//create an alias for the module discord.js caled Discord
const Discord = require('discord.js')
//voice support
const Opus = require('node-opus')

//create a Discord Client object called client
const client = new Discord.Client()
const token = require('./settings.json').token

client.on("ready",() => {
  console.log("I'm Online")
})

client.on("message", (message) => {
  const tag = '#'
  const channel = message.member.voiceChannel

  //Responses that do not use the #
  if(message.content === '( owo)b'){
    message.channel.sendMessage('d(owo )')
  }

  //Responses using the #
  if(message.content.startsWith(tag)){
    if(message.content === tag+'( owo)b'){
      message.channel.sendMessage('d(owo )')
    }
    if(message.content === tag+'hello'){
      //Returns: Promise<VoiceConnection called channel>
      channel.join()
                .then((connection) => {
                  const dispatcher = connection.playFile('sound/hello.mp3')
                  return dispatcher
                })
                .then(setTimeout( () => channel.leave(), 5500))
                .catch(error => {
                  return error;
                });
    }

    if(message.content === tag+'go to sleep poohbardi'){
      message.channel.sendMessage(' ( uwu):zzz:')
    }
  }
})

client.login(token);
