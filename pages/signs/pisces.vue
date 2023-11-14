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

const HEAD_TITLE = ref("Pisces - Solor System and Zodiac Sign");

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
        main: 'PISCES',
        sub: 'Sensitivity and Pursuit of Dreams, Pisces',
    },
    body: `うお座は、黄道十二星座の12番目に位置する星座であり、ラテン語で「Pisces（ピスケス）」と呼ばれ、魚を象徴しています。この星座は、古代ギリシャの神話において、水の精霊であるアプロディーテ（ヴィーナス）の変身した2匹の魚と関連付けられています。
            うお座の人々は、感受性が豊かで創造的な個性を持ち、直感力に優れています。彼らは情熱的でロマンチストな一面もあり、他人に対して思いやりと理解を示すことが多いです。また、非常に精神的な傾向があり、スピリチュアルな探求や内面の成長に興味を持つことがあります。
            占星術的には、うお座は夢、直感、共感、癒しに焦点を当て、個人の内面や精神的な成長に向けた旅を強調します。うお座は2月19日から3月20日までの期間に太陽が通過する星座であり、この期間に生まれた人々はうお座の特徴を強調された個性を持つとされています。`,
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