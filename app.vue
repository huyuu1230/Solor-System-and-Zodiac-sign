
<template>
  <div>
    <headerNav />
    <div>
      <div id="webgl-canvas">

      </div>
      <ul id="planet-nav">
        <li v-on:click="toHome">HOME</li>
        <li v-on:click="toMercury">Mercury</li>
        <li v-on:click="toVenus">Venus</li>
        <li v-on:click="toEarth">Earth</li>
        <li v-on:click="toMars">Mars</li>
        <li v-on:click="toJupiter">Jupiter</li>
        <li v-on:click="toSaturn">Saturn</li>
        <li v-on:click="toUranus">Uranus</li>
        <li v-on:click="toNeptune">Neptune</li>
      </ul>



      <div id="control" v-on:click="controlSwitch">
        <h6>Controls</h6>
      </div>



    </div>
    <div v-on:click="toMercury" id="mercury" class="planet"></div>
    <div v-on:click="toVenus" id="venus" class="planet"></div>
    <div v-on:click="toEarth" id="earth" class="planet"></div>
    <div v-on:click="toMars" id="mars" class="planet"></div>
    <div v-on:click="toJupiter" id="jupiter" class="planet"></div>
    <div v-on:click="toSaturn" id="saturn" class="planet"></div>
    <div v-on:click="toUranus" id="uranus" class="planet"></div>
    <div v-on:click="toNeptune" id="neptune" class="planet"></div>

    <NuxtPage />
  </div>
</template>

<script setup>
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as PLANET from "assets/js/data_planets";
import * as SIGN from "assets/js/data_Signs";


// ==================================================
// 変数 : 設定関連
// ==================================================
const route = useRouter();
const fontLoader = new FontLoader();
let container;
let webgl;
let raycaster;
let Font;
const Planets = [];
let planetX = ref('');
let planetY = ref('');
let planetZ = ref('');
// ==================================================
// 変数 : 半径・距離・公転・自転に関する変数
// ==================================================
let earthRadius = 1000;
let earthDiameter = earthRadius * 2;
let earthRevolution = toRad(360 / 365 / 60);
let earthRotation = toRad(360 / 60);
let sunRadius = earthRadius * 219.08;
let au = earthRadius * 23533.69;
let ly = au * 63241;
let pc = ly * 3.26;
// ==================================================
// 変数 : カメラ制御
// ==================================================
let currentTarget = '';
let currentPosition = new THREE.Vector3(0, au * 25, au * 50);
let currentLook = new THREE.Vector3(0, 0, 0);
let durationPosition = 0.005;
let durationLook = 0.005;
let control = false;
// ==================================================
// 変数 : 惑星
// ==================================================
let Sun;
let Mercury;
let Venus;
let Earth;
let Mars;
let Jupiter;
let Saturn;
let Uranus;
let Neptune;
// ==================================================
// 変数 : 惑星の軌道
// ==================================================
let MercuryOrbit;
let VenusOrbit;
let EarthOrbit;
let MarsOrbit;
let JupiterOrbit;
let SaturnOrbit;
let UranusOrbit;
let NeptuneOrbit;
// ==================================================
// 変数 : 星座
// ==================================================
let Aries = SIGN.Aries;
let Taurus = SIGN.Taurus;
let Gemini = SIGN.Gemini;
let Cancer = SIGN.Cancer;
let Leo = SIGN.Leo;
let Virgo = SIGN.Virgo;
let Libra = SIGN.Libra;
let Scorpius = SIGN.Scorpius;
let Sagittarius = SIGN.Sagittarius;
let Capriconus = SIGN.Capriconus;
let Aquarius = SIGN.Aquarius;
let Pisces = SIGN.Pisces;
// ==================================================
// 変数 : 星座の軌跡
// ==================================================
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
// ==================================================
// function 計算用
// ==================================================
// -----乱数生成
function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
// -----リープ関数・線形補完
function lerp(x, y, a) {
  return (1 - a) * x + a * y;
};
// -----度からラジアンに変換
function toRad(deg) {
  return (deg * Math.PI) / 180;
};
// -----ラジアンから度に変換
function toDeg(rad) {
  return rad * (180 / Math.PI);
};
// -----function ease in out イージングを計算する関数
function easeInOutQuart(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};
// ==================================================
// Class
// ==================================================
// -----class WebGL
class WebGL {
  constructor(webgl) {
    this.webgl = webgl;
    this.scene = new THREE.Scene();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(new THREE.Color(0x222222));
    this.renderer.setSize(this.width, this.height);
    this.init();
  };
  init() {
    this.#setting_webgl();
    this.#setting_camera();
    this.#setting_controls();
  };
  // Private DOM要素にWebGLを追加
  #setting_webgl() {
    this.webgl.appendChild(this.renderer.domElement);
  };
  // Private カメラの設定
  #setting_camera() {
    this.fov = 45;
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.width / this.height,
      0.1,
      pc / 2,
    );
    this.camera.position.set(0, au * 25, au * 50);
  };
  // Private コントロールの設定
  #setting_controls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  };
  // ※必要ないかも Private タッチムーブイベントの初期化
  #setting_touch() {
    document.addEventListener("touchmove", (e) => { e.preventDefault(); }, { passive: false });
  };
  // Public リサイズ
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  // Public アニメーション用
  onUpdate() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  };
};
// -----class Raycaster
class Raycaster {
  constructor(webgl) {
    this.webgl = webgl;
    this.target = '';
    this.moveFlg = false;
    this.clickFlg = false;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
  };
  init() {
    this.mouseMove();
    this.mouseClick();
  };
  mouseMove() {
    this.webgl.addEventListener("mousemove", (e) => {
      this.moveFlg = true;
      const element = e.currentTarget;
      const x = e.clientX - element.offsetLeft;
      const y = e.clientY - element.offsetTop;
      const w = element.offsetWidth;
      const h = element.offsetHeight;
      mouse.x = (x / w) * 2 - 1;
      mouse.y = -(y / h) * 2 + 1;
    });
  };
  mouseClick() {
    this.webgl.addEventListener("click", (e) => {
      if (this.clickFlg) {
        if (this.target == 'mercury') {
          console.log('click to mercury');
        } else if (this.target == 'venus') {
          console.log('click to venus');
        } else if (this.target == 'earth') {
          console.log('click to earth');
        } else if (this.target == 'mars') {
          console.log('click to mars');
        } else if (this.target == 'jupiter') {
          console.log('click to jupiter');
        } else if (this.target == 'saturn') {
          console.log('click to saturn');
        } else if (this.target == 'uranus') {
          console.log('click to uranus');
        } else if (this.target == 'neptune') {
          console.log('click to neptune');
        };
      };
    });
  };
  update() {
    this.raycaster.setFromCamera(this.mouse, webgl.camera);
    this.intersects = this.raycaster.intersectObjects(Planets);
    if (this.intersects.length > 0) {
      const obj = this.intersects[0].object;
      if (obj.name == 'mercury') {
        if (moveFlg) {
          this.clickFlg = true;
          this.target = 'mercury';
        };
      } else if (obj.name == 'venus') {
        if (moveFlg) {
          this.clickFlg = true;
          this.target = 'venus';
        };
      } else if (obj.name == 'earth') {
        if (moveFlg) {
          this.clickFlg = true;
          this.target = 'earth';
        };
      } else if (obj.name == 'mars') {
        if (moveFlg) {
          this.clickFlg = true;
          this.target = 'mars';
        };
      } else if (obj.name == 'jupiter') {
        if (moveFlg) {
          this.clickFlg = true;
          this.target = 'jupiter';
        };
      } else if (obj.name == 'saturn') {
        if (moveFlg) {
          this.clickFlg = true;
          this.target = 'saturn';
        };
      } else if (obj.name == 'uranus') {
        if (moveFlg) {
          this.clickFlg = true;
          this.target = 'uranus';
        };
      } else if (obj.name == 'neptune') {
        if (moveFlg) {
          this.clickFlg = true;
          this.target = 'neptune';
        };
      } else {
        this.clickFlg = false;
      };
    } else {
      this.clickFlg = false;
    };
    // -----cssを変更
    if (this.clickFlg) {
      this.webgl.style.cursor = 'pointer';
    } else {
      this.webgl.style.cursor = 'grab';
    };
  };
};
// -----class Sun
class Planet_Sun {
  constructor() {
    this.radius = sunRadius;
    this.width = 10;
    this.height = 10;
    this.init();
  }
  init() {
    this.compute();
    this.create();
  }
  compute() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
  create() {
    this.geometry = new THREE.SphereGeometry(this.radius, this.width, this.height);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.y, this.z);
    this.mesh.name = "sun";
  }
};
// -----class Planet
class Planet {
  constructor(name, radius, distance, revolution, rotation, alpha, delta) {
    this.name = name;
    this.radius = radius;
    this.distance = distance;
    this.revolution = revolution;
    this.rotation = rotation;
    this.alpha = alpha;
    this.delta = delta;
    this.width = 10;
    this.height = 10;
    this.init();
  };
  init() {
    this.compute();
    this.create();
  };
  compute() {
    this.computeRadius = earthRadius * this.radius;
    this.computeDistance = sunRadius + au * this.distance;
    this.computeRevolution = earthRevolution / this.revolution;
    this.computeRotation = earthRotation / this.rotation;
    this.alphaRad = (this.alpha * Math.PI) / 180;
    this.deltaRad = (this.delta * Math.PI) / 180;
    this.x = this.computeDistance * Math.sin(this.alphaRad) * Math.cos(this.deltaRad);
    this.y = this.computeDistance * Math.sin(this.alphaRad) * Math.sin(this.deltaRad);
    this.z = this.computeDistance * Math.cos(this.alphaRad);
  };
  create() {
    this.geometry = new THREE.SphereGeometry(this.computeRadius, this.width, this.height);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.y, this.z);
    this.mesh.name = this.name;
  };
  update() {
    // -----Revolution
    this.alphaRad += this.computeRevolution;
    this.x = this.computeDistance * Math.sin(this.alphaRad) * Math.cos(this.deltaRad);
    this.y = this.computeDistance * Math.sin(this.alphaRad) * Math.sin(this.deltaRad);
    this.z = this.computeDistance * Math.cos(this.alphaRad);
    this.mesh.position.set(this.x, this.y, this.z);
    // -----Rotation
    this.mesh.rotation.y += this.computeRotation;
  };
};
// -----class Orbit
class Orbit {
  constructor(distance) {
    this.distance = distance;
    this.orbitPoints = [];
    this.orbitPointNum = 3600;
    this.init();
  };
  init() {
    this.compute();
    this.create();
  }
  compute() {
    this.computeDistance = sunRadius + au * this.distance;
    for (let i = 0; i <= this.orbitPointNum; i++) {
      const rad = ((360 / this.orbitPointNum) * i * Math.PI) / 180;
      const x = this.computeDistance * Math.cos(rad);
      const y = 0;
      const z = this.computeDistance * Math.sin(rad);
      const p = new THREE.Vector3(x, y, z);
      this.orbitPoints.push(p);
    };
  };
  create() {
    this.geometry = new THREE.BufferGeometry().setFromPoints(
      this.orbitPoints
    );
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.mesh = new THREE.Line(this.geometry, this.material);
  };
};
// -----class Sign
class Sign {
  constructor(alpha, delta) {
    this.alpha = alpha;
    this.delta = delta;
    this.radius = sunRadius * 50;
    this.w = 10;
    this.h = 10;
    this.init();
  };
  init() {
    this.compute();
    this.create();
  }
  compute() {
    this.computeDistance = au * 500;
    this.alphaRad = (this.alpha * Math.PI) / 180;
    this.deltaRad = (this.delta * Math.PI) / 180;
    this.x = this.computeDistance * Math.sin(this.alphaRad) * Math.cos(this.deltaRad);
    this.y = this.computeDistance * Math.sin(this.alphaRad) * Math.sin(this.deltaRad);
    this.z = this.computeDistance * Math.cos(this.alphaRad);
  };
  create() {
    this.geometry = new THREE.SphereGeometry(this.radius, this.w, this.h);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.y, this.z);
  };
};
// -----class Trajectory
class Trajectory {
  constructor(vectors) {
    this.vectors = vectors;
    this.points = [];
    this.init();
  };
  init() {
    this.compute();
    this.create();
  }
  compute() {
    for (let i = 0; i < this.vectors.length; i++) {
      this.points.push(this.vectors[i]);
    };
  };
  create() {
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.mesh = new THREE.Line(this.geometry, this.material);
  };
};
// ==================================================
// Class Test
// ==================================================



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
// --------------------テキストの作成
function createText(obj, data, text) {
  obj.Title = new PlanetText(
    text,
    Font,
    0.1,
    data.Planet.x + data.Planet.r * 10,
    data.Planet.y + data.Planet.r * 10,
    data.Planet.z + data.Planet.r * 10,
  );
};
// --------------------テキストの表示
function addText(obj) {
  obj.Title.add(scene)
};
// --------------------テキストのアニメーション
function updateText(obj, data) {
  obj.Title.update(
    data.Planet.x + data.Planet.r * 3,
    data.Planet.y + data.Planet.r * 3,
    data.Planet.z + data.Planet.r * 3,
    camera,
  );
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

let currentPage = useRoute().name;

watch(
  () => currentPage = useRoute().name,
  () => {
    durationPosition = 0.005;
    durationLook = 0.005;
    if (currentPage == 'planets-mercury') {
      currentTarget = 'mercury';
    } else if (currentPage == 'planets-venus') {
      currentTarget = 'venus';
    } else if (currentPage == 'planets-earth') {
      currentTarget = 'earth';
    } else if (currentPage == 'planets-mars') {
      currentTarget = 'mars';
    } else if (currentPage == 'planets-jupiter') {
      currentTarget = 'jupiter';
    } else if (currentPage == 'planets-saturn') {
      currentTarget = 'saturn';
    } else if (currentPage == 'planets-uranus') {
      currentTarget = 'uranus';
    } else if (currentPage == 'planets-neptune') {
      currentTarget = 'neptune';
    } else {
      currentTarget = ''
    }
  },
);

onMounted(() => {
  container = document.getElementById("webgl-canvas");
  webgl = new WebGL(container);
  raycaster = new Raycaster(container);

  function init() {
    three_planet();
    three_orbit();
    three_sign();
    rendering();
  };
  init();

  // ==================================================
  // オブジェクトのインスタンス化 + シーンに追加
  // ==================================================

  // ----------惑星のインスタンス化 + 惑星をシーンに追加
  function three_planet() {
    // -----惑星のインスタンスを作成
    Sun = new Planet_Sun();
    Mercury = createPlanet(PLANET.Mercury);
    Venus = createPlanet(PLANET.Venus);
    Earth = createPlanet(PLANET.Earth);
    Mars = createPlanet(PLANET.Mars);
    Jupiter = createPlanet(PLANET.Jupiter);
    Saturn = createPlanet(PLANET.Saturn);
    Uranus = createPlanet(PLANET.Uranus);
    Neptune = createPlanet(PLANET.Neptune);
    // -----惑星をシーンに追加
    webgl.scene.add(Sun.mesh);
    webgl.scene.add(Mercury.mesh);
    webgl.scene.add(Venus.mesh);
    webgl.scene.add(Earth.mesh);
    webgl.scene.add(Mars.mesh);
    webgl.scene.add(Jupiter.mesh);
    webgl.scene.add(Saturn.mesh);
    webgl.scene.add(Uranus.mesh);
    webgl.scene.add(Neptune.mesh);
    // -----function 惑星のインスタンスを作成する関数
    function createPlanet(data) {
      return new Planet(data.name, data.radius, data.distance, data.revolution, data.rotation, data.alpha, data.delta);
    };
  };
  // ----------惑星の軌道のインスタンス化 + 惑星の軌道をシーンに追加
  function three_orbit() {
    // -----惑星の軌道のインスタンス化
    MercuryOrbit = new Orbit(PLANET.Mercury.distance);
    VenusOrbit = new Orbit(PLANET.Venus.distance);
    EarthOrbit = new Orbit(PLANET.Earth.distance);
    MarsOrbit = new Orbit(PLANET.Mars.distance);
    JupiterOrbit = new Orbit(PLANET.Jupiter.distance);
    SaturnOrbit = new Orbit(PLANET.Saturn.distance);
    UranusOrbit = new Orbit(PLANET.Uranus.distance);
    NeptuneOrbit = new Orbit(PLANET.Neptune.distance);
    // -----惑星の軌道をシーンに追加
    webgl.scene.add(MercuryOrbit.mesh);
    webgl.scene.add(VenusOrbit.mesh);
    webgl.scene.add(EarthOrbit.mesh);
    webgl.scene.add(MarsOrbit.mesh);
    webgl.scene.add(JupiterOrbit.mesh);
    webgl.scene.add(SaturnOrbit.mesh);
    webgl.scene.add(UranusOrbit.mesh);
    webgl.scene.add(NeptuneOrbit.mesh);
  };
  // ----------星座のインスタンス化 + 星座をシーンに追加
  function three_sign() {
    // -----星座のインスタンスを作成
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
    // -----星座をシーンに追加
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
    // -----function 星座のインスタンスを作成する関数
    function createSign(sign) {
      for (let key in sign) {
        sign[key] = new Sign(sign[key].alpha, sign[key].delta);
      };
    };
    // -----function 星座をシーンに追加する関数
    function addSign(sign) {
      for (let key in sign) {
        webgl.scene.add(sign[key].mesh)
      };
    };
  };

  // ==================================================
  // Resize
  // ==================================================
  window.addEventListener('resize', () => {
    webgl.onResize();
  });
  // ==================================================
  // Rendering
  // ==================================================
  function rendering() {
    webgl.onUpdate();
    raycaster.update();

    // -----惑星のアニメーション
    Mercury.update();
    Venus.update();
    Earth.update();
    Mars.update();
    Jupiter.update();
    Saturn.update();
    Uranus.update();
    Neptune.update();

    check('mercury', Mercury);
    check('venus', Venus);
    check('earth', Earth);
    check('mars', Mars);
    check('jupiter', Jupiter);
    check('saturn', Saturn);
    check('uranus', Uranus);
    check('neptune', Neptune);

    if (control) {
    } else {
      cameraTarget();
    };

    requestAnimationFrame(rendering);
  };


  // --------------------THREE_SIGNS
  function threeWorld_signs() {
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

  // --------------------フォント
  function onLoadFont(font) {
    Font = font;
  };
  function loadFont() {
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", onLoadFont);
  };
});

// ==================================================
// Function ページ遷移 & オブジェクト選択
// ==================================================
// ----------カメラをホームポジションに戻す
function toHome() {
  toPlanet('/', '')
};
// ----------水星をクリックした時の処理
function toMercury() {
  toPlanet('/planets/mercury', 'mercury');
};
// ----------金星をクリックした時の処理
function toVenus() {
  toPlanet('/planets/venus', 'venus');
};
// ----------地球をクリックした時の処理
function toEarth() {
  toPlanet('/planets/earth', 'earth');
};
// ----------火星をクリックした時の処理
function toMars() {
  toPlanet('/planets/mars', 'mars');
};
// ----------木星をクリックした時の処理
function toJupiter() {
  toPlanet('/planets/jupiter', 'jupiter');
};
// ----------土星をクリックした時の処理
function toSaturn() {
  toPlanet('/planets/saturn', 'saturn');
};
// ----------天王星をクリックした時の処理
function toUranus() {
  toPlanet('/planets/uranus', 'uranus');
};
// ----------海王星をクリックした時の処理
function toNeptune() {
  toPlanet('/planets/neptune', 'neptune');
};

function toPlanet(path, name) {
  route.push(path);
  currentTarget = name;
  durationPosition = 0.005;
  durationLook = 0.005;
}

function cameraTarget() {
  if (currentTarget == 'mercury') {
    cameraLerpPosition(Mercury.mesh.position.x + Mercury.computeRadius * 5, Mercury.mesh.position.y + Mercury.computeRadius * 5, Mercury.mesh.position.z + Mercury.computeRadius * 5);
    cameraLerpLook(Mercury.mesh.position.x, Mercury.mesh.position.y, Mercury.mesh.position.z);
  } else if (currentTarget == 'venus') {
    cameraLerpPosition(Venus.mesh.position.x + Venus.computeRadius * 5, Venus.mesh.position.y + Venus.computeRadius * 5, Venus.mesh.position.z + Venus.computeRadius * 5);
    cameraLerpLook(Venus.mesh.position.x, Venus.mesh.position.y, Venus.mesh.position.z);
  } else if (currentTarget == 'earth') {
    cameraLerpPosition(Earth.mesh.position.x + Earth.computeRadius * 5, Earth.mesh.position.y + Earth.computeRadius * 5, Earth.mesh.position.z + Earth.computeRadius * 5);
    cameraLerpLook(Earth.mesh.position.x, Earth.mesh.position.y, Earth.mesh.position.z);
  } else if (currentTarget == 'mars') {
    cameraLerpPosition(Mars.mesh.position.x + Mars.computeRadius * 5, Mars.mesh.position.y + Mars.computeRadius * 5, Mars.mesh.position.z + Mars.computeRadius * 5);
    cameraLerpLook(Mars.mesh.position.x, Mars.mesh.position.y, Mars.mesh.position.z);
  } else if (currentTarget == 'jupiter') {
    cameraLerpPosition(Jupiter.mesh.position.x + Jupiter.computeRadius * 5, Jupiter.mesh.position.y + Jupiter.computeRadius * 5, Jupiter.mesh.position.z + Jupiter.computeRadius * 5);
    cameraLerpLook(Jupiter.mesh.position.x, Jupiter.mesh.position.y, Jupiter.mesh.position.z);
  } else if (currentTarget == 'saturn') {
    cameraLerpPosition(Saturn.mesh.position.x + Saturn.computeRadius * 5, Saturn.mesh.position.y + Saturn.computeRadius * 5, Saturn.mesh.position.z + Saturn.computeRadius * 5);
    cameraLerpLook(Saturn.mesh.position.x, Saturn.mesh.position.y, Saturn.mesh.position.z);
  } else if (currentTarget == 'uranus') {
    cameraLerpPosition(Uranus.mesh.position.x + Uranus.computeRadius * 5, Uranus.mesh.position.y + Uranus.computeRadius * 5, Uranus.mesh.position.z + Uranus.computeRadius * 5);
    cameraLerpLook(Uranus.mesh.position.x, Uranus.mesh.position.y, Uranus.mesh.position.z);
  } else if (currentTarget == 'neptune') {
    cameraLerpPosition(Neptune.mesh.position.x + Neptune.computeRadius * 5, Neptune.mesh.position.y + Neptune.computeRadius * 5, Neptune.mesh.position.z + Neptune.computeRadius * 5);
    cameraLerpLook(Neptune.mesh.position.x, Neptune.mesh.position.y, Neptune.mesh.position.z);
  } else {
    cameraLerpPosition(0, au * 25, au * 50);
    cameraLerpLook(0, 0, 0);
  }
}

// ==================================================
// Function カメラ制御
// ==================================================
// -----function カメラの方向・位置を初期に設定

// -----function コントロールを切り替える
function controlSwitch() {
  route.push("/");
  if (control) {
    control = false;
    toPlanet('/', '');
  } else {
    control = true;
  };
};


function cameraLerpPosition(x, y, z) {
  if (durationPosition <= 1) {
    durationPosition += 0.002;
  };

  const startPosition = webgl.camera.position.clone();
  const endPosition = new THREE.Vector3(x, y, z);

  const newPosition = new THREE.Vector3();
  newPosition.x = lerp(startPosition.x, endPosition.x, easeInOutQuart(durationPosition));
  newPosition.y = lerp(startPosition.y, endPosition.y, easeInOutQuart(durationPosition));
  newPosition.z = lerp(startPosition.z, endPosition.z, easeInOutQuart(durationPosition));

  webgl.camera.position.copy(newPosition);
};
function cameraLerpLook(x, y, z) {

  if (durationLook <= 1) {
    durationLook += 0.003;
  };

  const startLook = webgl.controls.target.clone();
  const endLook = new THREE.Vector3(x, y, z);

  const newLook = new THREE.Vector3();
  newLook.x = lerp(startLook.x, endLook.x, easeInOutQuart(durationLook));
  newLook.y = lerp(startLook.y, endLook.y, easeInOutQuart(durationLook));
  newLook.z = lerp(startLook.z, endLook.z, easeInOutQuart(durationLook));

  webgl.controls.target.copy(newLook);
};


// ==================================================
// Function Navigation
// ==================================================
function distance() {
  if (webgl.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) < au * 20) {
    view('mercury');
    view('venus');
    view('earth');
    view('mars');
    view('jupiter');
    view('saturn');
    view('uranus');
    view('neptune');
  } else if (webgl.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) > au * 25) {
    hide('mercury');
    hide('venus');
    hide('earth');
    hide('mars');
    view('jupiter');
    view('saturn');
    view('uranus');
    view('neptune');
  }
};
function check(dom, data) {
  const elem = document.getElementById(dom);
  const object3D = data.mesh;
  const width = webgl.width;
  const height = webgl.height;
  const worldPosition = object3D.getWorldPosition(new THREE.Vector3());
  const projection = worldPosition.project(webgl.camera);
  const sx = (width / 2) * (+projection.x + 1.0);
  const sy = (height / 2) * (-projection.y + 1.0);
  elem.style.top = sy + 'px';
  elem.style.left = sx + 'px';
};
function view(dom) {
  const elem = document.getElementById(dom);
  elem.style.display = 'block';
};
function hide(dom) {
  const elem = document.getElementById(dom);
  elem.style.display = 'none';
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
  font-family: 'Cormorant Garamond', serif;
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

#webgl-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}


#planet-nav {
  position: fixed;
  bottom: 50px;
  left: 50px;

  li {
    border: 1px solid #ffffff;
    padding: 0 10px;
    cursor: pointer;
  }

  li:not(:first-child) {
    margin: 10px 0 0 0;
  }
}

.data {
  position: fixed;
  top: 10%;
  right: 5%;
  font-size: 24px;
  text-align: right;
}

#control {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, 0);
  width: fit-content;
  height: fit-content;
  cursor: pointer;

  h6 {
    font-size: 24px;
  }
}

.planet {
  position: fixed;
  top: 0px;
  left: 0px;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  z-index: 10;
  cursor: pointer;
}
</style>