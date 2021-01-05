<template>
    <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/> <b>APERTURA DE CAJA</b>
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
            <CRow>
              <CCol tag="label" sm="6" class="col-form-label">
                <CInput
                  label="Monto Inicial"
                  horizontal
                  autocomplete="monto_inicial"
                  type="numer"
                />
              </CCol>
              <CCol sm="3"  class="col-form-label">
                <CButton type="submit" color="primary">AGREGAR</CButton>
              </CCol>
            </CRow>
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
            caption="CAJAS ABIERTAS"
            />
        </CCol>
        </CRow>
    </div>
</template>

<script>
import CTableWrapper from '../../../views/base/Table.vue'
import Datos from '../../../views/users/Datos.js'

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
     /* for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }*/
      return array
    },

    getShuffledUsersData () {
      return this.shuffleArray(Datos)
    },
    getCabecera(){
      return [ 'usuario', 'monto_inicial', 'monto_real','diferencia','hora_inicio','hora_fin','opciones','status']
    }
  }
}
</script>