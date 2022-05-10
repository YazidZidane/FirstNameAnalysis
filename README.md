# First Name Analysis
### Introduction

This API gives name analysis based on an ancient Chinese divination text, the *Yi Jing*.

The "Wu Xing naming method" simply divides the name into 4 parts: the heaven, the earth, the personality and the general, and uses the strokes to define the Wu Xing(Five Phases). The so-called "five-frame image" is based on the "phase" and "number" theory of the Yi Jing, according to the number of strokes of the name and certain rules to establish the Wu Xing mathematical relationships, and use the theory of Yin and Yang and the five phases generate and restrain each other to calculate the fortune of people in all aspects.

The method derives 5 results, which are Tian(the heaven), Di(the earth), Ren(personality), Zong(general) and Wai(other). It uses the letter index, letter strokes, and the Yin/Yang property of the letter to derive a result, and uses the corresponding BaGua number to define the fortune.

**Tian**: This is mainly defined by the last name, which is from the ancestors. It Represents innate fortune before the age of 12 and congenital inheritance. If it is not ideal, there is no need to care about it.

**Di**: This is mainly defined by the first name. Represents the fortune before the age of 36, as well as the family, husband and wife, and children, affecting the basic fortune.

**Ren**: This is mainly defined by the first letter of first name and the last name. Represents the peak life fortune of 24-48 years old, as well as personality, talent and career luck, affecting the whole life fortune.

**Zong**: This is mainly defined by both first name and last name. Represents the fortune of middle and old age, wealth and income after the age of 48, which affects the ultimate achievement of life.

**Wai**: Represents the fortune of middle-aged people aged 36-48, as well as social, friends, work environment etc. Affecting the opportunities for the after days. It is a secondary fortune, which can assist the main fortune.

### API

The API requires only two user input: `firstname` and `lastname`. All two names should only contain letters, no numbers, special or foreign characters are allowed (and no spaces.). It returns a JSON result of the analysis. The result includes five fields, in which each field gives the value of the computation, the fortune in Chinese and English(which gives a brief view of the detail), and the analysis.

For example, `https://express-name-9418.wl.r.appspot.com/fName=John&lName=Doe`

```json
{
    "Tian": {
        "value": 4,
        "fortune": "凶(inauspicious)",
        "analysis": "The number of destructive evils, the number of incomplete and destructions. Not free to advance and retreat, lack of ability to be independent. Most of them suffered from hardships and difficulties, or cooperated with other misfortunes and died of madness and premature death. Or let loose, shattered, and eventually become a crippled person. However, there are also filial sons, festival wives, strange heroes, etc. from this number."
    },
    "Di": {
        "value": 5,
        "fortune": "大吉(great auspicious)",
        "analysis": "The sympathy of yin and yang, the harmony, the image of perfect jade, hides great success. Sharp in spirit, healthy in body, longevity, wealth, wealth and prosperity, they are omnipotent or the ancestor of family prosper, or start a family in a foreign country, or rejuvenate a unique family. Even if this is not the case, he will also gain fame and honor, and his perfection and happiness will be incomparable."
    },
    "Ren": {
        "value": 6,
        "fortune": "大吉(great auspicious)",
        "analysis": "Heaven, virtue and earth are auspicious, blessings and celebrations are very wide, and the fortune of the family is prosperous. , This mathematics has the beauty of innate talent, and it is safe and auspicious for life."
    },
    "Zong": {
        "value": 9,
        "fortune": "凶(inauspicious)",
        "analysis": "Benefit to calamity, fall into poverty, bad luck, short life, grief or childhood divorce and hardship, or sickness, no encounter, suffering and sickness, poverty, disaster, loneliness and even punishment. If there is an unexpected disaster, a person with this number of personalities is a great evil, that is, he may be free from disasters. The loss of a spouse is also inevitable. It is the eccentric who is the greatest evil in life but is exceptional, and the rich can make this number."
    },
    "Wai": {
        "value": 3,
        "fortune": "大吉(great auspicious)",
        "analysis": "When yin and yang are in harmony, all things are determined to be formed, and there are signs of auspiciousness, success and development. Great intelligence, craftsmanship and skill have the capital of a leader, a blessing of nature. The almighty adult career of fame and fortune is expected to advance, and the blessings are endless."
    }
}
```



