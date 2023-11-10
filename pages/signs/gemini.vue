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
        main: 'GEMINI',
        sub: 'Constellation of Knowledge and Communication, Gemini',
    },
    body: `双子座は、黄道十二星座の3番目に位置する星座であり、ラテン語で「Gemini（ジェミニ）」と呼ばれ、双子を象徴しています。この星座は、古代ギリシャ神話に由来しており、神話では双子の兄弟カストルとポルックスが主要なキャラクターとして登場します。彼らは兄弟愛に満ち、困難な状況でも一緒に冒険を共にしました。
            双子座の人々は、コミュニケーション能力に優れ、知的好奇心旺盛で柔軟性があります。彼らは頭脳明晰で社交的であり、多くの異なるアイデアや視点を追求し、新しい情報を吸収しやすい傾向があります。しかし、時には注意散漫になり、決定力が欠けることもあります。
            占星術的には、双子座は知識やコミュニケーション、教育、旅行などと関連付けられ、知的な成長やコミュニケーションスキルの向上に焦点を当てることがあります。双子座は5月21日から6月20日までの期間に太陽が通過する星座であり、この期間に生まれた人々は双子座の特徴を強調された個性を持つとされています。`,
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