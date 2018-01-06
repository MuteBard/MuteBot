const axios = require('axios');
const cheerio = require('cheerio');

//http://api.jquery.com/each/

let type = ["Headgear","Clothing","Shoes"]
let str = ''

urls = ["https://splatoonwiki.org/wiki/List_of_headgear_in_Splatoon_2",
       "https://splatoonwiki.org/wiki/List_of_clothing_in_Splatoon_2",
       "https://splatoonwiki.org/wiki/List_of_shoes_in_Splatoon_2"]
       
urls.forEach((url, udx) =>{
    axios(url).then(html => {
        const $ = cheerio.load(html.data)
        var allgear = $('tr').text((idx, data) => {
            if (idx > 0){
                let gearPieceString = data.split()[0]
                let gearPieceArray = gearPieceString.split("\n")

                //remove all commas from numbers
                gearPieceArray[4] = gearPieceArray[4].replace(',',"")

                //crafting sql insertion query
                str += 
                `(DEFAULT,"${gearPieceArray[2].trim()}", "",
                "${gearPieceArray[3].trim()}", "${gearPieceArray[5].trim()}", "...", "...",
                "F","${type[udx]}",
                "-","-","-","-",
                ${(!isNaN(gearPieceArray[4]) ? gearPieceArray[4].trim() : "NULL" )}, 0),\n`
            }
        })
    }).then(() => {
        console.log(str)
    }).catch(err => console.log(err))
})   

