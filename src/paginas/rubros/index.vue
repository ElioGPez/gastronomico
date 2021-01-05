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
            caption="Rubros  "
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
      var rubro = new Object();
        rubro.id = '1';
        rubro.rubro = 'Herramientas';
        rubro.descripcion = 'Herramientas de todo tipo';
        rubro.estado = 'active';
      var rubro1 = new Object();
        rubro1.id = '1';
        rubro1.rubro = 'Focos';
        rubro1.descripcion = 'Focos de todo tipo';
        rubro1.estado = 'active';
    var arrayList = new Array()
    arrayList.push(rubro)
    arrayList.push(rubro1)

      return this.shuffleArray(arrayList)
    },
    getCabecera(){
      return ['id', 'rubro', 'descripcion', 'estado']
    }
  }
}
</script>