<template>
    <ul id="orbit-params">
        <li v-for="(item, key) in props.data" :key="key">
            <h3>{{ item.head }}</h3>
            <p>{{ item.body }}</p>
        </li>
    </ul>
</template>

<script setup lang="ts">
interface Item {
    head: string,
    body: string,
};

interface Props {
    data: {
        [key: string]: Item,
    };
};

const props = withDefaults(defineProps<Props>(), {
    
});
</script>

<style lang="scss">
#orbit-params{
    position: fixed;
    left: 5%;
    bottom: 10%;
    li{
        padding: 0 0 10px;
        border-bottom: 1px solid #ffffff;
        h3{
            font-size: 12px;
            line-height: 1.5em;
        }
        p{
            font-size: 16px;
            line-height: 1em;
        }
    }
    li:not(:first-child){
        margin: 10px 0 0;
    }
}
</style>