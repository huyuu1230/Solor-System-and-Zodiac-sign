<template>
    <ul class="nav_info">
        <li v-for="(item, key) in props.data" :key="key">
            <p>{{ key }} : {{ item }}</p>
        </li>
    </ul>
</template>

<script setup lang="ts">

interface Props {
    data: {
        nav_duration_1: number,
        nav_duration_2: number,
        nav_camera_x: number,
        nav_camera_y: number,
        nav_camera_z: number,
        nav_target_x: number,
        nav_target_y: number,
        nav_target_z: number,
    },
};

const props = withDefaults(defineProps<Props>(), {
});
</script>

<style lang="scss">
.nav_info {
    display: grid;
    width: 300px;
    grid-template-columns: 1fr;
    gap: 5px;

    li {
        p {
            padding: 5px 10px;
            font-size: 16px;
            color: #222222;
            background-color: #ffffff;
        }
    }
}
</style>