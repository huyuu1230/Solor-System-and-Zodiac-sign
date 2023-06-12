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

