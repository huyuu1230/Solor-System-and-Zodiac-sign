<template>
    <div class="sign">
        <div class="sign-title">
            <h1>PISCES</h1>
            <div class="line"></div>
            <h6>zodiacal constellations / pisces</h6>
            <p>
                うお座は、黄道十二星座の12番目に位置する星座であり、ラテン語で「Pisces（ピスケス）」と呼ばれ、魚を象徴しています。この星座は、古代ギリシャの神話において、水の精霊であるアプロディーテ（ヴィーナス）の変身した2匹の魚と関連付けられています。<br>
                うお座の人々は、感受性が豊かで創造的な個性を持ち、直感力に優れています。彼らは情熱的でロマンチストな一面もあり、他人に対して思いやりと理解を示すことが多いです。また、非常に精神的な傾向があり、スピリチュアルな探求や内面の成長に興味を持つことがあります。<br>
                占星術的には、うお座は夢、直感、共感、癒しに焦点を当て、個人の内面や精神的な成長に向けた旅を強調します。うお座は2月19日から3月20日までの期間に太陽が通過する星座であり、この期間に生まれた人々はうお座の特徴を強調された個性を持つとされています。
            </p>
        </div>

        <!-- <div class="sign-fixed">
            <h2>Fixed Stars</h2>
            <ul>
                <li v-for="(item,key) in pisces" :key=key>
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
const pisces: Sign = SIGN.Pisces;
</script>