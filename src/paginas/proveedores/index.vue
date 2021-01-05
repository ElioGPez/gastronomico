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
            caption="Proveedores  "
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
        lista_proveedores : [],

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
  

      return this.shuffleArray(this.lista_proveedores)
    },
    getCabecera(){
      return ['id', 'razon_social', 'telefono', 'email','diireccion']
    }
  }
}
</script>