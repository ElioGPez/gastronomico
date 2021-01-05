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
                <CButton @click="nuevoPedido()" type="submit"  color="danger">                
                <CIcon
                  name="cil-plus"
                  height="25"
                /> Nuevo Pedido</CButton>

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
            <tr @click="detallePedido(index)" v-for="(item,index) in pedidos" :key="index">
            <td>00:00</td>
            <td>{{item.cliente.nombre}}</td>
            <td>{{item.estado}}</td>
            <td>${{item.total}}</td>
            <td><button class="btn btn-warning">x</button></td>
            </tr>
        </tbody>
        </table>

                        </CRow>

                    </CCardBody>
                    </CCollapse>
                </CCard>  
            </CCol>
            <CCol sm="6">
                <CCard v-if="show">
                    <CCollapse :show="formCollapsed">
          <CCardHeader class="card-titulo">
                        <div class="col-12" align="center">
                            <h4>DETALLE DEL PEDIDO {{obtenerPedido.numero}}</h4>
                        </div>
          </CCardHeader>
                    <CCardBody class="p-0">
                <CCol class="p-3">
                  <CRow>
                      <CCol sm="3">
                          <h6>CLIENTE</h6>
                      </CCol>
                      <CCol sm="4">
                        {{cliente_t}}
                      </CCol>
                  </CRow>
                </CCol>
    <CCol class="card-subtitulo" col="12" align="center">
        <h5>PRODUCTOS</h5>
    </CCol>
    <CCol class="p-3">
        <CRow>
            <CCol class="p-0" col="2">
                <CButton @click="productoModal = true" type="submit"  color="secondary">BUSCAR</CButton>
            </CCol>
            <CCol class="" col="5">
                <input v-model="producto.nombre" type="text" placeholder="Producto" class="form-control" />
            </CCol>
            <CCol class="" col="3">
                <input v-model="cantidad" type="number" placeholder="Cantidad" class="form-control" />
            </CCol>
            <CCol class="" col="1">
                <CButton @click="agregarProducto()" type="submit"  color="danger">+</CButton>
            </CCol>
        </CRow>
        <table class="table">
        <thead align="center">
            <tr>
            <th scope="col">PRODUCTO</th>
            <th scope="col">CANTIDAD</th>
            <th scope="col">SUBTOTAL</th>
            <th scope="col">ACCIONES</th>
            </tr>
        </thead>
        <tbody  align="center">
            <tr v-for="item in lineas" :key="item.id">
            <td>{{item.producto.nombre}}</td>
            <td>{{item.cantidad}}</td>
            <td>{{item.subtotal}}</td>
            <td><button class="btn btn-warning">x</button></td>
            </tr>
        </tbody>
        </table>
    </CCol>
                    </CCardBody>
                    <CCardFooter>
            <CRow>
              <CCol sm="4">
              </CCol>
              <CCol sm="4" align="right" class="col-form-label">
                <h5 style="color:green" class="total">TOTAL ${{total}}</h5>
              </CCol>
              
            </CRow>
   <Pago :pagoModal="pagoModal" :venta="pedidos[this.id]" />


                    </CCardFooter>
                    </CCollapse>
                </CCard>  
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
                    <select v-model="cliente" class="form-control" id="exampleFormControlSelect1">
                    <option value="0" selected>Seleccione el cliente...</option>
                    <option v-for="item of listado_mozos" :key="item.id" :value="item">{{item.nombre}}</option>
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

    <CModal
      :show.sync="productoModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Buscar Producto"
      size="lg"
      color="dark"
    >

            <div class="row">
              <div class="col-2 center">
                <p>Nombre:</p>
              </div>
              <div class="col-4">
                <input v-model="filtro" type="text" class="form-control" />
              </div>
            </div>
            <hr />
            <div class="row">
              <!-- Tabla -->
              <div class="form-group col-12">
                <fieldset>
                  <div class>
                    <table
                  class="table table-striped table-bordered table-condensed table-hover"
                  style="background-color:white"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Codigo</th>
                      <th>Nombre</th>
                      <th>Descripcion </th>
                      <th>Stock</th>
                      <th>Precio</th>

                    </tr>
                  </thead>
                  <tbody>
                    <!--paginate name="producto" :list="filtroListado" :per="2" tag="tbody"-->
                    <tr @click="seleccionarProducto(item)" v-for="item in listado_productos" :key="item.id">
                      <td data-label="ID">
                        {{item.id}}
                      </td>
                      <td data-label="codigo">
                        {{item.codigo}}                     
                      </td>
                      <td data-label="nombre">
                        {{item.nombre}}                     
                      </td>
                      <td data-label="descripcion">
                        {{item.descripcion}}                     
                      </td>
                      <td data-label="stock">
                        {{item.stock}}                     
                      </td>
                      <td data-label="precio">
                        ${{item.precio}}                     
                      </td>

                    </tr>
                  </tbody>
                </table>
                  </div>
                </fieldset>
                  <!--paginate-links for="producto" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links-->
                <br />
              </div>

      </div>
      <template #header>
        <h6 class="modal-title">Buscar Producto</h6>
        <CButtonClose @click="productoModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton  @click="productoModal = false" color="danger">Cancelar</CButton>
      </template>
    </CModal>
    </div>
</template>

<script>
import Pago from "@/components/ventas/Pago.vue";

export default {
    components:{
      Pago
    },
    data() {
        return {
                show: true,
                formCollapsed: true,

                pedidos : [],
                lineas : [],
                venta : [],
                id: 0,

                mozo: '',
                cliente: '',
                personas: '',
                cantidad: '',

                cliente_t : '',
                /////
                listado_productos: [],
                listado_mozos: [],
                listado_clientes: [],
                linea_venta: [],
                producto : {nombre: ''},
                total: 0,
                //Para el estilo de las mesas
                mesa_select : 'mesa-seleccionada',
                mesaModal : false,
                productoModal : false,
                pagoModal : false,
                //Para el modal de productos
                filtro: '',
        }
    },
    computed: {
        obtenerPedido(){
            var pedido = [];
            this.pedidos.forEach(element => {
             if(element.id == this.id)
                pedido = element;   
            });
            return pedido;
        }
    },  
    mounted() {
        this.datosIniciales();
    },     
    methods: {
        datosIniciales(){
            //Mozos
            var mozo = new Object();
            mozo.id = '0';
            mozo.nombre = 'Ferreira Carlos';
            var mozo1 = new Object();
            mozo1.id = '1';
            mozo1.nombre = 'Gomez Alberto';
            this.listado_mozos.push(mozo)
            this.listado_mozos.push(mozo1)
            //Productos
            var producto = new Object();
            producto.id = '1';
            producto.nombre = 'Sandwich de Milanesa';
            producto.descripcion = 'Especial';
            producto.codigo = '1234';
            producto.categoria = 'Sandwich';
            producto.precio_de_venta = '240';
            producto.precio = '240';
            producto.stock_minimo = '5';
            //producto.stock = '5';
            var producto1 = new Object();
            producto1.id = '2';
            producto1.nombre = 'Pizza Napolitana';
            producto1.descripcion = 'Mortadela con Queso';
            producto1.codigo = '4321';
            producto1.categoria = 'Pizza';
            producto1.precio_de_venta = '$200';
            producto1.precio = '200';
            producto1.stock_minimo = '7';
            //producto1.stock = '7';
            this.listado_productos.push(producto);
            this.listado_productos.push(producto1);

        },
        nuevoPedido(){
                this.mesaModal = true;

        },
        abrirPedido(){
          var cliente = new Object();
          if(this.cliente == ''){
            cliente.nombre = '';
          }else{
            cliente = this.cliente;
          }

          var pedido = new Object();
          pedido.cliente = cliente;
          pedido.estado = 'activo';
          pedido.total = 0;
          this.pedidos.push(pedido);

            this.mesaModal = false;

        },
        detallePedido(index){
          var aux = this.pedidos[index];
          this.cliente_t = aux.cliente.nombre
          this.id = index;
          this.total = this.pedidos[index].total;
          this.cambiarLineas();
        },
        cambiarLineas(){
            var aux = this.pedidos[this.id].linea_venta;
            this.lineas = aux;
        },
        seleccionarProducto(item){
            this.producto = item;
            this.productoModal = false;
        },
        agregarProducto(){
            var linea = new Object();
            linea.cantidad = this.cantidad;
            linea.producto = this.producto;
            linea.subtotal = this.cantidad * this.producto.precio;
            if(this.pedidos[this.id].linea_venta != null){
              this.pedidos[this.id].linea_venta.push(linea);
              var aux = this.pedidos[this.id].linea_venta;
              this.lineas = aux;
            }else{
              this.pedidos[this.id].linea_venta = [];
              this.pedidos[this.id].linea_venta.push(linea);
              var aux = this.pedidos[this.id].linea_venta;
              this.lineas = aux;
            }
            this.producto = '';
            this.cantidad = '1';
            this.pedidos[this.id].total += linea.subtotal;
            this.total += this.pedidos[this.id].total;
        }   
    },
}
</script>

<style scoped>
    .mesa {
        height: 50pt;
        min-width: 50pt;
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
    .mesa-seleccionada{
        border-style: solid;
        border-width: 3pt;
        border-color: rgb(255, 174, 0);
    }
</style>