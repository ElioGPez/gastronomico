<template>
    <div>

        <CRow>
            <CCol sm="6">
                <CCard v-if="show">
                    <CCollapse :show="formCollapsed">
          <CCardHeader class="card-titulo">
                        <div class="col-12" align="center">
                            <h4>MESAS</h4>
                        </div>
          </CCardHeader>
                    <CCardBody>
                        <CRow class="p-3">
                            <CCol v-for="item in mesas" :key="item.id" class="mb-4" sm="3" lg="3" md="3" xs="3" >
                                <div class="row">
                                    <button @click="mesaClick(item.id)" :class="{'mesa-seleccionada' : item.select }" v-if="item.estado=='libre'" type="button" class="mesa btn btn-success"><h5>{{item.numero}}</h5></button>
                                    <button @click="mesaClick(item.id)" :class="{'mesa-seleccionada' : item.select }" v-else type="button" class="mesa btn btn-danger"><h5>{{item.numero}}</h5></button>
                                </div>
                            </CCol>

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
                            <h4>DETALLE MESA {{mesas[id].numero}}</h4>
                        </div>
          </CCardHeader>
                    <CCardBody class="p-0">
                <CCol class="p-3">
                  <CRow>
                      <CCol sm="3">
                          <h6>CLIENTE </h6>
                      </CCol>
                      <CCol sm="4">
                          <h6>{{mesas[id].detalle.cliente.nombre}}</h6>
                      </CCol>
                  </CRow>
                  <CRow>
                      <CCol sm="3">
                          <h6>MOZO </h6>
                      </CCol>
                      <CCol sm="4">
                          <h6>{{mesas[id].detalle.mozo.nombre}}</h6>
                      </CCol>
                  </CRow>
                  <CRow>
                      <CCol sm="3">
                          <h6>PERSONAS </h6>
                      </CCol>
                      <CCol sm="4">
                          <h6>{{mesas[id].detalle.personas}}</h6>
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
        <tbody align="center">
            <tr v-for="item in mesas[id].linea_venta" :key="item.id">
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
              <CCol align="center" sm="4" >
                <CButton  type="submit" color="danger">CERRAR MESA</CButton>
              </CCol>
              <CCol sm="4" align="right" class="col-form-label">
                <h5 style="color:green" class="total">TOTAL ${{total}}</h5>
              </CCol>
            </CRow>
                    </CCardFooter>
                    </CCollapse>
                </CCard>  
            </CCol>
        </CRow>
      
   <CModal
      :show.sync="mesaModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Abrir Mesa"
      size="lg"
      color="dark"
    >
        <CCol>
            <CRow>
                <CCol align="center" col="4">
                    <label for="exampleFormControlSelect1">Mozo</label>
                </CCol>
                 <CCol col="8">
                    <select v-model="mozo" class="form-control" id="exampleFormControlSelect1">
                    <option>Seleccione el mozo...</option>
                    <option v-for="item of listado_mozos" :key="item.id" :value="item">{{item.nombre}}</option>
                    </select>
                </CCol>
            </CRow>
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
            <h5 class="modal-title">APERTURA DE MESA</h5>
        </CCol>
        <CButtonClose @click="mesaModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="abrirMesa()" color="success">ABRIR</CButton>
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
export default {
    data() {
        return {
                show: true,
                formCollapsed: true,
                mesas_check : [
                    {mesa1 : false},
                    {mesa2 : false},
                    {mesa3 : false},
                    {mesa4 : false},
                ],
                mesas_enable : [
                    {mesa1 : 1},
                    {mesa2 : 1},
                    {mesa3 : 1},
                    {mesa4 : 1},
                ],
                mesas : [],
                id: 0,
                mesa_detalle: {
                    id: '',
                    numero : '',
                    detalle :{
                        mozo : {nombre:''},
                        cliente : {nombre:''},
                        personas : '',
                    },
                    linea_venta : [{
                        cantidad : '',
                        subtotal : '',
                        producto : {nombre:''}

                    }]

                },
                mozo: '',
                cliente: '',
                personas: '',
                cantidad: '',
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

                //Para el modal de productos
                filtro: '',
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

            console.log(this.listado_mozos)

            //Mesas
            var mesa = new Object();
            mesa.id = '0';
            mesa.numero = '1';
            mesa.estado = 'libre';
            mesa.select = false;
            mesa.linea_venta = [];
            //detalle de mesa
            var detalle = new Object();
            detalle.mozo = '';
            detalle.cliente = '';
            detalle.personas = '';
            mesa.detalle = detalle;

            var mesa1 = new Object();
            mesa1.id = '1';
            mesa1.numero = '2';
            mesa1.estado = 'libre'
            mesa1.select = false;
            mesa1.linea_venta = [];
            mesa1.detalle = detalle;

            //detalle de mesa
            var detalle = new Object();
            detalle.mozo = 'Fernandez Agusto';
            detalle.cliente = 'Federico';
            detalle.personas = 5;
           // mesa1.detalle = detalle;
            this.mesas.push(mesa);
            this.mesas.push(mesa1);

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
        mesaClick(id){
            console.log("id: "+id)
            this.mesas.forEach(element => {
                if(element.id == id){
                    element.select = true;
                    this.id = id;
                }else{
                    element.select = false;
                }
            });
                console.log(this.mesas[id])
            if(this.mesas[id].estado == 'libre'){
                console.log('mesa libre!!')
                this.id = id;
                this.mesaModal = true;
            }/*else{
                this.mesa_detalle = this.mesas[id];
            }*/
        },
        abrirMesa(){
            //Asignamos los valores a la respectiva mesa
            console.log(this.mesas[this.id].detalle.mozo)
            this.mesas[this.id].detalle.mozo = this.mozo;
            this.mesas[this.id].detalle.cliente = this.cliente;
            this.mesas[this.id].detalle.personas= 5;
            this.mesas[this.id].estado= 'ocupada';
            //Igualamos la informacion de la mesa a la mesa auxiliar que muestra la info
            //this.mesa_detalle = this.mesas[this.mesa_detalle.id];
            //Cerramos el modal
            this.mesaModal = false;

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
            this.mesas[this.id].linea_venta.push(linea);

            this.total += linea.subtotal;
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