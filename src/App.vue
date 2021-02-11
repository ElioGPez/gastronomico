<template>
  <router-view></router-view>
</template>

<script>

import {  mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',

    mounted() {
      //this.datosIniciales();
      this.getMesas();
      this.obtenerClientes();
      this.obtenerProductos();
      this.llenarCajas();
  },
  methods: {
    ...mapMutations(['iniciarMesas','llenarCajas']),
    ...mapActions(['getMesas','obtenerClientes','obtenerProductos']),
  },
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
    .center{
      display:flex;
      justify-content: center;
      align-items: center;
    }
    .card-titulo{
        background-color: rgb(182, 32, 32);
        color: white;
    }
    .card-subtitulo{
        background-color: rgb(196, 127, 127);
        color: white;
        padding: 3pt 0 3pt 0;
    }
    .card-subtitulo h5{
        margin: 0;
    }
    .card-titulo h4{
        margin: 0;
    }
</style>
