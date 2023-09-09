<template>
    <div class="sign">
        <div class="sign-title">
            <h1>SAGITTARIUS</h1>
            <div class="line"></div>
            <h6>zodiacal constellations / sagittarius</h6>
            <p>
                射手座は、黄道十二星座の9番目に位置する星座であり、ラテン語で「Sagittarius（サジタリウス）」と呼ばれ、射手を象徴しています。この星座は、古代ギリシャの神話において、半人半馬のケンタウロスであるクロノス（ケイローン）を表すものとされています。<br>
                射手座の人々は、自由奔放で冒険心旺盛な個性を持っており、知識を求め、新しい経験を追求することを好みます。彼らは楽観的で広い視野を持ち、冒険を通じて成長し、精神的な探求を楽しむことが多いです。また、社交的で友好的な性格もあり、人々との交流を大切にします。<br>
                占星術的には、射手座は冒険、学習、広い視野、精神的な成長に焦点を当て、自己啓発や新たな経験への欲求を強調します。射手座は11月22日から12月21日までの期間に太陽が通過する星座であり、この期間に生まれた人々は射手座の特徴を強調された個性を持つとされています。
            </p>
        </div>

        <div class="sign-fixed">
            <h2>Fixed Stars</h2>
            <ul>
                <li v-for="(item,key) in sagittarius" :key=key>
                    {{ key }}
                </li>
            </ul>
        </div>
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
const sagittarius: Sign = SIGN.Sagittarius;
</script>