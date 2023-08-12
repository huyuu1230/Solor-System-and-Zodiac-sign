
// --------------------惑星を生成するクラス
class Planet {
    constructor(name, radius, distance, alpha, delta, revolution, rotation) {
        this.name = name;
        // -----大きさ
        this.r = earthRaddius * radius;
        this.w = this.r / 10;
        this.h = this.r / 10;
        // -----座標
        this.or = au * distance + sunRaddius;
        this.alpha = alpha;
        this.delta = delta;
        this.alphaRad = (this.alpha * Math.PI) / 180;
        this.deltaRad = (this.delta * Math.PI) / 180;
        this.x = this.or * Math.cos(this.alphaRad) * Math.cos(this.deltaRad);
        this.y = this.or * Math.sin(this.deltaRad);
        this.z = this.or * Math.cos(this.deltaRad) * Math.sin(this.alphaRad);
        // -----公転
        this.revolutionAlpha = earthPhiSpeed / revolution;
        this.revolutionDelta = earthThetaSpeed;
        // -----自転
        this.rotationX = (0 * Math.PI) / 180;
        this.rotationY = (0 * Math.PI) / 180;
        this.rotationSpeed = earthRotation * rotation;
        this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
    };
    // ----------軌道を生成するメソッド
    orbit() {
        this.orbitPoints = [];
        this.orbitPointNum = 360;
        for (let i = 0; i <= this.orbitPointNum; i++) {
            const rad = ((360 / this.orbitPointNum) * i) / 180
            const x = this.or * Math.cos(rad);
            const y = 0;
            const z = this.or * Math.sin(rad);
            const p = new THREE.Vector3(x, y, z);
            this.orbitPoints.push(p);
        }
        this.orbitGeometry = new THREE.BufferGeometry().setFromPoints(
            this.orbitPoints
        );
        this.orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.orbitMesh = new THREE.Line(this.orbitGeometry, this.orbitMaterial);
    };
    add(scene){
        scene.add(this.mesh);
        scene.add(this.orbitMesh);
    };
    // ----------惑星をアニメーションさせるメソッド
    update() {
        // -----公転
        this.alphaRad -= this.revolutionAlpha;
        this.x = this.or * Math.cos(this.alphaRad) * Math.cos(this.deltaRad);
        this.y = this.or * Math.sin(this.deltaRad);
        this.z = this.or * Math.cos(this.deltaRad) * Math.sin(this.alphaRad);
        this.planet.position.set(this.x, this.y, this.z);
        // -----自転
        this.rotationY += this.rotationSpeed;
        this.planet.rotation.y = this.rotationY;
    };
};


