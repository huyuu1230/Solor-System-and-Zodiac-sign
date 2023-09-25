<template>
    <div id="orbit-title" class="animation">
        <h1>{{ main }}</h1>
        <h2>{{ sub }}</h2>
    </div>
</template>

<script setup lang="ts">
interface Props {
    main: string,
    sub: string
};
const props = withDefaults(defineProps<Props>(), {

});
onMounted(()=>{
    const elem = <HTMLDivElement>document.getElementById("orbit-title");
    console.log(elem);
})
</script>

<style lang="scss" scoped>
#orbit-title {
    position: fixed;
    top: 15%;
    left: 5%;
    h1 {
        font-size: calc(100px + (100vw - 1920px) * 0.01);
        line-height: 1em;
        letter-spacing: 0.25em;
        border-bottom: 1px solid #ffffff;
    }

    h2 {
        padding: 10px 0 0;
        font-size: calc(20px + (100vw - 1920px) * 0.01);
        font-weight: 300;
        line-height: 1em;
        letter-spacing: 0.5em;
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