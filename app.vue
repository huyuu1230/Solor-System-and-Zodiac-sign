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

h1,h2,h3,h4,h5,h6,p,a{
  line-height: 1.5;
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

.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
