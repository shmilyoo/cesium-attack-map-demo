import Cesium from "cesium/Cesium";
import ship1 from "./ship1.glb";

export const coordinate = {
  home: [118.26, 25.91],
  center2: [88.95, 34.27],
  center1: [116.46, 42.92],
  ship1: [150, 30],
  ship2: [130, 10],
  ship3: [90, 10],
  ship4: [200, -10]
};

export let ships = [
  {
    name: "ship1",
    model_url: ship1,
    coordinate: coordinate.ship1,
    heading: 10,
    color: Cesium.Color.GAINSBORO
  },
  {
    name: "ship2",
    model_url: ship1,
    coordinate: coordinate.ship2,
    heading: 20,
    color: Cesium.Color.DEEPPINK
  },
  {
    name: "ship3",
    model_url: ship1,
    coordinate: coordinate.ship3,
    heading: 10,
    color: Cesium.Color.GOLD
  },
  {
    name: "ship4",
    model_url: ship1,
    coordinate: coordinate.ship4,
    heading: 10,
    color: Cesium.Color.GAINSBORO
  }
];
