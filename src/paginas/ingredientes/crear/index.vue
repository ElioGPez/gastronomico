<template>
    <div>
    <CRow>
      <CCol sm="7">
        <CCard>
          <CCardHeader>
            <strong>CREAR INGREDIENTE</strong>
            <div class="card-header-actions">

            </div>
          </CCardHeader>
          <CCardBody>
      <form @submit.prevent="handleSubmit">
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Nombre"
                  placeholder=""
                  v-model="nombre"
                />
              </CCol>
              <div class="col-12" align="center" v-if="$v.nombre.$dirty">
                <div v-if="!$v.nombre.required" class="col-12 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Descripcion"
                  v-model="descripcion"
                  placeholder=""
                />
              </CCol>
              <div class="col-12" align="center" v-if="$v.descripcion.$dirty">
                <div v-if="!$v.descripcion.required" class="col-12 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Codigo"
                  v-model="codigo"
                  placeholder=""
                />
              </CCol>
              <div class="col-12" align="center" v-if="$v.codigo.$dirty">
                <div v-if="!$v.codigo.required" class="col-12 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CSelect
                  v-model="categoria"
                  label="Categoria"
                  :options="['Herramientas','Focos']"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Unidad de Compra"
                  v-model="unidad_de_compra"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Unidad de Consumo"
                  v-model="unidad_de_consumo"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Stock Minimo"
                  v-model="stock_minimo"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInputFile
                  label="Seleccionar imagen..."
                  v-model="imagen"
                  horizontal
                />
              </CCol>
            </CRow>
<hr>
            <CRow>
                <CCol align="center">
                    <CButton type="submit"  color="danger">CREAR</CButton>
                </CCol>
            </CRow>
      </form>
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
    </div>
</template>

<script>
import {
  required,
} from "vuelidate/lib/validators";
import { mapGetters, mapMutations } from 'vuex'

export default {

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
      
    }
  },
  validations: {
        nombre: {
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
  },  
  computed: {
  /*  ...mapGetters({
      listado_ingredientes : 'getListadoInsumo',
    })*/
  },
  mounted() {
   // this.vaciarIngredientes();
  },
  methods: {
    //...mapMutations(['vaciarIngredientes']),

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