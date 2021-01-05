<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> {{caption}}
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="items"
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
          <td  @click="getItem(item)">
            <CButton color="secondary">AGREGAR</CButton>
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
export default {
  name: 'Table',
  props: {
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
  data() {
    return {
      linea_venta : []
    }
  },
  methods: {
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
