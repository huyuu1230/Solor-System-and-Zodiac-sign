<template>
    <div class="sign">
        <div class="sign-title">
            <h1>LEO</h1>
            <div class="line"></div>
            <h6>zodiacal constellations / leo</h6>
            <p>
                しし座は、黄道十二星座の5番目に位置する星座であり、ラテン語で「Leo（レオ）」と呼ばれ、ライオンを象徴しています。しし座は、古代エジプトやバビロニアの文化においても特別な意義を持っており、多くの文化で王者や支配者を象徴する星座とされています。<br>
                しし座の人々は、自信に満ち、リーダーシップ能力に優れ、強い意志力を持っています。彼らは自己表現が豊かで、社交的で魅力的な個性を持つことが多いです。また、寛大さや情熱もしし座の特徴の一部であり、自分自身や周囲の人々に対して高い期待を抱きます。<br>
                占星術的には、しし座は創造性、自己主張、自己発展、リーダーシップなどに焦点を当てることがあり、個人的な成長や成功に向けた情熱を強調します。しし座は7月23日から8月22日までの期間に太陽が通過する星座であり、この期間に生まれた人々はしし座の特徴を強調された個性を持つとされています。
            </p>
        </div>
        <!-- <div class="sign-fixed">
            <h2>Fixed Stars</h2>
            <ul>
                <li v-for="(item, key) in leo" :key=key>
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
const leo: Sign = SIGN.Leo;
</script>