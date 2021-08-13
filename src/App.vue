<template>
  <div id="app">
    <el-container class="container">
      <el-header class="header">
        <h1>
          Image Chalk！
        </h1>
      </el-header>
      <el-main class="main">
        <image-editor />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ImageEditor from "./components/ImageEditor";

export default {
  name: 'App',
  components: {
    ImageEditor
  }
}
</script>

<style lang="less">
  html, body {
    height: 100vh;
  }

  body {
    margin: 0;
    padding: 0;
  }

  #app {
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url(https://static.bit.dev/homepage-bit/backgrounds/01-purple-gradient.svg);

      h1 {
        color: #fff;
      }
    }

    .main {
      flex: 1;
    }
  }
</style>
