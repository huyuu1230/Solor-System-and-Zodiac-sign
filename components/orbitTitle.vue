<template>
    <div id="orbit-title" class="animation">
        <h1>{{ main }}</h1>
        <div class="line"></div>
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
})
</script>

<style lang="scss" scoped>
#orbit-title {
    position: fixed;
    top: 15%;
    left: 2.5vw;
    h1 {
        font-size: calc(100px + (100vw - 1920px) * 0.01);
        line-height: 1em;
        letter-spacing: 0.25em;
    }

    .line{
        width: 100%;
        height: 1px;
        margin: 10px 0;
        background-color: #ffffff;
    }

    h2 {
        font-size: calc(20px + (100vw - 1920px) * 0.01);
        font-weight: 300;
        line-height: 1em;
        letter-spacing: 0.5em;
    }
}

@media screen and (max-width:768px){
    #orbit-title{
        h1{
            font-size: 48px;
        }
        .line{
            margin: 5px 0;
        }
        h2{
            font-size: 12px;
        }
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