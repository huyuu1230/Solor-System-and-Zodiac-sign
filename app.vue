<template>
  <div>
    <headerNav />
    <div>
      <!--Canvas-->
      <div id="webgl-canvas"></div>
      <div id="webgl-canvas-2"></div>
    </div>

    <!--three.jsの惑星の座標-->
    <ul>
      <div v-on:click="toMercury" id="mercury" class="planet"></div>
      <div id="mercury-name" class="planet-name">MERCURY</div>
      <div v-on:click="toVenus" id="venus" class="planet"></div>
      <div id="venus-name" class="planet-name">VENUS</div>
      <div v-on:click="toEarth" id="earth" class="planet"></div>
      <div id="earth-name" class="planet-name">EARTH</div>
      <div v-on:click="toMars" id="mars" class="planet"></div>
      <div id="mars-name" class="planet-name">MARS</div>
      <div v-on:click="toJupiter" id="jupiter" class="planet"></div>
      <div id="jupiter-name" class="planet-name">JUPITER</div>
      <div v-on:click="toSaturn" id="saturn" class="planet"></div>
      <div id="saturn-name" class="planet-name">SATURN</div>
      <div v-on:click="toUranus" id="uranus" class="planet"></div>
      <div id="uranus-name" class="planet-name">URANUS</div>
      <div v-on:click="toNeptune" id="neptune" class="planet"></div>
      <div id="neptune-name" class="planet-name">NEPTUNE</div>
    </ul>

    <NuxtPage :namePosition="namePoint" :sizePosition="textSizePosition" :distancePosition="textDistancePosition" :revolutionPosition="textRevolutionPosition" :rotationPosition="textRotationPosition" />

  </div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { WebGL } from "~/assets/js/module_WebGL";
import { WebGL_info } from "~/assets/js/planet_information/information_WebGL";
import { Three_Planet } from "~/assets/js/module_PLANET";
import { Three_Sign } from "~/assets/js/module_SIGN";
import { Information } from "~/assets/js/planet_information/planet_information";

let namePoint = ref({ x: 0, y: 0 });
let textSizePosition = ref({ x: 0, y: 0 });
let textDistancePosition = ref({ x: 0, y: 0 });
let textRevolutionPosition = ref({ x: 0, y: 0 });
let textRotationPosition = ref({ x: 0, y: 0 });

let THREE_PLANET;
let THREE_SIGN;

let PlanetInformation;

// ==================================================
// 変数 : 設定関連
// ==================================================
const route = useRouter();
let WEBGL;
let WEBGL2;
// ==================================================
// 変数 : 半径・距離・公転・自転に関する変数
// ==================================================
let earthRadius = 100;
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
const fontPath = "/font/helvetiker_regular.typeface.json";
// ==================================================
// function 計算用
// ==================================================
function toRad(deg) {
  return (deg * Math.PI) / 180;
};
// ====================================================================================================
// WATCH
// ====================================================================================================
let currentPage = useRoute().name;
watch(
  () => currentPage = useRoute().name,
  () => {
    WEBGL.change_camera();
    THREE_SIGN.watch();
    PlanetInformation.pointAnim = false;
    PlanetInformation.lineAnim = false;
    if (currentPage == "planets-mercury") {
      setTimeout(() => {
        PlanetInformation.pointAnim = true;
        PlanetInformation.lineAnim = true;
      }, 3000);
    }
  },
);
// ====================================================================================================
// MOUNTED
// ====================================================================================================
onMounted(() => {
  const container = document.getElementById("webgl-canvas");
  const container2 = document.getElementById("webgl-canvas-2");
  WEBGL = new WebGL(container);
  WEBGL2 = new WebGL_info(container2)

  function init() {
    three_stardust();

    THREE_PLANET = new Three_Planet();
    THREE_PLANET.add_planet(WEBGL.scene);
    THREE_PLANET.add_orbit(WEBGL.scene);

    THREE_SIGN = new Three_Sign();
    THREE_SIGN.add_Sign(WEBGL.scene);
    THREE_SIGN.add_Trajectory(WEBGL.scene);
    THREE_SIGN.watch();

    PlanetInformation = new Information(WEBGL2.scene);
    // PlanetInformation.pointAnim = true;
    // PlanetInformation.lineAnim = true;

    rendering();
  };
  init();

  // ==================================================
  // 装飾惑星 : リファクタリング
  // ==================================================
  function three_stardust() {
    for (let i = 0; i < 1000; i++) {
      const geometry = new THREE.SphereGeometry(sunRadius * 50, 10, 10);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff, });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(random(-au * 1000, au * 1000), random(-au * 1000, au * 1000), random(-au * 1000, au * 1000))
      WEBGL.scene.add(mesh);
    };
    function random(min, max) {
      return Math.floor(Math.random() * (max + 1 - min)) + min;
    };
  };

  // ==================================================
  // Resize
  // ==================================================
  window.addEventListener('resize', () => {
    WEBGL.onResize();
    WEBGL2.onResize();
  });

  // ==================================================
  // Rendering
  // ==================================================
  function rendering() {
    WEBGL.update();
    WEBGL2.update();

    THREE_PLANET.update()
    WEBGL.rendering(THREE_PLANET, THREE_SIGN);
    PlanetInformation.update();

    namePoint.value = toScreen(PlanetInformation.textNamePosition);
    textSizePosition.value = toScreen(PlanetInformation.textSizePosition);
    textDistancePosition.value = toScreen(PlanetInformation.textDistancePosition);
    textRevolutionPosition.value = toScreen(PlanetInformation.textRevolutionPosition);
    textRotationPosition.value = toScreen(PlanetInformation.textRotationPosition);

    rendering_style();
    requestAnimationFrame(rendering);
  };
});

function toScreen(vec3) {
  const worldPosition = vec3.clone();
  const screenPosition = worldPosition.clone();
  screenPosition.project(WEBGL2.camera);
  const x = (screenPosition.x + 1) / 2 * window.innerWidth;
  const y = (-screenPosition.y + 1) / 2 * window.innerHeight;
  return { x: x, y: y };
};

// ==================================================
// Function ページ遷移 & オブジェクト選択
// ==================================================
// ----------水星をクリックした時の処理
function toMercury() {
  route.push('/planets/mercury');
};
// ----------金星をクリックした時の処理
function toVenus() {
  route.push('/planets/venus');
};
// ----------地球をクリックした時の処理
function toEarth() {
  route.push('/planets/earth');
};
// ----------火星をクリックした時の処理
function toMars() {
  route.push('/planets/mars');
};
// ----------木星をクリックした時の処理
function toJupiter() {
  route.push('/planets/jupiter');
};
// ----------土星をクリックした時の処理
function toSaturn() {
  route.push('/planets/saturn');
};
// ----------天王星をクリックした時の処理
function toUranus() {
  route.push('/planets/uranus');
};
// ----------海王星をクリックした時の処理
function toNeptune() {
  route.push('/planets/neptune');
};

// ==================================================
// Function Style CSSの変更を行う関数
// ==================================================
function StylePlanet(dom, data) {
  const elem = document.getElementById(dom);
  const object3D = data.mesh;
  const width = WEBGL.width;
  const height = WEBGL.height;
  const worldPosition = object3D.getWorldPosition(new THREE.Vector3());
  const projection = worldPosition.project(WEBGL.camera);
  const sx = (width / 2) * (+projection.x + 1.0);
  const sy = (height / 2) * (-projection.y + 1.0);
  elem.style.top = sy + 'px';
  elem.style.left = sx + 'px';
};

function StylePlanetName(dom, data) {
  const elem = document.getElementById(dom);
  const object3D = data.mesh;
  const width = WEBGL.width;
  const height = WEBGL.height;
  const worldPosition = object3D.getWorldPosition(new THREE.Vector3());
  const projection = worldPosition.project(WEBGL.camera);
  const sx = (width / 2) * (+projection.x + 1.0);
  const sy = (height / 2) * (-projection.y + 1.0);
  elem.style.top = sy - 30 + 'px';
  elem.style.left = sx + 'px';
};

function rendering_style() {
  // -----惑星の位置を表す丸
  StylePlanet('mercury', THREE_PLANET.Mercury);
  StylePlanet('venus', THREE_PLANET.Venus);
  StylePlanet('earth', THREE_PLANET.Earth);
  StylePlanet('mars', THREE_PLANET.Mars);
  StylePlanet('jupiter', THREE_PLANET.Jupiter);
  StylePlanet('saturn', THREE_PLANET.Saturn);
  StylePlanet('uranus', THREE_PLANET.Uranus);
  StylePlanet('neptune', THREE_PLANET.Neptune);
  // -----惑星の位置を表す文字
  StylePlanetName("mercury-name", THREE_PLANET.Mercury);
  StylePlanetName("venus-name", THREE_PLANET.Venus);
  StylePlanetName("earth-name", THREE_PLANET.Earth);
  StylePlanetName("mars-name", THREE_PLANET.Mars);
  StylePlanetName("jupiter-name", THREE_PLANET.Jupiter);
  StylePlanetName("saturn-name", THREE_PLANET.Saturn);
  StylePlanetName("uranus-name", THREE_PLANET.Uranus);
  StylePlanetName("neptune-name", THREE_PLANET.Neptune);
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
  line-height: 1em;
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
  font-family: 'Cormorant Garamond', 'Shippori Mincho', serif;
  letter-spacing: 0.25em;
}

body::-webkit-scrollbar {
  display: none;
}

// ==================================================
// ページ遷移アニメーション
// ==================================================
// .page-enter-active,
// .page-leave-active {
//   transition: all 0.5s;
// }

// .page-enter-from,
// .page-leave-to {
//   opacity: 0;
//   filter: blur(1rem);
// }

#webgl-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
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
  z-index: 1;
  cursor: pointer;
}

.planet-name {
  position: fixed;
  top: 0;
  left: 0;
  font-size: 16px;
}

#planet-text {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  color: #ffffff;

  h2 {
    position: fixed;
    top: 0;
    left: 0;
    font-size: 2.5vw;
  }
}
</style>