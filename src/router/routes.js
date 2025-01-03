
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/my-account',
        component: () => import('src/pages/auth/MyAccountPage.vue'),
      },
      {
        path: '/companie',
        component: () => import('src/pages/auth/MyAccountCompaniePage.vue'),
      },
      {
        path: '/companie/services',
        component: () => import('src/pages/auth/ServicesPages.vue'),
      },
      {
        path: '/companie/accounting',
        component: () => import('src/pages/auth/AccountingPages.vue'),
      },
      {
        path: '/companie/orders',
        component: () => import('src/pages/auth/OrdersHistoryPage.vue'),
      },
      {
        path: '/companie/users',
        component: () => import('src/pages/auth/EmployeePages.vue'),
      },
      {
        path: '/politique-confidentialite',
        component: () => import('src/pages/PolitiqueConfidentialitePage.vue'),
      },
      {
        path: '/cgu',
        component: () => import('src/pages/CguPage.vue'),
      },
      {
        path: '/cgv',
        component: () => import('src/pages/CgvPage.vue'),
      },
      {
        path: '/contact',
        component: () => import('src/pages/ContactPage.vue'),
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/404Page.vue') },
    ]
  }
]

export default routes
