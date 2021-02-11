import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  //CREAR VENTA
  linea_venta : 'hols',
  producto : '',
  dark : false,

  //NUEVA FORMA
  listado_insumos : [],
  producto_get : [],
  productos : [],
  ingredientes : [],
  ingrediente : [],
  mesas : [],
  pedidos : [],
  clientes : [],
  cajas : [],
  cajas_abiertas : [],
  //MODAL
  productoModal : false,
}

const actions = {
  getMesas({commit}){
    axios. get('cajas')
    .then(response => {
      //llenamos las cajas
      commit('llenarCajas',response.data.data.cajas);
    }).catch(err => {
      console.log(err)
    });
  },
  obtenerClientes({commit}){
    //CLIENTES
    var cliente = new Object();
    cliente.id = '0';
    cliente.nombre = 'Ferreira Carlos';
    var clientes = new Array();
    clientes.push(cliente)

    commit('llenarClientes',clientes)
  },
  obtenerIngredientes({commit}){
    var ingrediente = new Object();
    ingrediente.id = '1';
    ingrediente.nombre = 'Queso la Paulina';
    ingrediente.cantidad = '240';
    var ingrediente2 = new Object();
    ingrediente2.id = '2';
    ingrediente2.nombre = 'Tomates';
    ingrediente2.cantidad = '2';

    var arrayList = new Array()
    arrayList.push(ingrediente)
    arrayList.push(ingrediente2)

    commit('llenarIngredientes',arrayList)
  },
  obtenerProductos({commit}){
      /*var producto = new Object();
      producto.id = '1';
      producto.nombre = 'alfafor';
      producto.descripcion = 'decripcion';
      producto.codigo = '123124124';
      producto.unidad = 'rubro1';
      producto.precio_de_venta = '100';
      producto.stock_minimo = '5';
      producto.acciones = 'producto';
      var producto1 = new Object();
      producto1.id = '2';
      producto1.nombre = 'mani';
      producto1.descripcion = 'decripcion';
      producto1.codigo = '123124124';
      producto.unidad = 'rubro1';
      producto1.precio_de_venta = '200';
      producto1.stock_minimo = '7';
      producto.acciones = 'producto';

      var arrayList = new Array()
      arrayList.push(producto)
      arrayList.push(producto1)*/
      axios. get('productos')
      .then(response => {
        //llenamos las cajas
        console.log(response.data.data.productos)
        commit('llenarProductos',response.data.data.productos);
      }).catch(err => {
        console.log(err)
      });


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
    producto.precio_de_venta = '100';
    producto.stock_minimo = '5';
    producto.acciones = 'producto';
    producto.imagen = '';
    var ingrediente = new Object();
    ingrediente.nombre = 'Queso la Paulina';
    ingrediente.cantidad = '120';

    commit('llenarProducto',producto)
    commit('agregarInsumo',ingrediente)
  },
  obtenerIngrediente({commit},id){
    /*const data =  fetch('producto.json');
    const producto =  producto.json();*/
    var ingrediente = new Object();
    ingrediente.id = '1';
    ingrediente.nombre = 'producto1';
    ingrediente.descripcion = 'decripcion';
    ingrediente.unidad_de_compra = 'Unidad';
    ingrediente.unidad_de_consumo = 'Unidad';
    ingrediente.codigo = '123124124';
    ingrediente.unidad = 'rubro1';
    ingrediente.stock_minimo = '5';
    ingrediente.acciones = 'producto';
    ingrediente.imagen = '';

    commit('llenarIngrediente',ingrediente)
  }
}
 
const mutations = {
  //CERRAR CAJA
  cerrarCaja(state,{caja,monto_real}){
    console.log(caja + monto_real);
    state.cajas_abiertas[caja].estado = 'cerrada';
    state.cajas_abiertas[caja].monto_real = monto_real;
    state.cajas_abiertas[caja].diferencia = state.cajas_abiertas[caja].monto_inicial - state.cajas_abiertas[caja].monto_real;
    var hoy = new Date();
    var hora = hoy.getHours() + ":" + hoy.getMinutes();
    state.cajas_abiertas[caja].hora_fin = hora;

  },
  //REGISTRAR APERTURA CAJAS
  aperturaCaja(state,caja){
    state.cajas_abiertas.push(caja);
},
  //AGREGAR PEDIDO
  addPedido(state,pedido){
    state.pedidos.push(pedido);
},
  //LLENAR CAJAS
  llenarCajas(state,cajas){
    /*var caja = new Object();
    caja.id = '0';
    caja.numero = '1';
    caja.apertura = [];
    var cajas = new Array()
    cajas.push(caja)*/
    console.log(cajas)

    state.cajas = cajas;
},
  //LLENAR CLIENTES
  modalProducto(state){
    if(state.productoModal){
      state.productoModal = false;
    }else{
      state.productoModal = true;
    }
},
  //LLENAR CLIENTES
  llenarClientes(state,clientes){
    state.clientes = clientes;
},
  //LLENAR INGREDIENTE
  llenarIngrediente(state,ingrediente){
    state.ingrediente = ingrediente;
},
  //LLENAR INGREDIENTES
  llenarIngredientes(state,ingredientes){
    state.ingredientes = ingredientes;
},
  //LLENAR PRODUCTOS
  llenarProductos(state,productos){
    state.productos = productos;
},
  //LLENAR PRODUCTO
  llenarProducto(state,producto){
      state.producto_get = producto;
  },
  //LLENAR PRODUCTO
  asignarProducto(state,producto){
    state.producto = producto;
},
  //VACIAR PRODUCTO
  vaciarProducto(state){
    state.producto = '';
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
  iniciarMesas(state){
    for (let index = 0; index < 8; index++) {
      var mesa1 = new Object();
      mesa1.id = index;
      mesa1.numero = index+1;
      mesa1.estado = 'libre'
      mesa1.select = false;
      mesa1.linea_venta = [];
      mesa1.total = 0;
      var detalle = new Object();
      detalle.mozo = '';
      detalle.cliente = '';
      detalle.personas = '';
      mesa1.detalle = detalle;
      state.mesas.push(mesa1);
    }
    //state.mesas = mesas;
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
  pedidos: state => state.pedidos,
  dark:state => state.dark,
  getListadoInsumo : state => state.listado_insumos,
  getProducto : state => state.producto_get,
  getProductos : state => state.productos,
  getIngredientes : state => state.ingredientes,
  ingrediente : state => state.ingrediente,
  clientes : state => state.clientes,
  cajas : state => state.cajas,
  cajas_abiertas : state => state.cajas_abiertas,
  productoModal : state => state.productoModal,
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})