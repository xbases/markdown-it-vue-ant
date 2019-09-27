<template>
  <div id="app">
    <example />
  </div>
</template>

<script>
import Example from "./components/example.vue";

export default {
  name: "App",
  components: {
    Example,
  },
};
</script>
<style>
body {
  background-color: black;
}
</style>
