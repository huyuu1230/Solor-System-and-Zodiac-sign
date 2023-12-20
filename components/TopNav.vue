<template>
    <div>
        <TopNavList :nav="list" v-bind:class="{ 't__nav__view': isView, 't__nav__hide': isHide }" />
        <hr>
        <h2>
            <a v-on:click="viewPlanet" v-bind:class="{ 't__button__view': buttonPlanet }">Solor System</a>
            /
            <a v-on:click="viewSign" v-bind:class="{ 't__button__view': buttonSign }">Zodiac Sign</a>
        </h2>
    </div>
</template>
  
<style lang="scss" scoped>
div {
    font-family: 'Orbitron', sans-serif;
    width: fit-content;
}

hr {
    margin: 24px 0 16px;
    height:1px;
    border: none;
    background-color: #ffffff;
}

h2 {
    font-size: 24px;
    letter-spacing: 0.25em;

    a {
        display: inline-block;
        color: #ffffff;
        opacity: 0.5;
        transition: all 1000ms ease-in-out;
        cursor: pointer;
    }

}

.t__nav__hide {
    opacity: 0;
    transition: all 0ms;
}

.t__nav__view {
    opacity: 1;
    transition: all 1000ms ease-in-out;
}

.t__button__view {
    opacity: 1;
}

@media screen and (max-width:768px) {
    div{
        width: 90vw;
    }

    h2{
        font-size: 16px;
    }
}
</style>
  
<script setup lang="ts">

const planet = [
    { link: "/planets/mercury", text: "MERCURY" },
    { link: "/planets/venus", text: "VENUS" },
    { link: "/planets/Earth", text: "EARTH" },
    { link: "/planets/mars", text: "MARS" },
    { link: "/planets/jupiter", text: "JUPITER" },
    { link: "/planets/saturn", text: "SATURN" },
    { link: "/planets/uranus", text: "URANUS" },
    { link: "/planets/neptune", text: "NEPTUNE" },
];

const sign = [
    { link: "/signs/aries", text: "ARIES" },
    { link: "/signs/taurus", text: "TAURUS" },
    { link: "/signs/gemini", text: "GEMINI" },
    { link: "/signs/cancer", text: "CANCER" },
    { link: "/signs/leo", text: "LEO" },
    { link: "/signs/virgo", text: "VIRGO" },
    { link: "/signs/libra", text: "LIBRA" },
    { link: "/signs/scorpius", text: "SCORPIUS" },
    { link: "/signs/sagittarius", text: "SAGITTARIUS" },
    { link: "/signs/capricornus", text: "CAPRICORNUS" },
    { link: "/signs/aquarius", text: "AQUARIUS" },
    { link: "/signs/pisces", text: "PISCES" },
];

let current: boolean = true;
let list = ref(planet);

let isView = ref<boolean>(false);
let isHide = ref<boolean>(true);

let buttonPlanet = ref<boolean>(true);
let buttonSign = ref<boolean>(false);

onMounted(() => {
    isView.value = true;
});

function change(): void {
    isView.value = false;
    setTimeout(() => {
        isView.value = true;
    }, 1);
};

function viewPlanet(): void {
    if (!current) {
        current = true;
        buttonPlanet.value = true;
        buttonSign.value = false;
        list.value = planet;
        change();
    }
};

function viewSign(): void {
    if (current) {
        current = false;
        buttonPlanet.value = false;
        buttonSign.value = true;
        list.value = sign;
        change();
    }
};

</script>