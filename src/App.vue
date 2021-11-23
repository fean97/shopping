<template>
  <div class="content-wrapper">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.content-wrapper {
  padding: 20px;
  background-color: #f8f8f8;
}
</style>
