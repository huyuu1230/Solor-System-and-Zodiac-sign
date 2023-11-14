<template>
    <div id="about-container">
        <div id="about">
            <div class="about-head">
                <h2>
                    <span class="hide" ref="inputText" v-for="(item, index) in about.head" :key="index">
                        {{ item }}
                    </span>
                </h2>
                <div class="about-head-body">
                    <p v-for="(item, index) in about.body" :key="index">
                        <span class="hide" ref="inputText" v-for="(child, index) in item" :key="index">
                            {{ child }}
                        </span>
                    </p>
                </div>
            </div>
            <div class="about-content">
                <h2>
                    <span class="hide" ref="inputText" v-for="(item, index) in about_content.head" :key="index">
                        {{ item }}
                    </span>
                </h2>
                <h3>
                    <span class="hide" ref="inputText" v-for="(item, index) in  about_content.planet.head" :key="index">
                        {{ item }}
                    </span>
                </h3>
                <div class="about-content-body">
                    <p v-for="(item, index) in about_content.planet.body" :key="index">
                        <span class="hide" ref="inputText" v-for="(child, index) in item" :key="index">
                            {{ child }}
                        </span>
                    </p>
                </div>
                <h3>
                    <span class="hide" ref="inputText" v-for="(item, index) in about_content.sign.head" :key="index">
                        {{ item }}
                    </span>
                </h3>
                <div class="about-content-body">
                    <p v-for="(item, index) in about_content.sign.body" :key="index">
                        <span class="hide" ref="inputText" v-for="(child, index) in item" :key="index">
                            {{ child }}
                        </span>
                    </p>
                </div>
            </div>
            <div class="about-creator">
                <h2>
                    <span class="hide" ref="inputText" v-for="(item, index) in about_creator.head" :key="index">
                        {{ item }}
                    </span>
                </h2>
                <div class="about-creator-body">
                    <p v-for="(item, index) in about_creator.body" :key="index">
                        <span class="hide" ref="inputText" v-for="(child, index) in item" :key="index">
                            {{ child }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div id="about-bg"></div>
    </div>
</template>

<script setup lang="ts">

const HEAD_TITLE = ref("About - Solor System and Zodiac Sign");

useHead({
    title: HEAD_TITLE,
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

const about = {
    head: 'こんにちは、私の小さな宇宙へようこそ！',
    body: [
        'このWebサイトは、太陽系の惑星や、黄道十二星座に関する情報を、グラフィックと合わせて楽しく知ることのできる場所です。',
        '宇宙は未知であり、神秘的であり、多くの人の頭上に広がっている広大な存在です。',
        'ここでは、そんな宇宙について、ほんの一部ではありますが触れることができます。'
    ],
};

const about_content = {
    head: 'コンテンツの特徴',
    planet: {
        head: '太陽系の惑星',
        body: [
            '各惑星についての、太陽からの距離・惑星の大きさ・公転速度・自転速度について触れることができます。'
        ],
    },
    sign: {
        head: '黄道十二星座',
        body: [
            '各星座についての、おおよその位置（赤緯・赤経）・名前の由来などについて触れることができます。',
            '注 : 実際の星々は異なる距離を持っていますが、ここでは敢えて一定の距離に揃えてあります。'
        ],
    },
};

const about_creator = {
    head: '制作者について',
    body: [
        'このサイトは幻想的で美しくありながら、未知で恐ろしくもあるような、そんな宇宙が好きな小さな人間によって制作されました。',
        '私の小さく不完全な宇宙での探索を楽しんでもらえると嬉しいです。',
        'それでは、良い旅を'
    ]
};

const inputText = ref<HTMLSpanElement[]>([]);

let count: number = 0;

onMounted(() => {
    rendering()
    function rendering() {
        if (count == 0 || count % 2 == 0) {
            inputText.value[count / 2].classList.remove('hide');
        };
        if (count < (inputText.value.length - 1) * 2) {
            requestAnimationFrame(rendering);
        };
        count++;
    };
});
</script>

<style lang="scss">
#about-container {

    #about {
        position: relative;
        width: fit-content;
        margin: 200px auto;
        z-index: 1000;
        color: #ffffff;
        text-align: center;

        .about-head {
            h2 {
                font-size: 40px;
            }

            .about-head-body {
                margin: 64px 0 0 0;

                p {
                    font-size: 16px;
                    line-height: 1em;
                }

                p:not(:first-child) {
                    margin: 16px 0 0 0;
                }
            }
        }

        .about-content {
            margin: 128px 0 0;

            h2 {
                font-size: 32px;
            }

            h3 {
                margin: 64px 0 0 0;
                font-size: 24px;
                font-weight: 400;
            }

            .about-content-body {
                margin: 40px 0 0 0;

                p {
                    font-size: 16px;
                }

                p:not(:first-child) {
                    margin: 16px 0 0 0;
                }
            }
        }

        .about-creator {
            margin: 128px 0 0 0;

            h2 {
                font-size: 32px;
            }

            .about-creator-body {
                margin: 40px 0 0;

                p {
                    font-size: 16px;
                }

                p:not(:first-child) {
                    margin: 16px 0 0 0;
                }
            }
        }
    }

    #about-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba($color: #000000, $alpha: 0.5);
        z-index: 100;
    }
}

.hide {
    opacity: 0;
}
</style>