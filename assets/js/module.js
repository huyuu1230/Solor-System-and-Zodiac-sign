import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js';


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

class Sign {
    constructor(sign, name, alpha, delta) {
        this.radius = 3000000;
        this.alpha = (alpha * Math.PI) / 180;
        this.delta = (delta * Math.PI) / 180;
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

// ----------度からラジアンに変換
function toRad(deg) {
    return (deg * Math.PI) / 180;
};
// ----------ラジアンから度に変換
function toDeg(rad) {
    return rad * (180 / Math.PI);
};
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

export { Planet, Sign, createSign, toRad, toDeg,animateCameraPos }