<template>
    <div>
        <div v-if="display" id="sign-page">
            <div class="sign">
                <SignPage :data="data" />
            </div>
            <div id="bg"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    display: boolean
};

const props = withDefaults(defineProps<Props>(), {
});

const data = {
    title: {
        main: 'CAPRICORNUS',
        sub: 'Achievement and Discipline, Capricornus',
    },
    body: `やぎ座は、黄道十二星座の10番目に位置する星座であり、ラテン語で「Capricornus（カプリコルヌス）」と呼ばれ、山羊を象徴しています。この星座は、古代ギリシャの神話において、山羊の角を持つ海神パンと関連付けられています。
            やぎ座の人々は、実務的で堅実な性格を持っており、目標を達成するためには努力と忍耐を惜しまない傾向があります。彼らは責任感が強く、計画的に物事を進める能力に優れています。また、自己制御がきちんとしており、安定と経済的な成功を追求することが多いです。
            占星術的には、やぎ座はキャリア、成功、責任、組織力に焦点を当て、個人の成長や社会的な地位向上に向けた努力を強調します。やぎ座は12月22日から1月19日までの期間に太陽が通過する星座であり、この期間に生まれた人々はやぎ座の特徴を強調された個性を持つとされています。`,
};
</script>