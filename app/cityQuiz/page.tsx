"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_finlandLow from "@amcharts/amcharts5-geodata/finlandLow";
import css from "./cityQuiz.module.scss";
import { cities } from "./cityQuizData";
import Link from "next/link";
import { City } from "../globalTypes";
import { shuffleCityArray } from "../services/helperService";

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

  console.log(correctAnswerAmount);

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
        maxZoomLevel: 1,
      })
    );

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_finlandLow,
      })
    );

    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        geoJSON: cities,
      })
    );

    pointSeries.bullets.push(function (root) {
      const circle = am5.Circle.new(root, {
        radius: 10,
        fill: am5.color(0x6771dc),
        stroke: am5.color("#000000"),
        strokeWidth: 1,
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
      <div className={css.city_quiz_display}>
        {isGameFinished ? (
          <>
            <span>
              Game finished! You scored: {correctAnswerAmount} /{" "}
              {totalAnswerAmount}
            </span>
            <br />
            <button onClick={handleResetGame}>Play again</button>
            <br />
            <Link href={"/"}>
              <button>Choose another game</button>
            </Link>
          </>
        ) : (
          <span>Choose: {currentCity}</span>
        )}
        <br />
      </div>
      <div className={css.city_quiz_map} id="chartdiv"></div>
    </div>
  );
};

export default CityQuiz;
