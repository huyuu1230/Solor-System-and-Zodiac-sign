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

    // -----Geometry___オブジェクトの形 , 大きさなど
    const geometry = new THREE.SphereGeometry(400, 30, 30);
    // -----Material___オブジェクトの質感 , 色など
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    // -----Mesh___Geometry と Materialをまとめて一つのオブジェクトにする
    const box = new THREE.Mesh(geometry, material);

    // -----半径
    const radius = 800;
    // -----仰角
    let phi = (toRad(45) * Math.PI) / 180;
    // -----方位角
    let theta = ((toRad(45) - 180) * Math.PI) / 180;
    // -----x座標
    const x = -1 * radius * Math.cos(phi) * Math.cos(theta);
    // -----y座標
    const y = radius * Math.sin(phi);
    // -----z座標
    const z = radius * Math.cos(phi) * Math.sin(theta);
    // -----position
    box.position.set(x, y, z);
    scene.add(box);

    const sphereGeometry = new THREE.SphereGeometry(200, 20, 20);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    const sphereR = 1200;
    let spherePhi = toRad(45);
    let sphereTheta = toRad(45);
    const sphereX = sphereR * Math.cos(spherePhi);
    const sphereY = Math.sin(1);
    const sphereZ = sphereR * Math.sin(spherePhi);
    sphere.position.set(sphereX, sphereY, sphereZ);

    scene.add(sphere);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      // -----加算する角度
      phi += toRad(0.5);
      // -----加算する方位角
      theta += toRad(0.5);
      // -----x座標
      const x = -2 * radius * Math.cos(phi) * Math.cos(theta);
      // -----y座標
      const y = radius * Math.sin(phi);
      // -----z座標
      const z = -2 *radius * Math.cos(phi) * Math.sin(theta);
      // -----position
      box.position.set(x, y, z);

      // ----------SPHERE
      // -----rotate
      sphere.rotation.x -= 0.01;
      sphere.rotation.y -= 0.01;
      spherePhi += toRad(0.5);
      sphereTheta += toRad(0.5)
      const sphereX = sphereR * Math.cos(spherePhi);
      const sphereY = 200 * Math.sin(sphereTheta) -100;
      const sphereZ = sphereR * Math.sin(spherePhi);
      sphere.position.set(sphereX, sphereY, sphereZ);
      console.log(sphereY)

      renderer.render(scene, camera); // レンダリング
      requestAnimationFrame(tick);
    }
  }
  init();
});
</script>

