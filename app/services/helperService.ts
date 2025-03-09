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
  const finnishProvince = translateProvinceName(province);
  const provinceName = finnishProvince.replace("-", "_").toLocaleLowerCase();
  return `/maakunnat/${provinceName}.png`;
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
