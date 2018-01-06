const axios = require('axios');
const cheerio = require('cheerio');

//http://api.jquery.com/each/

let type = ["Headgear","Clothing","Shoes"]
let str = ''

url = //"https://splatoonwiki.org/wiki/List_of_headgear_in_Splatoon_2";
       // "https://splatoonwiki.org/wiki/List_of_clothing_in_Splatoon_2";
       "https://splatoonwiki.org/wiki/List_of_shoes_in_Splatoon_2";
axios(url).then(html => {
    const $ = cheerio.load(html.data)
    var allgear = $('tr').text((idx, data) => {
        if (idx > 0){
            let gearPieceString = data.split()[0]
            let gearPieceArray = gearPieceString.split("\n")
            //crafting sql insertion query
            str += 
            `(DEFAULT,"${gearPieceArray[2].trim()}", "",
            "${gearPieceArray[3].trim()}", "${gearPieceArray[5].trim()}", "...", "...",
            "F","${type[2]}",
            "-","-","-","-",
            ${(!isNaN(gearPieceArray[4]) || gearPieceArray[4].includes(',') ? gearPieceArray[4].trim() : "NULL" )}, 0),\n`
        }
    })
}).then(() => {
    console.log(str.substring(0 , str.length-2))
}).catch(err => console.log(err))
       