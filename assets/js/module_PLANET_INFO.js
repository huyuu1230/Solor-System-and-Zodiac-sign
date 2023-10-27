import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

const px50 = 50;

class Circle_01 {
    constructor(radius) {
        this.radius = radius;
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
    look(theta) {
        this.mesh.rotation.set(0, theta, 0)
    }
    position(vec3) {
        const position = vec3.clone();
        this.mesh.position.copy(position);
    };
    update(theta, vec3) {
        this.position(vec3);
        this.look(theta)
    };
};


// Information_Point とかの方がわかりやすいか？
export class Information_Button {
    constructor(planet) {
        this.base = planet.computeRadius * 0.22;
        this.init();
        this.theta = (90 * Math.PI) / 180;
        this.phi = (0 * Math.PI) / 180;
    };
    init() {
        this.createMesh();
    };
    createMesh() {
        this.circle_01 = new Circle_01(this.base);
    };
    add(scene) {
        scene.add(this.circle_01.mesh);
    };
    update(planet) {
        const look = planet.alphaRad;
        const position = planet.mesh.position.clone();
        const radius = planet.computeRadius * 2;
        this.theta += planet.computeRevolution;
        position.x += radius * Math.sin(this.theta) * Math.cos(this.phi);
        position.y += radius * Math.sin(this.theta) * Math.sin(this.phi) + radius;
        position.z += radius * Math.cos(this.theta);

        this.circle_01.update(look, position);
    }
}