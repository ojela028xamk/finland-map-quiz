"use client";
import { useEffect, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_finlandLow from "@amcharts/amcharts5-geodata/finlandLow";
import css from "./provinceQuiz.module.scss";

const ProvinceQuiz = () => {
  useEffect(() => {
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

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className={css.province_quiz}>
      <h1>Province Quiz</h1>
      <div className={css.province_quiz_map} id="chartdiv"></div>
    </div>
  );
};

export default ProvinceQuiz;
