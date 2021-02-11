<template>
  <div>
    <CModal
      :show.sync="productoModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Buscar Producto"
      size="lg"
      color="dark"
    >
      <!--div class="row">
        <div class="col-2 center">
          <p>Nombre:</p>
        </div>
        <div class="col-4">
          <input v-model="filtro" type="text" class="form-control" />
        </div>
      </div>
      <hr /-->
      <div class="row">
        <!-- Tabla -->
        <CRow>
        <CCol sm="12">
            <CTableWrapper
            :origen="'modalProductos'"
            :ruta="'productos_editar'"
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
      <template #header>
        <h6 class="modal-title">Buscar Producto</h6>
        <CButtonClose @click="modalProducto()" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="modalProducto()" color="danger"
          >Cancelar</CButton
        >
      </template>
    </CModal>


  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CTableWrapper from '../../components/listados/Listado'

export default {
    components : {CTableWrapper},

    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters({
            productos : 'getProductos',
            productoModal : 'productoModal',
        })
    },
    methods: {
        getCabecera(){
            return ['id', 'nombre', 'descripcion', 'codigo','unidad','precio_de_venta','stock_minimo','acciones']
        },
        ...mapMutations(['modalProducto']),

    },

}
</script>