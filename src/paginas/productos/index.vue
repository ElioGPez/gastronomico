<template>
    <div>

    <!-- FILTROS -->
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/> <b>FILTROS</b>
              <div class="card-header-actions">
                <CLink
                  class="card-header-action btn-minimize"
                  @click="formCollapsed=!formCollapsed"
                >
                  <CIcon :name="`cil-chevron-${formCollapsed ? 'top' : 'bottom'}`"/>
                </CLink>

              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <div style="margin-left:5px;" class="col-8 row">
                  <select
                    id="inputState"
                    class="form-control"
                    v-model="filtro"
                    @change="filtros($event)"
                  >
                    <option selected value="0">Nombre (A-Z)</option>
                    <option value="1">Nombre (Z-A)</option>
                    <option value="2">Stock (Mayor-Menor)</option>
                    <option value="3">Stock (Menor-Mayor)</option>
                  </select>
                </div>
                <!--div class="form-actions">
                  <CButton type="submit" color="primary">FILTRAR</CButton>
                </div-->
              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>
    <!-- TABLA -->
    <CRow>
      <CCol sm="12">
          <CTableWrapper
          :items="productos"
          :fields="getCabecera()"
          hover
          striped
          bordered
          fixed
          caption="PRODUCTOS  "
          >        </CTableWrapper>

      </CCol>
    </CRow>

    </div>
</template>

<script>
import CTableWrapper from '../../components/listados/Listado'
import DatosVentas from '../../views/users/DatosVentas.js'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Tables',
  components: { CTableWrapper },
  data() {
      return {
      //Para el filtro
      filtro : '0',  
      //Para la tabla
      listado_productos : [],

      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label:'col-3', input:'col-9' },
      options: ['Caja 1', 'Caja 2', 'Caja 3'],
      selectedOption: 'some value',
      formCollapsed: true,
    }
  },
  computed: {
    ...mapGetters({
      productos : 'getProductos',
    })
  },
  mounted() {
    this.obtenerProductos();
  },
  methods: {
    ...mapActions(['obtenerProductos']),
    getCabecera(){
      return ['id', 'nombre', 'descripcion', 'codigo','unidad','precio_de_venta','stock_minimo','acciones']
    },
    filtros(event) {


        if (event.target.value == "0") {
            this.productos.sort(function (a, b) {
            if(a.nombre<b.nombre){
              return -1;
            }else
            if(a.nombre>b.nombre){
              return 1;
            }
            return 0
          })        
        }else
        if (event.target.value == "1") {
            this.productos.sort(function (a, b) {
            if(a.nombre>b.nombre){
              return -1;
            }else
            if(a.nombre<b.nombre){
              return 1;
            }
            return 0
          })

        }else
        if (event.target.value == "2") {
            this.productos.sort(function (a, b) {
            return (b.stock_minimo-a.stock_minimo)
          })
        }else
        if (event.target.value == "3") {
            this.productos.sort(function (a, b) {
            return (a.stock_minimo-b.stock_minimo)
          })
        }
    }
  }
}
</script>