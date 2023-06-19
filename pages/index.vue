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
    const earthWidth = earthRaddius / 10;
    const earthHeight = earthRaddius / 10
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
    const EarthGeometry = new THREE.SphereGeometry(earthRaddius, earthWidth, earthHeight);
    const EarthMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    const Earth = new THREE.Mesh(EarthGeometry, EarthMaterial);
    Earth.position.set(earthX, earthY, earthZ);
    scene.add(Earth);


    // -----地球
    const sphereGeometry = new THREE.SphereGeometry(200, 20, 20);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    const sphereR = 1200;
    let spherePhi = toRad(0);
    let sphereTheta = toRad(0);
    const sphereX = sphereR * Math.cos(spherePhi);
    const sphereY = Math.sin(1);
    const sphereZ = sphereR * Math.sin(spherePhi);
    sphere.position.set(sphereX, sphereY, sphereZ);
    scene.add(sphere);

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

      spherePhi += toRad(0.5);
      sphereTheta += toRad(0.5);
      const sphereX = sphereR * Math.cos(spherePhi);
      const sphereY = sphereR / 10 * Math.sin(sphereTheta) - 100;
      const sphereZ = sphereR * Math.sin(spherePhi);
      sphere.position.set(sphereX, sphereY, sphereZ);


      renderer.render(scene, camera); // レンダリング
      requestAnimationFrame(tick);
    }
  }
  init();
});
</script>

