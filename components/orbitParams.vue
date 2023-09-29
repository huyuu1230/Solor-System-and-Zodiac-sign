<template>
    <ul id="orbit-params" class="animation">
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
            font-size: calc(16px + (100vw - 1920px) * 0.01);
            line-height: 1.5em;
        }
        p{
            font-size: calc(20px + (100vw - 1920px) * 0.01);
            line-height: 1em;
        }
    }
    li:not(:first-child){
        margin: 10px 0 0;
    }
}

.animation{
    animation-name: fadeIn;
    animation-duration: 3s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    opacity: 0;
}
@keyframes fadeIn{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>