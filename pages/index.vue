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

@media screen and (max-width:768px) {
  .t__nav{
    left: 5vw;
  }

  .t__nav__control{
    display: none;
  }
}
</style>

<script setup>

</script>