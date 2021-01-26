<template>
    <div>
    <CRow>
      <CCol sm="7">
        <CCard>
          <CCardHeader>
            <strong>EDITAR PRODUCTO</strong>
            <div class="card-header-actions">
              {{producto}}
            </div>
          </CCardHeader>
          <CCardBody>
      <form @submit.prevent="handleSubmit">
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Nombre"
                  placeholder=""
                  v-model="producto.nombre"
                />
              </CCol>
              <div class="col-12" align="center" v-if="$v.producto.nombre.$dirty">
                <div v-if="!$v.producto.nombre.required" class="col-12 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Descripcion"
                  v-model="producto.descripcion"
                  placeholder=""
                />
              </CCol>
              <div class="col-12" align="center" v-if="$v.producto.descripcion.$dirty">
                <div v-if="!$v.producto.descripcion.required" class="col-12 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Codigo"
                  v-model="producto.codigo"
                  placeholder=""
                />
              </CCol>
              <div class="col-12" align="center" v-if="$v.producto.codigo.$dirty">
                <div v-if="!$v.producto.codigo.required" class="col-12 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CSelect
                  v-model="producto.categoria"
                  label="Categoria"
                  :options="['Herramientas','Focos']"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Unidad de Compra"
                  v-model="producto.unidad_de_compra"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Unidad de Consumo"
                  v-model="producto.unidad_de_consumo"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Precio de Venta"
                  v-model="producto.precio_de_venta"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Stock Minimo"
                  v-model="producto.stock_minimo"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInputFile
                  label="Seleccionar imagen..."
                  v-model="producto.imagen"
                  horizontal
                />
              </CCol>
            </CRow>
<hr>
            <CRow>
                <CCol align="center">
                    <CButton type="submit"  color="danger">EDITAR</CButton>
                </CCol>
            </CRow>
      </form>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <Insumos />
      </CCol>
    </CRow>
    </div>
</template>

<script>
import {
  required,
} from "vuelidate/lib/validators";
import Insumos from '../../../components/productos/Insumos'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { Insumos},

  data() {
    return {
      nombre : '',
      descripcion : '',
      unidad_de_compra : '',
      unidad_de_consumo : '',
      codigo : '',
      categoria : '',
      precio_de_venta : '',
      stock_minimo : '',
      imagen : '',
     // producto:[]
      //producto : []
    }
  },
  mounted() {
  //  this.producto = this.product;
    this.obtenerProducto(1);
  },
  validations: {
    producto: {
        nombre : {
            required
        },
        descripcion: {
            required
        },
        codigo: {
            required
        },
        stock_minimo: {
            required
        },
    }
  },  
  computed: {
    ...mapGetters({
      listado_ingredientes : 'getListadoInsumo',
      producto : 'getProducto',
    })
  },
  methods: {
    ...mapActions(['obtenerProducto']),

    guardarProducto(){
      let datos = new FormData();
      datos.append('nombre',this.nombre);
      datos.append('descripcion',this.descripcion);
      datos.append('stock_minimo',this.stock_minimo);
      datos.append('precio_venta',this.precio_venta);
      datos.append('categoria_id','1');
      datos.append('codigo',this.codigo);
      datos.append('imagen',this.imagen);
      datos.append('ingredientes',this.listado_ingredientes);

      var url = "api/producto";
        axios
          .post(url, 
            datos
          )
          .then(response => {
            console.log(response);
          });
    },
    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.guardarProducto();
    },
  },
}
</script>