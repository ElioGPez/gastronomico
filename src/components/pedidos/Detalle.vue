<template>
  <div>
      <CCard v-if="show">
        <CCollapse :show="formCollapsed">
          <CCardHeader class="card-titulo">
            <div class="col-12" align="center">
              <h4>DETALLE MESA {{ mesa.numero }}</h4>
            </div>
          </CCardHeader>
          <CCardBody class="p-0">
            <CCol class="p-3">
              <CRow>
                <CCol sm="3">
                  <h6>CLIENTE</h6>
                </CCol>
                <CCol sm="4">
                  <h6>{{ mesa.detalle.cliente.nombre }}</h6>
                </CCol>
              </CRow>
              <CRow v-if="origen != 'mostrador'">
                <CCol sm="3">
                  <h6>MOZO</h6>
                </CCol>
                <CCol sm="4">
                  <h6>{{ mesa.detalle.mozo.nombre }}</h6>
                </CCol>
              </CRow>
              <CRow v-if="origen != 'mostrador'">
                <CCol sm="3">
                  <h6>PERSONAS</h6>
                </CCol>
                <CCol sm="4">
                  <h6>{{ mesa.detalle.personas }}</h6>
                </CCol>
              </CRow>
            </CCol>
            <CCol class="card-subtitulo" col="12" align="center">
              <h5>PRODUCTOS</h5>
            </CCol>
            <CCol class="p-3">
              <CRow>
                <CCol align="center" class="pl-2" col="2">
                  <CButton
                    @click="modalProducto()"
                    type="submit"
                    color="secondary"
                    ><CIcon
                  name="cil-search"
                  height="25"
                /></CButton
                  >
                </CCol>
                <CCol class="p-0 pr-1" col="6">
                  <input
                    v-model="producto.nombre"
                    type="text"
                    placeholder="Producto"
                    class="form-control"
                    disabled
                  />
                </CCol>
                <CCol  col="1" class="p-0 center">
                  <CButton class="btn-cantidad"
                    @click="cantidad--"
                    type="submit"
                    color="warning"
                    >-</CButton>
                </CCol>
                <CCol align="center" class="cantidad">
                  <input align="center"
                    v-model="cantidad"
                    type="text"
                    placeholder="Producto"
                    class="form-control"
                  />
                </CCol>
                <CCol  col="1" class="p-0 center">
                  <CButton class="btn-cantidad"
                    @click="cantidad++"
                    type="submit"
                    color="warning"
                    >+</CButton>
                </CCol>

              </CRow>
              <CRow  class="pt-1">
                <CCol class="pl-2 pr-1" col="8">
                  <input
                    v-model="observaciones"
                    type="text"
                    placeholder="Observaciones"
                    class="form-control"
                  />
                </CCol>
                <CCol align="center" class="p-0">
                  <CButton
                  class="btn "
                    @click="agregarProducto()"
                    type="submit"
                    color="danger"
                    >AGREGAR</CButton
                  >
                </CCol>
              </CRow><hr>

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
                  <tr
                    v-for="item in mesa.linea_venta"
                    :key="item.id"
                  >
                    <td>{{ item.producto.nombre }}</td>
                    <td>{{ item.cantidad }}</td>
                    <td>{{ item.subtotal }}</td>
                    <td class="p-0">              
                        <CButton v-if="item.observaciones!=''"
                            color="primary"
                            v-c-popover="{
                            header: 'Observacion',
                            content: item.observaciones,
                            active: false
                            }"
                        ><CIcon name="cil-comment-bubble" height="12" />
                        </CButton>
                        <button @click="mesa.linea_venta.splice(item.id,1);quitarProducto(item)" class="btn btn-warning">x</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCol>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol align="center" sm="6">
                   <Pago :pagoModal="pagoModal" :venta="mesa" :total="mesa.total" />
              </CCol>
              <CCol sm="4" align="right" class="col-form-label">
                <h5 style="color: green" class="total">TOTAL ${{ mesa.total }}</h5>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCollapse>
      </CCard>

    <ModalProductos />
      
  </div>
</template>

<script>
import ModalProductos from "@/components/productos/ModalProductos.vue";
import { mapGetters, mapMutations } from 'vuex'
import Pago from "@/components/ventas/Pago.vue";


export default {
    components : {ModalProductos,Pago},
    props: {
        mesa: {
            type: Object,
            default: () => {}
        },
        origen : String
    },
    data() {
        return {
            show: true,
            formCollapsed: true,
            //producto : {nombre : ''},
            cantidad: 1,
            total: 0,
            observaciones : '',
            pagoModal : false,

        }
    },
    computed: {
        ...mapGetters({
            productoModal : 'productoModal',
            producto : 'producto',
        })  
    },
    methods: {
        ...mapMutations(['modalProducto','vaciarProducto']),
        agregarProducto(){
            if(this.producto != ''){
                var linea = new Object();
                linea.cantidad = this.cantidad;
                linea.producto = this.producto;
                linea.observaciones = this.observaciones;
                console.log(this.producto)
                linea.subtotal = this.cantidad * this.producto.precio_de_venta;
                this.mesa.linea_venta.push(linea);

                this.mesa.total += linea.subtotal;

                //LIMPIAR
                this.vaciarProducto();
                this.cantidad = 1;
                this.observaciones = '';
            }else{
                console.log('Producto vacio')
            }
        }, 
        quitarProducto(item){
            this.total -= item.subtotal;
        }
    },
}
</script>