<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCollapse :show="formCollapsed">
              <CCardBody>
                  <CRow>
                      <CCol align="center">
                          <h3>Detalle de Venta</h3><hr>
                      </CCol>
                  </CRow>
                  <CRow>
                      <CCol sm="3">
                          <h5>Cliente: </h5>
                      </CCol>
                      <CCol sm="4">
                          <h5>Lazarte Alejo</h5>
                      </CCol>
                  </CRow><br>
                  <CRow>
                      <CCol sm="3">
                          <h5>TOTAL: </h5>
                      </CCol>
                      <CCol sm="4">
                          <h5>$5000</h5>
                      </CCol>
                  </CRow><br>
                  <CRow>
                      <CCol sm="3">
                          <h5>Estado: </h5>
                      </CCol>
                      <CCol sm="4">
            <CBadge color="success"><h5>Activa</h5></CBadge>
                      </CCol>
                  </CRow><br>
                  <CRow>
                      <CCol sm="3">
                          <h5>Empleado: </h5>
                      </CCol>
                      <CCol sm="4">
                          <h5>Gomez Alberto</h5>
                      </CCol>
                  </CRow><br>

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
                caption="Linea de Venta"
              />
            </CCol>
          </CCardBody>
        </CCard>

            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol>

                        </CCol>
                    </CRow>
                  <CRow>
                      <CCol align="center">
                          <h4>Concretar Pago</h4><hr>
                      </CCol>
                  </CRow>
                <CRow form class="form-group" >
                  <CCol sm="3">
                    <h5>Formas de Pago</h5>
                  </CCol>
                  <CInputRadioGroup
                    class="col-sm-9"
                    :options="options"
                    :custom="key > 1"
                    :checked="`Option ${key}`"
                    :inline="key % 2 === 1"
                  />
                  </CRow><br>

                </CCardBody>
            </CCard>

            <CCard>
                <CCardBody>
                    <div class="row">
                        <div class="col-12" align="center">
                            <CButton @click="VentaModal = true" type="submit" color="success">CONFIRMAR</CButton>
                        </div>
                    </div>

                </CCardBody>
            </CCard>
      </CCol>
    </CRow>




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
      cantidad: "1",
      producto: "",
      linea_venta : [],
      lista_productos : [],
      total : 0,

      linea_aux : [],
      //

      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      options: ["Efectivo", "Tarjeta"],
      selectedOption: "some value",

      formCollapsed: true,
      darkModal: false,
      VentaModal: false,
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
      var linea = new Object();
        linea.nombre = "Taladro";
        linea.cantidad = '1';
        linea.precio = '$2000';
        linea.subtotal = '$2000';
      var linea1 = new Object();
        linea1.nombre = "Foco Led";
        linea1.cantidad = '2';
        linea1.precio = '$500';
        linea1.subtotal = '$1000';

      this.linea_venta.push(linea)
      this.linea_venta.push(linea1)
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
    getCabeceraLineaVenta() {
      return ["nombre", "cantidad", "precio", "subtotal"];
    },
  },
};
</script>

<style scoped>
.total {
  color: rgb(37, 36, 41);
}
</style>