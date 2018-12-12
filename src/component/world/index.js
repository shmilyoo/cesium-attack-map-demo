import React from 'react';
import Cesium from 'cesium/Cesium';
import 'cesium/Widgets/widgets.css';
import { coordinate, ships } from './world-config';
import satellite from './satellite.czml';
import rardar1 from './radar1.glb';
import rardar2 from './radar2.glb';

class World extends React.Component {
  constructor(props) {
    super(props);
    this.viewer = null;
    this.ship1 = null;
    this.ship2 = null;
    this.ship3 = null;
    this.home = null;
    this.center1 = null;
    this.center2 = null;
    this.duration = 2;
    this.garbage = [];
  }
  componentDidMount() {
    this.initView();
  }

  computePositions(startPoint, finalPoint, startTime, duration) {
    var property = new Cesium.SampledPositionProperty();

    var startPosition = Cesium.Cartesian3.fromDegreesArray(startPoint);
    property.addSample(startTime, startPosition);

    var midTime = Cesium.JulianDate.addSeconds(
      startTime,
      duration / 2,
      new Cesium.JulianDate()
    );
    var mid = [
      (startPoint[0] + finalPoint[0]) / 2,
      (startPoint[1] + finalPoint[1]) / 2,
      0
    ];
    var midPosition = Cesium.Cartesian3.fromDegreesArrayHeights(mid);
    property.addSample(midTime, midPosition);

    var endTime = Cesium.JulianDate.addSeconds(
      startTime,
      duration,
      new Cesium.JulianDate()
    );
    var endPosition = Cesium.Cartesian3.fromDegreesArray(finalPoint);
    property.addSample(endTime, endPosition);
    return property;
  }

  createModel(
    name,
    url,
    coordinate,
    _heading,
    color = Cesium.Color.GAINSBORO,
    min = 70,
    max = 2000
  ) {
    let position = Cesium.Cartesian3.fromDegrees(...coordinate);
    let heading = Cesium.Math.toRadians(_heading);
    let pitch = 0;
    let roll = 0;
    let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    let orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
    );
    return this.viewer.entities.add({
      name: name,
      id: name,
      position: position,
      orientation: orientation,
      model: {
        uri: url,
        minimumPixelSize: min,
        maximumScale: max,
        color: color
      }
    });
  }

  setCamera() {
    const homeCameraView = {
      destination: Cesium.Cartesian3.fromDegrees(120.26, 31.91, 9999999),
      orientation: {
        heading: 0.0,
        pitch: -Cesium.Math.PI_OVER_TWO,
        roll: 0.0
      }
    };
    this.viewer.scene.camera.setView(homeCameraView);
    this.viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
      e => {
        e.cancel = true;
        this.viewer.scene.camera.flyTo(homeCameraView);
      }
    );
  }

  initView() {
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkODdlMDhjYS0wODYwLTQyNmMtYTQ4Zi1iM2EzYWRhYjg1OGEiLCJpZCI6MjM3NiwiaWF0IjoxNTMyOTYzMTEwfQ.UJFXspQAS-NKDgAn6tedW4GXA4hiJk8D2zX4QKVY3uQ';
    this.viewer = new Cesium.Viewer('cesium-container', {
      animation: false,
      baseLayerPicker: false,
      geocoder: false,
      shouldAnimate: true,
      timeline: false,
      navigationHelpButton: false,
      fullscreenButton: false
    });
    // 启用光照白天黑夜效果
    this.viewer.scene.globe.enableLighting = true;
    // 隐藏credit图标和文字
    this.viewer._cesiumWidget._creditContainer.style.display = 'none';
    // this.viewer.extend(Cesium.viewerCesiumInspectorMixin);
    this.addEntity();
    this.setCamera();
  }

  /**
   * 添加各类实体，模型等
   */
  addEntity() {
    this.createModel(
      'center1',
      rardar1,
      coordinate.center1,
      0,
      undefined,
      100,
      5000
    );
    this.createModel(
      'center2',
      rardar2,
      coordinate.center2,
      0,
      Cesium.Color.GAINSBORO,
      100,
      5000
    );
    this.createModel(
      'home',
      rardar1,
      coordinate.home,
      60,
      undefined,
      100,
      5000
    );
    ships.forEach(ship => {
      this[ship.name] = this.createModel(
        ship.name,
        ship.model_url,
        ship.coordinate,
        ship.heading,
        ship.color,
        100,
        4000
      );
    });
    this.addArc(coordinate.ship3, coordinate.center1);
    this.addArc(coordinate.ship1, coordinate.center1);
    this.addArc(coordinate.ship2, coordinate.center1);
    this.addArc(coordinate.ship3, coordinate.home);
    this.addArc(coordinate.ship1, coordinate.home);
    this.addArc(coordinate.ship2, coordinate.home);
    this.addArc(coordinate.ship2, coordinate.center2);
    this.addArc(coordinate.ship3, coordinate.center2);
    this.addArc(coordinate.center1, coordinate.home);
    this.addArc(coordinate.center2, coordinate.home);
    this.addArc(coordinate.ship1, coordinate.center1);
    this.addArc(coordinate.ship1, coordinate.center1);
    this.addArc(coordinate.ship4, coordinate.center1);
    this.addArc(coordinate.ship4, coordinate.center2);
    setInterval(() => {
      this.addMove(coordinate.ship1, coordinate.center1);
    }, 1300);
    setInterval(() => {
      this.addMove(coordinate.ship1, coordinate.home);
    }, 1200);
    setInterval(() => {
      this.addMove(coordinate.ship3, coordinate.home);
    }, 800);
    setInterval(() => {
      this.addMove(coordinate.ship3, coordinate.center2);
    }, 800);
    setInterval(() => {
      this.addMove(coordinate.ship2, coordinate.center1);
    }, 1300);
    setInterval(() => {
      this.addMove(coordinate.ship2, coordinate.center2);
    }, 900);
    setInterval(() => {
      this.addMove(coordinate.home, coordinate.center2);
    }, 1500);
    setInterval(() => {
      this.addMove(coordinate.home, coordinate.center1);
    }, 300);
    setInterval(() => {
      this.addMove(coordinate.ship4, coordinate.center1);
    }, 500);
    setInterval(() => {
      this.addMove(coordinate.ship4, coordinate.center2);
    }, 700);
    setInterval(() => {
      console.log(this.garbage.length);
      let tmp = this.garbage;
      this.garbage = [];
      tmp.forEach(id => {
        this.viewer.entities.removeById(id);
      });
    }, 1000);
    // czml的时间和本项目对不上
    // this.addSatellite();
  }
  addArc(start, stop) {
    let startLon, startLat;
    [startLon, startLat] = start;
    var duration = 2;
    var startTime = Cesium.JulianDate.now();
    var midTime = Cesium.JulianDate.addSeconds(
      startTime,
      duration / 2,
      new Cesium.JulianDate()
    );
    var stopTime = Cesium.JulianDate.addSeconds(
      startTime,
      duration,
      new Cesium.JulianDate()
    );
    let stopLon, stopLat;
    [stopLon, stopLat] = stop;
    var startPosition = Cesium.Cartesian3.fromDegrees(startLon, startLat, 0);
    var stopPosition = Cesium.Cartesian3.fromDegrees(stopLon, stopLat, 0);
    var midPosition = Cesium.Cartesian3.fromDegrees(
      (startLon + stopLon) / 2,
      (startLat + stopLat) / 2,
      1000000
    );
    // Redo the path to be the new arc.
    var property = new Cesium.SampledPositionProperty();
    property.addSample(startTime, startPosition);
    property.addSample(midTime, midPosition);
    property.addSample(stopTime, stopPosition);
    property.setInterpolationOptions({
      interpolationDegree: 2,
      interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
    });
    var positions = [];
    for (var i = 0; i <= 10; i++) {
      var position = property.getValue(
        Cesium.JulianDate.addSeconds(
          startTime,
          (duration * i) / 10,
          new Cesium.JulianDate()
        )
      );
      positions.push(position);
    }
    var arcEntity = this.viewer.entities.add({
      polyline: {
        positions: positions,
        width: 1,
        followSurface: false,
        material: Cesium.Color.GREEN.withAlpha(0.5)
      }
    });
  }
  addMove(start, stop) {
    let startLon, startLat;
    [startLon, startLat] = start;
    var duration = this.duration;
    // var startTime = this.viewer.clock.startTime;
    var startTime = Cesium.JulianDate.now();
    var midTime = Cesium.JulianDate.addSeconds(
      startTime,
      duration / 2,
      new Cesium.JulianDate()
    );
    var stopTime = Cesium.JulianDate.addSeconds(
      startTime,
      duration,
      new Cesium.JulianDate()
    );
    let stopLon, stopLat;
    [stopLon, stopLat] = stop;
    var startPosition = Cesium.Cartesian3.fromDegrees(startLon, startLat, 0);
    var stopPosition = Cesium.Cartesian3.fromDegrees(stopLon, stopLat, 0);
    var midPosition = Cesium.Cartesian3.fromDegrees(
      (startLon + stopLon) / 2,
      (startLat + stopLat) / 2,
      1000000
    );
    // Redo the path to be the new arc.
    var property = new Cesium.SampledPositionProperty();
    property.addSample(startTime, startPosition);
    property.addSample(midTime, midPosition);
    property.addSample(stopTime, stopPosition);
    property.setInterpolationOptions({
      interpolationDegree: 2,
      interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
    });
    var positions = [];
    for (var i = 0; i <= 10; i++) {
      var position = property.getValue(
        Cesium.JulianDate.addSeconds(
          startTime,
          (duration * i) / 10,
          new Cesium.JulianDate()
        )
      );
      positions.push(position);
    }
    var colors = [Cesium.Color.RED, Cesium.Color.YELLOW, Cesium.Color.AQUA];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var id =
      startLat + startLon + '-' + stopLat + stopLon + startTime.toString();
    var arcEntity = this.viewer.entities.add({
      id: id,
      position: property,
      point: {
        pixelSize: 3,
        color: color
      },
      path: {
        show: true,
        resolution: 1,
        width: 3,
        trailTime: 0.2,
        leadTime: 0,
        material: new Cesium.StripeMaterialProperty({
          evenColor: color,
          oddColor: color.withAlpha(0.2),
          repeat: 1,
          offset: 0.25,
          orientation: Cesium.StripeOrientation.VERTICAL
        })
      }
    });
    setTimeout(() => {
      this.garbage.push(id);
    }, this.duration * 1000 + 3000);
    return id;
  }
  addSatellite() {
    // czml中的时间和本项目不符合，是2012年的，本项目实时，所以没法起作用，修改太麻烦
    this.viewer.dataSources.add(Cesium.CzmlDataSource.load(satellite));
  }

  render() {
    return (
      <div
        id="cesium-container"
        style={{
          position: 'absolute'
        }}
      />
    );
  }
}

export default World;
