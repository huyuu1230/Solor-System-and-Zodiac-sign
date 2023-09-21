<template>
    <ul class="nav_log">
        <li v-for="(item,index) in log" :key="index">
            <p>{{ item }}</p>
        </li>
    </ul>
</template>

<script setup>
const log = ref([]);

let log_counter = 0;
const log_data = [
    'class Planet {',
    '　constructor(name, radius, distance, revolution, rotation, alpha, delta) {',
    '　　this.name = name;',
    '　　this.radius = radius;',
    '　　this.distance = distance;',
    '　　this.revolution = revolution;',
    '　　this.rotation = rotation;',
    '　　this.alpha = alpha;',
    '　　this.delta = delta;',
    '　　this.width = 10;',
    '　　this.height = 10;',
    '　　this.init();',
    '　};',
    '　init() {',
    '　　this.#setting_webgl();',
    '　　this.#setting_camera();',
    '　　this.#setting_controls();',
    '　};',
    '};',
];

function log_load() {
    log.value.push(log_data[log_counter]);
    if(log.value.length > 10){
        log.value.shift();
    };
    log_counter++;
    if(log_counter > log_data.length-1){
        log_counter = 0;
    };
};

onMounted(()=>{
    setInterval(() => {
        log_load();
    }, 1000);
});
</script>

<style lang="scss">
.nav_log{
    width: 400px;
    height: 150px;
    padding: 10px;
    border: 1px solid #ffffff;
    white-space: nowrap;
    overflow: hidden;
    li{
        p{
            font-size: 10px;
            color: #ffffff;
        }
    }
}
</style>