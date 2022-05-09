const express = require('express')
const app = express()
const port = 3000


app.get('/fName=:fName&lName=:lName', function (req, res) {
    // The API uses firstname and last name as input(both input should be valid)
    firstName = req.params.fName.toLowerCase();
    lastName = req.params.lName.toLowerCase();
    // input validation
    if (!inputValidation(firstName) || !inputValidation(lastName)) {
        res.status(400).send('Name not in correct format.')
    }
    // name analysis
    let analysis = nameAnalysis(firstName,lastName);
    // return JSON result
    res.json(analysis);
}); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function inputValidation(name) {
    // No numbers, special or foreign characters are allowed (and no spaces.)
    for (const c of name) {
        if (!c.match(/[a-z]/i)) {
            return false;
        }
    }
    return true;
}

function nameAnalysis(firstName, lastName) {
    // Calculate five different values based on The I Chin, uses a letter index, strokes to form a letter, and the Yin/Yang value of the letter.
    let values = [0,0,0,0,0];

    for (const c of firstName) {
        values[0] += letters[c][1] + letters[c][2];
        values[2] += letters[c][0] + letters[c][1] + letters[c][2];
    }

    for (const c of lastName) {
        values[1] += letters[c][1] + letters[c][2]; 
    }

    let lastNameFirstLetter = lastName.charAt(0);
    values[2] += letters[lastNameFirstLetter][0] + letters[lastNameFirstLetter][1] + letters[lastNameFirstLetter][2];
    values[3] = values[0] + values[1];
    values[4] = Math.abs(values[3] - values[2]);

    for (let i = 0; i < values.length; i++) {
        values[i] %= 16;
        if (values[i] == 0) values[i] = 16;
    }

    return buildAnalysis(values);
}

function buildAnalysis(values){
    // build the result JSON, there are five results.
    let analysis = {
            "Tian":{
                "value":values[0],
                "fortune":destiny[values[0].toString()]["fortune"],
                "analysis": destiny[values[0].toString()]["meaning"]
            },
            "Di":{
                "value":values[1],
                "fortune":destiny[values[1].toString()]["fortune"],
                "analysis": destiny[values[1].toString()]["meaning"]
            },
            "Ren":{
                "value":values[2],
                "fortune":destiny[values[2].toString()]["fortune"],
                "analysis": destiny[values[2].toString()]["meaning"]
            },
            "Zong":{
                "value":values[3],
                "fortune":destiny[values[3].toString()]["fortune"],
                "analysis": destiny[values[3].toString()]["meaning"]
            },
            "Wai":{
                "value":values[4],
                "fortune":destiny[values[4].toString()]["fortune"],
                "analysis": destiny[values[4].toString()]["meaning"]
            }
        };
    return analysis;
}

var letters = {
    "a":[1,3,1],
    "b":[2,2,2],
    "c":[3,1,3],
    "d":[4,2,4],
    "e":[5,3,5],
    "f":[6,4,6],
    "g":[7,4,7],
    "h":[8,4,8],
    "i":[9,1,9],
    "j":[10,2,10],
    "k":[11,3,1],
    "l":[12,1,2],
    "m":[13,2,3],
    "n":[14,3,4],
    "o":[15,1,5],
    "p":[16,2,6],
    "q":[17,2,7],
    "r":[18,3,8],
    "s":[19,1,8],
    "t":[20,2,10],
    "u":[21,1,1],
    "v":[22,1,2],
    "w":[23,1,3],
    "x":[24,2,4],
    "y":[25,2,5],
    "z":[26,1,6],
}

var destiny = {
    "1":{
        "fortune":"大吉(great auspicious)",
        "meaning":"This is the basic number of all things and the greatest auspicious expression. It belongs to extraordinary success, health and wealth, Fame, happiness, and happiness for the rest of your life. Because it is too good, it is difficult for ordinary people to bear the number."},
    "2":{
        "fortune":"大凶(great inauspicious)",
        "meaning":"Chaos final number. It is a hint of the greatest evil, the strength of the powerless to advance and retreat loses freedom, and its internal and external waves are disturbed by suffering. Shaking, the sick suffer, and even maim. If they are accompanied by other good numbers, they will not die prematurely, and they will work hard all their lives, and their aspirations will be difficult to achieve and impermanent.",
    },
    "3":{
        "fortune":"大吉(great auspicious)",
        "meaning":"When yin and yang are in harmony, all things are determined to be formed, and there are signs of auspiciousness, success and development. Great intelligence, craftsmanship and skill have the capital of a leader, a blessing of nature. The almighty adult career of fame and fortune is expected to advance, and the blessings are endless."
    },
    "4":{
        "fortune":"凶(inauspicious)",
        "meaning":"The number of destructive evils, the number of incomplete and destructions. Not free to advance and retreat, lack of ability to be independent. Most of them suffered from hardships and difficulties, or cooperated with other misfortunes and died of madness and premature death. Or let loose, shattered, and eventually become a crippled person. However, there are also filial sons, festival wives, strange heroes, etc. from this number."
    },
    "5":{
        "fortune":"大吉(great auspicious)",
        "meaning":"The sympathy of yin and yang, the harmony, the image of perfect jade, hides great success. Sharp in spirit, healthy in body, longevity, wealth, wealth and prosperity, they are omnipotent or the ancestor of family prosper, or start a family in a foreign country, or rejuvenate a unique family. Even if this is not the case, he will also gain fame and honor, and his perfection and happiness will be incomparable."
    },
    "6":{
        "fortune":"大吉(great auspicious)",
        "meaning":"Heaven, virtue and earth are auspicious, blessings and celebrations are very wide, and the fortune of the family is prosperous. , This mathematics has the beauty of innate talent, and it is safe and auspicious for life."
    },
    "7":{
        "fortune":"吉(auspicious)",
        "meaning":"Independent, single-line, and extremely emotional, too rigid and lacking the meaning of assimilation. If you stubbornly take power, it is easy to lead to internal and external discord. Fortunately, you have a lot of energy, and you have the ability to adjust things. You can crush tough enemies and overcome all difficulties. If you have a masculine temperament, you must pay attention to gentleness to be auspicious and without fault."
    },
    "8":{
        "fortune":"吉(auspicious)",
        "meaning":"The will is like stone, full of enterprising spirit. Overcome all difficulties, pursue the goal of achieving both fame and fortune, and endure success. But with other people with bad luck may have bad luck."
    },
    "9":{
        "fortune":"凶(inauspicious)",
        "meaning":"Benefit to calamity, fall into poverty, bad luck, short life, grief or childhood divorce and hardship, or sickness, no encounter, suffering and sickness, poverty, disaster, loneliness and even punishment. If there is an unexpected disaster, a person with this number of personalities is a great evil, that is, he may be free from disasters. The loss of a spouse is also inevitable. It is the eccentric who is the greatest evil in life but is exceptional, and the rich can make this number."
    },
    "10":{
        "fortune":"凶(inauspicious)",
        "meaning":"Punishment for killing and wounding, sickness and disaster. Those with this number of personalities are mostly non-karmic and short-lived. As the sun is dying, looking around in the vast expanse, the gods cry and ghosts howl, and vicious images are roused, and the strength to do all things is lacking, and they are often unsatisfactory. Whenever they ask for merit, they gradually fail due to many obstacles, and their families are destroyed. Exceptions can be made in desperation."
    },
    "11":{
        "fortune":"大吉(great auspicious)",
        "meaning":"To enjoy talent and luck, everything goes well, to be rich and honorable, and the hint of rejuvenation ,this is the greatest auspicious number to save a peaceful and smooth home."
    },
    "12":{
        "fortune":"凶(inauspicious)",
        "meaning":"There are signs of unreasonable stretches, disregarding the power of weakness, trying to do things that are incapable of doing, and often failing. Failing prone enough heart. Family failure, loneliness, death, adversity, sickness, disappointment, difficulties, etc., can also lead to unexpected failures due to the cooperation of other fortunes, and even misfortunes that do not end in life."
    },
    "13":{
        "fortune":"大吉(great auspicious)",
        "meaning":"Rich in academic ability, resourceful, patient and gentle in dealing with things, any difficult thing happens to be a great achievement. In order to obtain a good inducement to enjoy happiness, honor and splendor, it is characterized by being full of wisdom."
    },
    "14":{
        "fortune":"凶(inauspicious)",
        "meaning":"There are many broken signs. Bereavement, separation of siblings, loneliness, disappointment, boredom, distress, adversity, ups and downs. Giving benefits and grievances, labor but in vain. Miserable and lonely, there are not many other lucky people, and there is a short life."
    },
    "15":{
        "fortune":"凶(inauspicious)",
        "meaning":"He is resourceful, although he has the strength to prosper and gain fame and fortune, but every accident framed, internal and external discord, difficulties and misery are endless. If the main luck has this number and there is no other auspicious number to help, it will often be sick, weak, orphaned. There are even premature death, death of wife, punishment, killing and other disasters. Setbacks for everything are extremely fatal, so it is also called short-lived number. But those who are born in need of gold water can become rich, eccentric, and great."
    },
    "16":{
        "fortune":"大吉(good fortune)",
        "meaning":"A sign that things will perish. With the induction of short-lived non-karma, the so-called great ominous luck can not be peaceful, disasters are frequent, it is wishful thinking, and it is in adversity. Or lead to weak, short-lived, non-karma, broken, unable to support the family. Or do not kiss when you are young, but fall into hardship or lament the misfortune of your children."
    },
}