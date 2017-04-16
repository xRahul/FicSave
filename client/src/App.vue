<template>
  <div id="app" class="valign-wrapper">
    <downloader></downloader>
  </div>
</template>

<script>
import Downloader from './components/Downloader';

export default {
  name: 'app',
  components: {
    Downloader,
  },
};
</script>

<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  flex: 1;
  background: url('/static/img/background.jpg') no-repeat center center;
  background-size: cover;
}
</style>
