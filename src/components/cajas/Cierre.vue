<template>
    <div>
   <CModal
      :show.sync="cajaModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="CERRAR CAJA"
      size="lg"
      color="dark"
    >
        <CCol>
            <CRow>
                <CCol align="center" col="4">
                    <h6 for="exampleFormControlSelect1">MONTO REAL</h6>
                </CCol>
                <CCol col="8">
                  <input
                    v-model="monto_real"
                    type="text"
                    placeholder="$"
                    class="form-control"
                  />
                </CCol>
            </CRow>
        </CCol>
      <template #header>
        <CCol align="center">        
            <h5 class="modal-title">CERRAR CAJA</h5>
        </CCol>
        <CButtonClose @click="cajaModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="cerrarCaja({caja,monto_real})" color="danger">CERRAR</CButton>
      </template>
    </CModal>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name:'CierreCaja',
    props: {
        cajaModal : Boolean,
        caja : String,
    },
    data() {
        return {
            monto_real : '',
            modal : false
        }
    },
    computed: {
        modalValue(){
            this.modal = this.cajaModal;
            return this.modal;
        }
    },
    methods: {
      ...mapMutations(['cerrarCaja']),  
    },
}
</script>