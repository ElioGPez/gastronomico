<template>
  <div>
    <CCol align="center" sm="12">
      <CButton @click="cerrarMesa()" type="submit" color="danger"
        >CERRAR MESA</CButton
      >
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
          <h5>CLIENTE</h5>
        </CCol>
        <CCol sm="4">
          <h5>{{ venta.detalle.cliente.nombre }}</h5>
        </CCol> </CRow
      ><br />
      <CCol class="card-subtitulo" col="12" align="center">
        <h5>PRODUCTOS</h5>
      </CCol>
      <div class="row">
        <!-- Tabla -->
        <div class="form-group col-12 mb-0">
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
                <tbody align="center">
                  <tr v-for="item in lista_pedidos" :key="item.id">
                    <td>{{ item.producto.nombre }}</td>
                    <td>{{ item.cantidad }}</td>
                    <td>{{ item.subtotal }}</td>
                    <td><button class="btn btn-warning">x</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </fieldset>
          <!--paginate-links for="producto" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links-->
          <hr class="mt-0" />
          <CCol align="right">
            <h5>TOTAL: {{total}}</h5>
          </CCol>
          <CRow class="p-3">
            <CCol class="card-subtitulo" col="12" align="center">
              <h5>FORMA DE PAGO</h5>
            </CCol>
            <CCol align="left" col="12">
              <CRow>
                <div class="m-2 form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked
                    value="efectivo"
                    v-model="forma"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    EFECTIVO
                  </label>
                </div>
                <div class="m-2 form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="tarjeta"
                    v-model="forma"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    TARJETA
                  </label>
                </div>
              </CRow>
              <CRow>
                <CCol col="12">
                  <CRow v-if="forma == 'efectivo'">
                    <CCol sm="6">
                      <CInput
                        label="$ Ingresada"
                        placeholder=""
                        horizontal
                        v-model="monto_ingresado"
                      />
                    </CCol>
                    <CCol sm="6">
                      <CInput
                        label="Vuelto"
                        placeholder=""
                        disabled
                        horizontal
                        v-model="vueltoGet"
                      />
                    </CCol>
                  </CRow>
                  <CRow v-else-if="forma == 'tarjeta'">
                    <CCol sm="6">
                      <CInput
                        label="Monto"
                        placeholder=""
                        horizontal
                      />
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </div>
      </div>
      <template  #header>
        <h6 class="modal-title">PAGAR PEDIDO</h6>
        <CButtonClose @click="pagoModal = false" class="text-white" />
      </template>
      <template #footer>
        <CRow style="width: 100%">
          <CCol align="center" col="12">
            <CButton @click="pagoModal = false" color="danger"
              ><b>CONFIRMAR PAGO</b></CButton
            >
          </CCol>
        </CRow>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lista_pedidos: [],
      pagoModal: false,
      forma : 'efectivo',
      vuelto : 0,
      monto_ingresado : ''
    };
  },
  name: "Pago",
  props: {
    venta: new Object(),
    total : Number,
  },
  computed: {
    vueltoGet(){
      if(this.monto_ingresado>this.total){
        return this.vuelto = this.monto_ingresado - this.total;
      }else{
        return 0;
      }
    }
  },

  methods: {

    cerrarMesa() {
      this.pagoModal = true;
      //this.total = this.venta.total;
      this.lista_pedidos = this.venta.linea_venta;
    },
  },
};
</script>

<style scoped>
.form-check label {
  font-size: 11pt;
  font-weight: bold;
}
.form-check input {
  font-size: 12pt;
}
</style>