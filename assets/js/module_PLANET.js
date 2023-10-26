import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as PLANET from "~/assets/js/data_planets";

// ==================================================
// 変数 : 半径・距離・公転・自転に関する変数
// ==================================================
let earthRadius = 100;
let earthDiameter = earthRadius * 2;
let earthRevolution = (360 / 365 / 60 * Math.PI) / 180;
let earthRotation = (360 / 60 * Math.PI) / 180;
let sunRadius = earthRadius * 219.08;
let au = earthRadius * 23533.69;
let ly = au * 63241;
let pc = ly * 3.26;

// ==================================================
// PlanetSun : 太陽の作成
// ==================================================
class Planet_Sun {
    constructor() {
        this.radius = sunRadius;
        this.width = 10;
        this.height = 10;
        this.init();
    }
    init() {
        this.compute();
        this.create();
    }
    compute() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    create() {
        this.geometry = new THREE.SphereGeometry(this.radius, this.width, this.height);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
        this.mesh.name = "sun";
    }
};

// ==================================================
// Planet : 惑星の作成
// ==================================================
class Planet {
    constructor(name, radius, distance, revolution, rotation, alpha, delta) {
        this.name = name;
        this.radius = radius;
        this.distance = distance;
        this.revolution = revolution;
        this.rotation = rotation;
        this.alpha = alpha;
        this.delta = delta;
        this.width = 10;
        this.height = 10;
        this.init();
    };
    init() {
        this.compute();
        this.createMesh();
        this.position();
    };
    compute() {
        this.computeRadius = earthRadius * this.radius;
        this.computeDistance = sunRadius + au * this.distance;
        this.computeRevolution = earthRevolution / this.revolution;
        this.computeRotation = earthRotation / this.rotation;
        this.alphaRad = (this.alpha * Math.PI) / 180;
        this.deltaRad = (this.delta * Math.PI) / 180;
    };
    createMesh() {
        this.geometry = new THREE.SphereGeometry(this.computeRadius, this.width, this.height);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };
    position() {
        this.x = this.computeDistance * Math.sin(this.alphaRad) * Math.cos(this.deltaRad);
        this.y = this.computeDistance * Math.sin(this.alphaRad) * Math.sin(this.deltaRad);
        this.z = this.computeDistance * Math.cos(this.alphaRad);
        this.mesh.position.set(this.x, this.y, this.z);
    };
    update() {
        // -----Revolution
        this.alphaRad += this.computeRevolution;
        // -----Rotation
        this.mesh.rotation.y += this.computeRotation;
        this.position();
    };
};

// ==================================================
// Orbit : 惑星の軌道の作成
// ==================================================
class Orbit {
    constructor(distance) {
        this.distance = distance;
        this.orbitPoints = [];
        this.orbitPointNum = 3600;
        this.init();
    };
    init() {
        this.compute();
        this.create();
    };
    compute() {
        this.computeDistance = sunRadius + au * this.distance;
        for (let i = 0; i <= this.orbitPointNum; i++) {
            const rad = ((360 / this.orbitPointNum) * i * Math.PI) / 180;
            const x = this.computeDistance * Math.cos(rad);
            const y = 0;
            const z = this.computeDistance * Math.sin(rad);
            const p = new THREE.Vector3(x, y, z);
            this.orbitPoints.push(p);
        };
    };
    create() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.orbitPoints
        );
        this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.mesh = new THREE.Line(this.geometry, this.material);
    };
};

// ==================================================
// Three_Planet : 惑星と軌道を作成するクラス
// ==================================================
export class Three_Planet {
    constructor() {
        this.init();
    };

    init() {
        this.create_planet();
        this.create_orbit()
    };

    create_planet() {
        this.Sun = new Planet_Sun()
        this.Mercury = this.#createPlanet(PLANET.Mercury);
        this.Venus = this.#createPlanet(PLANET.Venus);
        this.Earth = this.#createPlanet(PLANET.Earth);
        this.Mars = this.#createPlanet(PLANET.Mars);
        this.Jupiter = this.#createPlanet(PLANET.Jupiter);
        this.Saturn = this.#createPlanet(PLANET.Saturn);
        this.Uranus = this.#createPlanet(PLANET.Uranus);
        this.Neptune = this.#createPlanet(PLANET.Neptune);
    };
    
    add_planet(scene) {
        scene.add(this.Sun.mesh);
        scene.add(this.Mercury.mesh);
        scene.add(this.Venus.mesh);
        scene.add(this.Earth.mesh);
        scene.add(this.Mars.mesh);
        scene.add(this.Jupiter.mesh);
        scene.add(this.Saturn.mesh);
        scene.add(this.Uranus.mesh);
        scene.add(this.Neptune.mesh);
    };

    create_orbit() {
        this.MercuryOrbit = new Orbit(PLANET.Mercury.distance);
        this.VenusOrbit = new Orbit(PLANET.Venus.distance);
        this.EarthOrbit = new Orbit(PLANET.Earth.distance);
        this.MarsOrbit = new Orbit(PLANET.Mars.distance);
        this.JupiterOrbit = new Orbit(PLANET.Jupiter.distance);
        this.SaturnOrbit = new Orbit(PLANET.Saturn.distance);
        this.UranusOrbit = new Orbit(PLANET.Uranus.distance);
        this.NeptuneOrbit = new Orbit(PLANET.Neptune.distance);
    };

    add_orbit(scene) {
        scene.add(this.MercuryOrbit.mesh);
        scene.add(this.VenusOrbit.mesh);
        scene.add(this.EarthOrbit.mesh);
        scene.add(this.MarsOrbit.mesh);
        scene.add(this.JupiterOrbit.mesh);
        scene.add(this.SaturnOrbit.mesh);
        scene.add(this.UranusOrbit.mesh);
        scene.add(this.NeptuneOrbit.mesh);
    };

    update() {
        this.Mercury.update();
        this.Venus.update();
        this.Earth.update();
        this.Mars.update();
        this.Jupiter.update();
        this.Saturn.update();
        this.Uranus.update();
        this.Neptune.update();
    };

    #createPlanet(data) {
        return new Planet(data.name, data.radius, data.distance, data.revolution, data.rotation, data.alpha, data.delta);
    };
};