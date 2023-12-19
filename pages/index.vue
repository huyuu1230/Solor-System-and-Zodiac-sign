<template>
  <div>
    <TopNav class="t__nav" />
    <TopNavControl class="t__nav__control"/>
  </div>
</template>

<style lang="scss">
.t__nav{
  position: fixed;
  left: 40px;
  bottom: 40px;
}
.t__nav__control{
  position: fixed;
  right: 40px;
  bottom: 40px;
}
</style>

<script setup>
let from = Object.assign({},useRouter().query);
from.id= 1;
console.log(from)

onMounted(()=>{
  useRouter().push({query:from})
})
</script>