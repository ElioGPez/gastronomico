<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> {{caption}}
      </slot>
    </CCardHeader>
    <CCardBody>
        <!-- BUSCADOR -->
      <CRow v-if="origen!='ingrediente'" class="mb-3">
          <CCol col="1" class="center">
              <CIcon
                name="cil-search"
                height="25"
              />
          </CCol>
          <CCol col="6">
              <input id="producto" v-model="filtro" type="text" class="form-control" />
          </CCol>
      </CRow>
        <!-- TABLA -->
      <CDataTable class="p-0"
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="filtroListado"
        :fields="fields"
        :items-per-page="small ? 10 : 5"
        :dark="dark"
        pagination
      >
        <template #opciones="{item}">
          <td>
            <CButton @click="detalleVenta()" v-if="item.opciones=='venta' && item.estado == 'Activa'" color="primary">CERRAR</CButton>
            <CButton  v-else-if="item.opciones=='venta' && item.estado == 'Cerrada'" color="secondary">DETALLES</CButton>
            <CButton v-else color="danger">Cerrar Caja</CButton>
          </td>
        </template>
        <template #acciones="{item}">
          <td v-if="origen!='ingrediente'">
            <CButton class="ml-1" color="warning">
                <router-link :to="{
                        name : 'productos_editar',
                        params : {id : item.id}
                                    }"
                >
                        <CIcon name="cil-color-border"/>
                </router-link>
            </CButton>
            <CButton class="ml-1" color="danger"><CIcon name="cil-trash"/></CButton>
          </td>
          <td v-else>

            <CButton @click="quitarIngrediente(item.id)" class="ml-1" color="danger"><CIcon name="cil-trash"/></CButton>
          </td>        
        </template>
        <template #estado="{item}">
          <td>
            <CBadge :color="getBadge(item.estado)">{{item.estado}}</CBadge>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import { mapMutations } from 'vuex'


export default {
  name: 'Table',
  data() {
      return {
          filtro : '',
      }
  },
  props: {
    //Para condicionar ciertos elementos de acuerdo su origen
    origen: String,
    producto:String,
    items: Array,
    fields: {
      type: Array,
      default () {
        return ['caja', 'usuario', 'monto_inicial', 'monto_real','diferencia','hora_inicio','hora_fin','opciones','status']
      }
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },

    computed: {
      filtroListado(){
            var cat = this.items.filter((item) => 
            {
              return item.nombre.toLowerCase().match(this.filtro.toLowerCase())||item.codigo.toLowerCase().match(this.filtro.toLowerCase());
            });
            //console.log(cat.length);
            if(cat.length != 0){
              //console.log(cat);
              return cat;
            }
            else{
                //console.log('pasa');
                var nulo = new Object();
                nulo.id = 0;
                nulo.nombre = "No hay elementos que coincidan";
                var nulos = [nulo];
                return nulos;
              }
      }
  },
  methods: {
    ...mapMutations(['quitarIngrediente']),
    getBadge (status) {
      return status === 'Activa' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Cerrada' ? 'danger' : 'primary'
    },
    getItem(item){
      console.log(item)
      var linea = new Object();
        linea.nombre = item.nombre;
        linea.cantidad = item.stock;
        linea.precio = '$200';
        linea.subtotal = '$10000';


      this.linea_venta.push(linea)


          this.$store.commit('modificarProducto', item);
          this.$store.commit('darkModalFalse');
    },
    detalleVenta(){
      console.log('detalle');
      this.$router.push('/ventas/detalle');
    }
  }
}
</script>
