(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e99553f"],{8229:function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("CCard",[a("CCardHeader",[e._t("header",[a("CIcon",{attrs:{name:"cil-grid"}}),e._v(" "+e._s(e.caption)+" ")])],2),a("CCardBody",[a("CDataTable",{attrs:{hover:e.hover,striped:e.striped,bordered:e.bordered,small:e.small,fixed:e.fixed,items:e.items,fields:e.fields,"items-per-page":e.small?10:5,dark:e.dark,pagination:""},scopedSlots:e._u([{key:"opciones",fn:function(t){var o=t.item;return[a("td",["venta"==o.opciones&&"Activa"==o.estado?a("CButton",{attrs:{color:"primary"},on:{click:function(t){return e.detalleVenta()}}},[e._v("CERRAR")]):"venta"==o.opciones&&"Cerrada"==o.estado?a("CButton",{attrs:{color:"secondary"}},[e._v("DETALLES")]):a("CButton",{attrs:{color:"danger"}},[e._v("Cerrar Caja")])],1)]}},{key:"acciones",fn:function(t){var o=t.item;return[a("td",{on:{click:function(t){return e.getItem(o)}}},[a("CButton",{attrs:{color:"secondary"}},[e._v("AGREGAR")])],1)]}},{key:"estado",fn:function(t){var o=t.item;return[a("td",[a("CBadge",{attrs:{color:e.getBadge(o.estado)}},[e._v(e._s(o.estado))])],1)]}}])})],1)],1)},r=[],n={name:"Table",props:{producto:String,items:Array,fields:{type:Array,default:function(){return["caja","usuario","monto_inicial","monto_real","diferencia","hora_inicio","hora_fin","opciones","status"]}},caption:{type:String,default:"Table"},hover:Boolean,striped:Boolean,bordered:Boolean,small:Boolean,fixed:Boolean,dark:Boolean},data:function(){return{linea_venta:[]}},methods:{getBadge:function(e){return"Activa"===e?"success":"Inactive"===e?"secondary":"Pending"===e?"warning":"Cerrada"===e?"danger":"primary"},getItem:function(e){console.log(e);var t=new Object;t.nombre=e.nombre,t.cantidad=e.stock,t.precio="$200",t.subtotal="$10000",this.linea_venta.push(t),this.$store.commit("modificarProducto",e),this.$store.commit("darkModalFalse")},detalleVenta:function(){console.log("detalle"),this.$router.push("/ventas/detalle")}}},i=n,s=a("2877"),l=Object(s["a"])(i,o,r,!1,null,null,null);t["a"]=l.exports},8473:function(e,t,a){"use strict";var o=[{id:"1",fecha:"11/02/2020",total:"$40000",estado:"Activa",cliente:"Lazarte Alejo",opciones:"venta"},{id:"2",fecha:"10/02/2020",total:"$65000",estado:"Cerrada",cliente:"Herrera Franco",opciones:"venta"}];t["a"]=o},"961f":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("CRow",[a("CCol",{attrs:{lg:"12"}},[a("transition",{attrs:{name:"fade"}},[e.show?a("CCard",[a("CCardHeader",[a("CIcon",{attrs:{name:"cil-pencil"}}),e._v(" "),a("b",[e._v("FILTROS")]),a("div",{staticClass:"card-header-actions"},[a("CLink",{staticClass:"card-header-action btn-minimize",on:{click:function(t){e.formCollapsed=!e.formCollapsed}}},[a("CIcon",{attrs:{name:"cil-chevron-"+(e.formCollapsed?"top":"bottom")}})],1)],1)],1),a("CCollapse",{attrs:{show:e.formCollapsed}},[a("CCardBody",[a("div",{staticClass:"form-actions"},[a("CButton",{attrs:{type:"submit",color:"primary"}},[e._v("FILTRAR")])],1)])],1)],1):e._e()],1)],1)],1),a("CRow",[a("CCol",{attrs:{sm:"12"}},[a("CTableWrapper",{attrs:{items:e.getShuffledUsersData(),fields:e.getCabecera(),hover:"",striped:"",bordered:"",small:"",fixed:"",caption:"Proveedores  "}})],1)],1)],1)},r=[],n=a("8229"),i=(a("8473"),{name:"Tables",components:{CTableWrapper:n["a"]},data:function(){return{lista_proveedores:[],selected:[],show:!0,horizontal:{label:"col-3",input:"col-9"},options:["Caja 1","Caja 2","Caja 3"],selectedOption:"some value",formCollapsed:!0}},methods:{shuffleArray:function(e){return e},getShuffledUsersData:function(){var e=new Object;e.id="1",e.razon_social="Ferreteria Italia",e.descripcion="decripcion",e.telefono="3863698569",e.email="fer.italia@gmail.com";var t=new Object;return t.id="1",t.razon_social="Codmak",t.descripcion="decripcion",t.telefono="0381426989",t.email="codmak@gmail.com",this.lista_proveedores.push(e),this.lista_proveedores.push(t),this.shuffleArray(this.lista_proveedores)},getCabecera:function(){return["id","razon_social","telefono","email","diireccion"]}}}),s=i,l=a("2877"),c=Object(l["a"])(s,o,r,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-5e99553f.085850fd.js.map