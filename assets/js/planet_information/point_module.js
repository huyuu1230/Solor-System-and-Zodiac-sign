import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

class Circle{
    constructor(radius,segment){
        this.radius = radius;
        this.segment = segment;
        this.thetaStart = (0 * Math.PI) / 180;
        this.thetaEnd = (360 * Math.PI) / 180;
        this.init();
    };
    init(){
        this.createMesh();
    };
    createMesh(){
        this.geometry = new THREE.CircleGeometry(this.radius, this.segment,this.thetaStart,this.thetaEnd);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };
    move(){
        requestAnimationFrame(this._moveUpdate);
    };
    _moveUpdate(){
        this.thetaEnd += Math.PI / 180;
    }
};