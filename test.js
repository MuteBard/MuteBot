var command = [
              {'0' :['hello','sound/hello.mp3',5500]},
              {'1' :['sorrymasen','sound/1sorrymasen.mp3',4000]},
              {'2':['Nani-the-fuck','sound/2Nani.mp3',5000]},
              {'3':['seeyanara','sound/3seeyanra.mp3',3000]},
              {'4':['BSME','sound/4bsme.mp3',5000]},
              {'5':['bobbysauceMmm','sound/5BobbysauceMmm.mp3',5000]},
              {'6':['africa60','sound/6africa60sec.mp3',7000]},
              {'7':['fam','sound/7faaaam.mp3',6000]},
              {'8':['hydrated','sound/8hydrated .mp3',7000]},
              {'9':['pbsalmon','sound/9pbsalmon.mp3',7000]},
              {'10':['uwu','sound/10uwu.mp3',3000]},
              {'11':['olive','sound/11olives.mp3',4000]},
              {'12':['notice','sound/12notice.mp3',6500]},
              {'13':['staystrong','sound/13staystrong.mp3',7000]},
              {'14':['pinapple+pizza','sound/14pineapple.mp3',7000]},
              {'15':['sunsetter','sound/15sunset.mp3',7000]}
              ]

                command.forEach((key,i,command) => {
                  let cmd  = key[i.toString()][0]
                  let soundFile = key[i.toString()][1]
                  let duration = key[i.toString()][2]
                  if("#hello" === '#'+cmd){
                    console.log("BEEP BOOP SOUND PLAYS BEEP BOOP IM GONE")
                  }
                });

let x = 2;

`sdsfsfsfd${x}`
