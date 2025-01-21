"use client";
import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_finlandLow from "@amcharts/amcharts5-geodata/finlandLow";
import css from "./cityQuiz.module.scss";

const testCities: any = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Helsinki",
      },
      geometry: {
        type: "Point",
        coordinates: [24.909193, 60.169113],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Turku",
      },
      geometry: {
        type: "Point",
        coordinates: [22.241484, 60.451002],
      },
    },
  ],
};

const CityQuiz = () => {
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
        geoJSON: testCities,
      })
    );

    pointSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 10,
          fill: am5.color(0xff0000),
        }),
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
