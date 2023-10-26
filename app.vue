<template>
  <div>
    <headerNav />
    <div>
      <!--Canvas-->
      <div id="webgl-canvas"></div>
    </div>

    <div id="control-container">
      <ul id="control-wrap">
        <li>
          <p id="control-control">
            コントロール : <a v-on:click="controlOn">ON</a> / <a v-on:click="controlOff">OFF</a>
          </p>
          <!-- <p>CONTROL : <a v-on:click="controlOn">ON</a> / <a v-on:click="controlOff">OFF</a></p> -->
        </li>
        <li>
          <p id="control-trajectory">
            星座の軌跡の表示 : <a v-on:click="AllViewTrajectory">ON</a> / <a v-on:click="AllHideTrajectory">OFF</a>
          </p>
          <!-- <p>Trajectory : <a v-on:click="AllViewTrajectory">ON</a> / <a v-on:click="AllHideTrajectory">OFF</a></p> -->
        </li>
        <li>
          <p id="control-information">
            情報の表示 : <a v-on:click="informationOn">ON</a> / <a v-on:click="informationOff">OFF</a>
          </p>
        </li>
      </ul>
    </div>

    <!--three.jsの惑星の座標-->
    <!--<ul>
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
    </ul>-->

    <NuxtPage :display="information" />
  </div>
</template>

<script setup>

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Test } from "~/assets/js/module_information";
import { WebGL } from "~/assets/js/module_WebGL";
import { Three_Planet } from "~/assets/js/module_PLANET";
import { Three_Sign } from "~/assets/js/module_SIGN";

let THREE_PLANET;
let THREE_SIGN;
let THREE_Information;
// ==================================================
// 変数 : ナビゲーション
// ==================================================
const information = ref(true);

function informationOn() {
  information.value = true;
  StyleInformation();
};
function informationOff() {
  information.value = false;
  StyleInformation();
};

// ==================================================
// 変数 : 設定関連
// ==================================================
const route = useRouter();
let container;
let WEBGL;
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
let control = false;
let trajectory = false;

const fontPath = "/font/helvetiker_regular.typeface.json";

// ==================================================
// function 計算用
// ==================================================
// -----リープ関数・線形補完
function lerp(x, y, a) {
  return (1 - a) * x + a * y;
};
// -----度からラジアンに変換
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
    controlOff();
    WEBGL.change_camera();
    THREE_SIGN.watch();
  },
);
// ====================================================================================================
// MOUNTED
// ====================================================================================================
onMounted(() => {
  container = document.getElementById("webgl-canvas");
  WEBGL = new WebGL(container);

  function init() {
    // StyleControl();
    // StyleTrajectory();
    // StyleInformation();
    three_stardust();

    THREE_PLANET = new Three_Planet();
    THREE_PLANET.add_planet(WEBGL.scene);
    THREE_PLANET.add_orbit(WEBGL.scene);

    THREE_SIGN = new Three_Sign();
    THREE_SIGN.add_Sign(WEBGL.scene);
    THREE_SIGN.add_Trajectory(WEBGL.scene);
    THREE_SIGN.watch();

    THREE_Information = new Test(WEBGL.scene,fontPath);
    
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
  });

  // ==================================================
  // Rendering
  // ==================================================
  function rendering() {
    WEBGL.update()

    THREE_PLANET.update()
    WEBGL.update_camera(THREE_PLANET, THREE_SIGN);
    THREE_Information.update(THREE_PLANET.Earth.mesh.position.clone())

    requestAnimationFrame(rendering);
  };
});

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
// カメラ制御
// ==================================================

// ----------コントロールをTrueに変更
function controlOn() {
  control = true;
  StyleControl();
};
// ----------コントロールをFalseに変更
function controlOff() {
  control = false;
  StyleControl();
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
  StylePlanet('mercury', Mercury);
  StylePlanet('venus', Venus);
  StylePlanet('earth', Earth);
  StylePlanet('mars', Mars);
  StylePlanet('jupiter', Jupiter);
  StylePlanet('saturn', Saturn);
  StylePlanet('uranus', Uranus);
  StylePlanet('neptune', Neptune);
  // -----惑星の位置を表す文字
  StylePlanetName("mercury-name", Mercury);
  StylePlanetName("venus-name", Venus);
  StylePlanetName("earth-name", Earth);
  StylePlanetName("mars-name", Mars);
  StylePlanetName("jupiter-name", Jupiter);
  StylePlanetName("saturn-name", Saturn);
  StylePlanetName("uranus-name", Uranus);
  StylePlanetName("neptune-name", Neptune);
};

function StyleControl() {
  const dom = document.querySelectorAll("#control-control a");
  if (control) {
    remove();
    dom[0].classList.add('active');
  } else {
    remove();
    dom[1].classList.add('active');
  };
  function remove() {
    for (let i = 0; i < dom.length; i++) {
      dom[i].classList.remove('active');
    };
  };
};

function StyleTrajectory() {
  const dom = document.querySelectorAll("#control-trajectory a");
  if (trajectory) {
    remove();
    dom[0].classList.add('active');
  } else {
    remove();
    dom[1].classList.add('active');
  };
  function remove() {
    for (let i = 0; i < dom.length; i++) {
      dom[i].classList.remove('active');
    };
  };
};

function StyleInformation() {
  const dom = document.querySelectorAll("#control-information a");
  if (information.value) {
    remove();
    dom[0].classList.add('active');
  } else {
    remove();
    dom[1].classList.add('active');
  };
  function remove() {
    for (let i = 0; i < dom.length; i++) {
      dom[i].classList.remove('active');
    };
  };
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
  font-family: 'Cormorant Garamond', 'Shippori Mincho', serif;
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

// ==================================================
// Navigation Log
// ==================================================

.nav-log {
  position: fixed;
  right: 30px;
  bottom: 30px;
}

// ==================================================
// Navigation Control
// ==================================================

#control-container {
  position: fixed;
  right: 2.5vw;
  bottom: 5vh;
  z-index: 500;

  #control-wrap {
    li {
      p {
        text-align: right;
        font-size: 16px;
        font-weight: 700;
        cursor: default;

        a {
          display: inline-block;
          opacity: 0.5;
          cursor: pointer;
        }
      }
    }

    li:not(:first-child) {
      margin: 10px 0 0 0;
    }
  }

  p {
    a {
      display: inline-block;
      cursor: pointer;
    }
  }
}

@media screen and (max-width:768px) {
  #control-container {
    bottom: 2.5vh;
  }
}

.active {
  opacity: 1 !important;
}
</style>