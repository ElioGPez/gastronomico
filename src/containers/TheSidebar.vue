<template>
  <CSidebar class="side"
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand  class="d-md-down-none" to="/">
       <h3 class="logo">Restaurante</h3>
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }
}
</script>

<style scoped>
  .logo{
      font-family: 'Skranji', cursive;
      font-size: 20pt;
      margin: 10pt 0 10pt 0;
  }
  .logo-img{
    height: 26pt;
  }
  .side{
    background-color: rgb(177, 16, 16);
  }
</style>