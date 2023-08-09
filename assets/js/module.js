import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js';

// ----------度からラジアンに変換
function toRad(deg) {
    return (deg * Math.PI) / 180;
};
// ----------ラジアンから度に変換
function toDeg(rad) {
    return rad * (180 / Math.PI);
};


export { toRad }