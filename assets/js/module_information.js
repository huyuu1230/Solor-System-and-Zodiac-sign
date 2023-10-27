import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

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

function lerp(x, y, a) {
    return (1 - a) * x + a * y;
};

// ==================================================
// 装飾用の線を作成
// ==================================================
class Decoration_Line {
    constructor(r, theta, phi) {
        this.duration = 1;
        this.startVec = new THREE.Vector3(0, 0, 0);

        this.r = r;
        this.theta = (theta * Math.PI) / 180;
        this.phi = (phi * Math.PI) / 180;

        this.endVec = new THREE.Vector3(
            this.r * Math.sin(this.theta) * Math.cos(this.phi),
            this.r * Math.sin(this.theta) * Math.sin(this.phi),
            this.r * Math.cos(this.theta)
        );

        this.points = [];
        this.count = 0;
        this.init();
    };

    init() {
        this.createVertex();
        this.createMesh();
    }

    createVertex() {
        for (let i = 0; i < 1; i += 1 / this.duration / 60) {
            const newVec3 = new THREE.Vector3();
            newVec3.x = lerp(this.startVec.x, this.endVec.x, i);
            newVec3.y = lerp(this.startVec.y, this.endVec.y, i);
            newVec3.z = lerp(this.startVec.z, this.endVec.z, i);
            this.points.push(newVec3);
        };
    };

    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.points,
        );
        this.material = new THREE.LineBasicMaterial({
            color: 0xffffff,
        });
        this.mesh = new THREE.Line(this.geometry, this.material);
        this.mesh.geometry.setDrawRange(0, this.count);
    };

    position(vec3) {
        const position = vec3.clone();
        this.mesh.position.set(position.x, position.y, position.z);
    };

    move() {
        const that = this;
        (function _update() {
            if (that.count < that.points.length) {
                that.move_update();
                requestAnimationFrame(_update);
            } else {
                cancelAnimationFrame(_update);
            };
        }());
    };

    remove() {
        const that = this;
        (function _update() {
            if (0 < that.count) {
                that.remove_update();
                requestAnimationFrame(_update);
            } else {
                cancelAnimationFrame(_update);
            };
        }());
    };

    move_update() {
        if (this.count < this.points.length) {
            this.count++;
            this.mesh.geometry.setDrawRange(0, this.count);
        };
    };

    remove_update() {
        if (0 < this.count) {
            this.count--;
            this.mesh.geometry.setDrawRange(0, this.count);
        };
    };

    update(vec3) {
        this.position(vec3);
    };
};



// ==================================================
// 
// ==================================================
/*
 * ・lerp関数
 * ・Decoration_line
 * 
 * 
*/
class Circle {
    constructor() {
        this.radius = 10000000 / 2;
        this.init();
    };
    init() {
        this.createMesh();
        this.position()
    }
    createMesh() {
        this.geometry = new THREE.CircleGeometry(this.radius, 36);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
    position() {
        // Y軸を傾ければOK
        this.mesh.rotation.set(0, 0, 0)
    }
}
class Circle_Line_01 {
    constructor() {
        this.points = []
        this.radius = 10000000 / 2 * 1.25;
        this.weight = 100000 * 4;
        this.angle = -180
        this.init();
    }
    init() {
        this.compute();
        this.createMesh();
    }
    compute() {
        for (let i = (this.angle * Math.PI) / 180; i < ((this.angle + 180) * Math.PI) / 180; i += Math.PI / 180) {
            const x = this.radius * Math.cos(i);
            const y = this.radius * Math.sin(i)
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        }
    }
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.points
        );
        this.line = new MeshLine();
        this.line.setGeometry(this.geometry)
        this.material = new MeshLineMaterial({
            color: 0xffffff,
            lineWidth: this.weight
        });
        this.mesh = new THREE.Mesh(this.line, this.material);
    };
    update() {
        this.points = [];
        this.angle -= 1;
        this.compute();
        const newGeo = new THREE.BufferGeometry().setFromPoints(this.points);
        this.mesh.geometry.setGeometry(newGeo)
    }
}
class Rect {
    constructor(theta, alpha) {
        this.width = 10000000 / 20;
        this.height = 10000000 / 7;
        this.r = 10000000 / 2 * 1.25;
        this.theta = (theta * Math.PI) / 180;
        this.phi = (0 * Math.PI) / 180;
        this.alpha = alpha;
        this.init();
    };
    init() {
        this.createMesh();
        this.position()
    }
    createMesh() {
        this.geometry = new THREE.PlaneGeometry(this.width, this.height);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        this.material.transparent = true;
        this.material.opacity = this.alpha
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
    position() {
        this.x = this.r * Math.cos(this.theta)
        this.y = this.r * Math.sin(this.theta)
        this.z = 0;
        this.mesh.position.set(this.x, this.y, this.z)
        this.mesh.rotation.set(0, 0, this.theta + (90 * Math.PI) / 180)
    }
    update() {
        this.theta -= (1 * Math.PI) / 180;
        this.alpha += 1 / 60;
        this.material.opacity = Math.abs(Math.sin(this.alpha));
        this.position();
    }
}
class Circle_Line_02 {
    constructor() {
        this.points = [];
        this.init()
    }
    init() {
        this.compute();
        this.createMesh();
    }
    compute() {
        for (let i = 0; i < Math.PI * 2; i += Math.PI / 180) {
            const r = 10000000 / 2 * 1.5;
            const x = r * Math.cos(i);
            const y = r * Math.sin(i);
            const z = 0;
            this.points.push(new THREE.Vector3(x, y, z));
        }
    }
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.points
        );
        this.line = new MeshLine();
        this.line.setGeometry(this.geometry)
        this.material = new MeshLineMaterial({
            color: 0xffffff,
            lineWidth: 100000
        });
        this.mesh = new THREE.Mesh(this.line, this.material);
    }
}

class Circle_02 {
    constructor() {
        this.radius = 10000000 / 2 * 1.5;
        this.theta = (180 * Math.PI) / 180;
        this.init();
    }
    init() {
        this.createMesh()
        this.position()
    }

    createMesh() {
        this.geometry = new THREE.CircleGeometry(100000 * 2.5, 36);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    position() {
        const x = this.radius * Math.cos(this.theta);
        const y = this.radius * Math.sin(this.theta);
        const z = 0;
        this.mesh.position.set(x, y, z);
    }

    update() {
        this.theta += (1 * Math.PI) / 180;
        this.position()
    }
}

class Circle_Line_03 {
    constructor() {
        this.points = [];
        this.radius = 10000000 / 2 * 1.75;
        this.angle = -45
        this.init();
    };
    init() {
        this.compute();
        this.createMesh();
    };
    compute() {
        for (let i = (this.angle * Math.PI) / 180; i < ((this.angle + 180) * Math.PI) / 180; i += Math.PI / 180) {
            const x = this.radius * Math.cos(i);
            const y = this.radius * Math.sin(i);
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        };

    };
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.points
        );
        this.line = new MeshLine();
        this.line.setGeometry(this.geometry)
        this.material = new MeshLineMaterial({
            color: 0xffffff,
            lineWidth: 100000 * 6
        });
        this.mesh = new THREE.Mesh(this.line, this.material);
    };
    update() {
        this.points = [];
        this.angle += 0.5;
        this.compute();
        const newGeo = new THREE.BufferGeometry().setFromPoints(this.points);
        this.mesh.geometry.setGeometry(newGeo)
    };
};

class Circle_Line_04 {
    constructor() {
        this.points = [];
        this.radius = 10000000 / 2 * 1.75;
        this.angle = 180
        this.init();
    };
    init() {
        this.compute();
        this.createMesh();
    }
    compute() {
        for (let i = (this.angle * Math.PI) / 180; i < ((this.angle + 90) * Math.PI) / 180; i += Math.PI / 180) {
            const x = this.radius * Math.cos(i);
            const y = this.radius * Math.sin(i);
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        };
    };
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.points
        );
        this.line = new MeshLine();
        this.line.setGeometry(this.geometry)
        this.material = new MeshLineMaterial({
            color: 0xffffff,
            lineWidth: 100000 * 2
        });
        this.mesh = new THREE.Mesh(this.line, this.material);
    };
    update() {
        this.points = [];
        this.angle += 0.5;
        this.compute();
        const newGeo = new THREE.BufferGeometry().setFromPoints(this.points);
        this.mesh.geometry.setGeometry(newGeo)
    }
}

class Line_01 {
    constructor() {
        this.points = [];
        this.count = 1;
        this.range = (10000000 * 1.8) + (10000000 / 2 * 1.25);
        this.init()
    }
    init() {
        this.createVert();
        this.createMesh();
    }
    createVert() {
        this.points.push(new THREE.Vector3(10000000 / 2 * 1.25, 10000000 / 2 * 1.25, 0));
        this.points.push(new THREE.Vector3(this.range, this.range, 0));
    };
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.points,
        );
        this.material = new THREE.LineBasicMaterial({
            color: 0xffffff,
        });
        this.mesh = new THREE.Line(this.geometry, this.material);
        // this.mesh.geometry.setDrawRange(0, this.count);
    }
}

class Line_02 {
    constructor() {
        this.start = new THREE.Vector3(
            (10000000  * 1.8) + (10000000 / 2 * 1.25),
            (10000000  * 1.8) + (10000000 / 2 * 1.25),
            0
        );
        this.end = new THREE.Vector3(
            (10000000  * 1.8) + (10000000 / 2 * 1.25) + (10000000 * 6),
            (10000000  * 1.8) + (10000000 / 2 * 1.25),
            0
        )
        this.points = [this.start,this.end]
        this.createMesh()
    }

    createMesh(){
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.points,
        );
        this.material = new THREE.LineBasicMaterial({
            color: 0xffffff,
        });
        this.mesh = new THREE.Line(this.geometry, this.material);
    };
}

export class Test {
    constructor() {
        this.init()

    };
    init() {
        this.createMesh();
    };
    createMesh() {
        this.circle = new Circle()
        this.circle_Line_01 = new Circle_Line_01();

        this.circle_Rect_01 = new Rect(30, 1 / 13 * 13);
        this.circle_Rect_02 = new Rect(40, 1 / 13 * 12);
        this.circle_Rect_03 = new Rect(50, 1 / 13 * 11);
        this.circle_Rect_04 = new Rect(60, 1 / 13 * 10);
        this.circle_Rect_05 = new Rect(70, 1 / 13 * 9);
        this.circle_Rect_06 = new Rect(80, 1 / 13 * 8);
        this.circle_Rect_07 = new Rect(90, 1 / 13 * 7);
        this.circle_Rect_08 = new Rect(100, 1 / 13 * 6);
        this.circle_Rect_09 = new Rect(110, 1 / 13 * 5);
        this.circle_Rect_010 = new Rect(120, 1 / 13 * 4);
        this.circle_Rect_011 = new Rect(130, 1 / 13 * 3);
        this.circle_Rect_012 = new Rect(140, 1 / 13 * 2);
        this.circle_Rect_013 = new Rect(150, 1 / 13 * 1);

        this.circle_line_02 = new Circle_Line_02()
        this.circle_02 = new Circle_02()
        this.circle_line_03 = new Circle_Line_03()
        this.circle_line_04 = new Circle_Line_04()

        this.line_01 = new Line_01()
        this.line_02 = new Line_02()


    };
    add(scene) {
        scene.add(this.circle.mesh);
        scene.add(this.circle_Line_01.mesh);

        scene.add(this.circle_Rect_01.mesh);
        scene.add(this.circle_Rect_02.mesh);
        scene.add(this.circle_Rect_03.mesh);
        scene.add(this.circle_Rect_04.mesh);
        scene.add(this.circle_Rect_05.mesh);
        scene.add(this.circle_Rect_06.mesh);
        scene.add(this.circle_Rect_07.mesh);
        scene.add(this.circle_Rect_08.mesh);
        scene.add(this.circle_Rect_09.mesh);
        scene.add(this.circle_Rect_010.mesh);
        scene.add(this.circle_Rect_011.mesh);
        scene.add(this.circle_Rect_012.mesh);
        scene.add(this.circle_Rect_013.mesh);

        scene.add(this.circle_line_02.mesh);
        scene.add(this.circle_02.mesh);

        scene.add(this.circle_line_03.mesh);
        scene.add(this.circle_line_04.mesh);

        scene.add(this.line_01.mesh);
        scene.add(this.line_02.mesh);
    };
    move() {

    };
    update() {
        this.circle_02.update()

        this.circle_Line_01.update()
        this.circle_line_03.update()
        this.circle_line_04.update()

        this.circle_Rect_01.update()
        this.circle_Rect_02.update()
        this.circle_Rect_03.update()
        this.circle_Rect_04.update()
        this.circle_Rect_05.update()
        this.circle_Rect_06.update()
        this.circle_Rect_07.update()
        this.circle_Rect_08.update()
        this.circle_Rect_09.update()
        this.circle_Rect_010.update()
        this.circle_Rect_011.update()
        this.circle_Rect_012.update()
        this.circle_Rect_013.update()
    };
};

class Text {
    constructor(font, text) {
        this.font = font;
        this.text = text;
        this.size = 10000000 * 0.4;
        this.height = 0.1;
        this.init();
    };
    init() {
        this.createMesh();
        this.position()
    };
    createMesh() {
        this.geometry = new TextGeometry(
            this.text,
            {
                font: this.font,
                size: this.size,
                height: this.height,
            }
        );
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };
    add(scene) {
        scene.add(this.mesh);
    }
    position() {
       
        this.mesh.position.set((10000000  * 1.8) + (10000000 / 2 * 1.25),
        (10000000  * 1.8) + (10000000 / 2 * 1.25) + this.size / 2,
        0)
    };
    update(vec3) {
        this.position(vec3);
    };
}

export class Test_Text{
    constructor(scene,font){
        this.scene = scene;
        this.font = font;
        this.fontLoader = new FontLoader();
        this.fontLoader.load(this.font,(font)=>{
            this.font = font;
            this.init();
        })
    }
    init(){
        this.head = new Text(this.font,'distance of the planet');
        this.head.add(this.scene);
    }
}