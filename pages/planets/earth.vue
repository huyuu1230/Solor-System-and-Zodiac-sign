<template>
    <div class="orbit">
        <div class="orbit-title">
            <h1>EARTH</h1>
            <div class="line"></div>
            <h6>diameter of the planet / magnification of the earth</h6>
        </div>

        <div class="orbit-params">
            <div class="size">
                <h2>diameter of the planet</h2>
                <p>4,879 km / 1 ( ratio to earth )</p>
            </div>
            <div class="distance">
                <h2>distance to sun</h2>
                <p>149.6 million km / 1au</p>
            </div>
            <div class="revolution">
                <h2>revolution speed</h2>
                <p>1 year ( 29.8km/s )</p>
            </div>
            <div class="rotation">
                <h2>rotation speed</h2>
                <p>23.94 hour</p>
            </div>
        </div>

        <div class="planet-log">
            <p v-for="(item, index) in data" :key="index">
                {{ item }}
            </p>
        </div>

    </div>
</template>

<script setup>

function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const data = ref(['text-text-text'])
const text = [
    'Serendipity',
    'Ephemeral',
    'Ethereal',
    'Petrichor',
    'Luminous',
    'Mellifluous',
    'Quintessential',
    'Serene',
    'Resplendent',
    'Aurora'
];
function log() {
    data.value.push(text[random(0,text.length)]);
    if(data.value.length > 10){
        data.value.shift();
    }
}
setInterval(() => {
    log()    
}, 500);

</script>