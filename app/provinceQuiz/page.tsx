"use client";
import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_finlandLow from "@amcharts/amcharts5-geodata/finlandLow";
import css from "./provinceQuiz.module.scss";
import { translateProvinceName } from "../services/helperService";

const ProvinceQuiz = () => {
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

    polygonSeries.mapPolygons.template.events.on(
      "click",
      function (event) {
        // TODO: Type datacontext
        const dataItem = event.target.dataItem?.dataContext as any;
        if (dataItem.name) {
          console.log(translateProvinceName(dataItem.name as string));
        }
      },
      this
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
