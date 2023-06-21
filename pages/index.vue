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
    camera.position.set(0, 500, +3000);

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

    // ----------惑星を生成するクラス
    class Planet {
      constructor(radius, orbitRadius, phiSpeed) {
        this.r = earthRaddius * radius;
        this.w = this.r / 5;
        this.h = this.r / 5;
        this.or = earthOrbitRaddius * orbitRadius;
        this.phi = toRad(0);
        this.theta = toRad(0);
        this.phiSpeed = earthPhiSpeed / phiSpeed;
        this.x = this.or * Math.cos(this.phi);
        this.y = this.or * Math.sin(this.theta);
        this.z = this.or * Math.sin(this.phi);
        this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
        this.material = new THREE.MeshBasicMaterial({
          color: 0x000000,
          wireframe: true,
        });
        this.planet = new THREE.Mesh(this.geometry, this.material);
        this.planet.position.set(this.x, this.y, this.z);
        scene.add(this.planet);
      }
      update() {
        this.phi += this.phiSpeed;
        this.x = this.or * Math.cos(this.phi);
        this.y = this.or * Math.sin(this.theta);
        this.z = this.or * Math.sin(this.phi);
        this.planet.position.set(this.x, this.y, this.z);
      }
    }
    const Mercury = new Planet(0.38, 0.39, 0.24);
    const Venus = new Planet(0.95, 0.72, 0.62);
    const Mars = new Planet(0.53, 1.52, 1.88);








    // ----------軌道
    createLine();

    //*****************************************
    // 線を作成
    //*****************************************
    function createLine() {
      const points = [];
      const pointNum = 360;
      for (let i = 0; i <= pointNum; i++) {
        const rad = toRad(360 / pointNum * i);

        const x = earthOrbitRaddius * Math.cos(rad);        
        const y = 0;
        const z = earthOrbitRaddius * Math.sin(rad);;
        const p = new THREE.Vector3(x, y, z);
        points.push(p);
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: 0x000000 });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
    }








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
      Mercury.update();
      Venus.update();
      Mars.update();

      renderer.render(scene, camera); // レンダリング
      requestAnimationFrame(tick);
    }
  }
  init();
});
</script>

