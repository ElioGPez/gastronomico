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
            caption="Compras  "
            />
        </CCol>
        </CRow>
    </div>
</template>

<script>
import CTableWrapper from '../../views/base/Table.vue'

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

        var compra = new Object();
            compra.id = '1';
            compra.fecha = '22/02/2020';
            compra.total = '$40000';
            compra.estado = 'Cerrada';
            compra.opciones = 'venta';
        var compra1 = new Object();
            compra1.id = '1';
            compra1.fecha = '03/03/2020';
            compra1.total = '$25000';
            compra1.estado = 'Cerrada';
            compra1.opciones = 'venta';

        var arrayList = new Array()
        arrayList.push(compra)
        arrayList.push(compra1)

      return this.shuffleArray(arrayList)
    },
    getCabecera(){
      return ['id', 'fecha', 'total','opciones']
    }
  }
}
</script>