import { Province } from "../globalTypes";

const translateProvinceName = (name: string) => {
  switch (name) {
    case Province.LAPLAND:
      return "Lappi";

    case Province.NORTHERN_OSTROBOTHNIA:
      return "Pohjois-Pohjanmaa";

    case Province.CENTRAL_OSTROBOTHNIA:
      return "Keski-Pohjanmaa";

    case Province.SOUTHERN_OSTROBOTHNIA:
      return "Etelä-Pohjanmaa";

    case Province.OSTROBOTHNIA:
      return "Pohjanmaa";

    case Province.KAINUU:
      return "Kainuu";

    case Province.NORTH_KARELIA:
      return "Pohjois-Karjala";

    case Province.SOUTH_KARELIA:
      return "Etelä-Karjala";

    case Province.NORTHERN_SAVONIA:
      return "Pohjois-Savo";

    case Province.SOUTHERN_SAVONIA:
      return "Etelä-Savo";

    case Province.CENTRAL_FINLAND:
      return "Keski-Suomi";

    case Province.SATAKUNTA:
      return "Satakunta";

    case Province.PIRKANMAA:
      return "Pirkanmaa";

    case Province.PÄIJÄNNE_TAVASTIA:
      return "Päijät-Häme";

    case Province.TAVASTIA_PROPER:
      return "Kanta-Häme";

    case Province.SOUTHWEST_FINLAND:
      return "Varsinais-Suomi";

    case Province.UUSIMAA:
      return "Uusimaa";

    case Province.KYMENLAAKSO:
      return "Kymenlaakso";

    case Province.ÅLAND_ISLANDS:
      return "Ahvenanmaa";

    default:
      return "Maakunta";
  }
};

export { translateProvinceName };
