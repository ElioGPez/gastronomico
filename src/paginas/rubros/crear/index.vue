<template>
    <div>
    <CRow>
      <CCol sm="9">
        <CCard>
          <CCardHeader>
            <strong>CREAR RUBRO</strong>
            <div class="card-header-actions">

            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Rubro"
                  placeholder="Ej: Herramientas"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Descripcion"
                  placeholder="Ej: Herramientas variadas"
                />
              </CCol>
            </CRow>
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