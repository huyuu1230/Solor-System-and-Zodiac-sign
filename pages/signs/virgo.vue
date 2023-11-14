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

const HEAD_TITLE = ref("Virgo - Solor System and Zodiac Sign");

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
        main: 'VIRGO',
        sub: 'Analyze and Sincerity, Virgo',
    },
    body: `乙女座は、黄道十二星座の6番目に位置する星座であり、ラテン語で「Virgo（ヴァーゴ）」と呼ばれ、乙女を象徴しています。この星座は、古代の星座観測者によって穀物の収穫と農業に関連付けられ、豊穣と秩序を表すものとされています。
            乙女座の人々は、分析的で合理的な思考を持ち、詳細に注意を払う傾向があります。彼らは非常に忠実で責任感が強く、他人に対して思いやりがあります。また、健康や身体的な健全さにも関心を持つことが多いです。一方で、時には慎重すぎて自己評価が厳しいことがあるかもしれません。
            占星術的には、乙女座は秩序、労働、健康、細部への注意に焦点を当て、完璧主義や改善への欲求が強調されることがあります。乙女座は8月23日から9月22日までの期間に太陽が通過する星座であり、この期間に生まれた人々は乙女座の特徴を強調された個性を持つとされています。`,
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