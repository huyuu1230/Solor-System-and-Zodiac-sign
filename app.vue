
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
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { toRad } from "assets/js/module";
import { Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpius, Sagittarius, Capriconus, Aquarius, Pisces } from "assets/js/zodiacSigns";

const route = useRouter();
const fontLoader = new FontLoader();
let Font;

// -----倍率
let zoomRatio = 1000;

let scene, camera, renderer;
let orbitControls;
let mouse;
let raycaster;
let clickFlg = false;
let moveFlg = false;
let currentOrbit;
// ----------惑星の変数
let Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune;
const orbits = [];
let MercuryToSun,
  VenusToSun,
  EarthToSun,
  MarsToSun,
  JupiterToSun,
  SaturnToSun,
  UranusToSun,
  NeptuneToSun;



// -----規準となる地球の変数を定義
// 地球の半径
const earthRaddius = 1000 / zoomRatio;
// 1AU
const au = earthRaddius * 23533.69;
// 1LY
const ly = au * 63241;
// 緯度(方位角)の変化する値
// 1 / 60 一秒に一度
const earthPhiSpeed = toRad(0.986 / 600);
// 経度(仰角)の変化する値
const earthThetaSpeed = toRad(1);
// 自転の速度
// earthPhiSpeedの360倍 -> 公転が毎秒一度の時に自転が360度で毎秒一周する
const earthRotation = earthPhiSpeed * 360;

// ----------SUN
const sunRaddius = earthRaddius * 219.08;

onMounted(() => {
  const container = document.getElementById("index");
  // ----------太陽を生成するクラス
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
  }

  // ----------惑星を生成するクラス
  class Planet {
    constructor(name, radius, orbitRadius, phi, phiSpeed, rotation) {
      this.r = earthRaddius * radius;
      this.w = this.r / 10;
      this.h = this.r / 10;
      this.or = au * orbitRadius + sunRaddius;
      this.phi = toRad(0) + toRad(phi);
      this.theta = toRad(0);
      this.phiSpeed = earthPhiSpeed / phiSpeed;
      this.thetaSpeed = earthThetaSpeed;
      this.x = this.or * Math.cos(this.phi) * Math.cos(this.theta);
      this.y = this.or * Math.sin(this.theta);
      this.z = this.or * Math.cos(this.theta) * Math.sin(this.phi);
      this.rotationX = toRad(0);
      this.rotationY = toRad(0);
      this.rotationSpeed = earthRotation * rotation;
      this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
      this.material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      });
      this.planet = new THREE.Mesh(this.geometry, this.material);
      this.planet.position.set(this.x, this.y, this.z);
      this.planet.name = name;
      scene.add(this.planet);
      orbits.push(this.planet);
    }
    // -----軌道を生成するメソッド
    orbit() {
      this.orbitPoints = [];
      this.orbitPointNum = 360;
      for (let i = 0; i <= this.orbitPointNum; i++) {
        const rad = toRad((360 / this.orbitPointNum) * i);
        const x = this.or * Math.cos(rad);
        const y = 0;
        const z = this.or * Math.sin(rad);
        const p = new THREE.Vector3(x, y, z);
        this.orbitPoints.push(p);
      }
      this.orbitGeometry = new THREE.BufferGeometry().setFromPoints(
        this.orbitPoints
      );
      this.orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      this.orbitMesh = new THREE.Line(this.orbitGeometry, this.orbitMaterial);
      scene.add(this.orbitMesh);
    }
    // -----惑星をアニメーションさせるメソッド
    update() {
      this.phi -= this.phiSpeed;
      this.x = this.or * Math.cos(this.phi) * Math.cos(this.theta);
      this.y = this.or * Math.sin(this.theta);
      this.z = this.or * Math.cos(this.theta) * Math.sin(this.phi);
      this.rotationY += this.rotationSpeed;
      this.planet.position.set(this.x, this.y, this.z);
      this.planet.rotation.y = this.rotationY;
    }
  }

  // --------------------星座
  class Sign {
    constructor(alpha, delta) {
      this.r = sunRaddius * 5
      this.w = 100;
      this.h = 100;
      this.or = 100 * au;
      this.alpha = (alpha * Math.PI) / 180;
      this.delta = (delta * Math.PI) / 180;
      this.x = this.or * Math.cos(this.delta) * Math.cos(this.alpha);
      this.y = this.or * Math.sin(this.delta);
      this.z = this.or * Math.cos(this.delta) * Math.sin(this.alpha);
      this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
      this.material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      });
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.set(this.x, this.y, this.z);
    };
    add(scene) {
      scene.add(this.mesh);
    };
  };

  // --------------------星座の軌跡
  class Trajectory {
    constructor(vectors) {
      this.starsPoints = [];
      for (let i = 0; i < vectors.length; i++) {
        this.starsPoints.push(vectors[i]);
      };
      this.geometry = new THREE.BufferGeometry().setFromPoints(this.starsPoints);
      this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
      this.mesh = new THREE.Line(this.geometry, this.material);
    };
    add(scene){
      scene.add(this.mesh);
    };
  };

  // ----------星座の作成・表示

  function createSign(sign) {
    for (let key in sign) {
      sign[key] = new Sign(sign[key].alpha, sign[key].delta);
    };
  };
  function addSign(sign) {
    for (let key in sign) {
      sign[key].add(scene)
    };
  };



  // --------------------フォント
  loadFont();
  function onLoadFont(font) {
    Font = font;
  }
  function loadFont() {
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", onLoadFont);
  }

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
    }
  }

  // --------------------様々な処理をここで実行
  function init() {
    setup();
    setControll();
    threeWorld();
    rendering();
  }
  init();

  // --------------------Setup_scene , camera , rendererの設定
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
  }

  function signs() {
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

    const Aries_line = new Trajectory([
      new THREE.Vector3(Aries.Alpha.x, Aries.Alpha.y, Aries.Alpha.z),
      new THREE.Vector3(Aries.Beta.x, Aries.Beta.y, Aries.Beta.z),
      new THREE.Vector3(Aries.Gamma.x, Aries.Gamma.y, Aries.Gamma.z),
      new THREE.Vector3(Aries.Delta.x, Aries.Delta.y, Aries.Delta.z)
    ]);
    Aries_line.add(scene);

    const Gemini_Trajectory = new Trajectory([
      new THREE.Vector3(Gemini.M35.x,Gemini.M35.y,Gemini.M35.z),
      new THREE.Vector3(Gemini.Eta.x,Gemini.Eta.y,Gemini.Eta.z),
      new THREE.Vector3(Gemini.Mu.x,Gemini.Mu.y,Gemini.Mu.z),
      new THREE.Vector3(Gemini.Epsilon.x,Gemini.Epsilon.y,Gemini.Epsilon.z),
      new THREE.Vector3(Gemini.Tau.x,Gemini.Tau.y,Gemini.Tau.z),
      new THREE.Vector3(Gemini.Alpha.x,Gemini.Alpha.y,Gemini.Alpha.z),
      new THREE.Vector3(Gemini.Beta.x,Gemini.Beta.y,Gemini.Beta.z),
      new THREE.Vector3(Gemini.Delta.x,Gemini.Delta.y,Gemini.Delta.z),
      new THREE.Vector3(Gemini.Zehta.x,Gemini.Zehta.y,Gemini.Zehta.z),
      new THREE.Vector3(Gemini.Gamma.x,Gemini.Gamma.y,Gemini.Gamma.z),
      new THREE.Vector3(Gemini.Xi.x,Gemini.Xi.y,Gemini.Xi.z)
    ]);
    Gemini_Trajectory.add(scene)
  };

  // --------------------Three.jsにオブジェクトを作成
  function threeWorld() {
    // -----太陽
    const sun = new Sun(sunRaddius, 100, 100);
    // -----惑星
    Mercury = new Planet("mercury", 0.38, 0.39, 262.07, 0.24, 1);
    Mercury.orbit();
    Venus = new Planet("venus", 0.95, 0.72, 239.69, 0.62, 1);
    Venus.orbit();
    Earth = new Planet("earth", 1, 1, 0, 1, 1);
    Earth.orbit();
    Mars = new Planet("mars", 0.53, 1.52, 266.24, 1.88, 1);
    Mars.orbit();
    Jupiter = new Planet("jupiter", 11.21, 5.2, 33.68, 11.9, 1);
    Jupiter.orbit();
    Saturn = new Planet("saturn", 9.45, 9.58, 335.69, 29.4, 1);
    Saturn.orbit();
    Uranus = new Planet("uranus", 4.01, 19.2, 47.04, 83.8, 1);
    Uranus.orbit();
    Neptune = new Planet("neptune", 3.88, 30.0, 355.95, 163.8, 1);
    Neptune.orbit();

    signs();

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
    )
  }

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
    }
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
      }
    }
  }

  // --------------------Rendering
  function rendering() {
    TWEEN.update();
    orbitControls.update();
    // -----惑星
    Mercury.update();
    Venus.update();
    Earth.update();
    Mars.update();
    Jupiter.update();
    Saturn.update();
    Uranus.update();
    Neptune.update();
    // -----Distance
    MercuryToSun.update(new THREE.Vector3(Mercury.x, Mercury.y, Mercury.z));
    VenusToSun.update(new THREE.Vector3(Venus.x, Venus.y, Venus.z));
    EarthToSun.update(new THREE.Vector3(Earth.x, Earth.y, Earth.z));
    MarsToSun.update(new THREE.Vector3(Mars.x, Mars.y, Mars.z));
    JupiterToSun.update(new THREE.Vector3(Jupiter.x, Jupiter.y, Jupiter.z));
    SaturnToSun.update(new THREE.Vector3(Saturn.x, Saturn.y, Saturn.z));
    UranusToSun.update(new THREE.Vector3(Uranus.x, Uranus.y, Uranus.z));
    NeptuneToSun.update(new THREE.Vector3(Neptune.x, Neptune.y, Neptune.z));

    // -----Three_Raycaster
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(orbits, false);
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
  }


});

// ----------水星をクリックした時の処理
function toMercury() {
  route.push("/planets/mercury");
  animateCameraPos(Mercury.x * 1.1, Mercury.y * 1.1, Mercury.z * 1.1);
}
// ----------金星をクリックした時の処理
function toVenus() {
  route.push("/planets/venus");
  animateCameraPos(Venus.x * 1.5, Venus.y * 1.5, Venus.z * 1.5);
}
// ----------地球をクリックした時の処理
function toEarth() {
  route.push("/planets/earth");
  animateCameraPos(Earth.x * 1.5, Earth.y * 1.5, Earth.z * 1.5);
}
// ----------火星をクリックした時の処理
function toMars() {
  route.push("/planets/mars");
  animateCameraPos(Mars.x * 1.5, Mars.y * 1.5, Mars.z * 1.5);
}
// ----------木星をクリックした時の処理
function toJupiter() {
  route.push("/planets/jupiter");
  animateCameraPos(Jupiter.x * 1.5, Jupiter.y * 1.5, Jupiter.z * 1.5);
}
// ----------土星をクリックした時の処理
function toSaturn() {
  route.push("/planets/saturn");
  animateCameraPos(Saturn.x * 1.5, Saturn.y * 1.5, Saturn.z * 1.5);
}
// ----------天王星をクリックした時の処理
function toUranus() {
  route.push("/planets/uranus");
  animateCameraPos(Uranus.x * 1.5, Uranus.y * 1.5, Uranus.z * 1.5);
}
// ----------海王星をクリックした時の処理
function toNeptune() {
  route.push("/planets/neptune");
  animateCameraPos(Neptune.x * 1.5, Neptune.y * 1.5, Neptune.z * 1.5);
}
// ----------指定の場所までカメラをアニメーションさせながら移動
function animateCameraPos(x, y, z) {
  const coords = camera.position;
  const destinationVector = new THREE.Vector3(x, y, z);
  const DURATION = 3000;
  const tween = new TWEEN.Tween(coords)
    .to(destinationVector, DURATION)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();
}


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