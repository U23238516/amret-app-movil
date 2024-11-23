import { createRouter, createWebHistory } from '@ionic/vue-router';
import { Storage }            from '@ionic/storage';
import ViewLoginPage          from '../views/ViewLoginPage.vue';
// import ViewTabs               from '../views/tabs/ViewTabs.vue';
import ViewTabsHome           from '../views/tabs/ViewTabsHome.vue';
import ViewTabsRecargas       from '../views/tabs/ViewTabsHome1.vue';
import ViewTabsPromociones    from '../views/tabs/ViewTabsHome2.vue';
import ViewTabsCuenta         from '../views/tabs/ViewTabsHome3.vue';
import ViewSoporteTecnicoPage from '../views/ViewSoporteTecnicoPage.vue';  // Soporte Técnico en Línea
import ViewAyudaPage          from '../views/ViewAyudaPage.vue';  // Ayuda y Preguntas Frecuentes

import MainLayout             from '../layouts/MainLayout.vue';

// import ViewCIonDarkMode      from '../components/CIonDarkMode.vue';

// async function sesionActiva() {

//   const storage = new Storage();
//   await storage.create();

//   let usuario = await storage.get('usuario')
//   console.log('usuario', usuario)
//   return (usuario) ? true : false
// }

const checkSesion = async (to, from, next) => {
  let res = await isAuthenticated();
  if (res) {
    next();
  } else {
    next('/');
  }
};

const routes = [
  {
    path: '/',
    redirect: '/login',
    beforeEnter: async(to, from, next) => {
      let res = await isAuthenticated()
      if (res) {
        next('/tabs/tarjetas')
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'ViewLoginPage',
    component: ViewLoginPage,
    beforeEnter: async(to, from, next) => {
      let res = await isAuthenticated()
      if (res) {
        next('/tabs/tarjetas')
      } else {
        next()
      }
    }
  },
  {
    path     : '/tabs/',
    // component: ViewTabs,   // Componente de tabs
    component: MainLayout,
    children : [
      {
        path       : '',
        name       : 'Tarjetas',
        redirect   : '/tabs/tarjetas',
        beforeEnter: checkSesion
      },
      {
        path       : 'tarjetas',
        name       : 'Tarjetas',
        component  : ViewTabsHome,   // Componente para el tab de tarjetas
        beforeEnter: checkSesion
      },
      {
        path       : 'recargas',
        name       : 'Recargas',
        component  : ViewTabsRecargas,   // Componente para el tab de recargas
        beforeEnter: checkSesion
      },
      {
        path       : 'promociones',
        name       : 'Promociones',
        component  : ViewTabsPromociones,   // Componente para el tab de promociones
        beforeEnter: checkSesion
      },
      {
        path: 'cuenta',
        name: 'Cuenta',
        // component: ViewCIonDarkMode, // Componente para el tab de cuenta
        component: ViewTabsCuenta, // Componente para el tab de cuenta
        beforeEnter: checkSesion
      },
      {
        path: 'soporte-tecnico',
        name: 'Soporte-Tecnico',
        // component: ViewCIonDarkMode, // Componente para el tab de cuenta
        component: ViewSoporteTecnicoPage, // Componente para el tab de cuenta
        beforeEnter: checkSesion
      },
      {
        path: 'ayuda',
        name: 'Ayuda',
        // component: ViewCIonDarkMode, // Componente para el tab de cuenta
        component: ViewAyudaPage, // Componente para el tab de cuenta
        beforeEnter: checkSesion
      },
    ],
  },
];

// console.log('import.meta.env', import.meta.env)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

async function isAuthenticated () {
  const storage = new Storage();
  await storage.create();
  let token = await storage.get('token')
  console.log('token', token)
  return !!token; // Devuelve true si el token existe, false si no
}

routes.forEach(route => {
  if (route.meta?.requiresAuth) {
    route.beforeEnter = checkSesion;
  }
});

// Guardia de navegación para redirigir al login si no está autenticado
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'ViewLoginPage' }); // Redirigir al login si no está autenticado
    } else {
      next();
    }
  } else {
    next(); // Si la ruta no requiere autenticación, continuar
  }
});

export default router;





// import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { Storage } from '@ionic/storage';
// // import ViewHomePage   from '../views/ViewHomePage.vue';
// import ViewLoginPage  from '../views/ViewLoginPage.vue';
// import ViewTabs       from '../views/tabs/ViewTabs.vue';
// import ViewTabsHome1       from '../views/tabs/ViewTabsHome1.vue';
// import ViewTabsHome         from '../views/tabs/ViewTabsHome1.vue';
// import ViewTabsHome2       from '../views/tabs/ViewTabsHome2.vue';
// import ViewTabsHome3       from '../views/tabs/ViewTabsHome3.vue';

// const checkSesion = async (to, from, next) => {
//   let res = await sesionActiva();
//   if (res) {
//     next();
//   } else {
//     next('/');
//   }
// };

// async function sesionActiva() {

//   const storage = new Storage();
//   await storage.create();

//   let usuario = await storage.get('usuario')
//   console.log('usuario', usuario)
//   return (usuario) ? true : false
// }

// const routes = [
//   {
//     path    : '/',
//     redirect: '/login',
//     // component  : ViewLoginPage,
//     beforeEnter: async(to, from, next) => {
//       let res = await sesionActiva()
//       if (res) {
//         next('/tabs/tarjetas')
//       } else {
//         next()
//       }
//     }
//   },
//   // {
//   //   path: '/',
//   //   redirect: '/login'
//   // },
//   // {
//   //   path: '/home',
//   //   name: 'Home',
//   //   component: ViewHomePage
//   // },
//   {
//     path: '/login',
//     name: 'ViewLoginPage',
//     component: ViewLoginPage
//   },
//   {
//     path       : '/tabs/',
//     // name       : 'ViewTabs',
//     component  : ViewTabs,
//     beforeEnter: checkSesion,
//     // redirect : '/tabs/tarjetas',
//     children : [
//       {
//         path: '',
//         redirect: '/tabs/tarjetas',
//       },
//       {
//         path     : 'tarjetas',
//         name     : 'ViewTabsHome',
//         component: ViewTabsHome,
//         beforeEnter: checkSesion,
//         meta: { requiresAuth: true }
//         // component: () => import('./views/tabs/ViewTabsHome.vue'),
//       },
//       {
//         path     : 'recargas',
//         name     : 'ViewTabsHome1',
//         component: ViewTabsHome1,
//         beforeEnter: checkSesion,
//         meta: { requiresAuth: true }
//         // component: () => import('./views/tabs/ViewTabsHome1.vue'),
//       },
//       {
//         path     : 'promociones',
//         name     : 'ViewTabsHome2',
//         component: ViewTabsHome2,
//         beforeEnter: checkSesion,
//         meta: { requiresAuth: true }
//         // component: () => import('./views/tabs/ViewTabsHome2.vue'),
//       },
//       {
//         path     : 'cuenta',
//         name     : 'ViewTabsHome3',
//         component: ViewTabsHome3,
//         beforeEnter: checkSesion,
//         meta: { requiresAuth: true }
//         // component: () => import('./views/tabs/ViewTabsHome3.vue'),
//       }
//     ]
//   }
// ]

// console.log('import.meta.env', import.meta.env)

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// })

// async function isAuthenticated () {
//   const storage = new Storage();
//   await storage.create();
//   let token = await storage.get('token')
//   console.log('token', token)
//   return !!token; // Devuelve true si el token existe, false si no
// }

// // Guardar de navegación global
// // router.beforeEach((to, from, next) => {
// //   if (!isAuthenticated() && to.name !== 'ViewLoginPage') {
// //     // Si no está autenticado y no está intentando ir al login, redirigir
// //     next({ name: 'ViewLoginPage' });
// //   } else {
// //     // Permitir la navegación
// //     next();
// //   }
// // });

// // const publicPages = ['ViewLoginPage', 'Register', 'ForgotPassword']; // Lista de rutas públicas
// // router.beforeEach((to, from, next) => {
// //   if (!isAuthenticated() && !publicPages.includes(to.name)) {
// //     // Si no está autenticado y la página no es pública, redirigir a login
// //     next({ name: 'ViewLoginPage' });
// //   } else {
// //     next();
// //   }
// // });

// // Guardar global de navegación
// // router.beforeEach((to, from, next) => {
// //   // Verificar si la ruta requiere autenticación
// //   if (to.matched.some(record => record.meta.requiresAuth)) {
// //     if (!isAuthenticated()) {
// //       // Si no está autenticado, redirigir al login
// //       next('/');
// //     } else {
// //       next(); // Si está autenticado, permitir el acceso
// //     }
// //   } else {
// //     next(); // Si la ruta no requiere autenticación, permitir el acceso
// //   }
// // });

// // Guardia de navegación para redirigir al login si no está autenticado
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated()) {
//       next({ name: 'ViewLoginPage' }); // Redirigir al login si no está autenticado
//     } else {
//       next();
//     }
//   } else {
//     next(); // Si la ruta no requiere autenticación, continuar
//   }
// });

// export default router
