<template>
    <div class="sign">
        <div class="sign-title">
            <h1>CAPRICORNUS</h1>
            <div class="line"></div>
            <h6>zodiacal constellations / capricornus</h6>
            <p>
                やぎ座は、黄道十二星座の10番目に位置する星座であり、ラテン語で「Capricorn（カプリコーン）」と呼ばれ、山羊を象徴しています。この星座は、古代ギリシャの神話において、山羊の角を持つ海神パンと関連付けられています。<br>
                やぎ座の人々は、実務的で堅実な性格を持っており、目標を達成するためには努力と忍耐を惜しまない傾向があります。彼らは責任感が強く、計画的に物事を進める能力に優れています。また、自己制御がきちんとしており、安定と経済的な成功を追求することが多いです。<br>
                占星術的には、やぎ座はキャリア、成功、責任、組織力に焦点を当て、個人の成長や社会的な地位向上に向けた努力を強調します。やぎ座は12月22日から1月19日までの期間に太陽が通過する星座であり、この期間に生まれた人々はやぎ座の特徴を強調された個性を持つとされています。
            </p>
        </div>
        <!-- <div class="sign-fixed">
            <h2>Fixed Stars</h2>
            <ul>
                <li v-for="(item,key) in capricornus" :key=key>
                    {{ key }}
                </li>
            </ul>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import * as SIGN from "assets/js/data_Signs";
interface Sign {
    [key: string]: {
        alpha: number,
        delta: number,
    },
};
const capricornus: Sign = SIGN.Capricornus;
</script>