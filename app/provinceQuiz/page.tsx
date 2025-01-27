"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_finlandLow from "@amcharts/amcharts5-geodata/finlandLow";
import css from "./provinceQuiz.module.scss";
import {
  shuffleProvinceArray,
  translateProvinceName,
} from "../services/helperService";
import { Province } from "../globalTypes";
import Link from "next/link";

type DataContextProvince = {
  CNTRY: string;
  TYPE: string;
  geometry: Geometry;
  geometryType: string;
  id: string;
  madeFromGeoData: boolean;
  name: Province;
};

type Geometry = {
  coordinates: Array<Array<[number[] | number]>>;
  type: string;
};

export type ProvinceGameItem = {
  name: Province;
  isAnswered: boolean;
  isCorrect: boolean | null;
};

const provinceList: ProvinceGameItem[] = Object.values(Province).map(
  (province) => {
    const provinceItem: ProvinceGameItem = {
      name: province,
      isAnswered: false,
      isCorrect: null,
    };

    return provinceItem;
  }
);

const ProvinceQuiz = () => {
  const [provinceGameList, setProvinceGameList] =
    useState<ProvinceGameItem[]>(provinceList);
  const [currentProvince, setCurrentProvince] = useState<Province>(
    provinceList[0].name
  );
  const [currentProvinceIndex, setCurrentProvinceIndex] = useState<number>(0);
  const [correctAnswerAmount, setCorrectAnswerAmount] = useState<number>(0);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const totalAnswerAmount = provinceGameList.length;

  const handleMapAnswer = (answer: Province) => {
    const newGameList = [...provinceGameList];
    const clickedAnswer = newGameList.find(
      (province) => province.name === answer
    );

    if (clickedAnswer?.isAnswered) return;

    if (currentProvinceIndex === 18) {
      newGameList[currentProvinceIndex] = {
        name: currentProvince,
        isAnswered: true,
        isCorrect: true,
      };
      setProvinceGameList(newGameList);
      setCorrectAnswerAmount(correctAnswerAmount + 1);
      setIsGameFinished(true);
      return;
    }

    const newIndex = currentProvinceIndex + 1;
    const correctAnswerIndex = provinceGameList.findIndex(
      (province) => province.name === currentProvince
    );

    if (currentProvince === answer) {
      newGameList[correctAnswerIndex] = {
        name: currentProvince,
        isAnswered: true,
        isCorrect: true,
      };
      setCorrectAnswerAmount(correctAnswerAmount + 1);
    } else {
      newGameList[correctAnswerIndex] = {
        name: currentProvince,
        isAnswered: true,
        isCorrect: false,
      };
    }
    setProvinceGameList(newGameList);
    setCurrentProvince(provinceGameList[newIndex].name);
    setCurrentProvinceIndex(newIndex);
  };

  const handleResetGame = () => {
    const initialList = shuffleProvinceArray(provinceList);
    const initialProvince = initialList[0].name;

    setProvinceGameList(initialList);
    setCurrentProvince(initialProvince);
    setCurrentProvinceIndex(0);
    setCorrectAnswerAmount(0);
    setIsGameFinished(false);
  };

  useEffect(() => {
    const initialList = shuffleProvinceArray(provinceList);
    const initialProvince = initialList[0].name;

    setProvinceGameList(initialList);
    setCurrentProvince(initialProvince);
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

    polygonSeries.mapPolygons.template.adapters.add(
      "fill",
      function (value, target) {
        // TODO: Remove on hover functionality from adapter add()
        const currentProvince = target.dataItem
          ?.dataContext as DataContextProvince;
        const findProvince = provinceGameList.find(
          (province) => province.name === currentProvince.name
        );

        if (findProvince?.isCorrect) {
          return am5.color(0x68dc76);
        } else if (findProvince?.isCorrect === false) {
          return am5.color(0xb30000);
        } else {
          return am5.color(0x6794dc);
        }
      }
    );

    polygonSeries.mapPolygons.template.events.on(
      "pointerover",
      function (event) {
        document.body.style.cursor = "pointer";
      }
    );

    polygonSeries.mapPolygons.template.events.on(
      "pointerout",
      function (event) {
        document.body.style.cursor = "default";
      }
    );

    polygonSeries.mapPolygons.template.events.on("click", function (event) {
      const dataItem = event.target.dataItem;

      if (dataItem) {
        const dataContext = dataItem.dataContext as DataContextProvince;
        const clickedProvince = dataContext.name;
        handleMapAnswer(clickedProvince);
      } else {
        // TODO: Error handler if data does not exist
        console.log("error");
      }
    });

    return () => {
      root.dispose();
    };
  }, [currentProvince, isGameFinished]);

  return (
    <div className={css.province_quiz}>
      <div className={css.province_quiz_display}>
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
          <span>Choose: {translateProvinceName(currentProvince)}</span>
        )}
        <br />
      </div>
      <div className={css.province_quiz_map} id="chartdiv"></div>
    </div>
  );
};

export default ProvinceQuiz;
