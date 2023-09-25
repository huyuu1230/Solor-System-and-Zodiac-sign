<template>
    <div class="sign">
        <SignPage :data="data" />
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

const data = {
    title: {
        main: 'ARIES',
        sub: 'The Constellation of Courage and Action, Aries',
    },
    body: `牡羊座は、黄道十二星座の1番目に位置する星座であり、ラテン語で「Aries（アリエス）」と呼ばれ、ラムを象徴しています。牡羊座の由来は、ギリシャ神話にさかのぼり、王子フリクシオスが黄金の毛皮を求めて神話の英雄であるヘルメスとアテナに感謝の意を表すために、犠牲としてラムを捧げたことに関連しています。
            牡羊座の人々は、エネルギッシュで行動的な性格を持っており、冒険心旺盛で競争心が強いことが多いです。彼らは決断力があり、新しいプロジェクトや挑戦に積極的に取り組みます。また、リーダーシップ能力にも優れており、目標達成に向けて努力を惜しまない傾向があります。
            占星術的には、牡羊座は個別主義、行動力、勇気、情熱などに焦点を当て、新しい始まりや成長を象徴するとされています。牡羊座は3月21日から4月19日までの期間に太陽が通過する星座であり、この期間に生まれた人々は牡羊座の特徴を強調された個性を持つとされています。`,
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Shippori+Mincho:wght@400;500;600;700;800&display=swap");

.sign {
    font-family: 'Cormorant Garamond', serif;
    margin: 160px 0 0 80px;
}
</style>