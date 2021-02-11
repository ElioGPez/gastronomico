<template>
<div>
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
        @row-clicked="algo"
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
            <CButton v-else-if="origen == 'apertura'" @click="cerrarCaja(item.id)" color="danger">Cerrar Caja</CButton>
            <CButton v-else  color="secondary">Detalles</CButton>
          </td>
        </template>
        <template #acciones="{item}">
          <td v-if="origen!='ingrediente'">
            <CButton class="ml-1" color="warning">
                <router-link :to="{
                        name : ruta,
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

  <CierreCaja :caja="caja" :cajaModal="ModalCaja"/>
  
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CierreCaja from "@/components/cajas/Cierre.vue";


export default {
  components:{CierreCaja},
  name: 'Table',
  data() {
      return {
          filtro : '',
          ModalCaja : false,
          caja : ''
      }
  },
  props: {
    //Para condicionar ciertos elementos de acuerdo su origen
    ruta : String,
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
        if(this.origen == 'apertura'){
            var aux = [];
            this.items.forEach(element => {
              if(element.estado == 'ABIERTA'){
                aux.push(element);
              }
            });
            return aux;
        }else
        if(this.origen == 'caja'){
          return this.items;
        }
        else{
            var cat = this.items.filter((item) => 
            {
              if(this.origen=='ingredientes'){
                return item.nombre.toLowerCase().match(this.filtro.toLowerCase());
              }else{
                return item.nombre.toLowerCase().match(this.filtro.toLowerCase())||item.codigo.toLowerCase().match(this.filtro.toLowerCase());
              }
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
      }
  },
  methods: {
    ...mapMutations(['quitarIngrediente','modalProducto','asignarProducto']),
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
    },
    cerrarCaja(id){
      console.log(id)
      this.caja = id;
      if(this.ModalCaja){
        this.ModalCaja =false;
      }else{
        this.ModalCaja =true;
      }
    },
    algo(item){
      if(this.origen == 'modalProductos'){
        console.log(item)
        this.modalProducto();
        this.asignarProducto(item);
      }
    }
  }
}
</script>
