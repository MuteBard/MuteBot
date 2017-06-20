//create an alias for the module discord.js caled Discord
const Discord = require('discord.js')
//voice support
const Opus = require('node-opus')

//create a Discord Client object called client
const client = new Discord.Client()
const token = require('./settings.json').token



//create database for this
//create a website for command list
var command = [
              {'0':['hello','sound/hello.mp3',5500]},
              {'1':['sorrymasen','sound/1sorrymasen.mp3',4000]},
              {'2':['nani-the-fuck','sound/2Nani.mp3',5000]},
              {'3':['seeyanara','sound/3seeyanra.mp3',3000]},
              {'4':['BSME','sound/4bsme.mp3',6000]},
              {'5':['africa60','sound/6africa60sec.mp3',7000]},
              {'6':['uwu','sound/10uwu.mp3',3000]},
              {'7':['notice','sound/12notice.mp3',6500]},
              {'8':['MEAT','sound/16meat.mp3',5000]},
              {'9':['nintendome','sound/nintendome.wav',7500]},
              {'10':['roundabout','sound/Roundabout.wav',12000]},
              {'11':['lit','sound/Its_lit.wav',4500]},
              {'12':['startup','sound/startup.mp3',5000]},
              {'13':['DANGER','sound/startupDistorted.mp3',5000]},
              {'14':['shutdown','sound/shutdown.mp3',4000]},
              {'15':['VII','sound/7Fanfare.mp3',5200]},
              {'16':['sadsong1','sound/Sad Violin.mp3',11000]},
              {'17':['idont','sound/idont.mp3',6000]},
              {'18':['saywhat','sound/saywhat.wav',8000]},
              {'19':['error','sound/error.mp3',4000]},
              {'20':['laugh','sound/laugh.wav',8000]},
              {'21':['canada','sound/Canadians.wav',4000]},
              {'22':['lullaby','sound/H.wav',240000]},
              {'23':['fatal','sound/Jax.wav',10000]},
              {'24':['gtfts0','sound/gtfts0.wav',7000]},
              {'25':['gtfts1','sound/gtfts1.wav',19000]},
              {'26':['gtfts2','sound/gtfts2.wav',19000]},
              {'27':['gtfts3','sound/gtfts3.wav',19000]},
              {'28':['gtfts4','sound/gtfts4.wav',20000]},
              {'29':['gtfts5','sound/gtfts5.wav',19000]},
              {'30':['gtfts6','sound/gtfts7.wav',19000]},
              {'31':['gtfts7','sound/gtfts8.wav',20000]},
              {'32':['gtfts8','sound/gtfts9.wav',19000]},
              {'33':['gtfts9','sound/gtfts10.wav',22000]},
              {'34':['gtfts10','sound/gtfts11.wav',19000]},
              {'35':['gtfts11','sound/gtfts12.wav',22000]},
              {'36':['gtfts12','sound/gtfts13.wav',19000]},
              {'37':['wtfts','sound/gtfts13edit.wav',18500]},
              {'38':['gtfts13','sound/gtfts14.wav',18000]},
              {'39':['gtfts','sound/gtfts.mp3',295000]},
              {'40':['reborn','sound/believe.wav',9000]},
              {'41':['never','sound/never.wav',7000]},
              {'42':['hey','sound/hey.wav',3000]}
              // {'43':['final','sound/final.wav',13000]}

            ]

client.on("ready",() => {
  console.log("I'm Online")
})

const tag = '--'
client.on("message", (message) => {


  let args = message.content.split(' ').slice(1);
  let num = Number(args[0])

  // console.log(num)
  // console.log(args)
  var result = args.join(' ')

  if(message.author.bot)return;
  var embed = new Discord.RichEmbed().setDescription(`${message.author.username} : ${message.content}`)
  client.channels.get("326577490526994432").send({embed})
  if(!message.content.startsWith(tag)) return;



  if (message.content === tag+'timetest'){
    message.channel.sendMessage(`Time Now ${Date.now()}  - Time Posted ${message.createdTimestamp} = Time Stamp: ${Date.now() - message.createdTimestamp } ms`)
  }

  else if(message.content.startsWith(tag+"send")){
    client.channels.get("314828424206352385").sendMessage("recieved uwu")
  }

  else if(message.content.startsWith(tag+"setgame")){
    client.user.setGame(result != "" ? result : null)
    message.channel.sendMessage(`game set to ${result}`)

  }

  //dnd, idle, invisible, online
  else if(message.content.startsWith(tag + "setstatus")){
    client.user.setStatus(result != "" ? result  : "online")
    message.channel.sendMessage(`status set to ${result}`)
  }

  else if(message.content.startsWith(tag + "hi_mutebot")){
    var embed = new Discord.RichEmbed().setDescription("Hello :wave::skin-tone-5: ")
    message.channel.send({embed})
  }





  else if(message.content.startsWith(tag + 'del') && (message.author.id == 93446971439710208 || message.author.id == 102545219349655552)){
    let messagecount = parseInt(result)
    message.channel.fetchMessages({limit:messagecount})
    .then(messages => message.channel.bulkDelete(!num || num < 2 ? 2 : num))
  }

  const vcchannel = message.member.voiceChannel
  if(message.content.startsWith(tag + 'leave')){
    if(!vcchannel){
      message.channel.sendMessage('im not in vc')
    }else{
      message.channel.sendMessage('left vc').then( () => vcchannel.leave())
        .catch(error => {
         return error;
      });
    }
  }

  // Responses with --
  if(message.content === tag+'help'){
    message.channel.sendMessage("**Here is a list of commands atm\nStart every command with -- **")
    command.forEach((key,i) => {
      let cmd  = key[i.toString()][0]
      message.channel.sendMessage(cmd)
    });
  }

  command.forEach((key,i) => {
    let cmd  = key[i.toString()][0]
    let soundFile = key[i.toString()][1]
    let duration = key[i.toString()][2]
    if(message.content === tag+cmd){
      vcchannel.join()
                .then((connection) => {
                  const dispatcher = connection.playFile(soundFile)
                  return dispatcher
                })
                .then(setTimeout( () => vcchannel.leave(), duration))
                .catch(error => {

                  //learn how to load up a picture in discord
                  //message.content("botbard.jpg")
                  return error;
                });
    }
  })
});
client.on("guildDelete", (guild) => {
  console.log(`I have left ${guild.name} at ${new Date()}`);
});


// client.on("guildMemberAdd", (member) => {
//   let guild = member.guild;
//   guild.defaultChannel.sendMessage(`helo ${member.user.username} `)
// });
//
// client.on("guildMemberRemove", (member) => {
//   let guild = member.guild;
//   guild.defaultChannel.sendMessage(`rip ${member.user.username} `)
// });

client.on('channelCreate', channel => {
  console.log(`A ${channel.type} by the name of ${channel.name} and was ${channel.createdAt} with the ID of ${channel.id}`)
  // channel.sendMessage("test123")

})

client.on('messageDelete',message =>{
  message.guild.defaultChannel.sendMessage(`A message with the contents ${cleanContent} was deleted from ${message.channel}`)
})

client.on('messageDeleteBulk', messages =>{
  console.log(`${messages.size} was deleted`)
})


client.login(token);
