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

              <CCol sm="4"  class="col-form-label" >
              <CSelect
              :value.sync="caja"
                label="Caja"
                horizontal
                :options="options"
                placeholder="Seleccione la Caja..."
              />
              </CCol>
              <CCol tag="label" class="col-form-label" sm="5">
                <CInput
                v-model="monto_inicial"
                  label="Monto Inicial"
                  horizontal
                  autocomplete="monto_inicial"
                  type="numer"
                />
              </CCol>
              <CCol sm="2" class="col-form-label">
                <CButton @click="abrirCaja()" type="submit" color="primary">AGREGAR</CButton>
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
            :origen="'apertura'"
            :items="cajas_abiertas"
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
import CTableWrapper from '../../../components/listados/Listado'
import Datos from '../../../views/users/Datos.js'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Tables',
  components: { CTableWrapper },
  data() {
      return {
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label:'col-3', input:'col-9' },
      options : [],
      monto_inicial: '',
      caja: '',
      //cajas_abiertas : [],
      formCollapsed: true,
    }
  },
  mounted() {
    this.getOpciones();
  },
  computed: {
      ...mapGetters({
        cajas : 'cajas',
        cajas_abiertas : 'cajas_abiertas'
      })  
  },
  methods: {

    ...mapMutations(['aperturaCaja','limpiarProducto']),
    abrirCaja(){
        //Fecha y Hora
        var hoy = new Date();
        var hora = hoy.getHours() + ":" + hoy.getMinutes();

        var caja = new Object();
        caja.monto_inicial = this.monto_inicial;    
        caja.hora_inicio = hora; 
        caja.hora_fin = ''; 
        caja.diferencia = ''; 
        caja.monto_real = ''; 
        caja.opciones = 'caja';
        caja.usuario = 'Gomez';
        caja.estado = 'ABIERTA';
        caja.caja_id = this.caja;
        caja.id = '0';
        //console.log('id= '+this.caja);
        this.monto_inicial = '';
        
        this.aperturaCaja(caja);

    },
    getOpciones(){
      
      this.cajas.forEach(element => {
        var value = new Object();
        value.value = element.id;
        value.label = element.nombre;
        this.options.push(value);
      });
    },
    getCabecera(){
      return [ 'usuario', 'monto_inicial','hora_inicio','opciones']
    }
  }
}
</script>