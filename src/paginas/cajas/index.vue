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

            <!--CCol tag="label" sm="6" class="col-form-label">
              <CSelect
                label="Caja"
                horizontal
                :options="options"
                placeholder="Seleccione la caja..."
              />
            </CCol>
            <CCol tag="label" sm="6" class="col-form-label">
              <CInput
                label="Monto Inicial"
                horizontal
                autocomplete="monto_inicial"
                type="numer"
              />
            </CCol-->

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
            :origen="'caja'"
            :items="cajas_abiertas"
            :fields="getCabecera()"
            hover
            striped
            bordered
            small
            fixed
            caption="Cajas  "
            />
        </CCol>
        </CRow>
    </div>
</template>

<script>
import CTableWrapper from '../../components/listados/Listado'
import Datos from '../../views/users/Datos.js'
import { mapMutations, mapGetters } from 'vuex'

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
  computed: {
      ...mapGetters({
        cajas_abiertas : 'cajas_abiertas',
      })  
  },
  methods: {

    getCabecera(){
      return [ 'usuario', 'monto_inicial', 'monto_real','diferencia','hora_inicio','hora_fin','estado','opciones']
    }
  }
}
</script>