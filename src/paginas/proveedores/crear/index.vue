<template>
    <div>
    <CRow>
      <CCol sm="9">
        <CCard>
          <CCardHeader>
            <strong>CREAR PROVEEDOR</strong>
            <div class="card-header-actions">

            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Razon Social"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Telefono"
                  placeholder=""
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Email"
                  placeholder=""
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="12">
                <CInput
                  label="CUIT"
                  placeholder=""
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