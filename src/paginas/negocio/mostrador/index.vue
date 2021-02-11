<template>
  <div>
    <CRow>
      <CCol sm="6">
        <CCard v-if="show">
          <CCollapse :show="formCollapsed">
            <CCardHeader class="card-titulo">
              <div class="col-12" align="center">
                <h4>PEDIDOS</h4>
              </div>
            </CCardHeader>
            <CCardBody>
              <CButton @click="nuevoPedido()" type="submit" color="danger">
                <CIcon name="cil-plus" height="25" /> Nuevo Pedido</CButton
              >

              <CRow class="p-3">
                <table class="table">
                  <thead align="center">
                    <tr>
                      <th scope="col">HORA</th>
                      <th scope="col">CLIENTE</th>
                      <th scope="col">ESTADO</th>
                      <th scope="col">TOTAL</th>
                      <th scope="col">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody align="center">
                    <tr
                      @click="detallePedido(index)"
                      v-for="(item, index) in pedidos"
                      :key="index"
                    >
                      <td>00:00</td>
                      <td>{{ item.detalle.cliente.nombre }}</td>
                      <td>{{ item.estado }}</td>
                      <td>${{ item.total }}</td>
                      <td><button class="btn btn-warning">x</button></td>
                    </tr>
                  </tbody>
                </table>
              </CRow>
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>
      <CCol col="6">
          <Detalle :mesa="pedido" :origen="'mostrador'"/>

      </CCol>
    </CRow>

    <CModal
      :show.sync="mesaModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="NUEVO PEDIDO"
      size="lg"
      color="dark"
    >
      <CCol>
        <CRow class="mt-2">
          <CCol align="center" col="4">
            <label for="exampleFormControlSelect1">Cliente</label>
          </CCol>
          <CCol col="8">
            <select
              v-model="cliente" 
              class="form-control"
              id="exampleFormControlSelect1"
            >
              <option value="0" selected>Seleccione el cliente...</option>
              <option
                v-for="item of clientes"
                :key="item.id"
                :value="item"
              >
                {{ item.nombre }}
              </option>
            </select>
          </CCol>
        </CRow>
      </CCol>
      <template #header>
        <CCol align="center">
          <h5 class="modal-title">NUEVO PEDIDO</h5>
        </CCol>
        <CButtonClose @click="mesaModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="abrirPedido()" color="success">CREAR</CButton>
      </template>
    </CModal>


  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Detalle from "@/components/pedidos/Detalle.vue";

export default {
  components: {
    Detalle,
  },
  data() {
    return {
      show: true,
      formCollapsed: true,

      lineas: [],
      venta: [],
      id: 0,
      pedido : {
          numero : '',
          detalle: {
              cliente : {nombre:''},
              mozo : {nombre:''},
              detalle : {personas:''}
          }
      },
      cliente: '',

      cliente_t: "",
      /////
      listado_productos: [],
      listado_mozos: [],
      listado_clientes: [],
      linea_venta: [],
      producto: { nombre: "" },
      total: 0,
      //Para el estilo de las mesas
      mesa_select: "mesa-seleccionada",
      mesaModal: false,
      productoModal: false,
      pagoModal: false,
      //Para el modal de productos
      filtro: "",
    };
  }, 
  computed: {
    obtenerPedido() {
      var pedido = [];
      this.pedidos.forEach((element) => {
        if (element.id == this.id) pedido = element;
      });
      return pedido;
    },
    ...mapGetters({
      clientes : 'clientes',
      pedidos : 'pedidos'
    })
  },
  mounted() {
    this.datosIniciales();
  },
  methods: {
    ...mapMutations(['addPedido']),
    datosIniciales() {
      //Mozos
      var mozo = new Object();
      mozo.id = "0";
      mozo.nombre = "Ferreira Carlos";
      var mozo1 = new Object();
      mozo1.id = "1";
      mozo1.nombre = "Gomez Alberto";
      this.listado_mozos.push(mozo);
      this.listado_mozos.push(mozo1);
      //Productos
      var producto = new Object();
      producto.id = "1";
      producto.nombre = "Sandwich de Milanesa";
      producto.descripcion = "Especial";
      producto.codigo = "1234";
      producto.categoria = "Sandwich";
      producto.precio_de_venta = "240";
      producto.precio = "240";
      producto.stock_minimo = "5";
      //producto.stock = '5';
      var producto1 = new Object();
      producto1.id = "2";
      producto1.nombre = "Pizza Napolitana";
      producto1.descripcion = "Mortadela con Queso";
      producto1.codigo = "4321";
      producto1.categoria = "Pizza";
      producto1.precio_de_venta = "$200";
      producto1.precio = "200";
      producto1.stock_minimo = "7";
      //producto1.stock = '7';
      this.listado_productos.push(producto);
      this.listado_productos.push(producto1);
    },
    nuevoPedido() {
      this.mesaModal = true;
    },
    abrirPedido() {
      var cliente = new Object();
      if (this.cliente == "") {
        cliente.nombre = "";
      } else {
        cliente = this.cliente;
      }


      var pedido = new Object();
      var detalle = new Object();
      detalle.cliente = cliente;
      //pedido.detalle.cliente = cliente;
      detalle.personas = '';
      pedido.estado = "activo";
      pedido.total = 0;
      pedido.detalle = detalle;
      pedido.linea_venta = [];
                      console.log('llega')

      this.addPedido(pedido);

      this.mesaModal = false;
    },
    detallePedido(index) {
      this.pedido = this.pedidos[index];

      var aux = this.pedidos[index];
      //this.cliente_t = aux.cliente.nombre;
      this.id = index;
      //this.total = this.pedidos[index].total;
      this.cambiarLineas();
    },
    cambiarLineas() {
      var aux = this.pedidos[this.id].linea_venta;
      this.lineas = aux;
    },
    seleccionarProducto(item) {
      this.producto = item;
      this.productoModal = false;
    },
    agregarProducto() {
      var linea = new Object();
      linea.cantidad = this.cantidad;
      linea.producto = this.producto;
      linea.subtotal = this.cantidad * this.producto.precio;
      if (this.pedidos[this.id].linea_venta != null) {
        this.pedidos[this.id].linea_venta.push(linea);
        var aux = this.pedidos[this.id].linea_venta;
        this.lineas = aux;
      } else {
        this.pedidos[this.id].linea_venta = [];
        this.pedidos[this.id].linea_venta.push(linea);
        var aux = this.pedidos[this.id].linea_venta;
        this.lineas = aux;
      }
      this.producto = "";
      this.cantidad = "1";
      this.pedidos[this.id].total += linea.subtotal;
      this.total += this.pedidos[this.id].total;
    },
  },
};
</script>

<style scoped>
.mesa {
  height: 50pt;
  min-width: 50pt;
}
.card-titulo {
  background-color: rgb(182, 32, 32);
  color: white;
}
.card-subtitulo {
  background-color: rgb(196, 127, 127);
  color: white;
  padding: 3pt 0 3pt 0;
}
.card-subtitulo h5 {
  margin: 0;
}
.card-titulo h4 {
  margin: 0;
}
.mesa-seleccionada {
  border-style: solid;
  border-width: 3pt;
  border-color: rgb(255, 174, 0);
}
</style>