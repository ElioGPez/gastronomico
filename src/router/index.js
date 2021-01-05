import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

//Paginas
const Home = () => import('@/paginas/index')
const AperturaCaja = () => import('@/paginas/cajas/apertura/index')
const Cajas = () => import('@/paginas/cajas/index')

const Ventas = () => import('@/paginas/ventas/index')
const Ventas_Crear = () => import('@/paginas/ventas/crear/index')
const Ventas_Detalle = () => import('@/paginas/ventas/detalle/index')

const Compras = () => import('@/paginas/compras/index')
const ComprasCrear = () => import('@/paginas/compras/crear/index')

const Rubros = () => import('@/paginas/rubros/index')
const RubrosCrear = () => import('@/paginas/rubros/crear/index')
const SubRubrosCrear = () => import('@/paginas/rubros/subrubro/crear/index')

const Productos = () => import('@/paginas/productos/index')
const ProductosCrear = () => import('@/paginas/productos/crear/index')

const Proveedores = () => import('@/paginas/proveedores/index')
const ProveedoresCrear = () => import('@/paginas/proveedores/crear/index')

const Mesas = () => import('@/paginas/negocio/mesas/index')
const Mostrador = () => import('@/paginas/negocio/mostrador/index')

const MesaConfigurar = () => import('@/paginas/configuraciones/mesas/index')

//Fin paginas


const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect:  '/caja/apertura_caja',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'negocio',
          meta: {
            label: 'Negocio'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'mesas',
              name: 'Mesas',
              component: Mesas
            },
            {
              path: 'mostrador',
              name: 'mostrador',
              component: Mostrador
            },
          ]
        },
        

        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: '/caja/apertura_caja',
          name: 'AperturaCaja',
          component: AperturaCaja
        },
        {
          path: '/caja',
          name: 'Cajas',
          component: Cajas
        },
        {
          path: '/ventas',
          name: 'Ventas',
          component: Ventas
        },
        {
          path: '/ventas/nueva',
          name: 'Ventas_Crear',
          component: Ventas_Crear
        },
        {
          path: '/ventas/detalle',
          name: 'Ventas_Detalle',
          component: Ventas_Detalle
        },
        {
          path: 'rubros',
          meta: {
            label: 'Rubros'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Rubros',
              component: Rubros
            },
            {
              path: 'crear',
              name: 'rubros_crear',
              component: RubrosCrear
            },
            {
              path: 'crear/subrubro',
              name: 'subrubros_crear',
              component: SubRubrosCrear
            },
           /* {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }*/
          ]
        },

        {
          path: 'compras',
          meta: {
            label: 'Compras'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Compras',
              component: Compras
            },
            {
              path: 'crear',
              name: 'compra_crear',
              component: ComprasCrear
            },
          ]
        },

        {
          path: 'proveedores',
          meta: {
            label: 'Proveedores'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Proveedores',
              component: Proveedores
            },
            {
              path: 'crear',
              name: 'proveedores_crear',
              component: ProveedoresCrear
            },
          ]
        },
        {
          path: 'productos',
          meta: {
            label: 'Productos'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Productos',
              component: Productos
            },
            {
              path: 'crear',
              name: 'productos_crear',
              component: ProductosCrear
            },
          ]
        },

        {
          path: 'configuracion',
          meta: {
            label: 'Configuracion'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'mesas',
              name: 'Mesas_COnfigurar',
              component: MesaConfigurar
            },
            
          ]
        },        

        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Icons library',
              component: CoreUIIcons
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
}

