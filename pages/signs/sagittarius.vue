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
        main: 'SAGITTARIUS',
        sub: 'Adventurous and Knowledge-Seeking, Sagittarius',
    },
    body: `射手座は、黄道十二星座の9番目に位置する星座であり、ラテン語で「Sagittarius（サジタリウス）」と呼ばれ、射手を象徴しています。この星座は、古代ギリシャの神話において、半人半馬のケンタウロスであるクロノス（ケイローン）を表すものとされています。
            射手座の人々は、自由奔放で冒険心旺盛な個性を持っており、知識を求め、新しい経験を追求することを好みます。彼らは楽観的で広い視野を持ち、冒険を通じて成長し、精神的な探求を楽しむことが多いです。また、社交的で友好的な性格もあり、人々との交流を大切にします。
            占星術的には、射手座は冒険、学習、広い視野、精神的な成長に焦点を当て、自己啓発や新たな経験への欲求を強調します。射手座は11月22日から12月21日までの期間に太陽が通過する星座であり、この期間に生まれた人々は射手座の特徴を強調された個性を持つとされています。`,
};
</script>