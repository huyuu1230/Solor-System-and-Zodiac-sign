import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

class Circle {
    constructor(radius) {
        this.points = [];
        this.radius = radius * 0.6; // 100を1とした時、60が半径
        this.segment = 360;
        this.init();
    };
    init() {
        this.createMesh();
    };
    createMesh() {
        this.geometry = new THREE.CircleGeometry(this.radius, this.segment);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };
    update(theta, positionVec3) {
        const look = theta;
        const position = positionVec3.clone();
        this.mesh.rotation.set(0, look, 0);
        this.mesh.position.copy(position);
    };
};

class Round {
    constructor(radius, weight, angle) {
        this.points = [];
        this.radius = radius;
        this.weight = weight;
        this.angle = (angle * Math.PI) / 180;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        for (let i = 0; i < this.angle; i += Math.PI / 180) {
            const x = this.radius * Math.cos(i);
            const y = this.radius * Math.sin(i);
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        }
    };
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new MeshLine();
        this.line.setGeometry(this.geometry);
        this.material = new MeshLineMaterial({
            color: 0xffffff,
            lineWidth: this.weight,
        });
        this.mesh = new THREE.Mesh(this.line, this.material);
    };
    update(theta, position) {
        this.mesh.rotation.set(0, theta, 0); // 常にカメラの方向を向くように設定
        this.mesh.position.copy(position); // ポジションを惑星に対して一定の距離・角度に設定
    };
}

export class Point_Speed {
    constructor(planet) {
        this.base = planet.computeRadius * 0.22;
        this.theta = planet.alphaRad + (-90 * Math.PI) / 180;
        this.phi = planet.deltaRad;
        this.speed = planet.computeRevolution;
        this.radius = planet.computeRadius * 1.5;
        this.init();
    };
    init() {
        this.create();
    };
    create() {
        this.circle = new Circle(this.base);
        this.round_1 = new Round(this.base * 0.8, this.base / 100 * 4, 360);
        this.round_2 = new Round(this.base, this.base / 100 * 4, 360);
    };
    add(scene) {
        scene.add(this.circle.mesh);
        scene.add(this.round_1.mesh);
        scene.add(this.round_2.mesh);
    };
    update(planet) {
        // ====================POSITION====================
        const look = planet.alphaRad;
        const position = planet.mesh.position.clone();
        this.theta += this.speed;
        position.x += this.radius * Math.sin(this.theta) * Math.cos(this.phi);
        position.y += this.radius * Math.sin(this.theta) * Math.sin(this.phi) - this.radius;
        position.z += this.radius * Math.cos(this.theta);
        // ====================POSITION====================
        this.circle.update(look, position);
        this.round_1.update(look, position);
        this.round_2.update(look, position);
    };
};