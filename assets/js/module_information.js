import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

/* 惑星の情報に関するプログラムをまとめたJavascriptファイルです。
 * Text_PlanetName : 惑星の名前
 * Text_PlanetHead : 惑星の情報の見出し
 * Text_PlanetBody : 惑星の情報の本文
 * Planet_Information : 名前・見出し・本文をまとめて作成
 * information_〇〇 : 惑星ごとに情報を作成する関数
*/

// ==================================================
// 惑星の名前
// ==================================================
class Text_PlanetName {
    constructor(font, text, size, r, theta, phi) {
        this.font = font;
        this.text = text;
        this.size = size;
        this.r = r;
        this.theta = (theta * Math.PI) / 180;
        this.phi = (phi * Math.PI) / 180;
        this.init()
    }
    init() {
        this.geometry = new TextGeometry(
            this.text,
            {
                font: this.font,
                size: this.size,
                height: 0.1,
            }
        );
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };

    update(vec3, camera) {
        const basicVec3 = vec3;
        this.theta += (0.1 * Math.PI) / 180;
        this.mesh.position.x = basicVec3.x + this.r * Math.sin(this.theta) * Math.cos(this.phi);
        this.mesh.position.y = basicVec3.y + this.r * Math.sin(this.theta) * Math.sin(this.phi);
        this.mesh.position.z = basicVec3.z + this.r * Math.cos(this.theta);
        const cameraVec3 = camera.position.clone();
        this.mesh.lookAt(cameraVec3.x, cameraVec3.y, cameraVec3.z);
    };
};
// ==================================================
// 惑星の見出し
// ==================================================
class Text_PlanetHead {
    constructor(font, text, size, r, theta, phi) {
        this.font = font;
        this.text = text;
        this.size = size;
        this.r = r;
        this.theta = (theta * Math.PI) / 180;
        this.phi = (phi * Math.PI) / 180;
        this.init()
    }
    init() {
        this.geometry = new TextGeometry(
            this.text,
            {
                font: this.font,
                size: this.size,
                height: 0.1,
            }
        );
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };

    update(vec3, camera) {
        const basicVec3 = vec3;
        this.theta += (0.1 * Math.PI) / 180;
        this.mesh.position.x = basicVec3.x + this.r * Math.sin(this.theta) * Math.cos(this.phi);
        this.mesh.position.y = basicVec3.y + this.r * Math.sin(this.theta) * Math.sin(this.phi);
        this.mesh.position.z = basicVec3.z + this.r * Math.cos(this.theta);
        const cameraVec3 = camera.position.clone();
        this.mesh.lookAt(cameraVec3.x, cameraVec3.y, cameraVec3.z);
    };
};
// ==================================================
// 惑星の本文
// ==================================================
class Text_PlanetBody {
    constructor(font, text, size) {
        this.font = font;
        this.text = text;
        this.size = size;
        this.init();
    }
    init() {
        this.geometry = new TextGeometry(
            this.text,
            {
                font: this.font,
                size: this.size,
                height: 0.1,
            }
        );
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };

    update(vec3, camera) {
        const basicVec3 = vec3.mesh.position.clone();
        this.mesh.position.x = basicVec3.x;
        this.mesh.position.y = basicVec3.y - this.size * 2;
        this.mesh.position.z = basicVec3.z;
        const cameraVec3 = camera.position.clone();
        this.mesh.lookAt(cameraVec3.x, cameraVec3.y, cameraVec3.z);
    };
};
// ==================================================
// 惑星の情報まとめ
// ==================================================
class Planet_Information {
    constructor(scene, font, planet, planetName, sizeHead, sizeBody, disHead, disBody, revHead, revBody, rotHead, rotBody) {
        this.loader = new FontLoader();
        this.font = font;
        this.load = false;
        this.loader.load(this.font, (font) => {
            this.font = font;
            this.planetName = new Text_PlanetName(this.font, planetName, planet.computeRadius / 2, planet.computeRadius * 2, 0, 45);
            this.sizeHead = new Text_PlanetHead(this.font, sizeHead, planet.computeRadius / 4, planet.computeRadius * 4, 0, 15);
            this.sizeBody = new Text_PlanetBody(this.font, sizeBody, planet.computeRadius / 5);
            this.distanceHead = new Text_PlanetHead(this.font, disHead, planet.computeRadius / 4, planet.computeRadius * 4, 90, 30);
            this.distanceBody = new Text_PlanetBody(this.font, disBody, planet.computeRadius / 5);
            this.revolutionHead = new Text_PlanetHead(this.font, revHead, planet.computeRadius / 4, planet.computeRadius * 5, 180, 45);
            this.revolutionBody = new Text_PlanetBody(this.font, revBody, planet.computeRadius / 5);
            this.rotationHead = new Text_PlanetHead(this.font, rotHead, planet.computeRadius / 4, planet.computeRadius * 5, 270, 60);
            this.rotationBody = new Text_PlanetBody(this.font, rotBody, planet.computeRadius / 5);
            this.add(scene);
            this.load = true;
        });
    };

    add(scene) {
        scene.add(this.planetName.mesh);
        scene.add(this.sizeHead.mesh);
        scene.add(this.sizeBody.mesh);
        scene.add(this.distanceHead.mesh);
        scene.add(this.distanceBody.mesh);
        scene.add(this.revolutionHead.mesh);
        scene.add(this.revolutionBody.mesh);
        scene.add(this.rotationHead.mesh);
        scene.add(this.rotationBody.mesh);
    };

    update(planet, camera) {
        const planetPosition = planet.mesh.position.clone();
        if (this.load) {
            if (this.planetName.mesh) {
                this.planetName.update(planetPosition, camera);
            };
            if (this.sizeHead.mesh) {
                this.sizeHead.update(planetPosition, camera);
            };
            if (this.sizeBody.mesh) {
                this.sizeBody.update(this.sizeHead, camera);
            };
            if (this.distanceHead.mesh) {
                this.distanceHead.update(planetPosition, camera);
            };
            if (this.distanceBody.mesh) {
                this.distanceBody.update(this.distanceHead, camera);
            };
            if (this.revolutionHead.mesh) {
                this.revolutionHead.update(planetPosition, camera);
            };
            if (this.revolutionBody.mesh) {
                this.revolutionBody.update(this.revolutionHead, camera);
            };
            if (this.rotationHead.mesh) {
                this.rotationHead.update(planetPosition, camera);
            };
            if (this.rotationBody.mesh) {
                this.rotationBody.update(this.rotationHead, camera);
            };
        };
    };
};
// ==================================================
// 水星
// ==================================================
export function information_mercury(scene, font, planet) {
    const info = new Planet_Information(
        scene,
        font,
        planet,
        "M E R C U R Y",
        "diameter of the planet",
        "4,879km / 0.38(ratio to earth)",
        "distance to sun",
        "0.579million km / 0.39AU",
        "revolution speed",
        "0.24year (47.4km/s)",
        "rotation speed",
        "1407.60hour / 58.65day",
    );
    return info;
};
// ==================================================
// 金星
// ==================================================
export function information_venus(scene, font, planet) {
    const info = new Planet_Information(
        scene,
        font,
        planet,
        "V E N U S",
        "diameter of the planet",
        "12,104km / 0.95(ratio to earth)",
        "distance to sun",
        "1.082million km / 0.72AU",
        "revolution speed",
        "0.62year (35km/s)",
        "rotation speed",
        "5832hour / 243.02day",
    );
    return info;
};
// ==================================================
// 地球
// ==================================================
export function information_earth(scene, font, planet) {
    const info = new Planet_Information(
        scene,
        font,
        planet,
        "E A R T H",
        "diameter of the planet",
        "12,756km / 1(ratio to earth)",
        "distance to sun",
        "1.496million km / 1AU",
        "revolution speed",
        "1.0year(29.8km/s)",
        "rotation speed",
        "23.94hour",
    );
    return info;
};
// ==================================================
// 火星
// ==================================================
export function information_mars(scene, font, planet) {
    const info = new Planet_Information(
        scene,
        font,
        planet,
        "M A R S",
        "diameter of the planet",
        "6,792km / 0.53(ratio to earth)",
        "distance to sun",
        "2.279million km / 1.52AU",
        "revolution speed",
        "1.88year(24.1km/s)",
        "rotation speed",
        "24.62hour",
    );
    return info;
};
// ==================================================
// 木星
// ==================================================
export function information_jupiter(scene, font, planet) {
    const info = new Planet_Information(
        scene,
        font,
        planet,
        "J U P I T E R",
        "diameter of the planet",
        "142,984km / 11.21(ratio to earth)",
        "distance to sun",
        "7.783million km / 5.2AU",
        "revolution speed",
        "11.9year(13.1km/s)",
        "rotation speed",
        "9.92hour",
    );
    return info;
};
// ==================================================
// 土星
// ==================================================
export function information_saturn(scene, font, planet) {
    const info = new Planet_Information(
        scene,
        font,
        planet,
        "S A T U R N",
        "diameter of the planet",
        "120,536km / 9.45(ratio to earth)",
        "distance to sun",
        "14.294million km / 9.58AU",
        "revolution speed",
        "29.4year(9.7km/s)",
        "rotation speed",
        "10.66hour",
    );
    return info;
};
// ==================================================
// 天王星
// ==================================================
export function information_uranus(scene, font, planet) {
    const info = new Planet_Information(
        scene,
        font,
        planet,
        "U R A N U S",
        "diameter of the planet",
        "51,118km / 4.01(ratio to earth)",
        "distance to sun",
        "28.750million km / 19.2AU",
        "revolution speed",
        "83.8year(6.8km/s)",
        "rotation speed",
        "17.24hour",
    );
    return info;
};
// ==================================================
// 海王星
// ==================================================
export function information_neptune(scene, font, planet) {
    const info = new Planet_Information(
        scene,
        font,
        planet,
        "N E P T U N E",
        "diameter of the planet",
        "49,528km / 3.88(ratio to earth)",
        "distance to sun",
        "45.044million km / 30AU",
        "revolution speed",
        "163.8year(5.4km/s)",
        "rotation speed",
        "16.11hour",
    );
    return info;
};

class Decoration_Line{
    constructor(){
   
    }
}