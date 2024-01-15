<style lang="scss">
/* -----_top.scss----- */
</style>

<template>
  <div>
    <headerNav />

    <div id="webgl-canvas-1" @click="noAutoPlay"></div>
    <div id="webgl-canvas-2"></div>

    <ul>
      <div v-on:click="toMercury" id="mercury" class="planet-circle"></div>
      <div id="mercury-name" class="planet-name">MERCURY</div>
      <div v-on:click="toVenus" id="venus" class="planet-circle"></div>
      <div id="venus-name" class="planet-name">VENUS</div>
      <div v-on:click="toEarth" id="earth" class="planet-circle"></div>
      <div id="earth-name" class="planet-name">EARTH</div>
      <div v-on:click="toMars" id="mars" class="planet-circle"></div>
      <div id="mars-name" class="planet-name">MARS</div>
      <div v-on:click="toJupiter" id="jupiter" class="planet-circle"></div>
      <div id="jupiter-name" class="planet-name">JUPITER</div>
      <div v-on:click="toSaturn" id="saturn" class="planet-circle"></div>
      <div id="saturn-name" class="planet-name">SATURN</div>
      <div v-on:click="toUranus" id="uranus" class="planet-circle"></div>
      <div id="uranus-name" class="planet-name">URANUS</div>
      <div v-on:click="toNeptune" id="neptune" class="planet-circle"></div>
      <div id="neptune-name" class="planet-name">NEPTUNE</div>
    </ul>

    <NuxtPage :planet="Planet_textposition" :sign="Sign_textPosition" />

  </div>
</template>

<script setup>
import * as THREE from "three";
import { WebGL } from "~/assets/js/module_WebGL";
import { WebGL_info } from "~/assets/js/planet_information/information_WebGL";
import { Three_Planet } from "~/assets/js/module_PLANET";
import { Three_Sign } from "~/assets/js/module_SIGN";
import { Information } from "~/assets/js/planet_information/planet_information";
import { Sign_Information } from "~/assets/js/planet_information/sign_information";

let Planet_textposition = {
  name: ref({ x: 0, y: 0 }),
  size: ref({ x: 0, y: 0 }),
  distance: ref({ x: 0, y: 0 }),
  revolution: ref({ x: 0, y: 0 }),
  rotation: ref({ x: 0, y: 0 }),
};

let Sign_textPosition = {
  name: ref({ x: 0, y: 0 }),
  copy: ref({ x: 0, y: 0 }),
  body: ref({ x: 0, y: 0 }),
};

let THREE_PLANET;
let THREE_SIGN;

let PlanetInformation;
let SignInformation;

let styleMode = true;
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
    THREE_PLANET.watch();
    THREE_SIGN.watch();
    PlanetInformation.watch();
    SignInformation.watch();
  },
);

// ====================================================================================================
// MOUNTED
// ====================================================================================================
onMounted(() => {
  const container1 = document.getElementById("webgl-canvas-1");
  const container2 = document.getElementById("webgl-canvas-2");
  WEBGL = new WebGL(container1);
  WEBGL2 = new WebGL_info(container2)

  function init() {
    three_stardust();

    THREE_PLANET = new Three_Planet();
    THREE_PLANET.add_planet(WEBGL.scene);
    THREE_PLANET.add_orbit(WEBGL.scene);
    THREE_PLANET.watch();

    THREE_SIGN = new Three_Sign();
    THREE_SIGN.add_Sign(WEBGL.scene);
    THREE_SIGN.add_Trajectory(WEBGL.scene);
    THREE_SIGN.watch();

    PlanetInformation = new Information(WEBGL2.scene);
    PlanetInformation.watch();

    SignInformation = new Sign_Information(WEBGL2.scene);
    SignInformation.watch();

    WEBGL.setting_planetDistance(THREE_PLANET);

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

    Planet_textposition.name.value = toScreen(PlanetInformation.textNamePosition);
    Planet_textposition.size.value = toScreen(PlanetInformation.textSizePosition);
    Planet_textposition.distance.value = toScreen(PlanetInformation.textDistancePosition);
    Planet_textposition.revolution.value = toScreen(PlanetInformation.textRevolutionPosition);
    Planet_textposition.rotation.value = toScreen(PlanetInformation.textRotationPosition);

    Sign_textPosition.name.value = toScreen(SignInformation.head.textNamePosition);
    Sign_textPosition.copy.value = toScreen(SignInformation.head.textCopyPosition);
    Sign_textPosition.body.value = toScreen(SignInformation.body.textBodyPosition);

    SignInformation.update();

    rendering_style(WEBGL.camera);
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

function StyleAllView(){
  const circle = document.querySelectorAll(".planet-circle");
  const name = document.querySelectorAll(".planet-name");
  for (let i = 0; i < circle.length; i++) {
    if(!circle[i].classList.contains("view")){
      circle[i].classList.remove("hide");
      circle[i].classList.add("view");
    } else {
      // no script
    }
  };
  for(let i = 0; i < name.length; i++){
    if(!name[i].classList.contains("view")){
      name[i].classList.remove("hide");
      name[i].classList.add("view");
    } else {
      // no script
    }
  };
};

function StyleAllHide() {
  const circle = document.querySelectorAll(".planet-circle");
  const name = document.querySelectorAll(".planet-name");
  for (let i = 0; i < circle.length; i++) {
    if(!circle[i].classList.contains("hide")){
      circle[i].classList.remove("view");
      circle[i].classList.add("hide");
    } else {
      // no script
    }
  };
  for(let i = 0; i < name.length; i++){
    if(!name[i].classList.contains("hide")){
      name[i].classList.remove("view");
      name[i].classList.add("hide");
    } else {
      // no script
    }
  };
};

function StyleViewMode(){
  if(styleMode){
    StyleAllView();
  } else {
    StyleAllHide();
  }
};

function rendering_style(camera) {
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

  // リファクタリングした方がいいかも
  const cameraPosition = camera.position.clone();
  const max = au * 500;
  if (max < cameraPosition.x || cameraPosition.x < -max || max < cameraPosition.y || cameraPosition.y < -max || max < cameraPosition.z || cameraPosition.z < -max) {
    styleMode = false;
    StyleAllHide();
  } else {
    styleMode = true;
    StyleAllView();
  }
};

function noAutoPlay(){
  WEBGL.autoPlayCount = 0;
}
</script>