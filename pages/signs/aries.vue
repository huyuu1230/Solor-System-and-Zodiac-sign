<template>
    <div class="sign">
        <div class="sign-title">
            <h1>ARIES</h1>
            <div class="line"></div>
            <h6>zodiacal constellations / aries</h6>
            <p>
                牡羊座は、黄道十二星座の1番目に位置する星座であり、ラテン語で「Aries（アリエス）」と呼ばれ、ラムを象徴しています。牡羊座の由来は、ギリシャ神話にさかのぼり、王子フリクシオスが黄金の毛皮を求めて神話の英雄であるヘルメスとアテナに感謝の意を表すために、犠牲としてラムを捧げたことに関連しています。<br>
                牡羊座の人々は、エネルギッシュで行動的な性格を持っており、冒険心旺盛で競争心が強いことが多いです。彼らは決断力があり、新しいプロジェクトや挑戦に積極的に取り組みます。また、リーダーシップ能力にも優れており、目標達成に向けて努力を惜しまない傾向があります。<br>
                占星術的には、牡羊座は個別主義、行動力、勇気、情熱などに焦点を当て、新しい始まりや成長を象徴するとされています。牡羊座は3月21日から4月19日までの期間に太陽が通過する星座であり、この期間に生まれた人々は牡羊座の特徴を強調された個性を持つとされています。
            </p>
        </div>

        <!-- <div class="sign-fixed">
            <h2>Fixed Stars</h2>
            <ul>
                <li v-for="(item,key) in aries" :key=key>
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
const aries: Sign = SIGN.Aries;
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Shippori+Mincho:wght@400;500;600;700;800&display=swap");

.sign {
    font-family: 'Cormorant Garamond', serif;

    .sign-title {
        position: fixed;
        top: 15%;
        left: 5%;
        width: 600px;
        color: #ffffff;

        h1 {
            font-size: calc(32px + 64 * (100vw - 768px) / 1152);
            line-height: 1em;
            letter-spacing: 0.25em;
        }

        .line {
            width: 100%;
            height: 1px;
            margin: 20px 0;
            background-color: #ffffff;
        }

        h6 {
            font-size: 24px;
            line-height: 1em;
            letter-spacing: 0.25em;
        }

        p {
            font-size: calc(12px + 4 * (100vw - 768px) / 1152);
            margin: 50px 0 0 0;
        }
    }

    .sign-fixed {
        position: fixed;
        bottom: 15%;
        right: 5%;

        h2 {
            font-size: 24px;
            margin: 0 0 20px 0;
            padding: 0 0 10px 0;
            border-bottom: 1px solid;
        }

        ul {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 32px;
            li {
                font-size: 16px;
                padding: 0 0 5px;
                border-bottom: 1px solid;
            }
        }
    }

}
</style>