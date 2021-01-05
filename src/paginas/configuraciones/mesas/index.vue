<template>
    <div>
        <CRow>
            <CCol>
                <CCard v-if="show">
                    <CCollapse :show="formCollapsed">
          <CCardHeader class="card-titulo">
                        <div class="col-12" align="center">
                            <h4>CONFIGURACION DE MESAS</h4>
                        </div>
          </CCardHeader>
                    <CCardBody>

            <CRow>
                <CCol>
                    Seleccione el tipo de mesa a insertar :
                </CCol>
                <CCol>
                    <CRow>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
  <label class="form-check-label" for="inlineRadio1">Cuadrara</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
  <label class="form-check-label" for="inlineRadio2">Redonda</label>
</div>
                    </CRow>
                </CCol>
            </CRow><hr>
                        <CRow class="p-3">

            <div :id="'c'+index" @click="infoCuadrado(index)" v-for="(item,index) in cuadraditos" :key="index" class="padre">
                <div class="cuadrado col-1"></div>
            </div>
                        </CRow>

                    </CCardBody>
                    </CCollapse>
                </CCard>  
            </CCol>
        </CRow>
        <div class="row">

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
                show: true,
                formCollapsed: true,
            cuadraditos: [
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ]
        }
    },
    methods: {
        infoCuadrado(index){
            console.log(index);
            var id = 'c'+index;
            console.log(id);

            var elemento = document.getElementById(id+'');
                elemento.className += " rojo";
            //$(id).addClass('rojo');
        }
    },
}
</script>

<style scoped> 
    .cuadrado{
  width:10vh;
  max-width:100px;
  height:10vh;
  max-height:100px;
  position:relative;
  border-style: solid;
  /*background:red;*/
    }
    .cuadrado:hover {
  background-color: orange;
}
    .rojo {
  background-color: red;
}
    .padre{
        margin: 1pt;
    }
</style>