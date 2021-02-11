<template>
    <div>

        <CRow>
            <CCol sm="6">
                <CCard v-if="show">
                    <CCollapse :show="formCollapsed">
          <CCardHeader class="card-titulo">
                        <div class="col-12" align="center">
                            <h4>MESAS</h4>
                        </div>
          </CCardHeader>
                    <CCardBody>
                        <CRow class="p-3">
                            <CCol v-for="item in mesas" :key="item.id" class="mb-4" sm="3" lg="3" md="3" xs="3" >
                                <div class="row">
                                    <button @click="mesaClick(item.id)" :class="{'mesa-seleccionada' : item.select }" v-if="item.estado=='libre'" type="button" class="mesa btn btn-success"><h5>{{item.numero}}</h5></button>
                                    <button @click="mesaClick(item.id)" :class="{'mesa-seleccionada' : item.select }" v-else type="button" class="mesa btn btn-danger"><h5>{{item.numero}}</h5></button>
                                </div>
                            </CCol>

                        </CRow>

                    </CCardBody>
                    </CCollapse>
                </CCard>  
            </CCol>
            <CCol col="6">
                <Detalle :mesa="mesa" />

            </CCol>
        </CRow>
      
   <CModal
      :show.sync="mesaModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Abrir Mesa"
      size="lg"
      color="dark"
    >
        <CCol>

            <CRow class="mt-2">
                <CCol align="center" col="4">
                    <h6 for="exampleFormControlSelect1">CLIENTE</h6>
                </CCol>
                 <CCol col="8">
                    <select v-model="cliente" class="form-control" id="exampleFormControlSelect1">
                    <option value="0" selected>Seleccione el cliente...</option>
                    <option v-for="item of clientes" :key="item.id" :value="item">{{item.nombre}}</option>
                    </select>
                </CCol>
            </CRow><br>
            <CRow>
                <CCol align="center" col="4">
                    <h6 for="exampleFormControlSelect1">COMENSALES</h6>
                </CCol>
                <CCol col="8">
                  <input
                    v-model="comensales"
                    type="text"
                    placeholder="Nro de comensales"
                    class="form-control"
                  />
                </CCol>
            </CRow>
        </CCol>
      <template #header>
        <CCol align="center">        
            <h5 class="modal-title">APERTURA DE MESA</h5>
        </CCol>
        <CButtonClose @click="mesaModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="abrirMesa()" color="success">ABRIR</CButton>
      </template>
    </CModal>


    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Detalle from "@/components/pedidos/Detalle.vue";


export default {
    components:{
      Detalle
    },
    data() {
        return {
                mesa : {
                    numero : '',
                    detalle: {
                        cliente : {nombre:''},
                        mozo : {nombre:''},
                        detalle : {personas:''}
                    }
                },
                show : true,
                formCollapsed: true,
                mesas_check : [
                    {mesa1 : false},
                    {mesa2 : false},
                    {mesa3 : false},
                    {mesa4 : false},
                ],
                mesas_enable : [
                    {mesa1 : 1},
                    {mesa2 : 1},
                    {mesa3 : 1},
                    {mesa4 : 1},
                ],
                //mesas : [],
                mesa_detalle: {
                    id: '',
                    numero : '',
                    detalle :{
                        mozo : {nombre:''},
                        cliente : {nombre:''},
                        personas : '',
                    },
                    linea_venta : [{
                        cantidad : '',
                        subtotal : '',
                        producto : {nombre:''}

                    }]

                },
                mozo: '',
                cliente: '',
                personas: '',
                comensales: '',

                /////
                listado_productos: [],
                listado_mozos: [],
                listado_clientes: [],
                linea_venta: [],
                producto : {nombre: ''},
                //Para el estilo de las mesas
                mesa_select : 'mesa-seleccionada',
                mesaModal : false,
                productoModal : false,

                //Para el modal de productos
                filtro: '',
        }
    },
    computed: {
      ...mapGetters({
        mesas : 'mesas',
        clientes : 'clientes'
      })
    },
     
    methods: {
        datosIniciales(){
            //Mozos
            var mozo = new Object();
            mozo.id = '0';
            mozo.nombre = 'Ferreira Carlos';
            var mozo1 = new Object();
            mozo1.id = '1';
            mozo1.nombre = 'Gomez Alberto';
            this.listado_mozos.push(mozo)
            this.listado_mozos.push(mozo1)

            console.log(this.listado_mozos)

            //Mesas
            var mesa = new Object();
            mesa.id = '0';
            mesa.numero = '1';
            mesa.estado = 'libre';
            mesa.select = false;
            mesa.linea_venta = [];
            //detalle de mesa
            var detalle = new Object();
            detalle.mozo = '';
            detalle.cliente = '';
            detalle.personas = '';
            mesa.detalle = detalle;

            var mesa1 = new Object();
            mesa1.id = '1';
            mesa1.numero = '2';
            mesa1.estado = 'libre'
            mesa1.select = false;
            mesa1.linea_venta = [];
            mesa1.detalle = detalle;

            //detalle de mesa
            var detalle = new Object();
            detalle.mozo = 'Fernandez Agusto';
            detalle.cliente = 'Federico';
            detalle.personas = 5;
           // mesa1.detalle = detalle;
            this.mesas.push(mesa);
            this.mesas.push(mesa1);


        },
        mesaClick(id){
            this.mesa = this.mesas[id],
            console.log("id: "+id)
            this.mesas.forEach(element => {
                if(element.id == id){
                    element.select = true;
                }else{
                    element.select = false;
                }
            });
                console.log(this.mesas[id])
            if(this.mesas[id].estado == 'libre'){
                console.log('mesa libre!!')
                this.id = id;
                this.mesaModal = true;
            }/*else{
                this.mesa_detalle = this.mesas[id];
            }*/
        },
        abrirMesa(){
            //Asignamos los valores a la respectiva mesa
            console.log(this.mesa.detalle.cliente)
            this.mesa.detalle.cliente = this.cliente;
            this.mesa.detalle.personas= this.comensales;
            this.mesa.estado= 'ocupada';
            //Igualamos la informacion de la mesa a la mesa auxiliar que muestra la info
            //this.mesa_detalle = this.mesas[this.mesa_detalle.id];
            //Cerramos el modal
            this.mesaModal = false;

        },
        seleccionarProducto(item){
            this.producto = item;
            this.productoModal = false;
        },
  
    },
}
</script>

<style scoped>
    .mesa {
        height: 50pt;
        min-width: 50pt;
    }

    .mesa-seleccionada{
        border-style: solid;
        border-width: 3pt;
        border-color: rgb(255, 174, 0);
    }
</style>