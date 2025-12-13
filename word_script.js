const words = [
    {
        japanese: "木漏れ日",
        romaji: "Komorebi",
        english: "Sunlight filtering through the trees",
    },
    {
        japanese: "物の哀れ",
        romaji: "Mono no aware",
        english: "The gentle sadness of things",
    },
    {
        japanese: "侘寂",
        romaji: "Wabi-sabi",
        english: "Finding beauty in imperfection",
    },
    {
        japanese: "生き甲斐",
        romaji: "Ikigai",
        english: "A reason for being",
    },
    {
        japanese: "金継ぎ",
        romaji: "Kintsugi",
        english: "The art of repairing pottery with gold",
    },
    {
        japanese: "幽玄",
        romaji: "Yūgen",
        english: "A profound, mysterious sense of the beauty of the universe",
    },
    {
        japanese: "風物詩",
        romaji: "Fūbutsushi",
        english: "Things that remind you of a certain season",
    },
    {
        japanese: "桜",
        romaji: "Sakura",
        english: "Cherry blossoms, symbolizing beauty and fleeting moments",
    },
    {
        japanese: "恋",
        romaji: "Koi",
        english: "Romantic love, deep affection",
    },
    {
        japanese: "夢",
        romaji: "Yume",
        english: "Dream, something desired",
    },
    {
        japanese: "輝き",
        romaji: "Kagayaki",
        english: "Radiance, brightness",
    },
    {
        japanese: "希望",
        romaji: "Kibou",
        english: "Hope, aspiration",
    },
    {
        japanese: "微笑み",
        romaji: "Hohoemi",
        english: "Smile, a gentle expression of happiness",
    },
    {
        japanese: "静けさ",
        romaji: "Shizukesa",
        english: "Serenity, peacefulness",
    },
    {
        japanese: "光",
        romaji: "Hikari",
        english: "Light, illumination",
    },
    {
        japanese: "花",
        romaji: "Hana",
        english: "Flower, a symbol of nature's beauty",
    },
    {
        japanese: "愛",
        romaji: "Ai",
        english: "Love, deep affection and care",
    },
    {
        japanese: "調和",
        romaji: "Chouwa",
        english: "Harmony, balance between elements",
    },
    {
        japanese: "自由",
        romaji: "Jiyuu",
        english: "Freedom, liberty",
    },
    {
        japanese: "流星",
        romaji: "Ryuusei",
        english: "Shooting star, a fleeting wish",
    },
    {
        japanese: "恵み",
        romaji: "Megumi",
        english: "Blessing, grace from above",
    },
    {
        japanese: "静寂",
        romaji: "Seijaku",
        english: "Silence, calm and quietness",
    },
    {
        japanese: "優しさ",
        romaji: "Yasashisa",
        english: "Kindness, gentle and caring nature",
    },
    {
        japanese: "平和",
        romaji: "Heiwa",
        english: "Peace, a state of calmness",
    },
    {
        japanese: "虹",
        romaji: "Niji",
        english: "Rainbow, a symbol of hope after rain",
    },
    {
        japanese: "幸せ",
        romaji: "Shiawase",
        english: "Happiness, a state of joy",
    },
    {
        japanese: "奇跡",
        romaji: "Kiseki",
        english: "Miracle, a wondrous event",
    },
    {
        japanese: "心",
        romaji: "Kokoro",
        english: "Heart, soul, or mind",
    },
    {
        japanese: "勇気",
        romaji: "Yuuki",
        english: "Courage, bravery in adversity",
    },
    {
        japanese: "約束",
        romaji: "Yakusoku",
        english: "Promise, a commitment or vow",
    },
    {
        japanese: "森林浴",
        romaji: "Shinrin-yoku",
        english: "Forest bathing, immersing oneself in nature",
    },
    {
        japanese: "積ん読",
        romaji: "Tsundoku",
        english: "Buying books and letting them pile up unread",
    },
    {
        japanese: "花吹雪",
        romaji: "Hanafubuki",
        english: "A storm of falling cherry blossom petals",
    },
    {
        japanese: "浮世",
        romaji: "Ukiyo",
        english: "The floating world; living in the moment",
    },
    {
        japanese: "口寂しい",
        romaji: "Kuchisabishii",
        english: "Eating when not hungry because your mouth is 'lonely'",
    },
    {
        japanese: "忘れ物",
        romaji: "Wasuremono",
        english: "Something forgotten or left behind",
    },
    {
        japanese: "初恋",
        romaji: "Hatsukoi",
        english: "First love",
    },
    {
        japanese: "恋の予感",
        romaji: "Koi no yokan",
        english: "The premonition of love",
    },
    {
        japanese: "縁",
        romaji: "Enishi",
        english: "The mysterious force that binds people together",
    },
    {
        japanese: "懐かしい",
        romaji: "Natsukashii",
        english: "A nostalgic fondness for the past",
    },
    {
        japanese: "木枯らし",
        romaji: "Kogarashi",
        english: "A cold, wintry wind",
    },
    {
        japanese: "星屑",
        romaji: "Hoshikuzu",
        english: "Stardust",
    },
    {
        japanese: "切ない",
        romaji: "Setsunai",
        english: "A bittersweet feeling of nostalgia and longing",
    },
    {
        japanese: "泡沫",
        romaji: "Utakata",
        english: "Bubble, transient, ephemeral",
    },
    {
        japanese: "魂",
        romaji: "Tamashii",
        english: "Soul or spirit",
    },
    {
        japanese: "絆",
        romaji: "Kizuna",
        english: "The bonds or connections between people",
    },
    {
        japanese: "思い出",
        romaji: "Omoide",
        english: "A memory",
    },
    {
        japanese: "静心",
        romaji: "Shizugokoro",
        english: "A calm, peaceful heart or mind",
    },
    {
        japanese: "一期一会",
        romaji: "Ichi-go ichi-e",
        english: "Treasuring the unrepeatable nature of a moment",
    },
    {
        japanese: "月光",
        romaji: "Gekkō",
        english: "Moonlight",
    },
    {
        japanese: "花鳥風月",
        romaji: "Kachou Fuugetsu",
        english: "The beauties of nature",
    },
    {
        japanese: "雪月花",
        romaji: "Setsugekka",
        english: "Snow, moon, and flowers; the three beauties of nature",
    },
    {
        japanese: "風情",
        romaji: "Fuzei",
        english: "An elegant, refined, or tasteful appearance",
    },
    {
        japanese: "いただきます",
        romaji: "Itadakimasu",
        english: "A phrase said before eating to express gratitude",
    },
    {
        japanese: "ごちそうさま",
        romaji: "Gochisousama",
        english: "A phrase said after eating to express gratitude",
    },
    {
        japanese: "ぼけっと",
        romaji: "Boketto",
        english: "To gaze vacantly into the distance without thinking",
    },
    {
        japanese: "脱俗",
        romaji: "Datsuzoku",
        english: "A break from the everyday; an escape from the ordinary",
    },
    {
        japanese: "故郷",
        romaji: "Furusato",
        english: "Hometown; a place that feels like home",
    },
    {
        japanese: "我慢",
        romaji: "Gaman",
        english: "Endurance, patience, and self-control",
    },
    {
        japanese: "元気",
        romaji: "Genki",
        english: "Energy, vitality, and good health",
    },
    {
        japanese: "花見",
        romaji: "Hanami",
        english: "The traditional custom of enjoying the beauty of flowers",
    },
    {
        japanese: "改善",
        romaji: "Kaizen",
        english: "The philosophy of continuous improvement",
    },
    {
        japanese: "感謝",
        romaji: "Kansha",
        english: "Gratitude and appreciation",
    },
    {
        japanese: "可愛い",
        romaji: "Kawaii",
        english: "Cute, lovable, or adorable",
    },
    {
        japanese: "お疲れ様",
        romaji: "Otsukaresama",
        english: "An expression of appreciation for someone's hard work",
    },
    {
        japanese: "しょうがない",
        romaji: "Shouganai",
        english: "It cannot be helped; it is what it is",
    },
    {
        japanese: "侘び",
        romaji: "Wabi",
        english: "A rustic, simple, and understated beauty",
    },
    {
        japanese: "寂び",
        romaji: "Sabi",
        english: "The beauty that comes with age and wear",
    },
    {
        japanese: "甘え",
        romaji: "Amae",
        english: "The feeling of dependency on another's goodwill",
    },
    {
        japanese: "無",
        romaji: "Mu",
        english: "Nothingness, emptiness; a void",
    },
    {
        japanese: "自然",
        romaji: "Shizen",
        english: "Nature, the natural world",
    },
    {
        japanese: "朝日",
        romaji: "Asahi",
        english: "Morning sun, sunrise",
    },
    {
        japanese: "夕日",
        romaji: "Yuuhi",
        english: "Evening sun, sunset",
    },
    {
        japanese: "星空",
        romaji: "Hoshizora",
        english: "Starry sky",
    },
    {
        japanese: "月",
        romaji: "Tsuki",
        english: "Moon",
    },
    {
        japanese: "太陽",
        romaji: "Taiyou",
        english: "Sun",
    },
    {
        japanese: "海",
        romaji: "Umi",
        english: "Sea, ocean",
    },
    {
        japanese: "川",
        romaji: "Kawa",
        english: "River",
    },
    {
        japanese: "山",
        romaji: "Yama",
        english: "Mountain",
    },
    {
        japanese: "森",
        romaji: "Mori",
        english: "Forest",
    },
    {
        japanese: "林",
        romaji: "Hayashi",
        english: "Woods, grove",
    },
    {
        japanese: "空",
        romaji: "Sora",
        english: "Sky",
    },
    {
        japanese: "雲",
        romaji: "Kumo",
        english: "Cloud",
    },
    {
        japanese: "雨",
        romaji: "Ame",
        english: "Rain",
    },
    {
        japanese: "雪",
        romaji: "Yuki",
        english: "Snow",
    },
    {
        japanese: "風",
        romaji: "Kaze",
        english: "Wind",
    },
    {
        japanese: "雷",
        romaji: "Kaminari",
        english: "Thunder",
    },
    {
        japanese: "稲妻",
        romaji: "Inazuma",
        english: "Lightning",
    },
    {
        japanese: "季節",
        romaji: "Kisetsu",
        english: "Season",
    },
    {
        japanese: "春",
        romaji: "Haru",
        english: "Spring",
    },
    {
        japanese: "夏",
        romaji: "Natsu",
        english: "Summer",
    },
    {
        japanese: "秋",
        romaji: "Aki",
        english: "Autumn, fall",
    },
    {
        japanese: "冬",
        romaji: "Fuyu",
        english: "Winter",
    },
    {
        japanese: "人生",
        romaji: "Jinsei",
        english: "Life",
    },
    {
        japanese: "時間",
        romaji: "Jikan",
        english: "Time",
    },
    {
        japanese: "未来",
        romaji: "Mirai",
        english: "Future",
    },
    {
        japanese: "過去",
        romaji: "Kako",
        english: "Past",
    },
    {
        japanese: "現在",
        romaji: "Genzai",
        english: "Present",
    },
    {
        japanese: "永遠",
        romaji: "Eien",
        english: "Eternity, forever",
    },
    {
        japanese: "瞬間",
        romaji: "Shunkan",
        english: "Moment, instant",
    },
    {
        japanese: "運命",
        romaji: "Unmei",
        english: "Destiny, fate",
    }
];

const japaneseWordElement = document.getElementById('japanese-word');
const romajiElement = document.getElementById('romaji');
const englishTranslationElement = document.getElementById('english-translation');
const titleElement = document.querySelector('.title');

function getWordOfTheDay() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return words[dayOfYear % words.length];
}

const word = getWordOfTheDay();
japaneseWordElement.textContent = word.japanese;
romajiElement.textContent = word.romaji;
englishTranslationElement.textContent = word.english;

// Easter Egg: Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            titleElement.classList.add('konami-animation');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
