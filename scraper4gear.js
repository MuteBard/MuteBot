const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');
const readlineSync = require('readline-sync'); //saved my fucking life
const fse = require('fs-extra');

// // var rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout
// // });

let demo = {
    gearType : "Headgear",
    gearName : "ABC",
    gearBrand : "Tentatek",
    gearAbility :"Comeback",
    gearCost : 1000
}
let sqlqueriesString = ''
let gearType = ["Headgear","Clothing","Shoes"]
let urls = ["https://splatoonwiki.org/wiki/List_of_headgear_in_Splatoon_2",
            "https://splatoonwiki.org/wiki/List_of_clothing_in_Splatoon_2",
            "https://splatoonwiki.org/wiki/List_of_shoes_in_Splatoon_2"]

//develop questions separated by gear type
var setQuestions = (gear) => { 
    let {gearType, gearName} = gear
    var questions = 
    {
        general:
        {
            whatColor1 : `Enter gear color 1 of the ${gearName}: `,
            whatColor2 : `Enter gear color 2 of the ${gearName}: `,
            isWinter : `Enter T of F on whether ${gearName} is winter apparrel: `,
            isSpring : `Enter T of F on whether ${gearName} is spring apparrel: `,
            isSummer : `Enter T of F on whether ${gearName} is summer apparrel: `,
            isFall : `Enter T of F on whether ${gearName} is fall apparrel: `,
            isDenim : `Enter T of F on whether ${gearName} is denim: `,
            isPlaid: `Enter T of F on whether ${gearName} is plaid: `,
            isLeather:`Enter T of F on whether ${gearName} is leather: `,
            isRubber :`Enter T of F on whether ${gearName} is rubber: `
        },

        headgear:
        {
            isMask: `Enter T of F on whether ${gearName} is a mask: `,
            isHeadphones: `Enter T of F on whether ${gearName} is are headphones: `,
            isHeadband: `Enter T of F on whether ${gearName} is a headband: `,
            isAccessory: `Enter T of F on whether ${gearName} is an accessory: `,
            isHelmet: `Enter T of F on whether ${gearName} is a helmet: `,
            isEyewear: `Enter T of F on whether ${gearName} is eyewear: `,
            isHat: `Enter T of F on whether ${gearName} is a hat: `
        },

        clothing:
        {
            isSweater: `Enter T of F on whether ${gearName} is a sweater: `,
            isJacket:`Enter T of F on whether ${gearName} is a jacket: `,
            isTee:`Enter T of F on whether ${gearName} is a tee: `,
            isGloves: `Enter T of F on whether ${gearName} has gloves: `,
            isVest: `Enter T of F on whether ${gearName} is a vest: `,
            isTank: `Enter T of F on whether ${gearName} is a tank top: `
        },

        shoes:
        {
            isBoot: `Enter T of F on whether ${gearName} is a boot: `,
            isSandle:`Enter T of F on whether ${gearName} is a sandle: `,
            isDress:`Enter T of F on whether ${gearName} is a dress shoe: `
        }
    }

    let questionArray = ''
    switch(gearType){
        case "Headgear":
            questionArray = _.defaults(questions["general"],questions["headgear"])
            break;
        case "Clothing":
            questionArray = _.defaults(questions["general"],questions["clothing"])
            break;
        case "Shoes":
            questionArray = _.defaults(questions["general"],questions["shoes"])
            break;
    }
    return questionArray
}

//fill in data within the sql schemas based on what gear type they are
var newSqlStatement = (gear, answers) => {
    let { gearType, gearName, gearBrand, gearAbility, gearCost } = gear;
    let sqlString = ''
    switch(gearType){
        case "Headgear":
            sqlString = `(DEFAULT,"${gearName}", "",
"${gearBrand}", ${setBrandId(gearBrand)}, "${gearAbility}", ${setAbilityId(gearAbility)},
"F","${gearType}",
"${answers[0]}", "${answers[1]}",
"${answers[2]}", "${answers[3]}", "${answers[4]}", "${answers[5]}", "${answers[6]}", "${answers[7]}", "${answers[8]}", "${answers[9]}",
"${answers[10]}", "${answers[11]}", "${answers[12]}", "${answers[13]}", "${answers[14]}", "${answers[15]}", "${answers[16]}", 
"NULL", "NULL", "NULL", "NULL", "NULL", "NULL",  
"NULL", "NULL", "NULL", "NULL", 
${(!isNaN(gearCost) ? gearCost : "NULL" )}, 0),\n   `
            break;
        case "Clothing":
            sqlString = `(DEFAULT,"${gearName}", "",
"${gearBrand}", ${setBrandId(gearBrand)}, "${gearAbility}", ${setAbilityId(gearAbility)},
"F","${gearType}",
"${answers[0]}", "${answers[1]}",
"${answers[2]}", "${answers[3]}", "${answers[4]}", "${answers[5]}", "${answers[6]}", "${answers[7]}", "${answers[8]}", "${answers[9]}",
"NULL", "NULL", "NULL", "NULL", "NULL", "NULL", "NULL", 
"${answers[10]}", "${answers[11]}", "${answers[12]}", "${answers[13]}", "${answers[14]}", "${answers[15]}",  
"NULL", "NULL", "NULL", "NULL", 
${(!isNaN(gearCost) ? gearCost : "NULL" )}, 0),\n`
            break;
        case "Shoes":
            sqlString = `(DEFAULT,"${gearName}", "",
"${gearBrand}", ${setBrandId(gearBrand)}, "${gearAbility}", ${setAbilityId(gearAbility)},
"F","${gearType}",
"${answers[0]}", "${answers[1]}",
"${answers[2]}", "${answers[3]}", "${answers[4]}", "${answers[5]}", "${answers[6]}", "${answers[7]}", "${answers[8]}", "${answers[9]}",
"NULL", "NULL", "NULL", "NULL", "NULL", "NULL", "NULL", 
"NULL", "NULL", "NULL", "NULL", "NULL", "NULL",  
"${answers[10]}", "${answers[11]}", "${answers[12]}", "${answers[13]}", 
${(!isNaN(gearCost) ? gearCost : "NULL" )}, 0),\n`
                        
            break;
    }
    return sqlString
}

//match gear brands with according brand id
var setBrandId = (gearBrand) => { 
    var id
    switch(gearBrand){
        case "amiibo":
            id = 1;
            break;
        case "Annaki":
            id = 2;
            break;
        case "Cuttlegear":
            id = 3;
            break;
        case "Enperry":
            id = 4;
            break;
        case "Famitsu":
            id = 5;
            break;
        case "Firefin":
            id = 6;
            break;
        case "Forge":
            id = 7;
            break;
        case "Grizzco":
            id = 8;
            break;
        case "Inkline":
            id = 9;
            break;
        case "KOG":
            id = 10;
            break;
        case "Krak-On":
            id = 11;
            break;
        case "Rockenberg":
            id = 12;
            break;
        case "Skalop":
            id = 13;
            break;
        case "Splash Mob":
            id = 14;
            break;
        case "SquidForce":
            id = 15;
            break;
        case "Takoroka":
            id = 16;
            break;
        case "Tentatek":
            id = 17;
            break;
        case "The SQUID GIRL":
            id = 18;
            break;
        case "Toni Kensa":
            id = 19;
            break;
        case "Zekko":
            id = 20;
            break;
        case "Zink":
            id = 21;
            break;
    }
    return id
}

//match gear abilities with according ability id
var setAbilityId = (gearAbility) => { 
    var id
    switch(gearAbility){
        case "Ability Doubler":
            id = 1;
            break;
        case "Bomb Defense Up":
            id = 2;
            break;
        case "Cold-Blooded":
            id = 3;
            break;
        case "Comeback":
            id = 4;
            break;
        case "Drop Roller":
            id = 5;
            break;
        case "Haunt":
            id = 6;
            break;
        case "Ink Recovery Up":
            id = 7;
            break;
        case "Ink Resistance Up":
            id = 8;
            break;
        case "Ink Saver (Main)":
            id = 9;
            break;
        case "Ink Saver (Sub)":
            id = 10;
            break;
        case "Last-Ditch Effort":
            id = 11;
            break;
        case "Ninja Squid":
            id = 12;
            break;
        case "Object Shredder":
            id = 13;
            break;
        case "Opening Gambit":
            id = 14;
            break;
        case "Quick Respawn":
            id = 15;
            break;
        case "Quick Super Jump":
            id = 16;
            break;
        case "Respawn Punisher":
            id = 17;
            break;
        case "Run Speed Up":
            id = 18;
            break;
        case "Special Charge Up":
            id = 19;
            break;
        case "Special Power Up":
            id = 20;
            break;
        case "Special Saver":
            id = 21;
            break;
        case "Stealth Jump":
            id = 22;
            break;
        case "Sub Power Up":
            id = 23;
            break;
        case "Swim Speed Up":
            id = 24;
            break;
        case "Tenacity":
            id = 25;
            break;
        case "Thermal Ink":
            id = 26;
            break;
    }
    return id
};


var setAnswers = (gearNumber,questions) => {
    let answers = []
    console.log(gearNumber)
    for(key in questions){
        let ans = readlineSync.question(questions[key])
        answers.push(ans)
    }
    return answers
}

let num = 0
urls.map((url, udx) => {
    console.log(udx)
    axios(url).then(html => {
        const $ = cheerio.load(html.data)
        var allgear = $('tr').text((idx, data) => {
            if (idx > 0){

                // list of gear is in even chunks in a giant string, 
                // separate it into an array and grab the 1 elem array string.
                // split the chunk and use portions that have data (2,3,4,and 5)

                let gearPieceString = data.split()[0]
                let gearPieceArray = gearPieceString.split("\n")
                let gear = {
                    gearType : gearType[udx],
                    gearName : gearPieceArray[2].trim(),
                    gearBrand : gearPieceArray[3].trim(),
                    gearAbility : gearPieceArray[5].trim(),
                    gearCost : (gearPieceArray[4].replace(',',"")).trim()
                }
                let gearNum = `(${udx} | ${idx})\n`
                let questions = setQuestions(gear)
                let answer = setAnswers(gearNum, questions) 
                let sqlStatement = newSqlStatement(gear, answer)
                sqlqueriesString += sqlStatement
                console.log(sqlStatement)

            }
        })
    }).then(() => {
        if(udx === 2){ createSqlFile(sqlqueriesString) }
    }).catch(err => console.log(err))  
})   


var createSqlFile = () => { 
    fse.writeFile('gears.sql', 
    `
    DROP TABLE IF EXISTS abilities CASCADE;
    CREATE TABLE abilities(
    id serial primary key,
    ability varchar,
    abilityi varchar,
    );

    DROP TABLE IF EXISTS brands CASCADE;
    CREATE TABLE brands(
    id serial primary key,
    brand varchar,
    brandi varchar,
    pref varchar,
    unpref varchar,
    );

    DROP TABLE IF EXISTS gear CASCADE;
    CREATE TABLE gear(
    id serial primary key,
    gearname varchar,
    gearimage varchar,
    brand varchar,
    brandid integer references brands(id),
    ability varchar,
    abilityid integer references abilities(id),
    annieshop boolean
    geartype varchar,
    color1 varchar,
    color2 varchar,
    iswinter boolean,
    isspring boolean,
    issummer boolean,
    isfall boolean,
    isdenim boolean,
    isplaid boolean,
    isleather boolean,
    isrubber boolean,
    --no need for table separation between headgear, clothing and shoes. It would make things needlessly complicated for no reason, and would require far more access in and out from postgres for litle benifit
    ismask boolean,
    isheadphones boolean,
    isheadband boolean,
    isaccessory boolean,
    ishelmet boolean,
    iseyewear boolean,
    ishat boolean,
    issweater boolean
    isjacket boolean
    istee boolean
    isgloves boolean
    isvest boolean
    istank boolean
    isboot boolean,
    issandle boolean,boolean,
    isdress boolean,
    --misc
    costig integer,
    rarity integer,
    );

    INSERT INTO abilities VALUES
    (DEFAULT, "Ability Doubler", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Ability_Doubler_hu31sq.png"),
    (DEFAULT, "Bomb Defense Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Bomb_Defense_Up_bdujjq.png"),
    (DEFAULT, "Cold-Blooded", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Cold-Blooded_1_sl5emv.png"),
    (DEFAULT, "Comeback", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Comeback_iobj5i.png"),
    (DEFAULT, "Drop Roller", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Drop_Roller_ztgjrb.png"),
    (DEFAULT, "Haunt", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Haunt_xtgj9e.png"),
    (DEFAULT, "Ink Recovery Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Ink_Recovery_Up_gr8jri.png"),
    (DEFAULT, "Ink Resistance Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Ink_Resistance_Up_v7h9yl.png"),
    (DEFAULT, "Ink Saver (Main)", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Ink_Saver__Main_zoigzf.png"),
    (DEFAULT, "Ink Saver (Sub)", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Ink_Saver__Sub_lh4f8f.png"),
    (DEFAULT, "Last-Ditch Effort", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Last-Ditch_Effort_udp4va.png"),
    (DEFAULT, "Ninja Squid", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Ninja_Squid_ds23xf.png"),
    (DEFAULT, "Object Shredder", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Object_Shredder_rrse8w.png"),
    (DEFAULT, "Opening Gambit", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Opening_Gambit_u70egr.png"),
    (DEFAULT, "Quick Respawn", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Quick_Respawn_c4j5sz.png"),
    (DEFAULT, "Quick Super Jump", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Quick_Super_Jump_ysmavo.png"),
    (DEFAULT, "Respawn Punisher", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Respawn_Punisher_vewrex.png"),
    (DEFAULT, "Run Speed Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Run_Speed_Up_fnqbon.png"),
    (DEFAULT, "Special Charge Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Special_Charge_Up_bykawt.png"),
    (DEFAULT, "Special Power Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Special_Power_Up_zyfb7r.png"),
    (DEFAULT, "Special Saver", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Special_Saver_n3rjaz.png"), 
    (DEFAULT, "Stealth Jump", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Stealth_Jump_pm0zbb.png"),
    (DEFAULT, "Sub Power Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Sub_Power_Up_yn2mbw.png"),
    (DEFAULT, "Swim Speed Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Swim_Speed_Up_cglwie.png"),
    (DEFAULT, "Tenacity", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924245/S2_Ability_Tenacity_zfaehx.png"),
    (DEFAULT, "Thermal Ink", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924245/S2_Ability_Thermal_Ink_lmepuo.png");

    INSERT INTO brands VALUES
    (DEFAULT, "amiibo", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_amiibo_zxtsfg.png", "none", "none"),
    (DEFAULT, "Annaki", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Annaki_wz8uds.png", " Cold-Blooded", "Special Saver"),
    (DEFAULT, "Cuttlegear", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Cuttlegear_qxcjxj.png", "none", "none"),
    (DEFAULT, "Enperry", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Enperry_xzsht4.png", "Sub Power Up", "Ink Resistance Up"),
    (DEFAULT, "Famitsu", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S_Brand_Famitsu_p1hfo0.png", "none", "none"),
    (DEFAULT, "Firefin", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Firefin_onnvea.png", "Ink Saver (Sub)", "Ink Recovery Up"),
    (DEFAULT, "Forge", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Forge_capaps.png", "Special Power Up", "Ink Saver (Sub)"),
    (DEFAULT, "Grizzco", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Grizzco_qsrbcn.png", "none", "none"),
    (DEFAULT, "Inkline", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Inkline_xyumc0.png", "Bomb Defense Up", "Cold-Blooded"),
    (DEFAULT, "KOG", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S_Brand_KOG_fxklue.png", "none", "none"),
    (DEFAULT, "Krak-On", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Krak-On_m5nsth.png", "Swim Speed Up", "Bomb Defense Up"),
    (DEFAULT, "Rockenberg", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Rockenberg_jrwiwx.png", "Run Speed Up", "Swim Speed Up"),
    (DEFAULT, "Skalop", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Skalop_tjjvui.png", "Quick Respawn", "Special Saver"),
    (DEFAULT, "Splash Mob", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Splash_Mob_yukqgb.png", "Ink Saver (Main)", "Run Speed Up"),
    (DEFAULT, "SquidForce", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_SquidForce_ze1fag.png", "Ink Resistance Up", "Ink Saver (Main)"),
    (DEFAULT, "Takoroka", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Takoroka_ycmnbl.png", "Special Charge Up", "Special Power Up"),
    (DEFAULT, "Tentatek", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Tentatek_tloods.png", "Ink Recovery Up", "Quick Super Jump"),
    (DEFAULT, "The SQUID GIRL", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Tentatek_tloods.png", "none", "none"),
    (DEFAULT, "Toni Kensa", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Toni_Kensa_eque1d.png", "Cold-Blooded", "Sub Power Up"),
    (DEFAULT, "Zekko", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Zekko_oskixp.png", "Special Saver", "Special Charge Up"),
    (DEFAULT, "Zink", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Zink_jthryx.png", "Quick Super Jump", "Quick Respawn"),
  
    INSERT INTO gear VALUES
    ` + sqlqueriesString)
    .then(() => console.log('The file has been saved!'))
    .catch(err => console.log(err))
}       




