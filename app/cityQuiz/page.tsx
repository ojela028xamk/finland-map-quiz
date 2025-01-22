"use client";
import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_finlandLow from "@amcharts/amcharts5-geodata/finlandLow";
import css from "./cityQuiz.module.scss";
import { cities } from "./cityQuizData";

type DataContextCity = {
  geometry: Geometry;
  geometryType: string;
  id: undefined;
  madeFromGeoData: boolean;
  name: string;
};

type Geometry = {
  coordinates: number[];
  type: string;
};

const CityQuiz = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        projection: am5map.geoMercator(),
        maxZoomLevel: 5,
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
          console.log(clickedCity);
        }
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className={css.city_quiz}>
      <div className={css.city_quiz_map} id="chartdiv"></div>
    </div>
  );
};

export default CityQuiz;
