<template>
  <div>
    <canvas id="index"></canvas>
  </div>
</template>


<script setup>
import * as THREE from "three";

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

onMounted(() => {
  let scene, camera, renderer;
  let width = window.innerWidth;
  let height = window.innerHeight;

  function init() {
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#index"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    camera = new THREE.PerspectiveCamera(100, width / height, 5000, 0);
    camera.position.set(0, 0, +1500);

    // -----規準となる地球の変数を定義
    const earthRaddius = 100;
    const earthWidth = earthRaddius / 5;
    const earthHeight = earthRaddius / 5;
    // 地球の軌道半径
    const earthOrbitRaddius = 1200;
    let earthPhi = toRad(0);
    let earthTheta = toRad(0);
    // 緯度(方位角)の変化する値
    const earthPhiSpeed = toRad(0.75);
    // 経度(仰角)の変化する値
    const earthThetaSpeed = toRad(0.75);
    // x , y , z それぞれの座標
    const earthX = earthOrbitRaddius * Math.cos(earthPhi);
    const earthY = earthOrbitRaddius * Math.sin(earthTheta);
    const earthZ = earthOrbitRaddius * Math.sin(earthPhi);

    // 地球の3Dオブジェクトを作成
    const EarthGeometry = new THREE.SphereGeometry(
      earthRaddius,
      earthWidth,
      earthHeight
    );
    const EarthMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    const Earth = new THREE.Mesh(EarthGeometry, EarthMaterial);
    Earth.position.set(earthX, earthY, earthZ);
    scene.add(Earth);

    //----------水星
    const mercuryRaddius = earthRaddius * 0.38;
    const mercuryW = mercuryRaddius / 5;
    const mercuryH = mercuryRaddius / 5;
    const mercuryOrbitRaddius = earthOrbitRaddius * 0.39;
    let mercuryPhi = toRad(0);
    let mercuryTheta = toRad(0);
    const mercuryPhiSpeed = earthPhiSpeed / 0.24;
    const mercuryX = mercuryOrbitRaddius * Math.cos(mercuryPhi);
    const mercuryY = mercuryOrbitRaddius * Math.sin(mercuryTheta);
    const mercuryZ = mercuryOrbitRaddius * Math.sin(mercuryPhi);
    // -----水星の3Dオブジェクト
    const MercuryGeometry = new THREE.SphereGeometry(
      mercuryRaddius,
      mercuryW,
      mercuryH
    );
    const MercuryMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    const Mercury = new THREE.Mesh(MercuryGeometry, MercuryMaterial);
    Mercury.position.set(mercuryX, mercuryY, mercuryZ);
    scene.add(Mercury);

    // ----------金星
    // function createOrbit(r,or,phi,){
    //   const planetRaddius = earthRaddius * r;
    //   const planetW = planetRaddius / 5;
    //   const planetH = planetRaddius / 5;
    //   const planetOrbitRaddius = earthOrbitRaddius * or;
    //   let planetPhi = toRad(0);
    //   let planetTheta = toRad(0);
    //   const planetPhiSpeed = earthPhiSpeed / phi;
    //   const planetX = planetOrbitRaddius * Math.cos(planetPhi);
    //   const planetY = planetOrbitRaddius * Math.sin(planetTheta);
    //   const planetZ = planetOrbitRaddius * Math.sin(planetPhi);
    //   const PlanetGeometry = new THREE.SphereGeometry(
    //     planetRaddius,
    //     planetW,
    //     planetH,
    //   );
    //   const PlanetMaterial = new THREE.MeshBasicMaterial({
    //     color:0x000000,
    //     wireframe:true,
    //   });
    //   const Planet = new THREE.Mesh(PlanetGeometry,PlanetMaterial);
    //   Planet.position.set(planetX,planetY,planetZ);
    //   scene.add(Planet);
    // }

    class Planet {
      constructor(radius) {
        this.r = earthRaddius * radius;
        this.w = this.r /5;
        this.h = this.r /5
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
        this.material = new THREE.MeshBasicMaterial({
          color: 0x000000,
          wireframe: true,
        });
        this.planet = new THREE.Mesh(this.geometry, this.material);
        this.planet.position.set(this.x,this.y,this.z)
        scene.add(this.planet);
      }
    }
    const venus = new Planet(0.95);
   

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // -----地球
      earthPhi += earthPhiSpeed;
      // earthTheta += earthThetaSpeed;
      const earthX = earthOrbitRaddius * Math.cos(earthPhi);
      const earthY = earthOrbitRaddius * Math.sin(earthTheta);
      const earthZ = earthOrbitRaddius * Math.sin(earthPhi);
      Earth.position.set(earthX, earthY, earthZ);
      // -----水星
      mercuryPhi += mercuryPhiSpeed;
      const mercuryX = mercuryOrbitRaddius * Math.cos(mercuryPhi);
      const mercuryY = mercuryOrbitRaddius * Math.sin(mercuryTheta);
      const mercuryZ = mercuryOrbitRaddius * Math.sin(mercuryPhi);
      Mercury.position.set(mercuryX, mercuryY, mercuryZ);

      renderer.render(scene, camera); // レンダリング
      requestAnimationFrame(tick);
    }
  }
  init();
});
</script>

