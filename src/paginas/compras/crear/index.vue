<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <CRow>
                  <CCol tag="label" sm="1" class="col-form-label">
                    <CButton
                      @click="proveedoresModal = true"
                      type="submit"
                      color="primary"
                      >Buscar</CButton
                    >
                  </CCol>
                  <CCol tag="label" sm="5" class="col-form-label">
                    <CInput v-on:keyup.enter="agregarLinea()" v-model="getProducto" label="Proveedor" horizontal autocomplete="producto" />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol tag="label" sm="1" class="col-form-label">
                    <CButton
                      @click="$store.commit('darkModalTrue')"
                      type="submit"
                      color="primary"
                      >Buscar</CButton
                    >
                  </CCol>
                  <CCol tag="label" sm="5" class="col-form-label">
                    <CInput v-on:keyup.enter="agregarLinea()" v-model="getProducto" label="Producto" horizontal autocomplete="producto" />
                  </CCol>
                </CRow>
                <CCol tag="label" sm="3" class="col-form-label">
                  <CInput
                    label="Cantidad"
                    horizontal
                    autocomplete="cantidad"
                    type="numer"
                    v-model="cantidad"
                  />
                </CCol>
                <CCol tag="label" sm="3" class="col-form-label">
                  <CInput
                    label="Costo"
                    horizontal
                    autocomplete="costo"
                    type="numer"
                    v-model="costo"
                  />
                </CCol>
                  <CCol tag="label" sm="2" class="col-form-label">
                    <CButton
                      type="submit"
                      color="primary"
                      >AGREGAR</CButton
                    >
                  </CCol>
              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12" md="12">
        <CCard>
          <CCardBody>
            <CCol sm="12">
              <CTableWrapper
                :items="linea_venta"
                :fields="getCabeceraLineaVenta()"
                hover
                striped
                bordered
                small
                fixed
                caption="Linea de Compra"
              />
            </CCol>
            <div class="row">

              <div class="col-12" align="right">
                <h4 class="total">TOTAL ${{total}}</h4>
              </div>
            </div>
          </CCardBody>
        </CCard>

            <CCard>
            <CCardBody>
                <div class="row">
                    <div class="col-6" align="right">
                        <CButton @click="VentaModal = true" type="submit" color="success">CONFIRMAR</CButton>
                    </div>
                </div>

            </CCardBody>
            </CCard>
      </CCol>
    </CRow>

    <CModal
      :show.sync="proveedoresModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Buscar Proveedores"
      size="lg"
      color="dark"
    >
      <div class="card">
        <CCol tag="label" sm="12" class="col-form-label">
          <CInput label="Nombre o Codigo" horizontal autocomplete="producto" />
        </CCol>
        <CCol sm="12">
          <CTableWrapper
            :items="lista_proveedores"
            :fields="getCabeceraProveedores()"
            hover
            striped
            bordered
            small
            fixed
            caption="PROVEEDORES"
          />
        </CCol>
      </div>
      <template #header>
        <h6 class="modal-title">Buscar Proveedor</h6>
        <CButtonClose @click="proveedoresModal=false" class="text-white" />
      </template>
      <template #footer>
        <CButton  @click="proveedoresModal=false" color="danger">Cancelar</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="$store.getters.dark"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Buscar Producto"
      size="lg"
      color="dark"
    >
      <div class="card">
        <CCol tag="label" sm="12" class="col-form-label">
          <CInput label="Nombre o Codigo" horizontal autocomplete="producto" />
        </CCol>
        <CCol sm="12">
          <CTableWrapper
            :items="lista_productos"
            :fields="getCabeceraProductos()"
            hover
            striped
            bordered
            small
            fixed
            caption="Linea de Venta"
          />
        </CCol>
      </div>
      <template #header>
        <h6 class="modal-title">Buscar Producto</h6>
        <CButtonClose @click="$store.commit('darkModalFalse')" class="text-white" />
      </template>
      <template #footer>
        <CButton  @click="$store.commit('darkModalFalse')" color="danger">Cancelar</CButton>
      </template>
    </CModal>



    <CModal
      :show.sync="VentaModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Venta confirmada"
      size="lg"
      color="dark"
    >
        <CCol tag="label" sm="12" class="col-form-label">
          <h4>VENTA PARCIAL CONFIRMADA!</h4>
        </CCol>
      <template #header>
        <h6 class="modal-title">Venta confirmada</h6>
        <CButtonClose @click="darkModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="VentaModal = false" color="success">Aceptar</CButton>
      </template>
    </CModal>

  </div>
</template>

<script>
import CTableWrapper from "../../../views/base/Table.vue";
import DatosVentas from "../../../views/users/DatosVentas.js";
import DatosProductos from "../../../views/users/DatosProductos.js";
import DatosLineaVenta from "../../../views/users/DatosLineaVenta.js";
var aux;

export default {
  name: "Tables",
  components: { CTableWrapper },
  data() {
    return {
      //Model
      cantidad: 1,
      costo: 0,
      producto: "",
      linea_venta : [],
      lista_productos : [],
      lista_proveedores : [],
      total : 0,

      linea_aux : [],
      //

      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      options: ["Caja 1", "Caja 2", "Caja 3"],
      selectedOption: "some value",

      formCollapsed: true,
      darkModal: false,
      VentaModal: false,
      proveedoresModal: false,
    };
  },
  computed: {
    getLineas(){
      return this.$store.getters.linea_venta.producto;
    },
    getProducto(){
      aux = this.$store.getters.producto;
        console.log(aux)

      if(aux == 'sd'){
        console.log(aux)

        return '';

      }else{
        console.log('hokolda')
        this.producto = aux;
        return aux.nombre;
      }
    }
  },
  created() {
    this.datosIniciales();
  },
  methods: {
    agregarLinea(){
      var linea = new Object();
        linea.nombre = this.producto.nombre;
        linea.cantidad = this.cantidad;
        linea.precio = this.producto.precio;
        //console.log(parseInt(this.cantidad) +' - '+ parseFloat(this.producto.precio))
        linea.subtotal = parseInt(this.cantidad) * parseFloat(this.producto.precio);
        //TOTAL
        this.total += linea.subtotal;
        this.limpiar();

      this.linea_venta.push(linea)
    },
    limpiar(){
      this.cantidad = 1;
      this.producto = [];
      this.$store.commit('limpiarProducto');

    },
    prueba(){
      var producto1 = new Object();
        producto1.nombre = 'producto2';
        producto1.cantidad = '5';
        producto1.precio = '200';
        producto1.subtotal = '$10000';
    var arrayList = new Array()
    arrayList.push(producto1)
    arrayList.push(producto1)

      this.linea_aux = arrayList
    },
    datosIniciales(){
      //PRODUCOTOS
        var producto = new Object();
          producto.id = '1';
          producto.nombre = 'Taladro';
          producto.descripcion = 'decripcion';
          producto.codigo = '213415241261';
          producto.rubro = 'rubro1';
          producto.subrubro = 'subrubro1';
          producto.precio_de_venta = '$9000';
          producto.precio = '9000';
          producto.stock_minimo = '5';
          producto.stock = '5';
        var producto1 = new Object();
          producto1.id = '2';
          producto1.nombre = 'Foco Led';
          producto1.descripcion = 'decripcion';
          producto1.codigo = '123124124';
          producto1.rubro = 'rubro2';
          producto1.subrubro = 'subrubro2';
          producto1.precio_de_venta = '$200';
          producto1.precio = '200';
          producto1.stock_minimo = '7';
          producto1.stock = '7';
      this.lista_productos.push(producto)
      this.lista_productos.push(producto1)
      //PROVEEDORES
        var proveedores = new Object();
          proveedores.id = '1';
          proveedores.razon_social = 'Ferreteria Italia';
          proveedores.descripcion = 'decripcion';
          proveedores.telefono = '3863698569';
          proveedores.email = 'fer.italia@gmail.com';

        var proveedores1 = new Object();
          proveedores1.id = '1';
          proveedores1.razon_social = 'Codmak';
          proveedores1.descripcion = 'decripcion';
          proveedores1.telefono = '0381426989';
          proveedores1.email = 'codmak@gmail.com';
      this.lista_proveedores.push(proveedores)
      this.lista_proveedores.push(proveedores1)
    },
    shuffleArray(array) {
      /* for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }*/
      return array;
    },

    getShuffledUsersData() {
      return this.shuffleArray(DatosVentas);
    },
    getProductos() {
      return this.shuffleArray(DatosProductos);
    },
    getLineaVenta() {
      return this.shuffleArray(DatosLineaVenta);
    },
    getCabecera() {
      return ["id", "fecha", "total", "estado", "opciones"];
    },
    getCabeceraProductos() {
      return ["id", "nombre", "codigo", "stock", "precio","acciones"];
    },
    getCabeceraProveedores() {
      return ["id", "razon_social", "telefono", "email"];
    },
    getCabeceraLineaVenta() {
      return ["nombre", "cantidad", "costo", "subtotal"];
    },
  },
};
</script>

<style scoped>
.total {
  color: rgb(37, 36, 41);
}
</style>