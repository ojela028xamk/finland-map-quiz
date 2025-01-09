const translateProvinceName = (name: string) => {
  switch (name) {
    case "Lapland":
      return "Lappi";

    case "Northern Ostrobothnia":
      return "Pohjois-Pohjanmaa";

    case "Central Ostrobothnia":
      return "Keski-Pohjanmaa";

    case "Southern Ostrobothnia":
      return "Etelä-Pohjanmaa";

    case "Ostrobothnia":
      return "Pohjanmaa";

    case "Kainuu":
      return "Kainuu";

    case "North Karelia":
      return "Pohjois-Karjala";

    case "South Karelia":
      return "Etelä-Karjala";

    case "Northern Savonia":
      return "Pohjois-Savo";

    case "Southern Savonia":
      return "Etelä-Savo";

    case "Central Finland":
      return "Keski-Suomi";

    case "Satakunta":
      return "Satakunta";

    case "Pirkanmaa":
      return "Pirkanmaa";

    case "Päijänne Tavastia":
      return "Päijät-Häme";

    case "Tavastia Proper":
      return "Kanta-Häme";

    case "Southwest Finland":
      return "Varsinais-Suomi";

    case "Uusimaa":
      return "Uusimaa";

    case "Kymenlaakso":
      return "Kymenlaakso";

    case "Åland Islands":
      return "Ahvenanmaa";

    default:
      return "Maakunta";
  }
};

export { translateProvinceName };
