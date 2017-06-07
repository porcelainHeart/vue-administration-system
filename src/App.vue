<template>
  <div id="app">
    <logo-header></logo-header>
    <main-nav v-if="isLogin"></main-nav>
    <div :style="boxStyle">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LogoHeader from './components/LogoHeader'
import MainNav from './components/MainNav'
export default {
  name: 'app',
  components: { LogoHeader, MainNav },
  computed: {
    isLogin () {
      return this.$route.path !== '/login'
    },
    boxStyle () {
      return {
        float: 'left',
        width: this.isLogin ? '90%' : '100%',
        height: '100%'
      }
    }
  }
}
</script>
<style>
html,body,#app{
  height: 100%;
}
*{
  box-sizing: border-box;
}
#app{
  padding-right: 20px;
}
</style>
