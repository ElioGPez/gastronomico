<template>
    <div>
    <CRow>
      <CCol sm="9">
        <CCard>
          <CCardHeader>
            <strong>CREAR PRODUCTO</strong>
            <div class="card-header-actions">

            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Nombre"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Descripcion"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Codigo"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CSelect
                  label="Rubro"
                  :options="['Herramientas','Focos']"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CSelect
                  label="Subrubro"
                  :options="['Herramientas Mecanicas','Herramientas Manuales']"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Precio de Venta"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Stock Minimo"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInputFile
                  label="Seleccionar imagen..."
                  horizontal
                />
              </CCol>
            </CRow>
<hr>
            <CRow>
                <CCol align="center">
                    <CButton type="submit"  color="primary">CREAR</CButton>
                </CCol>
            </CRow>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </div>
</template>