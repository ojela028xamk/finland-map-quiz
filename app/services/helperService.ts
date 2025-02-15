import { CityGameItem } from "../cityQuiz/page";
import { City, Province } from "../globalTypes";
import { ProvinceGameItem } from "../provinceQuiz/page";

const translateProvinceName = (province: Province) => {
  switch (province) {
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

const getProvinceCoatOfArms = (province: Province) => {
  switch (province) {
    case Province.LAPLAND:
      return "/maakunnat/lappi.png";

    case Province.NORTHERN_OSTROBOTHNIA:
      return "/maakunnat/pohjois_pohjanmaa.png";

    case Province.CENTRAL_OSTROBOTHNIA:
      return "/maakunnat/keski_pohjanmaa.png";

    case Province.SOUTHERN_OSTROBOTHNIA:
      return "/maakunnat/etelä_pohjanmaa.png";

    case Province.OSTROBOTHNIA:
      return "/maakunnat/pohjanmaa.png";

    case Province.KAINUU:
      return "/maakunnat/kainuu.png";

    case Province.NORTH_KARELIA:
      return "/maakunnat/pohjois_karjala.png";

    case Province.SOUTH_KARELIA:
      return "/maakunnat/etelä_karjala.png";

    case Province.NORTHERN_SAVONIA:
      return "/maakunnat/pohjois_savo.png";

    case Province.SOUTHERN_SAVONIA:
      return "/maakunnat/etelä_savo.png";

    case Province.CENTRAL_FINLAND:
      return "/maakunnat/keski_suomi.png";

    case Province.SATAKUNTA:
      return "/maakunnat/satakunta.png";

    case Province.PIRKANMAA:
      return "/maakunnat/pirkanmaa.png";

    case Province.PÄIJÄNNE_TAVASTIA:
      return "/maakunnat/päijät_häme.png";

    case Province.TAVASTIA_PROPER:
      return "/maakunnat/kanta_häme.png";

    case Province.SOUTHWEST_FINLAND:
      return "/maakunnat/varsinais_suomi.png";

    case Province.UUSIMAA:
      return "/maakunnat/uusimaa.png";

    case Province.KYMENLAAKSO:
      return "/maakunnat/kymenlaakso.png";

    case Province.ÅLAND_ISLANDS:
      return "/maakunnat/ahvenanmaa.png";

    default:
      return "/";
  }
};

const getCityCoatOfArms = (city: City) => {
  const cityName = city.toLocaleLowerCase();
  return `/kaupungit/${cityName}.png`;
};

const shuffleProvinceArray = (array: ProvinceGameItem[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffleCityArray = (array: CityGameItem[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export {
  translateProvinceName,
  getProvinceCoatOfArms,
  getCityCoatOfArms,
  shuffleProvinceArray,
  shuffleCityArray,
};
