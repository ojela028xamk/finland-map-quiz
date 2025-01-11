"use client";
import { useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_finlandLow from "@amcharts/amcharts5-geodata/finlandLow";
import css from "./provinceQuiz.module.scss";
import { translateProvinceName } from "../services/helperService";
import { Province } from "../globalTypes";

type DataContextProvince = {
  CNTRY: string;
  TYPE: string;
  geometry: Geometry;
  geometryType: string;
  id: string;
  madeFromGeoData: boolean;
  name: string;
};

type Geometry = {
  coordinates: Array<Array<[number[] | number]>>;
  type: string;
};

type ProvinceGameItem = {
  name: Province;
  isAnswered: boolean;
  isCorrect: boolean | null;
};

const initialList: ProvinceGameItem[] = Object.values(Province).map(
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
    useState<ProvinceGameItem[]>(initialList);
  const testProvince = "Lapland";

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

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color("#0000FF"),
    });

    polygonSeries.mapPolygons.template.events.on("click", function (event) {
      const dataItem = event.target.dataItem;

      if (dataItem) {
        const dataContext = dataItem.dataContext as DataContextProvince;
        const provinceName = dataContext.name;
        const textCorrect =
          provinceName === testProvince ? "Correct!" : "Wrong!";
        console.log(textCorrect);
      } else {
        // TODO: Error handler if data does not exist
        console.log("error");
      }
    });

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className={css.province_quiz}>
      <h1>Province Quiz</h1>
      <div className={css.province_quiz_display}>Choose: {testProvince}</div>
      <div className={css.province_quiz_map} id="chartdiv"></div>
    </div>
  );
};

export default ProvinceQuiz;
