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

const HEAD_TITLE = ref("Sagittarius - Solor System and Zodiac Sign");

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
        main: 'SAGITTARIUS',
        sub: 'Adventurous and Knowledge-Seeking, Sagittarius',
    },
    body: `射手座は、黄道十二星座の9番目に位置する星座であり、ラテン語で「Sagittarius（サジタリウス）」と呼ばれ、射手を象徴しています。この星座は、古代ギリシャの神話において、半人半馬のケンタウロスであるクロノス（ケイローン）を表すものとされています。
            射手座の人々は、自由奔放で冒険心旺盛な個性を持っており、知識を求め、新しい経験を追求することを好みます。彼らは楽観的で広い視野を持ち、冒険を通じて成長し、精神的な探求を楽しむことが多いです。また、社交的で友好的な性格もあり、人々との交流を大切にします。
            占星術的には、射手座は冒険、学習、広い視野、精神的な成長に焦点を当て、自己啓発や新たな経験への欲求を強調します。射手座は11月22日から12月21日までの期間に太陽が通過する星座であり、この期間に生まれた人々は射手座の特徴を強調された個性を持つとされています。`,
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