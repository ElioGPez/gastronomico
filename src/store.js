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

  //NUEVA FORMA
  listado_insumos : [],
  producto_get : [],
  productos : []
}

const actions = {
  obtenerProductos({commit}){
      var producto = new Object();
      producto.id = '1';
      producto.nombre = 'alfafor';
      producto.descripcion = 'decripcion';
      producto.codigo = '123124124';
      producto.unidad = 'rubro1';
      producto.precio_de_venta = '$100';
      producto.stock_minimo = '5';
      producto.acciones = 'producto';
      var producto1 = new Object();
      producto1.id = '2';
      producto1.nombre = 'mani';
      producto1.descripcion = 'decripcion';
      producto1.codigo = '123124124';
      producto.unidad = 'rubro1';
      producto1.precio_de_venta = '$200';
      producto1.stock_minimo = '7';
      producto.acciones = 'producto';

      var arrayList = new Array()
      arrayList.push(producto)
      arrayList.push(producto1)
      arrayList.push(producto1)
      arrayList.push(producto1)
      arrayList.push(producto1)
      arrayList.push(producto1)
      arrayList.push(producto1)
      commit('llenarProductos',arrayList)

  },
  obtenerProducto({commit},id){
    /*const data =  fetch('producto.json');
    const producto =  producto.json();*/
    var producto = new Object();
    producto.id = '1';
    producto.nombre = 'producto1';
    producto.descripcion = 'decripcion';
    producto.unidad_de_compra = 'Unidad';
    producto.unidad_de_consumo = 'Unidad';
    producto.codigo = '123124124';
    producto.unidad = 'rubro1';
    producto.precio_de_venta = '$100';
    producto.stock_minimo = '5';
    producto.acciones = 'producto';
    producto.imagen = '';
    var ingrediente = new Object();
    ingrediente.nombre = 'Queso la Paulina';
    ingrediente.cantidad = '120';

    commit('llenarProducto',producto)
    commit('agregarInsumo',ingrediente)
  }
}

const mutations = {
  //LLENAR PRODUCTOS
  llenarProductos(state,productos){
    state.productos = productos;
},
  //LLENAR PRODUCTO
  llenarProducto(state,producto){
      state.producto_get = producto;
  },
  //INGREDIENTES
  agregarInsumo(state,insumo){
    state.listado_insumos.push(insumo);
  },
  quitarIngrediente(state,id){
      state.listado_insumos.splice(id,1)
  },
  vaciarIngredientes(state){
      state.listado_insumos = [];
  },
  //FIN INGREDIENTES


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
  getListadoInsumo : state => state.listado_insumos,
  getProducto : state => state.producto_get,
  getProductos : state => state.productos,
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})