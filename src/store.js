import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  //CREAR VENTA
  linea_venta : 'hols',
  producto : 'sd',
  dark : false,
  mesas : '',
}

const mutations = {
  darkModalFalse(state){
    state.dark = false;
  },
  darkModalTrue(state){
    state.dark = true;
  },
  agregarProducto(state, producto){
    state.linea_venta = producto;
  },
  modificarProducto(state, producto){
    //state.status = 'success'
    //state.linea_venta.push(producto);
    state.producto = producto;
  },
  iniciarMesas(state, mesas){
    state.mesas = mesas;
  },
  limpiarProducto(state){
    //state.status = 'success'
    //state.linea_venta.push(producto);
    state.producto = 'sd';
  },
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  }
}

const getters = {
  //Devuelve TRUE si existe el token
  linea_venta: state => state.linea_venta,
  producto: state => state.producto,
  mesas: state => state.mesas,
  dark:state => state.dark,
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})