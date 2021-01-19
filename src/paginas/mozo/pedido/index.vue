<template>
  <div>
    <CCol class="card-mozo">
      <CCard v-if="show">
        <CCollapse :show="formCollapsed">
          <CCardHeader class="card-titulo">
            <div class="col-12" align="center">
              <h4>REALIZAR PEDIDO </h4>
            </div>
          </CCardHeader>
          <CCardBody class="p-0">
            <CCol class="p-3">
              <CRow>
                <CCol align="right" col="4">
                  <h6>CLIENTE</h6>
                </CCol>
                <CCol col="8">
                  <input
                    type="text"
                    placeholder="Cliente"
                    class="form-control"
                  />                
                </CCol>
              </CRow>
            <CRow class="mt-1">
                <CCol align="right" col="4">
                  <h6>MESA</h6>
                </CCol>
                 <CCol  col="8">
                    <select  class="form-control" id="exampleFormControlSelect1">
                    <option>Seleccione la Mesa...</option>
                    <option v-for="item of $store.getters.mesas" :key="item.id" :value="item">{{item.numero}}</option>
                    </select>
                </CCol>
            </CRow>
            </CCol>
            <CCol class="card-subtitulo" col="12" align="center">
              <h5>PRODUCTOS</h5>
            </CCol>
            <CCol class="p-3">
              <CRow>
                <CCol align="center" class="pl-2" col="2">
                  <CButton
                    @click="productoModal = true"
                    type="submit"
                    color="secondary"
                    ><CIcon
                  name="cil-search"
                  height="25"
                /></CButton
                  >
                </CCol>
                <CCol class="p-0 pr-1" col="6">
                  <input
                    v-model="producto.nombre"
                    type="text"
                    placeholder="Producto"
                    class="form-control"
                  />
                </CCol>
                <CCol  col="1" class="p-0 center">
                  <CButton class="btn-cantidad"
                    @click="agregarProducto()"
                    type="submit"
                    color="warning"
                    >-</CButton>
                </CCol>
                <CCol align="center" class="cantidad">
                  <input align="center"
                    v-model="cantidad"
                    type="text"
                    placeholder="Producto"
                    class="form-control"
                  />
                </CCol>
                <CCol  col="1" class="p-0 center">
                  <CButton class="btn-cantidad"
                    @click="agregarProducto()"
                    type="submit"
                    color="warning"
                    >+</CButton>
                </CCol>

              </CRow>
              <CRow  class="pt-1">
                <CCol class="pl-2 pr-1" col="8">
                  <input
                    v-model="producto.nombre"
                    type="text"
                    placeholder="Comentarios"
                    class="form-control"
                  />
                </CCol>
                <CCol align="center" class="p-0">
                  <CButton
                  class="btn "
                    @click="agregarProducto()"
                    type="submit"
                    color="danger"
                    >AGREGAR</CButton
                  >
                </CCol>
              </CRow>
              <hr>


          <div class="lista row">
              
              <div class="imagen col-3">
                <div class="img-container"> 
                  <img src="@/assets/img/logo-ferreteria.png" alt="">
                </div>
              </div>
              <div class="p-0 col-7">
                  <div class="col-12">
                    <h6 class="mb-0">
                        PRODUCTO
                    </h6>
                  </div>
                  <div class="col-10">
                    <h6 class="mb-0">
                        CANTIDAD: 10
                    </h6>
                  </div>
              </div>
              <div class="col-2 imagen" >
                <CRow>
                  <CCol col="12" class="mb-1">
                    <CIcon
                      name="cil-comment-bubble"
                      height="18"
                    />
                  </CCol>
                  <CCol col="12"> 
                    <CIcon
                      name="cil-trash"
                      height="18"
                    />
                  </CCol>
                </CRow>
              </div>
          </div>

            </CCol>
          </CCardBody>
          <CCardFooter>


          </CCardFooter>
        </CCollapse>
      </CCard>
    </CCol>

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
            <div >
              <!-- Tabla -->
          <div v-for="item in listado_productos" :key="item.id" class="lista row">
              <div class="imagen col-3">
                <div class="img-container"> 
                  <img src="@/assets/img/logo-ferreteria.png" alt="">
                </div>
              </div>
              <div class="p-0 col-7">
                  <div class="col-12">
                    <h6 class="mb-0">
                        {{item.nombre}}
                    </h6>
                  </div>
                  <div class="col-10">
                    <h6 class="mb-0">
                          ${{item.precio}}
                    </h6>
                  </div>
              </div>
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
            show : true,
            formCollapsed: true,
                producto : {nombre: ''},
                productoModal : false,
                cantidad : 1,
                lineas : [],
                filtro: '',
                listado_productos: [],

        }
    },
    mounted() {
        this.datosIniciales();
    },
    methods: {
      datosIniciales(){
          console.log('Base url: '+this.axios.defaults.baseURL);

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
      }
    },
}
</script>

<style scoped>
    .card-titulo{
        background-color: rgb(182, 32, 32);
        color: white;
    }    
    .card-mozo{
        margin: 0%;
        padding: 0%;
    }
    .card-subtitulo{
        background-color: rgb(196, 127, 127);
        color: white;
        padding: 3pt 0 3pt 0;
    }
    h6{
        padding-top: 6pt;
    }
    .btn-cantidad{
      border-radius: 50%;
      height: 20pt;
      width: 20pt;
      display:flex;
      justify-content: center;
      align-items: center;
    }
    .center{
      display:flex;
      justify-content: center;
      align-items: center;
    }
    .cantidad{
      width: 10pt;
      padding: 0 3pt 0 3pt;
      text-align: right;
    }

    /* Para el listado de productos */
    .lista{
        font-size: 14pt;
        font-weight: bold;
        padding: 2pt 0 2pt 0;
        text-align: left;   
        border-style: solid;
        border-width: 1pt 0 1pt 0;
        border-color: rgb(255, 96, 96);

    }
  
    .imagen{
      border-style: solid;
      border-color: rgb(138, 138, 138);
      border-width: 0 0.5pt 0 0.5pt;

    }
  
  .img-container {
  width: 100%;
  height: 35pt;
  overflow: hidden;

}
.img-container img {
  width: 100%;
  height: auto;
  position: relative;
}

</style>