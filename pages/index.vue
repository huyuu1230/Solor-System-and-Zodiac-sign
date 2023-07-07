<template>
  <div>
    <h1>index</h1>
  </div>
</template>


<!-- <script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const route = useRouter();

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function ononon(){
  route.push('/camera')
}

let scene, camera, renderer;
let orbitControls;
let mouse;
let raycaster;
let clickFlg = false;
let moveFlg = false;
let Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune;
const orbits = [];

// -----規準となる地球の変数を定義
const earthRaddius = 1000;
// 地球の軌道半径
const earthOrbitRaddius = 12000;
// 緯度(方位角)の変化する値
const earthPhiSpeed = toRad(1) / 60;
// 経度(仰角)の変化する値
const earthThetaSpeed = toRad(1);
// 自転の速度
const earthRotation = toRad(1);


onMounted(() => {
  const container = document.getElementById("index");
  // ----------惑星を生成するクラス
  class Planet {
    constructor(name, radius, orbitRadius, phiSpeed, rotation) {
      this.r = earthRaddius * radius;
      if (radius <= 1) {
        this.w = this.r / 70;
        this.h = this.r / 70;
      } else if (radius > 1 && radius <= 5) {
        this.w = this.r / 500;
        this.h = this.r / 500;
      } else {
        this.w = this.r / 500;
        this.h = this.r / 500;
      }
      this.or = earthOrbitRaddius * orbitRadius;
      this.phi = toRad(0);
      this.theta = toRad(0);
      this.phiSpeed = earthPhiSpeed / phiSpeed;
      this.x = this.or * Math.cos(this.phi);
      this.y = this.or * Math.sin(this.theta);
      this.z = this.or * Math.sin(this.phi);
      this.rotationX = toRad(0);
      this.rotationY = toRad(0);
      this.rotationSpeed = earthRotation * rotation;
      this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
      this.material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
      });
      this.planet = new THREE.Mesh(this.geometry, this.material);
      this.planet.position.set(this.x, this.y, this.z);
      this.planet.name = name
      scene.add(this.planet);
      orbits.push(this.planet)
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
      this.orbitMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
      this.orbitMesh = new THREE.Line(this.orbitGeometry, this.orbitMaterial);
      scene.add(this.orbitMesh);
    }
    // -----惑星をアニメーションさせるメソッド
    update() {
      this.phi += this.phiSpeed;
      this.x = this.or * Math.cos(this.phi);
      this.y = this.or * Math.sin(this.theta);
      this.z = this.or * Math.sin(this.phi);
      this.rotationY += this.rotationSpeed;
      this.planet.position.set(this.x, this.y, this.z);
      this.planet.rotation.y = this.rotationY;
    }
  }

  function init() {
    setup();
    setControll();
    threeWorld();
    rendering();
  }
  init();

  function setup() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000000);
    camera.position.set(0, 5000, 100000);
    scene.add(camera);
    // -----renderer
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#index"),
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function threeWorld() {
    // -----惑星
    Mercury = new Planet('mercury', 0.38, 0.39, 0.24, 1);
    Mercury.orbit();
    Venus = new Planet('venus', 0.95, 0.72, 0.62, 1);
    Venus.orbit();
    Earth = new Planet('earth', 1, 1, 1, 1);
    Earth.orbit();
    Mars = new Planet('mars', 0.53, 1.52, 1.88, 1);
    Mars.orbit();
    Jupiter = new Planet('jupiter', 11.21, 5.2, 11.9, 1);
    Jupiter.orbit();
    Saturn = new Planet('saturn', 9.45, 9.58, 29.4, 1);
    Saturn.orbit();
    Uranus = new Planet('uranus', 4.01, 19.2, 83.8, 1);
    Uranus.orbit();
    Neptune = new Planet('neptune', 3.88, 30.0, 163.8, 1);
    Neptune.orbit();
  }

  function setControll() {
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 0, 0);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.5;

    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

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
    function handleClick(event) {
      if (clickFlg) {
        ononon()
      }
    }
  }

  function rendering() {
    if (orbitControls) {
      orbitControls.update();
    }
    // -----惑星
    Mercury.update();
    Venus.update();
    Earth.update();
    Mars.update();
    Jupiter.update();
    Saturn.update();
    Uranus.update();
    Neptune.update();

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(orbits, false);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (obj.name == 'mercury') {
        if (moveFlg) {
          clickFlg = true;
        }
      } else if (obj.name == 'venus') {
        if (moveFlg) {
          clickFlg = true;
        }
      } else if (obj.name == 'earth') {
        if (moveFlg) {
          clickFlg = true;
        }
      }
      else {
        clickFlg = false;
      }
    } else {
      clickFlg = false;
    }

    if (clickFlg) {
      container.style.cursor = 'pointer';
    } else {
      container.style.cursor = 'grab';
    }
    // -----レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(rendering);
  }

});
</script>
 -->
