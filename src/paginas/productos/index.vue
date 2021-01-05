<template>
    <div>
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

                <div class="form-actions">
                  <CButton type="submit" color="primary">FILTRAR</CButton>
                </div>
              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>
        <CRow>
        <CCol sm="12">
            <CTableWrapper
            :items="getShuffledUsersData()"
            :fields="getCabecera()"
            hover
            striped
            bordered
            small
            fixed
            caption="PRODUCTOS  "
            />
        </CCol>
        </CRow>
    </div>
</template>

<script>
import CTableWrapper from '../../views/base/Table.vue'
import DatosVentas from '../../views/users/DatosVentas.js'

export default {
  name: 'Tables',
  components: { CTableWrapper },
  data() {
      return {
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label:'col-3', input:'col-9' },
      options: ['Caja 1', 'Caja 2', 'Caja 3'],
      selectedOption: 'some value',

      formCollapsed: true,
    }
  },
  methods: {
    shuffleArray (array) {
      return array
    },

    getShuffledUsersData () {
      var producto = new Object();
        producto.id = '1';
        producto.nombre = 'producto1';
        producto.descripcion = 'decripcion';
        producto.codigo = '123124124';
        producto.rubro = 'rubro1';
        producto.subrubro = 'subrubro1';
        producto.precio_de_venta = '$100';
        producto.stock_minimo = '5';
      var producto1 = new Object();
        producto1.id = '2';
        producto1.nombre = 'producto2';
        producto1.descripcion = 'decripcion';
        producto1.codigo = '123124124';
        producto1.rubro = 'rubro2';
        producto1.subrubro = 'subrubro2';
        producto1.precio_de_venta = '$200';
        producto1.stock_minimo = '7';
    var arrayList = new Array()
    arrayList.push(producto)
    arrayList.push(producto1)

      return this.shuffleArray(arrayList)
    },
    getCabecera(){
      return ['id', 'nombre', 'descripcion', 'codigo','rubro','subrubro','precio_de_venta','stock_minimo']
    }
  }
}
</script>