<template>
    <div class="sign">
        <h2 class="sign-info sign-info-name" :style="{ top: sign.name.value.y + 'px', left: sign.name.value.x + 'px' }">
            <span class="hide" ref="textArray" v-for="(item,index) in data.title.main" :key="index">
            {{ item }}
            </span>
        </h2>
        <p class="sign-info sign-info-copy" :style="{ top: sign.copy.value.y + 'px', left: sign.copy.value.x + 'px' }">
            <span class="hide" ref="textArray" v-for="(item,index) in data.title.sub" :key="index">
            {{ item }}
            </span>
        </p>
        <p class="sign-info sign-info-body" :style="{ top: sign.body.value.y + 'px', left: sign.body.value.x + 'px' }">
            <span class="hide" ref="textArray" v-for="(item,index) in data.body" :key="index">
            {{ item }}
            </span>
        </p>
    </div>
</template>

<script setup lang="ts">

const HEAD_TITLE = ref("Aries - Solor System and Zodiac Sign");

useHead({
    title:HEAD_TITLE,
});

interface Props {
    planet: {
        name: {
            value: {
                x: number,
                y: number,
            },
        },
        size: {
            value: {
                x: number,
                y: number,
            },
        },
        distance: {
            value: {
                x: number,
                y: number,
            },
        },
        revolution: {
            value: {
                x: number,
                y: number,
            },
        },
        rotation: {
            value: {
                x: number,
                y: number,
            },
        },
    };

    sign: {
        name: {
            value: {
                x: number,
                y: number,
            }
        },
        copy: {
            value: {
                x: number,
                y: number,
            }
        },
        body: {
            value: {
                x: number,
                y: number,
            }
        },
    };
};

const props = withDefaults(defineProps<Props>(), {
});

const data = {
    title: {
        main: 'ARIES',
        sub: 'The Constellation of Courage and Action, Aries',
    },
    body: `牡羊座は、黄道十二星座の1番目に位置する星座であり、ラテン語で「Aries（アリエス）」と呼ばれ、ラムを象徴しています。牡羊座の由来は、ギリシャ神話にさかのぼり、王子フリクシオスが黄金の毛皮を求めて神話の英雄であるヘルメスとアテナに感謝の意を表すために、犠牲としてラムを捧げたことに関連しています。
            牡羊座の人々は、エネルギッシュで行動的な性格を持っており、冒険心旺盛で競争心が強いことが多いです。彼らは決断力があり、新しいプロジェクトや挑戦に積極的に取り組みます。また、リーダーシップ能力にも優れており、目標達成に向けて努力を惜しまない傾向があります。
            占星術的には、牡羊座は個別主義、行動力、勇気、情熱などに焦点を当て、新しい始まりや成長を象徴するとされています。牡羊座は3月21日から4月19日までの期間に太陽が通過する星座であり、この期間に生まれた人々は牡羊座の特徴を強調された個性を持つとされています。`,
};

function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const textArray = ref<HTMLSpanElement[]>([]);

let count: number = 60;

onMounted(() => {
    setTimeout(() => {
        rendering();
        function rendering() {
            count--;
            for (let i = 0; i < textArray.value.length; i++) {
                const rand = random(0, count);
                if (rand == 0) {
                    textArray.value[i].classList.remove('hide');
                };
            };
            if (0 < count) {
                requestAnimationFrame(rendering);
            };
        };
    }, 3000);
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Shippori+Mincho:wght@400;500;600;700;800&display=swap");

.sign {
    position: fixed;
    top: 15%;
    left: 2.5vw;
    width: fit-content;
    z-index: 100;
}

@media screen and (max-width:768px) {
    // .sign {
    //     margin: 160px auto 0;
    // }

    #bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        opacity: 0.8;
        background-color: #222222;
        z-index: 10;
    }
}
</style>