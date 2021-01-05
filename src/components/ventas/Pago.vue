<template>
    <div>
              <CCol align="center" sm="4" >
                <CButton @click="cerrarMesa()" type="submit" color="danger">CERRAR MESA</CButton>
              </CCol>
    <CModal
      :show.sync="pagoModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="PAGO"
      size="lg"
      color="dark"
    >
                  <CRow>
                      <CCol sm="3">
                          <h5>Cliente: </h5>
                      </CCol>
                      <CCol sm="4">
                          <h5>Lazarte Alejo</h5>
                      </CCol>
                  </CRow><br>
            <div class="row">
              <!-- Tabla -->
              <div class="form-group col-12">
                <fieldset>
                  <div class>
                    <table class="table">
                    <thead align="center">
                        <tr>
                        <th scope="col">PRODUCTO</th>
                        <th scope="col">CANTIDAD</th>
                        <th scope="col">SUBTOTAL</th>
                        <th scope="col">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody  align="center">
                        <tr v-for="item in lista_pedidos" :key="item.id">
                        <td>{{item.producto.nombre}}</td>
                        <td>{{item.cantidad}}</td>
                        <td>{{item.subtotal}}</td>
                        <td><button class="btn btn-warning">x</button></td>
                        </tr>
                    </tbody>
                    </table>
                  </div>
                </fieldset>
                  <!--paginate-links for="producto" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links-->
                <br />
              </div>

      </div>
      <template #header>
        <h6 class="modal-title">PAGOS</h6>
        <CButtonClose @click="pagoModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton  @click="pagoModal = false" color="danger">Cancelar</CButton>
      </template>
    </CModal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total : '',
            lista_pedidos : [],
            pagoModal : false,
        }
    },
    name : 'Pago',
    props : {
        venta : new Object(),
    },
    methods: {
        cerrarMesa(){
            this.pagoModal = true;
            this.total = this.venta.total;
            this.lista_pedidos = this.venta.linea_venta;
        }
    },
}
</script>

<style scoped>
    
</style>