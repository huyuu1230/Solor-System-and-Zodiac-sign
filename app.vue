
<template>
  <div>
    <headerNav />
    <div>
      <canvas id="index"></canvas>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup>
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { toRad, Planet, Orbit, Sign, Trajectory, } from "assets/js/module";
import { Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune } from "assets/js/data_planets";
import { Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpius, Sagittarius, Capriconus, Aquarius, Pisces } from "assets/js/data_Signs";



const route = useRouter();
const fontLoader = new FontLoader();
let Font;

// --------------------THREE_環境設定
let scene, camera, renderer;
let orbitControls;

// --------------------THREE_クリックイベント
let mouse;
let raycaster;
let clickFlg = false;
let moveFlg = false;
let currentOrbit;
let currentTarget;

// --------------------惑星の変数
let sun;
const Planets = [];
let MercuryToSun, VenusToSun, EarthToSun, MarsToSun, JupiterToSun, SaturnToSun, UranusToSun, NeptuneToSun;

// --------------------星座の軌跡
let Aries_Trajectory;
let Gemini_Trajectory;
let Taurus_Trajectory;
let Cnacer_Trajectory;
let Leo_Trajectory;
let Virgo_Trajectory;
let Libra_Trajectory;
let Scorpius_Trajectory;
let Sagittarius_Trajectory;
let Capriconus_Trajectory;
let Aquarius_Trajectory;
let Pisces_Trajectory;

// ----------倍率
let zoomRatio = 1;

// --------------------地球
// ----------半径
const earthRadius = 1000 / zoomRatio;
// ----------公転速度---Alpha
const earthRevolutionAlpha = toRad(0.986 / 600);
// ----------公転速度---Delta
const earthRevolutionDelta = toRad(1);
// ----------自転の速度
const earthRotation = earthRevolutionAlpha * 360;

// --------------------太陽---219.08
const sunRadius = earthRadius * 20;

// --------------------距離
// ----------1AU---23533.69
const au = earthRadius * 100;
// ----------1LY
const ly = au * 63241;


// --------------------太陽を生成するクラス
class Sun {
  constructor(radius, width, height) {
    this.r = radius;
    this.w = width;
    this.h = height;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.y, this.z);
    this.mesh.name = "sun";
    scene.add(this.mesh);
  }
};

// --------------------惑星の作成
function createPlanet(planet) {
  planet.Planet = new Planet(
    earthRadius,
    earthRevolutionAlpha,
    earthRevolutionDelta,
    earthRotation,
    sunRadius,
    au,
    planet.Data.name,
    planet.Data.radius,
    planet.Data.distance,
    planet.Data.alpha,
    planet.Data.delta,
    planet.Data.revolution,
    planet.Data.rotation,
  );
};
// --------------------惑星の表示
function addPlanet(planet) {
  planet.Planet.add(scene);
};
// --------------------惑星のアニメーション
function updatePlanet(planet) {
  planet.Planet.update();
};
// --------------------軌道の作成
function createOrbit(planet) {
  planet.Orbit = new Orbit(
    sunRadius,
    au,
    planet.Data.distance,
  );
};
// --------------------軌道の表示
function addOrbit(planet) {
  planet.Orbit.add(scene);
};

// --------------------星座の作成
function createSign(sign) {
  const radius = sunRadius * 5;
  for (let key in sign) {
    sign[key] = new Sign(radius, au, sign[key].alpha, sign[key].delta);
  };
};
// --------------------星座の表示
function addSign(sign) {
  for (let key in sign) {
    sign[key].add(scene);
  };
};
// --------------------星座の軌跡の表示
function addTrajectory(trajectory) {
  for (let key in trajectory) {
    trajectory[key].add(scene);
  };
};

// --------------------惑星をクリックイベントオブジェクトに追加
function pushPlanets() {
  Planets.push(Mercury.Planet.mesh);
  Planets.push(Venus.Planet.mesh);
  Planets.push(Earth.Planet.mesh);
  Planets.push(Mars.Planet.mesh);
  Planets.push(Jupiter.Planet.mesh);
  Planets.push(Saturn.Planet.mesh);
  Planets.push(Uranus.Planet.mesh);
  Planets.push(Neptune.Planet.mesh);
};

// --------------------線を作成
class Line {
  constructor(startVector, endVector) {
    this.points = [];
    this.points.push(startVector);
    this.points.push(endVector);
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });
    this.line = new THREE.Line(this.geometry, this.material);
    scene.add(this.line);
  }
  update(updateVector) {
    scene.remove(this.line);
    this.points.pop();
    this.updateVector = updateVector;
    this.points.push(this.updateVector);
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });
    this.line = new THREE.Line(this.geometry, this.material);
    scene.add(this.line);
  };
};

// --------------------フォント
// loadFont();
// function onLoadFont(font) {
//   Font = font;
//   console.log(Font)
// }
// function loadFont() {
//   fontLoader.load("/fonts/helvetiker_regular.typeface.json", onLoadFont);
// }

onMounted(() => {
  const container = document.getElementById("index");

  // --------------------THREE_INIT
  function init() {
    setup();
    setControll();
    threeWorld();
    rendering();
  }
  init();

  // --------------------THREE_SETUP
  function setup() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      au * 1000
    );
    camera.position.set(0, 0, au * 50);
    scene.add(camera);
    // ----------Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#index"),
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // ----------Resize
    window.addEventListener("resize", onResize);
    onResize();
    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  };

  // --------------------THREE_PLANETS
  function threeWorld_planets() {

    // ----------太陽
    sun = new Sun(sunRadius, 100, 100);

    // ----------惑星の作成
    createPlanet(Mercury);
    createPlanet(Venus);
    createPlanet(Earth);
    createPlanet(Mars);
    createPlanet(Jupiter);
    createPlanet(Saturn);
    createPlanet(Uranus);
    createPlanet(Neptune);

    // ----------惑星の軌道の作成
    createOrbit(Mercury);
    createOrbit(Venus);
    createOrbit(Earth);
    createOrbit(Mars);
    createOrbit(Jupiter);
    createOrbit(Saturn);
    createOrbit(Uranus);
    createOrbit(Neptune);

    // ----------惑星の表示
    addPlanet(Mercury);
    addPlanet(Venus);
    addPlanet(Earth);
    addPlanet(Mars);
    addPlanet(Jupiter);
    addPlanet(Saturn);
    addPlanet(Uranus);
    addPlanet(Neptune);

    // ----------惑星の軌道を表示
    addOrbit(Mercury);
    addOrbit(Venus);
    addOrbit(Earth);
    addOrbit(Mars);
    addOrbit(Jupiter);
    addOrbit(Saturn);
    addOrbit(Uranus);
    addOrbit(Neptune);

    // ----------惑星をクリックイベント配列に追加
    pushPlanets();
  };
  // --------------------THREE_SIGNS
  function threeWorld_signs() {
    // ----------星座の作成
    createSign(Aries);
    createSign(Taurus);
    createSign(Gemini);
    createSign(Cancer);
    createSign(Leo);
    createSign(Virgo);
    createSign(Libra);
    createSign(Scorpius);
    createSign(Sagittarius);
    createSign(Capriconus);
    createSign(Aquarius);
    createSign(Pisces);

    // ----------星をシーンに追加
    addSign(Aries);
    addSign(Taurus);
    addSign(Gemini);
    addSign(Cancer);
    addSign(Leo);
    addSign(Virgo);
    addSign(Libra);
    addSign(Scorpius);
    addSign(Sagittarius);
    addSign(Capriconus);
    addSign(Aquarius);
    addSign(Pisces);

    // ----------星座の軌跡の座標を設定
    Aries_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Aries.Alpha.x, Aries.Alpha.y, Aries.Alpha.z),
        new THREE.Vector3(Aries.Beta.x, Aries.Beta.y, Aries.Beta.z),
        new THREE.Vector3(Aries.Gamma.x, Aries.Gamma.y, Aries.Gamma.z),
        new THREE.Vector3(Aries.Delta.x, Aries.Delta.y, Aries.Delta.z),
      ]),
    };

    Taurus_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Taurus.Mu.x, Taurus.Mu.y, Taurus.Mu.z),
        new THREE.Vector3(Taurus.Number_88.x, Taurus.Number_88.y, Taurus.Number_88.z),
        new THREE.Vector3(Taurus.Number_90.x, Taurus.Number_90.y, Taurus.Number_90.z),
        new THREE.Vector3(Taurus.Lambda.x, Taurus.Lambda.y, Taurus.Lambda.z),
        new THREE.Vector3(Taurus.Gamma.x, Taurus.Gamma.y, Taurus.Gamma.z),
        new THREE.Vector3(Taurus.Delta_1.x, Taurus.Delta_1.y, Taurus.Delta_1.z),
        new THREE.Vector3(Taurus.Epsilon.x, Taurus.Epsilon.y, Taurus.Epsilon.z),
        new THREE.Vector3(Taurus.Kappa.x, Taurus.Kappa.y, Taurus.Kappa.z),
        new THREE.Vector3(Taurus.Number_37.x, Taurus.Number_37.y, Taurus.Number_37.z),
        new THREE.Vector3(Taurus.Number_27.x, Taurus.Number_27.y, Taurus.Number_27.z),
        new THREE.Vector3(Taurus.Eta.x, Taurus.Eta.y, Taurus.Eta.z),
        new THREE.Vector3(Taurus.Number_5.x, Taurus.Number_5.y, Taurus.Number_5.z),
        new THREE.Vector3(Taurus.Xi.x, Taurus.Xi.y, Taurus.Xi.z),
        new THREE.Vector3(Taurus.Omicron.x, Taurus.Omicron.y, Taurus.Omicron.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Taurus.Lambda.x, Taurus.Lambda.y, Taurus.Lambda.z),
        new THREE.Vector3(Taurus.Number_30.x, Taurus.Number_30.y, Taurus.Number_30.z),
        new THREE.Vector3(Taurus.Omicron.x, Taurus.Omicron.y, Taurus.Omicron.z),
        new THREE.Vector3(Taurus.Nu.x, Taurus.Nu.y, Taurus.Nu.z),
        new THREE.Vector3(Taurus.Number_10.x, Taurus.Number_10.y, Taurus.Number_10.z),
      ]),
      Trajectory_3: new Trajectory([
        new THREE.Vector3(Taurus.Epsilon.x, Taurus.Epsilon.y, Taurus.Epsilon.z),
        new THREE.Vector3(Taurus.Tau.x, Taurus.Tau.y, Taurus.Tau.z),
        new THREE.Vector3(Taurus.Beta.x, Taurus.Beta.y, Taurus.Beta.z),
      ]),
      Trajectory_4: new Trajectory([
        new THREE.Vector3(Taurus.Gamma.x, Taurus.Gamma.y, Taurus.Gamma.z),
        new THREE.Vector3(Taurus.Theta_2.x, Taurus.Theta_2.y, Taurus.Theta_2.z),
        new THREE.Vector3(Taurus.Alpha.x, Taurus.Alpha.y, Taurus.Alpha.z),
        new THREE.Vector3(Taurus.Zehta.x, Taurus.Zehta.y, Taurus.Zehta.z),
      ]),
    };

    Gemini_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Gemini.M35.x, Gemini.M35.y, Gemini.M35.z),
        new THREE.Vector3(Gemini.Eta.x, Gemini.Eta.y, Gemini.Eta.z),
        new THREE.Vector3(Gemini.Mu.x, Gemini.Mu.y, Gemini.Mu.z),
        new THREE.Vector3(Gemini.Epsilon.x, Gemini.Epsilon.y, Gemini.Epsilon.z),
        new THREE.Vector3(Gemini.Tau.x, Gemini.Tau.y, Gemini.Tau.z),
        new THREE.Vector3(Gemini.Alpha.x, Gemini.Alpha.y, Gemini.Alpha.z),
        new THREE.Vector3(Gemini.Beta.x, Gemini.Beta.y, Gemini.Beta.z),
        new THREE.Vector3(Gemini.Delta.x, Gemini.Delta.y, Gemini.Delta.z),
        new THREE.Vector3(Gemini.Zehta.x, Gemini.Zehta.y, Gemini.Zehta.z),
        new THREE.Vector3(Gemini.Gamma.x, Gemini.Gamma.y, Gemini.Gamma.z),
        new THREE.Vector3(Gemini.Xi.x, Gemini.Xi.y, Gemini.Xi.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Gemini.Tau.x, Gemini.Tau.y, Gemini.Tau.z),
        new THREE.Vector3(Gemini.Theta.x, Gemini.Theta.y, Gemini.Theta.z),
      ]),
      Trajectory_3: new Trajectory([
        new THREE.Vector3(Gemini.Delta.x, Gemini.Delta.y, Gemini.Delta.z),
        new THREE.Vector3(Gemini.Lambda.x, Gemini.Lambda.y, Gemini.Lambda.z),
      ]),
    };

    Cnacer_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Cancer.Alpha.x, Cancer.Alpha.y, Cancer.Alpha.z),
        new THREE.Vector3(Cancer.Delta.x, Cancer.Delta.y, Cancer.Delta.z),
        new THREE.Vector3(Cancer.Epsilon.x, Cancer.Epsilon.y, Cancer.Epsilon.z),
        new THREE.Vector3(Cancer.Gamma.x, Cancer.Gamma.y, Cancer.Gamma.z),
        new THREE.Vector3(Cancer.Eta.x, Cancer.Eta.y, Cancer.Eta.z),
        new THREE.Vector3(Cancer.Theta.x, Cancer.Theta.y, Cancer.Theta.z),
        new THREE.Vector3(Cancer.Delta.x, Cancer.Delta.y, Cancer.Delta.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Cancer.Theta.x, Cancer.Theta.y, Cancer.Theta.z),
        new THREE.Vector3(Cancer.Beta.x, Cancer.Beta.y, Cancer.Beta.z),
      ]),
      Trajectory_3: new Trajectory([
        new THREE.Vector3(Cancer.Gamma.x, Cancer.Gamma.y, Cancer.Gamma.z),
        new THREE.Vector3(Cancer.Iota.x, Cancer.Iota.y, Cancer.Iota.z),
      ]),
    };

    Leo_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Leo.Lambda.x, Leo.Lambda.y, Leo.Lambda.z),
        new THREE.Vector3(Leo.Epsilon.x, Leo.Epsilon.y, Leo.Epsilon.z),
        new THREE.Vector3(Leo.Mu.x, Leo.Mu.y, Leo.Mu.z),
        new THREE.Vector3(Leo.Zehta.x, Leo.Zehta.y, Leo.Zehta.z),
        new THREE.Vector3(Leo.Gamma.x, Leo.Gamma.y, Leo.Gamma.z),
        new THREE.Vector3(Leo.Eta.x, Leo.Eta.y, Leo.Eta.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Leo.Eta.x, Leo.Eta.y, Leo.Eta.z),
        new THREE.Vector3(Leo.Number_60.x, Leo.Number_60.y, Leo.Number_60.z),
        new THREE.Vector3(Leo.Delta.x, Leo.Delta.y, Leo.Delta.z),
        new THREE.Vector3(Leo.Beta.x, Leo.Beta.y, Leo.Beta.z),
        new THREE.Vector3(Leo.Theta.x, Leo.Theta.y, Leo.Theta.z),
        new THREE.Vector3(Leo.Alpha.x, Leo.Alpha.y, Leo.Alpha.z),
        new THREE.Vector3(Leo.Eta.x, Leo.Eta.y, Leo.Eta.z),
      ]),
      Trajectory_3: new Trajectory([
        new THREE.Vector3(Leo.Alpha.x, Leo.Alpha.y, Leo.Alpha.z),
        new THREE.Vector3(Leo.Rho.x, Leo.Rho.y, Leo.Rho.z),
        new THREE.Vector3(Leo.Number_31.x, Leo.Number_31.y, Leo.Number_31.z),
        new THREE.Vector3(Leo.Omicron.x, Leo.Omicron.y, Leo.Omicron.z),
      ]),
      Trajectory_4: new Trajectory([
        new THREE.Vector3(Leo.Theta.x, Leo.Theta.y, Leo.Theta.z),
        new THREE.Vector3(Leo.M65.x, Leo.M65.y, Leo.M65.z),
        new THREE.Vector3(Leo.M66.x, Leo.M66.y, Leo.M66.z),
        new THREE.Vector3(Leo.Iota.x, Leo.Iota.y, Leo.Iota.z),
        new THREE.Vector3(Leo.Sigma.x, Leo.Sigma.y, Leo.Sigma.z),
        new THREE.Vector3(Leo.Tau.x, Leo.Tau.y, Leo.Tau.z),
        new THREE.Vector3(Leo.Upsilon.x, Leo.Upsilon.y, Leo.Upsilon.z),
      ]),
    };

    Virgo_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Virgo.Beta.x, Virgo.Beta.y, Virgo.Beta.z),
        new THREE.Vector3(Virgo.Eta.x, Virgo.Eta.y, Virgo.Eta.z),
        new THREE.Vector3(Virgo.Gamma.x, Virgo.Gamma.y, Virgo.Gamma.z),
        new THREE.Vector3(Virgo.Delta.x, Virgo.Delta.y, Virgo.Delta.z),
        new THREE.Vector3(Virgo.Epsilon.x, Virgo.Epsilon.y, Virgo.Epsilon.z),
        new THREE.Vector3(Virgo.Omicron.x, Virgo.Omicron.y, Virgo.Omicron.z),
        new THREE.Vector3(Virgo.Nu.x, Virgo.Nu.y, Virgo.Nu.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Virgo.Theta.x, Virgo.Theta.y, Virgo.Theta.z),
        new THREE.Vector3(Virgo.Alpha.x, Virgo.Alpha.y, Virgo.Alpha.z),
      ]),
      Trajectory_3: new Trajectory([
        new THREE.Vector3(Virgo.Theta.x, Virgo.Theta.y, Virgo.Theta.z),
        new THREE.Vector3(Virgo.Kappa.x, Virgo.Kappa.y, Virgo.Kappa.z),
      ]),
      Trajectory_4: new Trajectory([
        new THREE.Vector3(Virgo.Gamma.x, Virgo.Gamma.y, Virgo.Gamma.z),
        new THREE.Vector3(Virgo.Theta.x, Virgo.Theta.y, Virgo.Theta.z),
        new THREE.Vector3(Virgo.Iota.x, Virgo.Iota.y, Virgo.Iota.z),
        new THREE.Vector3(Virgo.Mu.x, Virgo.Mu.y, Virgo.Mu.z),
      ]),
      Trajectory_5: new Trajectory([
        new THREE.Vector3(Virgo.Delta.x, Virgo.Delta.y, Virgo.Delta.z),
        new THREE.Vector3(Virgo.Zehta.x, Virgo.Zehta.y, Virgo.Zehta.z),
      ]),
      Trajectory_6: new Trajectory([
        new THREE.Vector3(Virgo.Delta.x, Virgo.Delta.y, Virgo.Delta.z),
        new THREE.Vector3(Virgo.Tau.x, Virgo.Tau.y, Virgo.Tau.z),
        new THREE.Vector3(Virgo.Number_109.x, Virgo.Number_109.y, Virgo.Number_109.z),
      ]),
    };

    Libra_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Libra.Alpha.x, Libra.Alpha.y, Libra.Alpha.z),
        new THREE.Vector3(Libra.Beta.x, Libra.Beta.y, Libra.Beta.z),
        new THREE.Vector3(Libra.Gamma.x, Libra.Gamma.y, Libra.Gamma.z),
        new THREE.Vector3(Libra.Iota_1.x, Libra.Iota_1.y, Libra.Iota_1.z),
        new THREE.Vector3(Libra.Alpha.x, Libra.Alpha.y, Libra.Alpha.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Libra.Alpha.x, Libra.Alpha.y, Libra.Alpha.z),
        new THREE.Vector3(Libra.Sigma.x, Libra.Sigma.y, Libra.Sigma.z),
      ]),
      Trajectory_3: new Trajectory([
        new THREE.Vector3(Libra.Gamma.x, Libra.Gamma.y, Libra.Gamma.z),
        new THREE.Vector3(Libra.Theta.x, Libra.Theta.y, Libra.Theta.z),
      ]),
    };

    Scorpius_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Scorpius.Nu.x, Scorpius.Nu.y, Scorpius.Nu.z),
        new THREE.Vector3(Scorpius.Beta_1.x, Scorpius.Beta_1.y, Scorpius.Beta_1.z),
        new THREE.Vector3(Scorpius.Delta.x, Scorpius.Delta.y, Scorpius.Delta.z),
        new THREE.Vector3(Scorpius.Pi.x, Scorpius.Pi.y, Scorpius.Pi.z),
        new THREE.Vector3(Scorpius.Rho.x, Scorpius.Rho.y, Scorpius.Rho.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Scorpius.Delta.x, Scorpius.Delta.y, Scorpius.Delta.z),
        new THREE.Vector3(Scorpius.Sigma.x, Scorpius.Sigma.y, Scorpius.Sigma.z),
        new THREE.Vector3(Scorpius.Alpha.x, Scorpius.Alpha.y, Scorpius.Alpha.z),
        new THREE.Vector3(Scorpius.Tau.x, Scorpius.Tau.y, Scorpius.Tau.z),
        new THREE.Vector3(Scorpius.Epsilon.x, Scorpius.Epsilon.y, Scorpius.Epsilon.z),
        new THREE.Vector3(Scorpius.Mu.x, Scorpius.Mu.y, Scorpius.Mu.z),
        new THREE.Vector3(Scorpius.Zehta_1.x, Scorpius.Zehta_1.y, Scorpius.Zehta_1.z),
        new THREE.Vector3(Scorpius.Eta.x, Scorpius.Eta.y, Scorpius.Eta.z),
        new THREE.Vector3(Scorpius.Theta.x, Scorpius.Theta.y, Scorpius.Theta.z),
        new THREE.Vector3(Scorpius.Iota_1.x, Scorpius.Iota_1.y, Scorpius.Iota_1.z),
        new THREE.Vector3(Scorpius.Upsilon.x, Scorpius.Upsilon.y, Scorpius.Upsilon.z),
        new THREE.Vector3(Scorpius.Lambda.x, Scorpius.Lambda.y, Scorpius.Lambda.z),
        new THREE.Vector3(Scorpius.Kappa.x, Scorpius.Kappa.y, Scorpius.Kappa.z),
      ]),
    };

    Sagittarius_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Sagittarius.Delta.x, Sagittarius.Delta.y, Sagittarius.Delta.z),
        new THREE.Vector3(Sagittarius.Gamma_2.x, Sagittarius.Gamma_2.y, Sagittarius.Gamma_2.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Sagittarius.Mu.x, Sagittarius.Mu.y, Sagittarius.Mu.z),
        new THREE.Vector3(Sagittarius.Lambda.x, Sagittarius.Lambda.y, Sagittarius.Lambda.z),
        new THREE.Vector3(Sagittarius.Delta.x, Sagittarius.Delta.y, Sagittarius.Delta.z),
        new THREE.Vector3(Sagittarius.Epsilon.x, Sagittarius.Epsilon.y, Sagittarius.Epsilon.z),
        new THREE.Vector3(Sagittarius.Eta.x, Sagittarius.Eta.y, Sagittarius.Eta.z),
      ]),
      Trajectory_3: new Trajectory([
        new THREE.Vector3(Sagittarius.Rho_1.x, Sagittarius.Rho_1.y, Sagittarius.Rho_1.z),
        new THREE.Vector3(Sagittarius.Rho_2.x, Sagittarius.Rho_2.y, Sagittarius.Rho_2.z),
        new THREE.Vector3(Sagittarius.Number_43.x, Sagittarius.Number_43.y, Sagittarius.Number_43.z),
        new THREE.Vector3(Sagittarius.Pi.x, Sagittarius.Pi.y, Sagittarius.Pi.z),
        new THREE.Vector3(Sagittarius.Omicron.x, Sagittarius.Omicron.y, Sagittarius.Omicron.z),
        new THREE.Vector3(Sagittarius.Xi_2.x, Sagittarius.Xi_2.y, Sagittarius.Xi_2.z),
        new THREE.Vector3(Sagittarius.Xi_1.x, Sagittarius.Xi_1.y, Sagittarius.Xi_1.z),
      ]),
      Trajectory_4: new Trajectory([
        new THREE.Vector3(Sagittarius.Lambda.x, Sagittarius.Lambda.y, Sagittarius.Lambda.z),
        new THREE.Vector3(Sagittarius.Phi.x, Sagittarius.Phi.y, Sagittarius.Phi.z),
        new THREE.Vector3(Sagittarius.Sigma.x, Sagittarius.Sigma.y, Sagittarius.Sigma.z),
        new THREE.Vector3(Sagittarius.Omicron.x, Sagittarius.Omicron.y, Sagittarius.Omicron.z),
      ]),
      Trajectory_5: new Trajectory([
        new THREE.Vector3(Sagittarius.Sigma.x, Sagittarius.Sigma.y, Sagittarius.Sigma.z),
        new THREE.Vector3(Sagittarius.Tau.x, Sagittarius.Tau.y, Sagittarius.Tau.z),
        new THREE.Vector3(Sagittarius.Zehta.x, Sagittarius.Zehta.y, Sagittarius.Zehta.z),
        new THREE.Vector3(Sagittarius.Alpha.x, Sagittarius.Alpha.y, Sagittarius.Alpha.z),
        new THREE.Vector3(Sagittarius.Beta_1.x, Sagittarius.Beta_1.y, Sagittarius.Beta_1.z),
        new THREE.Vector3(Sagittarius.Beta_2.x, Sagittarius.Beta_2.y, Sagittarius.Beta_2.z),
      ]),
      Trajectory_6: new Trajectory([
        new THREE.Vector3(Sagittarius.Tau.x, Sagittarius.Tau.y, Sagittarius.Tau.z),
        new THREE.Vector3(Sagittarius.Omega.x, Sagittarius.Omega.y, Sagittarius.Omega.z),
        new THREE.Vector3(Sagittarius.Theta_2.x, Sagittarius.Theta_2.y, Sagittarius.Theta_2.z),
        new THREE.Vector3(Sagittarius.Theta_1.x, Sagittarius.Theta_1.y, Sagittarius.Theta_1.z),
        new THREE.Vector3(Sagittarius.Iota.x, Sagittarius.Iota.y, Sagittarius.Iota.z),
      ]),
    };

    Capriconus_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Capriconus.Alpha_2.x, Capriconus.Alpha_2.y, Capriconus.Alpha_2.z),
        new THREE.Vector3(Capriconus.Alpha_1.x, Capriconus.Alpha_1.y, Capriconus.Alpha_1.z),
        new THREE.Vector3(Capriconus.Beta_1.x, Capriconus.Beta_1.y, Capriconus.Beta_1.z),
        new THREE.Vector3(Capriconus.Theta.x, Capriconus.Theta.y, Capriconus.Theta.z),
        new THREE.Vector3(Capriconus.Iota.x, Capriconus.Iota.y, Capriconus.Iota.z),
        new THREE.Vector3(Capriconus.Gamma.x, Capriconus.Gamma.y, Capriconus.Gamma.z),
        new THREE.Vector3(Capriconus.Delta.x, Capriconus.Delta.y, Capriconus.Delta.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Capriconus.Gamma.x, Capriconus.Gamma.y, Capriconus.Gamma.z),
        new THREE.Vector3(Capriconus.Epsilon.x, Capriconus.Epsilon.y, Capriconus.Epsilon.z),
        new THREE.Vector3(Capriconus.Zehta.x, Capriconus.Zehta.y, Capriconus.Zehta.z),
        new THREE.Vector3(Capriconus.Number_24.x, Capriconus.Number_24.y, Capriconus.Number_24.z),
        new THREE.Vector3(Capriconus.Omega.x, Capriconus.Omega.y, Capriconus.Omega.z),
        new THREE.Vector3(Capriconus.Psi.x, Capriconus.Psi.y, Capriconus.Psi.z),
        new THREE.Vector3(Capriconus.Omicron.x, Capriconus.Omicron.y, Capriconus.Omicron.z),
        new THREE.Vector3(Capriconus.Rho.x, Capriconus.Rho.y, Capriconus.Rho.z),
        new THREE.Vector3(Capriconus.Beta_1.x, Capriconus.Beta_1.y, Capriconus.Beta_1.z),
      ]),
    };

    Aquarius_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Aquarius.Epsilon.x, Aquarius.Epsilon.y, Aquarius.Epsilon.z),
        new THREE.Vector3(Aquarius.Beta.x, Aquarius.Beta.y, Aquarius.Beta.z),
        new THREE.Vector3(Aquarius.Alpha.x, Aquarius.Alpha.y, Aquarius.Alpha.z),
        new THREE.Vector3(Aquarius.Theta.x, Aquarius.Theta.y, Aquarius.Theta.z),
        new THREE.Vector3(Aquarius.Iota.x, Aquarius.Iota.y, Aquarius.Iota.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Aquarius.Alpha.x, Aquarius.Alpha.y, Aquarius.Alpha.z),
        new THREE.Vector3(Aquarius.Gamma.x, Aquarius.Gamma.y, Aquarius.Gamma.z),
        new THREE.Vector3(Aquarius.Zehta.x, Aquarius.Zehta.y, Aquarius.Zehta.z),
        new THREE.Vector3(Aquarius.Eta.x, Aquarius.Eta.y, Aquarius.Eta.z),
      ]),
      Trajectory_3: new Trajectory([
        new THREE.Vector3(Aquarius.Zehta.x, Aquarius.Zehta.y, Aquarius.Zehta.z),
        new THREE.Vector3(Aquarius.Pi.x, Aquarius.Pi.y, Aquarius.Pi.z),
      ]),
      Trajectory_4: new Trajectory([
        new THREE.Vector3(Aquarius.Zehta.x, Aquarius.Zehta.y, Aquarius.Zehta.z),
        new THREE.Vector3(Aquarius.Kappa.x, Aquarius.Kappa.y, Aquarius.Kappa.z),
        new THREE.Vector3(Aquarius.Lambda.x, Aquarius.Lambda.y, Aquarius.Lambda.z),
        new THREE.Vector3(Aquarius.Delta.x, Aquarius.Delta.y, Aquarius.Delta.z),
        new THREE.Vector3(Aquarius.C_2.x, Aquarius.C_2.y, Aquarius.C_2.z),
        new THREE.Vector3(Aquarius.C_1.x, Aquarius.C_1.y, Aquarius.C_1.z),
        new THREE.Vector3(Aquarius.A_Psa.x, Aquarius.A_Psa.y, Aquarius.A_Psa.z),
      ]),
      Trajectory_5: new Trajectory([
        new THREE.Vector3(Aquarius.Zehta.x, Aquarius.Zehta.y, Aquarius.Zehta.z),
        new THREE.Vector3(Aquarius.Phi.x, Aquarius.Phi.y, Aquarius.Phi.z),
        new THREE.Vector3(Aquarius.Omega_2.x, Aquarius.Omega_2.y, Aquarius.Omega_2.z),
        new THREE.Vector3(Aquarius.A_Psa.x, Aquarius.A_Psa.y, Aquarius.A_Psa.z),
      ]),
    };

    Pisces_Trajectory = {
      Trajectory_1: new Trajectory([
        new THREE.Vector3(Pisces.Tau.x, Pisces.Tau.y, Pisces.Tau.z),
        new THREE.Vector3(Pisces.Upsilon.x, Pisces.Upsilon.y, Pisces.Upsilon.z),
        new THREE.Vector3(Pisces.Phi.x, Pisces.Phi.y, Pisces.Phi.z),
        new THREE.Vector3(Pisces.Chi.x, Pisces.Chi.y, Pisces.Chi.z),
        new THREE.Vector3(Pisces.Eta.x, Pisces.Eta.y, Pisces.Eta.z),
        new THREE.Vector3(Pisces.Omicron.x, Pisces.Omicron.y, Pisces.Omicron.z),
        new THREE.Vector3(Pisces.Alpha.x, Pisces.Alpha.y, Pisces.Alpha.z),
        new THREE.Vector3(Pisces.Xi.x, Pisces.Xi.y, Pisces.Xi.z),
        new THREE.Vector3(Pisces.Nu.x, Pisces.Nu.y, Pisces.Nu.z),
        new THREE.Vector3(Pisces.Mu.x, Pisces.Mu.y, Pisces.Mu.z),
        new THREE.Vector3(Pisces.Zehta.x, Pisces.Zehta.y, Pisces.Zehta.z),
        new THREE.Vector3(Pisces.Epsilon.x, Pisces.Epsilon.y, Pisces.Epsilon.z),
        new THREE.Vector3(Pisces.Delta.x, Pisces.Delta.y, Pisces.Delta.z),
        new THREE.Vector3(Pisces.Omega.x, Pisces.Omega.y, Pisces.Omega.z),
        new THREE.Vector3(Pisces.Iota.x, Pisces.Iota.y, Pisces.Iota.z),
        new THREE.Vector3(Pisces.Theta.x, Pisces.Theta.y, Pisces.Theta.z),
        new THREE.Vector3(Pisces.Gamma.x, Pisces.Gamma.y, Pisces.Gamma.z),
        new THREE.Vector3(Pisces.Kappa.x, Pisces.Kappa.y, Pisces.Kappa.z),
        new THREE.Vector3(Pisces.Lambda.x, Pisces.Lambda.y, Pisces.Lambda.z),
        new THREE.Vector3(Pisces.Omega.x, Pisces.Omega.y, Pisces.Omega.z),
      ]),
      Trajectory_2: new Trajectory([
        new THREE.Vector3(Pisces.Gamma.x, Pisces.Gamma.y, Pisces.Gamma.z),
        new THREE.Vector3(Pisces.Beta.x, Pisces.Beta.y, Pisces.Beta.z),
      ]),
    };

    // ----------星座の軌跡を追加
    // addTrajectory(Aries_Trajectory);
    // addTrajectory(Taurus_Trajectory);
    // addTrajectory(Gemini_Trajectory);
    // addTrajectory(Cnacer_Trajectory);
    // addTrajectory(Leo_Trajectory);
    // addTrajectory(Virgo_Trajectory);
    // addTrajectory(Libra_Trajectory);
    // addTrajectory(Scorpius_Trajectory);
    // addTrajectory(Sagittarius_Trajectory);
    // addTrajectory(Capriconus_Trajectory);
    // addTrajectory(Aquarius_Trajectory);
    // addTrajectory(Pisces_Trajectory);
  };

  function threeWorld_infos() {
    // -----線
    MercuryToSun = new Line(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        Mercury.orbitPoints[0].x,
        Mercury.orbitPoints[0].y,
        Mercury.orbitPoints[0].z,
      )
    );
    VenusToSun = new Line(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        Venus.orbitPoints[0].x,
        Venus.orbitPoints[0].y,
        Venus.orbitPoints[0].z,
      )
    );
    EarthToSun = new Line(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        Earth.orbitPoints[0].x,
        Earth.orbitPoints[0].y,
        Earth.orbitPoints[0].z,
      )
    );
    MarsToSun = new Line(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        Mars.orbitPoints[0].x,
        Mars.orbitPoints[0].y,
        Mars.orbitPoints[0].z,
      )
    );
    JupiterToSun = new Line(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        Jupiter.orbitPoints[0].x,
        Jupiter.orbitPoints[0].y,
        Jupiter.orbitPoints[0].z,
      )
    );
    SaturnToSun = new Line(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        Saturn.orbitPoints[0].x,
        Saturn.orbitPoints[0].y,
        Saturn.orbitPoints[0].z,
      )
    );
    UranusToSun = new Line(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        Uranus.orbitPoints[0].x,
        Uranus.orbitPoints[0].y,
        Uranus.orbitPoints[0].z,
      )
    );
    NeptuneToSun = new Line(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        Neptune.orbitPoints[0].x,
        Neptune.orbitPoints[0].y,
        Neptune.orbitPoints[0].z,
      )
    );
  };

  // --------------------Three.jsにオブジェクトを作成
  function threeWorld() {
    threeWorld_planets();
    threeWorld_signs();
  };

  // --------------------コントロール関連
  function setControll() {
    // ----------TouchMove_タッチムーブイベントの初期化
    document.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
    // ----------OrbitControls関連
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 0, 0);
    orbitControls.enableDamping = true;
    // ----------Three.js Raycaster関連
    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
    // ----------MouseMove_マウスが動いたときに発火するイベント
    container.addEventListener("mousemove", handleMouseMove);
    function handleMouseMove(event) {
      moveFlg = true;
      const element = event.currentTarget;
      const x = event.clientX - element.offsetLeft;
      const y = event.clientY - element.offsetTop;
      const w = element.offsetWidth;
      const h = element.offsetHeight;
      mouse.x = (x / w) * 2 - 1;
      mouse.y = -(y / h) * 2 + 1;
      // ------------------------------重要:マウスを動かしたらカメラのターゲットをリセット
      currentTarget = ''
    };
    // ----------HandleClick_Three.js用のクリックイベント
    container.addEventListener("click", handleClick);
    function handleClick(event) {
      if (clickFlg) {
        if (currentOrbit == "mercury") {
          toMercury();
        } else if (currentOrbit == "venus") {
          toVenus();
        } else if (currentOrbit == "earth") {
          toEarth();
        } else if (currentOrbit == "mars") {
          toMars();
        } else if (currentOrbit == "jupiter") {
          toJupiter();
        } else if (currentOrbit == "saturn") {
          toSaturn();
        } else if (currentOrbit == "uranus") {
          toUranus();
        } else if (currentOrbit == "neptune") {
          toNeptune();
        }
      };
    };
  };

  // --------------------THREE_RENDERING
  function rendering() {
    TWEEN.update();
    orbitControls.update();
    // ----------惑星
    updatePlanet(Mercury);
    updatePlanet(Venus);
    updatePlanet(Earth);
    updatePlanet(Mars);
    updatePlanet(Jupiter);
    updatePlanet(Saturn);
    updatePlanet(Uranus);
    updatePlanet(Neptune);

    cameraTargetObject();

    // -----Three_Raycaster
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Planets, false);
    // -----Three_ClickEvent
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (obj.name == "mercury") {
        if (moveFlg) {
          currentOrbit = "mercury";
          clickFlg = true;
        }
      } else if (obj.name == "venus") {
        if (moveFlg) {
          currentOrbit = "venus";
          clickFlg = true;
        }
      } else if (obj.name == "earth") {
        if (moveFlg) {
          currentOrbit = "earth";
          clickFlg = true;
        }
      } else if (obj.name == "mars") {
        if (moveFlg) {
          currentOrbit = "mars";
          clickFlg = true;
        }
      } else if (obj.name == "jupiter") {
        if (moveFlg) {
          currentOrbit = "jupiter";
          clickFlg = true;
        }
      } else if (obj.name == "saturn") {
        if (moveFlg) {
          currentOrbit = "saturn";
          clickFlg = true;
        }
      } else if (obj.name == "uranus") {
        if (moveFlg) {
          currentOrbit = "uranus";
          clickFlg = true;
        }
      } else if (obj.name == "neptune") {
        if (moveFlg) {
          currentOrbit = "neptune";
          clickFlg = true;
        }
      } else {
        clickFlg = false;
      }
    } else {
      clickFlg = false;
    }
    if (clickFlg) {
      container.style.cursor = "pointer";
    } else {
      container.style.cursor = "grab";
    }
    // -----レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(rendering);
  };
});




function cameraTargetObject() {
  if (currentTarget == 'Mercury') {
    orbitControls.target.set(Mercury.Planet.x, Mercury.Planet.y, Mercury.Planet.z);
    animateCameraPos(Mercury.Planet.x + Mercury.Planet.r * 5, Mercury.Planet.y + Mercury.Planet.r * 5, Mercury.Planet.z + Mercury.Planet.r * 5,);
  } else if (currentTarget == 'Venus') {
    orbitControls.target.set(Venus.Planet.x, Venus.Planet.y, Venus.Planet.z);
    animateCameraPos(Venus.Planet.x + Venus.Planet.r * 5, Venus.Planet.y + Venus.Planet.r * 5, Venus.Planet.z + Venus.Planet.r * 5,);
  } else if (currentTarget == 'Earth') {
    orbitControls.target.set(Earth.Planet.x, Earth.Planet.y, Earth.Planet.z);
    animateCameraPos(Earth.Planet.x + Earth.Planet.r * 5, Earth.Planet.y + Earth.Planet.r * 5, Earth.Planet.z + Earth.Planet.r * 5,);
  } else if (currentTarget == 'Mars') {
    orbitControls.target.set(Mars.Planet.x, Mars.Planet.y, Mars.Planet.z);
    animateCameraPos(Mars.Planet.x + Mars.Planet.r * 5, Mars.Planet.y + Mars.Planet.r * 5, Mars.Planet.z + Mars.Planet.r * 5,);
  } else if (currentTarget == 'Jupiter') {
    orbitControls.target.set(Jupiter.Planet.x, Jupiter.Planet.y, Jupiter.Planet.z);
    animateCameraPos(Jupiter.Planet.x + Jupiter.Planet.r * 5, Jupiter.Planet.y + Jupiter.Planet.r * 5, Jupiter.Planet.z + Jupiter.Planet.r * 5,);
  } else if(currentTarget == 'Saturn'){
    orbitControls.target.set(Saturn.Planet.x,Saturn.Planet.y,Saturn.Planet.z);
    animateCameraPos(Saturn.Planet.x + Saturn.Planet.r * 5,Saturn.Planet.y + Saturn.Planet.r * 5,Saturn.Planet.z + Saturn.Planet.r * 5,);
  } else if(currentTarget == 'Uranus'){
    orbitControls.target.set(Uranus.Planet.x,Uranus.Planet.y,Uranus.Planet.z,);
    animateCameraPos(Uranus.Planet.x + Uranus.Planet.r * 5,Uranus.Planet.y + Uranus.Planet.r * 5,Uranus.Planet.z + Uranus.Planet.r * 5,);
  } else if(currentTarget == 'Neptune'){
    orbitControls.target.set(Neptune.Planet.x,Neptune.Planet.y,Neptune.Planet.z,);
    animateCameraPos(Neptune.Planet.x + Neptune.Planet.r * 5,Neptune.Planet.y + Neptune.Planet.r * 5,Neptune.Planet.z + Neptune.Planet.r * 5,);
  }
}

// ----------水星をクリックした時の処理
function toMercury() {
  route.push("/planets/mercury");
  currentTarget = 'Mercury';
};
// ----------金星をクリックした時の処理
function toVenus() {
  route.push("/planets/venus");
  currentTarget = 'Venus';
};
// ----------地球をクリックした時の処理
function toEarth() {
  route.push("/planets/earth");
  currentTarget = 'Earth';
};
// ----------火星をクリックした時の処理
function toMars() {
  route.push("/planets/mars");
  currentTarget = 'Maras';
};
// ----------木星をクリックした時の処理
function toJupiter() {
  route.push("/planets/jupiter");
  currentTarget = 'Jupiter';
};
// ----------土星をクリックした時の処理
function toSaturn() {
  route.push("/planets/saturn");
  currentTarget = 'Saturn';
};
// ----------天王星をクリックした時の処理
function toUranus() {
  route.push("/planets/uranus");
  currentTarget = 'Uranus';
};
// ----------海王星をクリックした時の処理
function toNeptune() {
  route.push("/planets/neptune");
  currentTarget = 'Neptune';
};
// ----------指定の場所までカメラをアニメーションさせながら移動
function animateCameraPos(x, y, z) {
  const coords = camera.position;
  const destinationVector = new THREE.Vector3(x, y, z);
  const DURATION = 3000;
  const tween = new TWEEN.Tween(coords)
    .to(destinationVector, DURATION)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();
};


</script>



<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Shippori+Mincho:wght@400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
a {
  line-height: 1.5;
}

a {
  display: block;
  text-decoration: none;
  color: #ffffff;
}

ul,
li {
  list-style: none;
}

body {
  color: #ffffff;
  font-size: 16px;
  letter-spacing: 0.25em;
}

body::-webkit-scrollbar {
  display: none;
}

.nav-menu {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, 0);
  z-index: 1000;

  a {
    color: #ffffff;
    text-decoration: none;
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

#index {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1000;
}
</style>