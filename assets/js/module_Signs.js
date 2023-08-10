import * as THREE from "three";

// --------------------星座
class Sign {
    constructor(alpha, delta) {
        this.r = sunRaddius * 5
        this.w = 100;
        this.h = 100;
        this.or = 100 * au;
        this.alpha = (alpha * Math.PI) / 180;
        this.delta = (delta * Math.PI) / 180;
        this.x = this.or * Math.cos(this.delta) * Math.cos(this.alpha);
        this.y = this.or * Math.sin(this.delta);
        this.z = this.or * Math.cos(this.delta) * Math.sin(this.alpha);
        this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
    };
    add(scene) {
        scene.add(this.mesh);
    };
};

// --------------------星座の軌跡
class Trajectory {
    constructor(vectors) {
        this.starsPoints = [];
        for (let i = 0; i < vectors.length; i++) {
            this.starsPoints.push(vectors[i]);
        };
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.starsPoints);
        this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.mesh = new THREE.Line(this.geometry, this.material);
    };
    add(scene) {
        scene.add(this.mesh);
    };
};

// --------------------星座の作成・表示
function createSign(sign) {
    for (let key in sign) {
        sign[key] = new Sign(sign[key].alpha, sign[key].delta);
    };
};
function addSign(sign) {
    for (let key in sign) {
        sign[key].add(scene);
    };
};

function addTrajectory(trajectory){
    for(let key in trajectory){
        trajectory[key].add(scene);
    };
};

// --------------------星座の軌跡配列
const Aries_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Aries.Alpha.x, Aries.Alpha.y, Aries.Alpha.z),
        new THREE.Vector3(Aries.Beta.x, Aries.Beta.y, Aries.Beta.z),
        new THREE.Vector3(Aries.Gamma.x, Aries.Gamma.y, Aries.Gamma.z),
        new THREE.Vector3(Aries.Delta.x, Aries.Delta.y, Aries.Delta.z)
    ]),
};

const Taurus_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Taurus.Mu.x, Taurus.Mu.y, Taurus.Mu.z),
        new THREE.Vector3(Taurus.Number_88.x, Taurus.Number_88.y, Taurus.Number_88.z),
        new THREE.Vector3(Taurus.Number_90.x, Taurus.Number_90.y, Taurus.Number_90.z),
        new THREE.Vector3(Taurus.Lambda.x, Taurus.Lambda.y, Taurus.Lambda.z),
        new THREE.Vector3(Taurus.Gamma.x, Taurus.Gamma.y, Taurus.Gamma.z),
        new THREE.Vector3(Taurus.Delta_1.x, Taurus.Delta_1.y, Taurus.Delta_1.z),
        new THREE.Vector3(Taurus.Epsilon.x, Taurus.Epsilon.y, Taurus.Epsilon.z),
        new THREE.Vector3(Taurus.Kappa.x, Taurus.Kappa.y, Taurus.Kappa.z),
        new THREE.Vector3(Taurus.Number_37.x, Taurus.Number_37.y, Taurus.Number_37.z),
        new THREE.Vector3(Taurus.Number_27.x, Taurus.Number_27.y, Taurus.Number_27.z),
        new THREE.Vector3(Taurus.Eta.x, Taurus.Eta.y, Taurus.Eta.z),
        new THREE.Vector3(Taurus.Number_5.x, Taurus.Number_5.y, Taurus.Number_5.z),
        new THREE.Vector3(Taurus.Xi.x, Taurus.Xi.y, Taurus.Xi.z),
        new THREE.Vector3(Taurus.Omicron.x, Taurus.Omicron.y, Taurus.Omicron.z)
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Taurus.Lambda.x, Taurus.Lambda.y, Taurus.Lambda.z),
        new THREE.Vector3(Taurus.Number_30.x, Taurus.Number_30.y, Taurus.Number_30.z),
        new THREE.Vector3(Taurus.Omicron.x, Taurus.Omicron.y, Taurus.Omicron.z),
        new THREE.Vector3(Taurus.Nu.x, Taurus.Nu.y, Taurus.Nu.z),
        new THREE.Vector3(Taurus.Number_10.x, Taurus.Number_10.y, Taurus.Number_10.z)
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Taurus.Epsilon.x, Taurus.Epsilon.y, Taurus.Epsilon.z),
        new THREE.Vector3(Taurus.Tau.x, Taurus.Tau.y, Taurus.Tau.z),
        new THREE.Vector3(Taurus.Beta.x, Taurus.Beta.y, Taurus.Beta.z),
    ]),
    Trajectory_4:new Trajectory([
        new THREE.Vector3(Taurus.Gamma.x,Taurus.Gamma.y,Taurus.Gamma.z),
        new THREE.Vector3(Taurus.Theta_2.x,Taurus.Theta_2.y,Taurus.Theta_2.z),
        new THREE.Vector3(Taurus.Alpha.x,Taurus.Alpha.y,Taurus.Alpha.z),
        new THREE.Vector3(Taurus.Zehta.x,Taurus.Zehta.y,Taurus.Zehta.z),
      ]),
};

const Gemini_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Gemini.M35.x, Gemini.M35.y, Gemini.M35.z),
        new THREE.Vector3(Gemini.Eta.x, Gemini.Eta.y, Gemini.Eta.z),
        new THREE.Vector3(Gemini.Mu.x, Gemini.Mu.y, Gemini.Mu.z),
        new THREE.Vector3(Gemini.Epsilon.x, Gemini.Epsilon.y, Gemini.Epsilon.z),
        new THREE.Vector3(Gemini.Tau.x, Gemini.Tau.y, Gemini.Tau.z),
        new THREE.Vector3(Gemini.Alpha.x, Gemini.Alpha.y, Gemini.Alpha.z),
        new THREE.Vector3(Gemini.Beta.x, Gemini.Beta.y, Gemini.Beta.z),
        new THREE.Vector3(Gemini.Delta.x, Gemini.Delta.y, Gemini.Delta.z),
        new THREE.Vector3(Gemini.Zehta.x, Gemini.Zehta.y, Gemini.Zehta.z),
        new THREE.Vector3(Gemini.Gamma.x, Gemini.Gamma.y, Gemini.Gamma.z),
        new THREE.Vector3(Gemini.Xi.x, Gemini.Xi.y, Gemini.Xi.z)
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Gemini.Tau.x, Gemini.Tau.y, Gemini.Tau.z),
        new THREE.Vector3(Gemini.Theta.x, Gemini.Theta.y, Gemini.Theta.z)
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Gemini.Delta.x, Gemini.Delta.y, Gemini.Delta.z),
        new THREE.Vector3(Gemini.Lambda.x, Gemini.Lambda.y, Gemini.Lambda.z)
    ]),
};

const Cnacer_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Cancer.Alpha.x, Cancer.Alpha.y, Cancer.Alpha.z),
        new THREE.Vector3(Cancer.Delta.x, Cancer.Delta.y, Cancer.Delta.z),
        new THREE.Vector3(Cancer.Epsilon.x, Cancer.Epsilon.y, Cancer.Epsilon.z),
        new THREE.Vector3(Cancer.Gamma.x, Cancer.Gamma.y, Cancer.Gamma.z),
        new THREE.Vector3(Cancer.Eta.x, Cancer.Eta.y, Cancer.Eta.z),
        new THREE.Vector3(Cancer.Theta.x, Cancer.Theta.y, Cancer.Theta.z),
        new THREE.Vector3(Cancer.Delta.x, Cancer.Delta.y, Cancer.Delta.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Cancer.Theta.x, Cancer.Theta.y, Cancer.Theta.z),
        new THREE.Vector3(Cancer.Beta.x, Cancer.Beta.y, Cancer.Beta.z),
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Cancer.Gamma.x, Cancer.Gamma.y, Cancer.Gamma.z),
        new THREE.Vector3(Cancer.Iota.x, Cancer.Iota.y, Cancer.Iota.z),
    ]),
};

const Leo_Trajectory = {
    Trajectory_1: new Trajectory([
      new THREE.Vector3(Leo.Lambda.x, Leo.Lambda.y, Leo.Lambda.z),
      new THREE.Vector3(Leo.Epsilon.x, Leo.Epsilon.y, Leo.Epsilon.z),
      new THREE.Vector3(Leo.Mu.x, Leo.Mu.y, Leo.Mu.z),
      new THREE.Vector3(Leo.Zehta.x, Leo.Zehta.y, Leo.Zehta.z),
      new THREE.Vector3(Leo.Gamma.x, Leo.Gamma.y, Leo.Gamma.z),
      new THREE.Vector3(Leo.Eta.x, Leo.Eta.y, Leo.Eta.z),
    ]),
    Trajectory_2: new Trajectory([
      new THREE.Vector3(Leo.Eta.x, Leo.Eta.y, Leo.Eta.z),
      new THREE.Vector3(Leo.Number_60.x, Leo.Number_60.y, Leo.Number_60.z),
      new THREE.Vector3(Leo.Delta.x, Leo.Delta.y, Leo.Delta.z),
      new THREE.Vector3(Leo.Beta.x, Leo.Beta.y, Leo.Beta.z),
      new THREE.Vector3(Leo.Theta.x, Leo.Theta.y, Leo.Theta.z),
      new THREE.Vector3(Leo.Alpha.x, Leo.Alpha.y, Leo.Alpha.z),
      new THREE.Vector3(Leo.Eta.x, Leo.Eta.y, Leo.Eta.z),
    ]),
    Trajectory_3: new Trajectory([
      new THREE.Vector3(Leo.Alpha.x, Leo.Alpha.y, Leo.Alpha.z),
      new THREE.Vector3(Leo.Rho.x, Leo.Rho.y, Leo.Rho.z),
      new THREE.Vector3(Leo.Number_31.x, Leo.Number_31.y, Leo.Number_31.z),
      new THREE.Vector3(Leo.Omicron.x, Leo.Omicron.y, Leo.Omicron.z),
    ]),
    Trajectory_4: new Trajectory([
      new THREE.Vector3(Leo.Theta.x, Leo.Theta.y, Leo.Theta.z),
      new THREE.Vector3(Leo.M65.x, Leo.M65.y, Leo.M65.z),
      new THREE.Vector3(Leo.M66.x, Leo.M66.y, Leo.M66.z),
      new THREE.Vector3(Leo.Iota.x, Leo.Iota.y, Leo.Iota.z),
      new THREE.Vector3(Leo.Sigma.x, Leo.Sigma.y, Leo.Sigma.z),
      new THREE.Vector3(Leo.Tau.x, Leo.Tau.y, Leo.Tau.z),
      new THREE.Vector3(Leo.Upsilon.x, Leo.Upsilon.y, Leo.Upsilon.z),
    ]),
  };

  const Virgo_Trajectory = {
    Trajectory_1: new Trajectory([
      new THREE.Vector3(Virgo.Beta.x, Virgo.Beta.y, Virgo.Beta.z),
      new THREE.Vector3(Virgo.Eta.x, Virgo.Eta.y, Virgo.Eta.z),
      new THREE.Vector3(Virgo.Gamma.x, Virgo.Gamma.y, Virgo.Gamma.z),
      new THREE.Vector3(Virgo.Delta.x, Virgo.Delta.y, Virgo.Delta.z),
      new THREE.Vector3(Virgo.Epsilon.x, Virgo.Epsilon.y, Virgo.Epsilon.z),
      new THREE.Vector3(Virgo.Omicron.x, Virgo.Omicron.y, Virgo.Omicron.z),
      new THREE.Vector3(Virgo.Nu.x, Virgo.Nu.y, Virgo.Nu.z),
    ]),
    Trajectory_2: new Trajectory([
      new THREE.Vector3(Virgo.Theta.x, Virgo.Theta.y, Virgo.Theta.z),
      new THREE.Vector3(Virgo.Alpha.x, Virgo.Alpha.y, Virgo.Alpha.z),
    ]),
    Trajectory_3: new Trajectory([
      new THREE.Vector3(Virgo.Theta.x, Virgo.Theta.y, Virgo.Theta.z),
      new THREE.Vector3(Virgo.Kappa.x, Virgo.Kappa.y, Virgo.Kappa.z),
    ]),
    Trajectory_4: new Trajectory([
      new THREE.Vector3(Virgo.Gamma.x, Virgo.Gamma.y, Virgo.Gamma.z),
      new THREE.Vector3(Virgo.Theta.x, Virgo.Theta.y, Virgo.Theta.z),
      new THREE.Vector3(Virgo.Iota.x, Virgo.Iota.y, Virgo.Iota.z),
      new THREE.Vector3(Virgo.Mu.x, Virgo.Mu.y, Virgo.Mu.z),
    ]),
    Trajectory_5:new Trajectory([
      new THREE.Vector3(Virgo.Delta.x,Virgo.Delta.y,Virgo.Delta.z),
      new THREE.Vector3(Virgo.Zehta.x,Virgo.Zehta.y,Virgo.Zehta.z),
    ]),
    Trajectory_6:new Trajectory([
      new THREE.Vector3(Virgo.Delta.x,Virgo.Delta.y,Virgo.Delta.z),
      new THREE.Vector3(Virgo.Tau.x,Virgo.Tau.y,Virgo.Tau.z),
      new THREE.Vector3(Virgo.Number_109.x,Virgo.Number_109.y,Virgo.Number_109.z)
    ]),
  };