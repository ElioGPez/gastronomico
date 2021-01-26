<template>
    <div>
    <!-- VIncular ingredientes -->
            <CCard>
            <CCardHeader>
                <strong>AGREGAR INGREDIENTES</strong>
                <div class="card-header-actions">

                </div>
            </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol sm="12">
                    <CSelect
                      label="Ingrediente"
                      :options="['Pan sanguchero','Queso']"
                    /> 
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="12">
                    <CInput
                      label="Cantidad"
                      v-model="cantidad"
                      placeholder=""
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol align="center" >
                    <CButton @click="setIngrediente()" type="submit" color="danger">AGREGAR</CButton>
                  </CCol>
                </CRow><br>
                <!-- TABLA -->
                <CRow>
                  <CCol sm="12">
                      <CTableWrapper
                      :origen="'ingrediente'"
                      :items="listado_ingredientes"
                      :fields="['nombre','cantidad','acciones']"
                      hover
                      striped
                      bordered
                      fixed
                      caption="INGREDIENTES  "
                      >        </CTableWrapper>

                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
    </div>
</template>

<script>
import CTableWrapper from '../listados/Listado'
import { mapGetters, mapMutations } from 'vuex'

 
export default {
    name : 'Insumos',
    components : {CTableWrapper},
    data() {
        return {
            ingrediente : '',
            cantidad : '',     
            //listado_ingredientes : [],
        }
    },
    computed: {
    ...mapGetters({listado_ingredientes : 'getListadoInsumo',})    
    },
    mounted() {
        
    },
    methods: {
        ...mapMutations(['agregarInsumo']),
        setIngrediente(){
            var ingrediente = new Object();
            ingrediente.nombre = "queso";
            ingrediente.cantidad = this.cantidad;
            ingrediente.acciones = "x";
            this.agregarInsumo(ingrediente);
            //this.$store.commit('agregarInsumo', ingrediente);
        },
    },
}
</script>