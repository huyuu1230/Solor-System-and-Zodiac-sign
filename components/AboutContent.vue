<template>
    <div ref="a__content">
        <h2>
            <div v-bind:class="{ 'active': titleActive[0] }">
                <span ref="inputText" v-for="(item, index) in title_01" :key="index">{{ item }}</span>
            </div>
            <div v-bind:class="{ 'active': titleActive[1] }">
                <span ref="inputText" v-for="(item, index) in title_02" :key="index">{{ item }}</span>
            </div>
            <div v-bind:class="{ 'active': titleActive[2] }">
                <span ref="inputText" v-for="(item, index) in title_03" :key="index">{{ item }}</span>
            </div>
        </h2>
        <div class="a__content__head">
            <h3>
                <span ref="inputText" v-for="(item, index) in data.number" :key="index">{{ item }}</span>
            </h3>
            <h3>
                <span ref="inputText" v-for="(item, index) in data.head" :key="index">{{ item }}</span>
            </h3>
        </div>
        <hr>
        <p>
            <span ref="inputText" v-for="(item, index) in data.body" :key="index">{{ item }}</span>
        </p>
    </div>
</template>

<script setup lang="ts">

interface Props {
    titleActive: boolean[],
    data: {
        number: number,
        head: string,
        body: string,
    },
}

const props = withDefaults(defineProps<Props>(), {

});

const title_01 = "Solor System";
const title_02 = "and";
const title_03 = "Zodiac Sign";

const aboutContent = ref<HTMLDivElement>();
const inputText = ref<HTMLSpanElement[]>([]);
let count = 0;

onMounted(() => {
    tick()

});

function tick() {
    inputText.value[count].classList.add("active");
    count++;

    if (count < inputText.value.length) {
        requestAnimationFrame(tick);
    } else {
        return;
    }
};
</script>

<style lang="scss" scoped>
div {
    font-family: 'Orbitron', sans-serif;
    width: 750px;

    h2 {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 32px;
        line-height: 1em;
        letter-spacing: 0.25em;

        div {
            display: inline-block;
            width: fit-content;
            opacity: 0.5;
        }
    }

    .a__content__head {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;

        h3 {
            font-size: 48px;
            line-height: 1em;
            letter-spacing: 0.1em;
        }
    }

    p {
        margin: 10px 0 0;
        font-size: 16px;
        line-height: 2em;
        letter-spacing: 0.1em;
        text-align: justify;
    }

    span {
        opacity: 0;
    }

    .active {
        opacity: 1;
    }
}

@media screen and (max-width:768px) {
    div {
        width: 90%;

        h2 {
            font-size: 16px;
        }

        .a__content__head {
            width: 100%;

            h3 {
                font-size: 24px;
            }
        }

        p{
            width: 100%;
            line-height: 1.5em;
            letter-spacing: 0em;
        }
    }
}
</style>