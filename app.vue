
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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { data_Aries, data_Taurus, data_Gemini, data_Cancer, data_Leo, data_Virgo, data_Libra, data_Scorpius, data_Sagittarius, data_Capriconus, data_Aquarius, data_Pisces } from 'assets/js/data_signs';
const route = useRouter();

// ----------度からラジアンに変換
function toRad(deg) {
  return (deg * Math.PI) / 180;
};
// ----------ラジアンから度に変換
function toDeg(rad) {
  return rad * (180 / Math.PI);
};

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
// ----------星座を格納する変数
const Aries = [];
const Taurus = [];
const Gemini = [];
const Cancer = [];
const Leo = [];
const Virgo = [];
const Libra = [];
const Scorpius = [];
const Sagittarius = [];
const Capricornus = [];
const Aquarius = [];
const Pisces = [];

// -----規準となる地球の変数を定義
const earthRaddius = 1000;
// 地球の軌道半径
const earthOrbitRaddius = 12000;
// 緯度(方位角)の変化する値
// 1 / 60 一秒に一度
const earthPhiSpeed = toRad(1 / 600);
// 経度(仰角)の変化する値
const earthThetaSpeed = toRad(1);
// 自転の速度
// earthPhiSpeedの360倍 -> 公転が毎秒一度の時に自転が360度で毎秒一周する
const earthRotation = earthPhiSpeed * 360;

onMounted(() => {
  const container = document.getElementById("index");
  // ----------惑星を生成するクラス
  class Planet {
    constructor(name, radius, orbitRadius, phiSpeed, rotation) {
      this.r = earthRaddius * radius;
      if (radius <= 1) {
        this.w = this.r / 40;
        this.h = this.r / 40;
      } else {
        this.w = this.r / 400;
        this.h = this.r / 400;
      };
      this.or = earthOrbitRaddius * orbitRadius;
      this.phi = toRad(0);
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
    };
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
      };
      this.orbitGeometry = new THREE.BufferGeometry().setFromPoints(
        this.orbitPoints
      );
      this.orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      this.orbitMesh = new THREE.Line(this.orbitGeometry, this.orbitMaterial);
      scene.add(this.orbitMesh);
    };
    // -----惑星をアニメーションさせるメソッド
    update() {
      this.phi -= this.phiSpeed;
      this.x = this.or * Math.cos(this.phi) * Math.cos(this.theta);
      this.y = this.or * Math.sin(this.theta);
      this.z = this.or * Math.cos(this.theta) * Math.sin(this.phi);
      this.rotationY += this.rotationSpeed;
      this.planet.position.set(this.x, this.y, this.z);
      this.planet.rotation.y = this.rotationY;
    };
  };
  // ----------星座を作成するクラス
  class Sign {
    constructor(sign, name, alpha, delta) {
      this.radius = 3000000;
      this.alpha = (alpha * Math.PI) / 180;
      this.delta = (delta * Math.PI) / 180;
      // y と z どっちがどっち？
      this.x = this.radius * Math.cos(this.delta) * Math.cos(this.alpha);
      this.y = this.radius * Math.sin(this.delta);
      this.z = this.radius * Math.cos(this.delta) * Math.sin(this.alpha);
      this.geometry = new THREE.SphereGeometry(5000, 50, 50);
      this.material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      });
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.set(this.x, this.y, this.z);
      this.mesh.name = name;
      sign.push(this);
    };
  };
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
      100000000000
    );
    camera.position.set(0, 5000, 100000);
    scene.add(camera);
    // -----renderer
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#index"),
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  // --------------------Three.jsにオブジェクトを作成
  function threeWorld() {
    // -----惑星
    Mercury = new Planet("mercury", 0.38, 0.39, 0.24, 1);
    Mercury.orbit();
    Venus = new Planet("venus", 0.95, 0.72, 0.62, 1);
    Venus.orbit();
    Earth = new Planet("earth", 1, 1, 1, 1);
    Earth.orbit();
    Mars = new Planet("mars", 0.53, 1.52, 1.88, 1);
    Mars.orbit();
    Jupiter = new Planet("jupiter", 11.21, 5.2, 11.9, 1);
    Jupiter.orbit();
    Saturn = new Planet("saturn", 9.45, 9.58, 29.4, 1);
    Saturn.orbit();
    Uranus = new Planet("uranus", 4.01, 19.2, 83.8, 1);
    Uranus.orbit();
    Neptune = new Planet("neptune", 3.88, 30.0, 163.8, 1);
    Neptune.orbit();
    // -----星座
    createSign(Aries, data_Aries);
    createSign(Taurus, data_Taurus);
    createSign(Gemini, data_Gemini);
    createSign(Cancer, data_Cancer);
    createSign(Leo, data_Leo);
    createSign(Virgo, data_Virgo);
    createSign(Libra, data_Libra);
    createSign(Scorpius, data_Scorpius);
    createSign(Sagittarius, data_Sagittarius);
    createSign(Capricornus, data_Capriconus);
    createSign(Aquarius, data_Aquarius);
    createSign(Pisces, data_Pisces);
  };

  // --------------------コントロール関連
  // OrbitControl関連
  // Three.Raycaster 関連
  // clickEvent 関連
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
        }
      }
    };
  };

  // --------------------Rendering
  function rendering() {
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

  // 星座を格納する変数にデータの数だけクラスを作成しプッシュする関数
  // クラスではsceneにaddする処理を行っていない。この関数内にてaddしている。
  // 1 . 格納する配列
  // 2 . データのnameプロパティ
  // 3 . データのalphaプロパティ
  // 4 . データのdeltaプロパティ
  function createSign(sign, data) {
    for (let i = 0; i < data.length; i++) {
      new Sign(sign, data[i].name, data[i].alpha, data[i].delta);
      scene.add(sign[i].mesh);
    };
  };

});

// ----------水星をクリックした時の処理
function toMercury() {
  route.push("/mercury");
};
// ----------金星をクリックした時の処理
function toVenus() {
  route.push("/venus");
};
// ----------地球をクリックした時の処理
function toEarth() {
  route.push("/earth");
  // camera.position.set(0, 5000, 100000);
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