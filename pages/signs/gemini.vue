<template>
    <div class="sign">
        <div class="sign-title">
            <h1>GEMINI</h1>
            <div class="line"></div>
            <h6>zodiacal constellations / gemini</h6>
            <p>
                双子座は、黄道十二星座の3番目に位置する星座であり、ラテン語で「Gemini（ジェミニ）」と呼ばれ、双子を象徴しています。この星座は、古代ギリシャ神話に由来しており、神話では双子の兄弟カストルとポルックスが主要なキャラクターとして登場します。彼らは兄弟愛に満ち、困難な状況でも一緒に冒険を共にしました。<br>
                双子座の人々は、コミュニケーション能力に優れ、知的好奇心旺盛で柔軟性があります。彼らは頭脳明晰で社交的であり、多くの異なるアイデアや視点を追求し、新しい情報を吸収しやすい傾向があります。しかし、時には注意散漫になり、決定力が欠けることもあります。<br>
                占星術的には、双子座は知識やコミュニケーション、教育、旅行などと関連付けられ、知的な成長やコミュニケーションスキルの向上に焦点を当てることがあります。双子座は5月21日から6月20日までの期間に太陽が通過する星座であり、この期間に生まれた人々は双子座の特徴を強調された個性を持つとされています。
            </p>
        </div>

        <!-- <div class="sign-fixed">
            <h2>Fixed Stars</h2>
            <ul>
                <li v-for="(item,key) in gemini" :key=key>
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
const gemini: Sign = SIGN.Gemini;
</script>