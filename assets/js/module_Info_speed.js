import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

export class Line {
    constructor(planet,start, end) {
        this.radius = planet.computeRadius * 0.22;
        this.start = start.clone();
        this.end = end.clone();
        this.weight = (this.radius / 100) * 4;
        this.init();
    };

    init(){
        this.createMesh();
    };

    createMesh() {
        this.line = new MeshLine();
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            [
                this.start,
                this.end
            ]
        );
        this.line.setGeometry(this.geometry);
        this.material = new MeshLineMaterial({
            color: 0xffffff,
            lineWidth: this.weight,
        });
        this.mesh = new THREE.Mesh(this.line, this.material);
    };
    update(start,end) {
        this.start = start.clone();
        this.end = end.clone();
        const newGeo = new THREE.BufferGeometry().setFromPoints(
            [
                this.start,
                this.end
            ]
        );
        this.mesh.geometry.setGeometry(newGeo)
    };
};