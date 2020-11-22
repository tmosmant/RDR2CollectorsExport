var value = {
  "megafauna-fossils": ["Upper Tooth Fossil"],
  "american-wild-flowers": [
    "Cardinal Flower",
    "Wild Rhubarb",
    "Texas Bluebonnet",
  ],
  "suit-of-cups-tarot-cards": [
    "King of Cups Tarot Card",
    "Queen of Cups Tarot Card",
    "Knight of Cups Tarot Card",
    "Page of Cups Tarot Card",
    "Ten of Cups Tarot Card",
    "Nine of Cups Tarot Card",
    "Eight of Cups Tarot Card",
    "Seven of Cups Tarot Card",
    "Six of Cups Tarot Card",
    "Four of Cups Tarot Card",
    "Three of Cups Tarot Card",
    "Two of Cups Tarot Card",
  ],
  "suit-of-swords-tarot-cards": [
    "King of Swords Tarot Card",
    "Queen of Swords Tarot Card",
    "Knight of Swords Tarot Card",
    "Page of Swords Tarot Card",
    "Ten of Swords Tarot Card",
    "Eight of Swords Tarot Card",
    "Seven of Swords Tarot Card",
    "Six of Swords Tarot Card",
    "Five of Swords Tarot Card",
    "Four of Swords Tarot Card",
    "Three of Swords Tarot Card",
    "Two of Swords Tarot Card",
    "Ace of Swords Tarot Card",
  ],
  "suit-of-wands-tarot-cards": [
    "King of Wands Tarot Card",
    "Queen of Wands Tarot Card",
    "Page of Wands Tarot Card",
    "Ten of Wands Tarot Card",
    "Nine of Wands Tarot Card",
    "Eight of Wands Tarot Card",
    "Seven of Wands Tarot Card",
    "Six of Wands Tarot Card",
    "Five of Wands Tarot Card",
    "Four of Wands Tarot Card",
    "Three of Wands Tarot Card",
    "Two of Wands Tarot Card",
    "Ace of Wands Tarot Card",
  ],
  "suit-of-pentacles-tarot-cards": [
    "Ten of Pentacles Tarot Card",
    "Nine of Pentacles Tarot Card",
    "Eight of Pentacles Tarot Card",
    "Four of Pentacles Tarot Card",
    "Three of Pentacles Tarot Card",
    "Two of Pentacles Tarot Card",
  ],
  "lost-jewelry-earrings": [
    "Beauchêne Ruby Earrings",
    "Emmeline Coral Earrings",
    "Ursula Citrine Earrings",
  ],
  "antique-alcohol-bottles": [
    "Cognac",
    "Old Tom Gin",
    "Scotch Whisky",
    "Caribbean Rum",
    "Gran Corazon Madeira",
    "London Dry Gin",
    "Irish Whiskey",
    "Tennessee Whiskey",
  ],
  "bird-eggs": [
    "Spoonbill Egg",
    "Goose Egg",
    "Heron Egg",
    "Duck Egg",
    "Egret Egg",
    "Eagle Egg",
    "Hawk Egg",
    "Loon Egg",
  ],
  arrowheads: [
    "Feldspar Arrowhead",
    "Raw Arrowhead",
    "Slate Arrowhead",
    "Flint Arrowhead",
  ],
  "family-heirlooms": [
    "Horse Hair Brush",
    "Tortoiseshell Comb",
    "Ebony Hairpin",
    "Boar Bristle Brush",
    "Ivory Hairpin",
    "Goat Hair Brush",
    "New Guinea Rosewood Hairbrush",
    "Jade Hairpin",
    "Ebony Hairbrush",
    "Carved Wooden Hairpin",
    "Cherrywood Comb",
    "Rosewood Hairbrush",
    "Boxwood Comb",
    "Metal Hairpin",
  ],
  coins: [
    "1787 One Cent Token",
    "1795 Half Eagle",
    "1794 Silver Dollar",
    "1792 Nickel",
    "1800 Gold Quarter",
    "1792 Quarter",
    "1800 Five Dollar Bechtler",
    "1800 Half Dime",
    "1798 Draped Bust Silver Dollar",
  ],
};

const allowedValues = {
  "suit-of-cups-tarot-cards": {
    remove: " of Cups Tarot Card",
    prefix: "cups_",
  },
  "suit-of-pentacles-tarot-cards": {
    remove: " of Pentacles Tarot Card",
    prefix: "pentacles_",
  },
  "suit-of-wands-tarot-cards": {
    remove: " of Wands Tarot Card",
    prefix: "wands_",
  },
  "suit-of-swords-tarot-cards": {
    remove: " of Swords Tarot Card",
    prefix: "swords_",
  },
};

const collected = {};

Object.keys(allowedValues).forEach((key) => {
  if (value[key]) {
    value[key].forEach((item) => {
      const name =
        allowedValues[key].prefix +
        item.replace(allowedValues[key].remove, "").toLocaleLowerCase();
      collected[`collected.${name}`] = "true";
    });
  }
});

console.log(collected);
