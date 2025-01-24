export enum GameType {
  CITY = "City",
  PROVINCE = "Province",
}

export type Game = {
  type: GameType;
  header: string;
  description: string;
  link: string;
};

export enum Province {
  LAPLAND = "Lapland",
  NORTHERN_OSTROBOTHNIA = "Northern Ostrobothnia",
  CENTRAL_OSTROBOTHNIA = "Central Ostrobothnia",
  SOUTHERN_OSTROBOTHNIA = "Southern Ostrobothnia",
  OSTROBOTHNIA = "Ostrobothnia",
  KAINUU = "Kainuu",
  NORTH_KARELIA = "North Karelia",
  SOUTH_KARELIA = "South Karelia",
  NORTHERN_SAVONIA = "Northern Savonia",
  SOUTHERN_SAVONIA = "Southern Savonia",
  CENTRAL_FINLAND = "Central Finland",
  SATAKUNTA = "Satakunta",
  PIRKANMAA = "Pirkanmaa",
  PÄIJÄNNE_TAVASTIA = "Päijänne Tavastia",
  TAVASTIA_PROPER = "Tavastia Proper",
  SOUTHWEST_FINLAND = "Southwest Finland",
  UUSIMAA = "Uusimaa",
  KYMENLAAKSO = "Kymenlaakso",
  ÅLAND_ISLANDS = "Åland Islands",
}

export enum City {
  HELSINKI = "Helsinki",
  ESPOO = "Espoo",
  TAMPERE = "Tampere",
  VANTAA = "Vantaa",
  OULU = "Oulu",
  TURKU = "Turku",
  JYVÄSKYLÄ = "Jyväskylä",
  KUOPIO = "Kuopio",
  LAHTI = "Lahti",
  PORI = "Pori",
  JOENSUU = "Joensuu",
  KOUVOLA = "Kouvola",
  LAPPEENRANTA = "Lappeenranta",
  VAASA = "Vaasa",
  HÄMEENLINNA = "Hämeenlinna",
  SEINÄJOKI = "Seinäjoki",
  ROVANIEMI = "Rovaniemi",
  MIKKELI = "Mikkeli",
  PORVOO = "Porvoo",
  SALO = "Salo",
}
