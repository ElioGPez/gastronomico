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



    <CRenderFunction flat :content-to-render="computedSidebar"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
const allItems = [
  {
    _name: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard"
  },
  {
    _name: "CSidebarNavItem",
    name: "User profile",
    to: "/theme/colors",
    roles: ["user", "admin"]
  },
  {
    _name: "CSidebarNavItem",
    name: "Admin panel",
    to: "/admin-panel",
    roles: ["admin"]
  }
];

export default {
  name: 'TheSidebar',
  nav,
  data() {
    return {
            role: "admin"

    }
  },
  computed: {
    currentItems() {
      //sidebar items are not shown until role is known
      if (this.role === "unknown") {
        return [];
      }
      return nav.filter(item => {
        console.log(item);
        return !item.roles || item.roles.includes(this.role);
      });
    },
    computedSidebar() {
      return [
        {
          _name: "CSidebarNav",
          _children: this.currentItems
        }
      ];
    },
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