<template>
  <div>
    <headerNav/>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
}

body::-webkit-scrollbar{
  display: none;
}

.nav-menu {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, 0);
  z-index: 1000;

  a {
    color: #ffffff;
    text-decoration: none;
  }
}
</style>
