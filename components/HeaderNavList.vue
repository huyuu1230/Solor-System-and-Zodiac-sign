<template>
    <div>
        <h3>{{ head }}</h3>
        <hr>
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <NuxtLink :to="item.path">
                    <div ref="shuffleText">
                        <span v-for="(child, index) in item.text" :key="index">
                            {{ child }}
                        </span>
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

const dfTextArray: string[][] = []

const randomTextArray: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
];

type List = {
    path: string,
    text: string,
};

interface Props {
    head: string,
    list: List[],
}

const props = withDefaults(defineProps<Props>(), {});

const dfText = props.list;
const shuffleText = ref<HTMLAnchorElement[]>([]);

onMounted(() => {

    // shuffle()

    console.log(dfText)
})


</script>

<style lang="scss" scoped>
div {
    font-family: 'Orbitron', sans-serif;
    width: min(10vw, 200px);
}

h3 {
    font-size: min(1.25vw, 24px);
    line-height: 1em;
}

hr {
    height: 1px;
    margin: min(1.25vw, 24px) 0;
    background-color: #ffffff;
    border: none;
}

ul {
    display: flex;
    flex-direction: column;
    gap: min(1.25vw, 24px);

    li {
        font-size: min(1vw, 16px);
        line-height: 1em;
    }
}
</style>