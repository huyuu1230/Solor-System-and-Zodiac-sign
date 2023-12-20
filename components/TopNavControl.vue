<template>
  <div>
    <h2>
      <a v-on:click="setAuto" v-bind:class="{ 'active': auto }">AUTO</a>
      <span>|</span>
      <a v-on:click="setControl" v-bind:class="{ 'active': control }">CONTROL</a>
    </h2>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-family: 'Orbitron', sans-serif;
}

a {
  display: inline-block;
  font-size: 24px;
  opacity: 0.5;
  transition: all 1000ms ease-in-out;
  cursor: pointer;
}

span {
  margin: 0 24px;
}

.active {
  opacity: 1;
}
</style>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const auto = ref<boolean>(false);
const control = ref<boolean>(false);

let queryAuto = route.query.auto;
let queryControl = route.query.control;

watch(
  () => queryAuto = route.query.auto,
  () => {
    auto.value = convertStrToBool(queryAuto?.toString());
    // console.log(auto.value);
  }
);

watch(
  () => queryControl = route.query.control,
  () => {
    control.value = convertStrToBool(queryControl?.toString());
    // console.log(control.value);
  }
);

onMounted(() => {
  queryAuto = route.query.auto;
  auto.value = convertStrToBool(queryAuto?.toString());
  queryControl = route.query.control;
  control.value = convertStrToBool(queryControl?.toString());
});

function convertStrToBool(str: string | undefined): boolean {
  if (typeof str != "string") {
    return Boolean(str);
  }
  try {
    let obj = JSON.parse(str.toLowerCase());
    return obj == true;
  } catch (e) {
    return str != "";
  }
};

function setAuto() {
  const current = Object.assign({}, route.query);
  if (convertStrToBool(current.auto?.toString())) {
    delete current.auto;
  } else {
    current.auto = "true";
  }
  router.push({ query: current });
}

function setControl() {
  const current = Object.assign({}, route.query);
  if (convertStrToBool(current.control?.toString())) {
    delete current.control;
  } else {
    current.control = "true";
  }
  router.push({ query: current });
}
</script>