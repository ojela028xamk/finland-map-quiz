"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_finlandLow from "@amcharts/amcharts5-geodata/finlandLow";
import css from "./cityQuiz.module.scss";
import { cities } from "./cityQuizData";
import { City, GameType } from "../globalTypes";
import { getCityCoatOfArms, shuffleCityArray } from "../services/helperService";
import BackgroundImage from "../common/backgroundImage";
import QuizDisplay from "../common/quizDisplay";

type DataContextCity = {
  geometry: Geometry;
  geometryType: string;
  id: undefined;
  madeFromGeoData: boolean;
  name: City;
};

type Geometry = {
  coordinates: number[];
  type: string;
};

export type CityGameItem = {
  name: City;
  isAnswered: boolean;
  isCorrect: boolean | null;
};

const cityList: CityGameItem[] = Object.values(City).map((city) => {
  const cityItem: CityGameItem = {
    name: city,
    isAnswered: false,
    isCorrect: null,
  };

  return cityItem;
});

const CityQuiz = () => {
  const [cityGameList, setCityGameList] = useState<CityGameItem[]>(cityList);
  const [currentCity, setCurrentCity] = useState<City>(cityList[0].name);
  const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);
  const [correctAnswerAmount, setCorrectAnswerAmount] = useState<number>(0);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const totalAnswerAmount = cityList.length;
  const currentCityImageUrl = getCityCoatOfArms(currentCity);

  const handleMapAnswer = (answer: City) => {
    const newGameList = [...cityGameList];
    const clickedAnswer = newGameList.find((city) => city.name === answer);

    if (clickedAnswer?.isAnswered) return;

    if (currentCityIndex === 19) {
      newGameList[currentCityIndex] = {
        name: currentCity,
        isAnswered: true,
        isCorrect: true,
      };
      setCityGameList(newGameList);
      setCorrectAnswerAmount(correctAnswerAmount + 1);
      setIsGameFinished(true);
      return;
    }

    const newIndex = currentCityIndex + 1;
    const correctAnswerIndex = cityGameList.findIndex(
      (city) => city.name === currentCity
    );

    if (currentCity === answer) {
      newGameList[correctAnswerIndex] = {
        name: currentCity,
        isAnswered: true,
        isCorrect: true,
      };
      setCorrectAnswerAmount(correctAnswerAmount + 1);
    } else {
      newGameList[correctAnswerIndex] = {
        name: currentCity,
        isAnswered: true,
        isCorrect: false,
      };
    }
    setCityGameList(newGameList);
    setCurrentCity(cityGameList[newIndex].name);
    setCurrentCityIndex(newIndex);
  };

  const handleResetGame = () => {
    const initialList = shuffleCityArray(cityList);
    const initialCity = initialList[0].name;

    setCityGameList(initialList);
    setCurrentCity(initialCity);
    setCurrentCityIndex(0);
    setCorrectAnswerAmount(0);
    setIsGameFinished(false);
  };

  useEffect(() => {
    const initialList = shuffleCityArray(cityList);
    const initialCity = initialList[0].name;

    setCityGameList(initialList);
    setCurrentCity(initialCity);
  }, []);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        projection: am5map.geoMercator(),
        maxZoomLevel: 6,
      })
    );

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_finlandLow,
      })
    );

    polygonSeries.mapPolygons.template.adapters.add("fill", function () {
      return am5.color("#002f6c");
    });

    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        geoJSON: cities,
      })
    );

    pointSeries.bullets.push(function (root) {
      const circle = am5.Circle.new(root, {
        radius: 10,
        fill: am5.color("#ffffff"),
        stroke: am5.color("#000000"),
        strokeWidth: 1,
      });

      circle.states.create("hover", {
        scale: 1.5,
      });

      circle.events.on("pointerover", function () {
        document.body.style.cursor = "pointer";
      });

      circle.events.on("pointerout", function () {
        document.body.style.cursor = "default";
      });

      circle.events.on("click", function (event) {
        const dataItem = event.target.dataItem;

        if (dataItem) {
          const dataContext = dataItem.dataContext as DataContextCity;
          const clickedCity = dataContext.name;
          handleMapAnswer(clickedCity);
        } else {
          // TODO: Error handler if data does not exist
          console.log("error");
        }
      });

      circle.adapters.add("fill", function (value, target) {
        // TODO: Remove on hover functionality from adapter add()
        const currentCity = target.dataItem?.dataContext as DataContextCity;
        const findCity = cityGameList.find(
          (city) => city.name === currentCity.name
        );

        if (findCity?.isCorrect) {
          return am5.color("#379634");
        } else if (findCity?.isCorrect === false) {
          return am5.color("#CE1235");
        } else {
          return am5.color("#ffffff");
        }
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    return () => {
      root.dispose();
    };
  }, [currentCity, isGameFinished]);

  return (
    <div className={css.city_quiz}>
      <BackgroundImage source="/background_city.png" />
      <QuizDisplay
        gameType={GameType.CITY}
        isGameFinished={isGameFinished}
        correctAnswerAmount={correctAnswerAmount}
        totalAnswerAmount={totalAnswerAmount}
        handleResetGame={handleResetGame}
        currentItem={currentCity}
        currentItemImageUrl={currentCityImageUrl}
      />
      <div className={css.city_quiz_map} id="chartdiv"></div>
    </div>
  );
};

export default CityQuiz;
