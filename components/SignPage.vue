<template>
    <div id="sign-title" class="animation">
        <h1>{{ data.title.main }}</h1>
        <h2>{{ data.title.sub }}</h2>
    </div>
    <div id="sign-body" class="animation">
        <p v-html="htmlText(data.body)"></p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    data: {
        title: {
            main: string,
            sub: string,
        },
        body: string,
    },
};
const props = withDefaults(defineProps<Props>(), {

});

function htmlText(text: string) {
    if (!!text) {
        return text.replace(/\r?\n/g, '<br>');
    };
};
</script>

<style lang="scss">
#sign-title {
    max-width: 600px;

    h1 {
        font-size: calc(32px + (96 - 32) * ((100vw - 768px) / (1920 - 768)));
        line-height: 1em;
        letter-spacing: 0.25em;
        border-bottom: 1px solid #ffffff;
    }

    h2 {
        padding: 10px 0 0;
        font-size: calc(12px + (20 - 12) * ((100vw - 768px) / (1920 - 768)));
        font-weight: 300;
        line-height: 1em;
    }
}

#sign-body {
    max-width: 600px;
    margin: 60px 0 0 0;
    font-size: calc(10px + (16 - 10) * ((100vw - 768px) / (1920 - 768)))
}

@media screen and (max-width:768px) {
#sign-title{
    max-width: 95vw;
    h1{
        font-size: 48px;
    }
    h2{
        font-size: 12px;
    }
}

#sign-body{
    max-width: 95vw;
    margin: 50px 0 0 0;
    font-size: 12px;
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