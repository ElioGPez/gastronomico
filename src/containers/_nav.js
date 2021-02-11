export default [

      {
        _name: 'CSidebarNavTitle',
        _children: ['MENU']
      },

      {
        _name: 'CSidebarNavDropdown',
        name: 'Negocio',
        route: '/buttons',
        icon: 'cil-house',
        roles: ["admin"],
        items: [
          {
            name: 'Mesas',
            to: '/negocio/mesas'
          },
          {
            name: 'Mostrador',
            to: '/negocio/mostrador'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Caja',
        route: '/buttons',
        icon: 'cil-dollar',
        items: [
          {
            name: 'Apertura de caja',
            to: '/caja/apertura_caja'
          },
          {
            name: 'Listado',
            to: '/caja'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Mozo',
        route: '/buttons',
        icon: 'cil-clipboard',
        items: [
          {
            name: 'Pedido',
            to: '/mozo/pedido'
          },
          /*{
            name: 'Listado',
            to: '/caja'
          },*/
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Ventas',
        route: '/buttons',
        icon: 'cil-cart',
        items: [
          {
            name: 'Nueva Venta',
            to: '/ventas/nueva'
          },
          {
            name: 'Listado',
            to: '/ventas'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Compras',
        route: '/buttons',
        icon: 'cil-basket',
        items: [
          {
            name: 'Nueva Compra',
            to: '/compras/crear'
          },
          {
            name: 'Listado',
            to: '/compras'
          },
        ]
      },
      /*{
        _name: 'CSidebarNavDropdown',
        name: 'Rubro',
        route: '/buttons',
        icon: 'cil-library',
        items: [
          {
            name: 'Nuevo Rubro',
            to: '/rubros/crear'
          },
          {
            name: 'Nuevo Sub Rubro',
            to: '/rubros/crear/subrubro'
          },
          {
            name: 'Listado',
            to: '/rubros'
          },
        ]
      },*/

      {
        _name: 'CSidebarNavDropdown',
        name: 'Productos',
        route: '/productos',
        icon: 'cil-fastfood',
        items: [
          {
            name: 'Nuevo Producto',
            to: '/productos/crear'
          },
          {
            name: 'Listado',
            to: '/productos'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Ingredientes',
        route: '/ingredientes',
        icon: 'cil-fastfood',
        items: [
          {
            name: 'Nuevo Ingrediente',
            to: '/ingredientes/crear'
          },
          {
            name: 'Listado',
            to: '/ingredientes'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Proveedores',
        route: '/buttons',
        icon: 'cil-truck',
        items: [
          {
            name: 'Nuevo Proveedor',
            to: '/proveedores/crear'
          },
          {
            name: 'Listado',
            to: '/proveedores'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Usuarios',
        route: '/users',
        icon: 'cil-user',
        items: [,
          {
            name: 'Listado',
            to: '/users'
          },
        ]
      },

]