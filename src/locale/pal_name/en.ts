const data = [
  "001 - Lamball",
  "002 - Cattiva",
  "003 - Chikipi",
  "004 - Lifmunk",
  "005 - Foxparks",
  "006 - Fuack",
  "007 - Sparkit",
  "008 - Tanzee",
  "009 - Rooby",
  "010 - Pengullet",
  "011 - Penking",
  "012 - Jolthog",
  "012B - Jolthog Cryst",
  "013 - Gumoss",
  "014 - Vixy",
  "015 - Hoocrates",
  "016 - Teafant",
  "017 - Depresso",
  "018 - Cremis",
  "019 - Daedream",
  "020 - Rushoar",
  "021 - Nox",
  "022 - Fuddler",
  "023 - Killamari",
  "024 - Mau",
  "024B - Mau Cryst",
  "025 - Celaray",
  "026 - Direhowl",
  "027 - Tocotoco",
  "028 - Flopie",
  "029 - Mozzarina",
  "030 - Bristla",
  "031 - Gobfin",
  "031B - Gobfin Ignis",
  "032 - Hangyu",
  "032B - Hangyu Cryst",
  "033 - Mossanda",
  "033B - Mossanda Lux",
  "034 - Woolipop",
  "035 - Caprity",
  "036 - Melpaca",
  "037 - Eikthyrdeer",
  "037B - Eikthyrdeer Terra",
  "038 - Nitewing",
  "039 - Ribunny",
  "040 - Incineram",
  "040B - Incineram Noct",
  "041 - Cinnamoth",
  "042 - Arsox",
  "043 - Dumud",
  "044 - Cawgnito",
  "045 - Leezpunk",
  "045B - Leezpunk Ignis",
  "046 - Loupmoon",
  "047 - Galeclaw",
  "048 - Robinquill",
  "048B - Robinquill Terra",
  "049 - Gorirat",
  "050 - Beegarde",
  "051 - Elizabee",
  "052 - Grintale",
  "053 - Swee",
  "054 - Sweepa",
  "055 - Chillet",
  "056 - Univolt",
  "057 - Foxcicle",
  "058 - Pyrin",
  "058B - Pyrin Noct",
  "059 - Reindrix",
  "060 - Rayhound",
  "061 - Kitsun",
  "062 - Dazzi",
  "063 - Lunaris",
  "064 - Dinossom",
  "064B - Dinossom Lux",
  "065 - Surfent",
  "065B - Surfent Terra",
  "066 - Maraith",
  "067 - Digtoise",
  "068 - Tombat",
  "069 - Lovander",
  "070 - Flambelle",
  "071 - Vanwyrm",
  "071B - Vanwyrm Cryst",
  "072 - Bushi",
  "073 - Beakon",
  "074 - Ragnahawk",
  "075 - Katress",
  "076 - Wixen",
  "077 - Verdash",
  "078 - Vaelet",
  "079 - Sibelyx",
  "080 - Elphidran",
  "080B - Elphidran Aqua",
  "081 - Kelpsea",
  "081B - Kelpsea Ignis",
  "082 - Azurobe",
  "083 - Cryolinx",
  "084 - Blazehowl",
  "084B - Blazehowl Noct",
  "085 - Relaxaurus",
  "085B - Relaxaurus Lux",
  "086 - Broncherry",
  "086B - Broncherry Aqua",
  "087 - Petallia",
  "088 - Reptyro",
  "088B - Reptyro Cryst",
  "089 - Kingpaca",
  "089B - Ice Kingpaca",
  "090 - Mammorest",
  "090B - Mammorest Cryst",
  "091 - Wumpo",
  "091B - Wumpo Botan",
  "092 - Warsect",
  "093 - Fenglope",
  "094 - Felbat",
  "095 - Quivern",
  "096 - Blazamut",
  "097 - Helzephyr",
  "098 - Astegon",
  "099 - Menasting",
  "100 - Anubis",
  "101 - Jormuntide",
  "101B - Jormuntide Ignis",
  "102 - Suzaku",
  "102B - Suzaku Aqua",
  "103 - Grizzbolt",
  "104 - Lyleen",
  "104B - Lyleen Noct",
  "105 - Faleris",
  "106 - Orserk",
  "107 - Shadowbeak",
  "108 - Paladius",
  "109 - Necromus",
  "110 - Frostallion",
  "110B - Frostallion Noct",
  "111 - Jetragon",
].reduce((acc, cur) => {
  const [num, name] = cur.split(/[\s\-]+/);
  acc[num.replace(/^0+/, "")] = name;
  return acc;
}, {} as Record<string, string>);

export default data;
