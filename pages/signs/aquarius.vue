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

const HEAD_TITLE = ref("Aquarius - Solor System and Zodiac Sign");

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
        main: 'AQUARIUS',
        sub: 'Innovation and Empathy, Aquarius',
    },
    body: `みずがめ座は、黄道十二星座の11番目に位置する星座であり、ラテン語で「Aquarius（アクエリウス）」と呼ばれ、水瓶を象徴しています。この星座は、古代ギリシャの神話において、水をもたらす水瓶を持つ若者ガニュメデスと関連付けられています。
            みずがめ座の人々は、独創的で非常に知識欲が旺盛な個性を持っています。彼らは社会的な正義や人道主義に関心を寄せ、進歩的なアイデアや革新的な考えに開かれています。友情に価値を置き、他人と協力することを好みます。一方で、時には個性主義的で受け入れがたいアイデアを持つこともあります。
            占星術的には、みずがめ座は社会的な進化、人道主義、友情、革新に焦点を当て、集団やコミュニティに貢献することや、個人的な自由を尊重することが強調されます。みずがめ座は1月20日から2月18日までの期間に太陽が通過する星座であり、この期間に生まれた人々はみずがめ座の特徴を強調された個性を持つとされています。`,
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
.sign-info {
    position: fixed;
}

.sign-info-name {
    font-size: 2.5vw;
    transform: translate(-100%, -3vw);
}

.sign-info-copy {
    width: 20vw;
    text-align: right;
    font-size: 1vw;
    transform: translate(-100%, -110%);
}

.sign-info-body {
    width: 40vw;
    font-size: 0.6vw;
    line-height: 1.5em;
    transform: translate(1vw, -110%);
}

@media screen and (max-width:768px) {
    .sign-info-name {
    font-size: 8vw;
    transform: translate(-100%, -8vw);
}

.sign-info-copy {
    width: 70vw;
    text-align: right;
    font-size: 4vw;
    transform: translate(-100%, -110%);
}

.sign-info-body {
    width: 85vw;
    font-size: 2vw;
    line-height: 1.5em;
    transform: translate(2vw, -110%);
}
}

.hide {
    opacity: 0;
}
</style>