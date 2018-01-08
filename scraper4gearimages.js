const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');

// let urls = ["https://splatoonwiki.org/wiki/List_of_headgear_in_Splatoon_2",
//             "https://splatoonwiki.org/wiki/List_of_clothing_in_Splatoon_2",
//             "https://splatoonwiki.org/wiki/List_of_shoes_in_Splatoon_2"]
let url = "https://splatoonwiki.org/wiki/List_of_headgear_in_Splatoon_2"
axios(url).then(html => {
    const $ = cheerio.load(html.data)
    var allgear = $('tr').text((idx, data) => {
        
        if (idx > 0){
            let gearPieceString = data.split()[0]
            let gearPieceArray = gearPieceString.split("\n")
            let gear = {
                name : gearPieceArray[2].trim(),
            }
            // console.log($(`img[alt=${gear["name"]}]`))
            // console.log($(`a[href='${gear["name"]}']`).children('img'))
            console.log($(`img`))
            

           
        }
    })
}).then(() => {
    // if(udx === 2){ createSqlFile(sqlqueriesString) }
}).catch(err => console.log(err))  

