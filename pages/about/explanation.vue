<template>
    <div id="about-container">
        <div v-if="display" id="about-wrap">
            <div id="about" class="animation">
                <!-- <h1>このサイトについて</h1> -->
                <h1>EXPLANATION</h1>
                <p>
                    不完全ではありますが、是非この小さな宇宙を遊泳してみてください。<br>
                    心地の良い時間を過ごせてもらえることを祈っています。
                </p>
            </div>
            <div id="about-bg"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    display: boolean
};

const props = withDefaults(defineProps<Props>(), {
});

</script>

<style lang="scss">
#about {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 800px;
    z-index: 100;

    h1 {
        font-size: calc(32px + (48 - 32) * ((100vw - 768px) / (1920 - 768)));
        text-align: center;
    }

    p {
        margin: 50px 0 0;
        font-size: 16px;
        line-height: 2em;
    }
}

#about-bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #222222;
    opacity: 0.8;
    z-index: 10;
}

@media screen and (max-width:768px) {
    #about{
        width: 90vw;
        top: 15vh;
        left: 50%;
        transform: translate(-50%,0);
        h1{
            font-size: 32px;
            line-height: 1em;
        }
        p{
            margin: 30px 0 0;
            font-size: 12px;
            line-height: 1.5em;
        }
    }
}

.animation {
    animation-name: fadeIn;
    animation-duration: 3s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    opacity: 0;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>