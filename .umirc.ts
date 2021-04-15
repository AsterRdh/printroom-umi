import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://localhost:8080/PrintRoom',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  },
  antd: {
    dark: true,
    compact: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/App' },
    { path: '/index', component: '@/pages/Home',
      routes: [
        {
          path: '/index/',
          component: '@/pages/welcome',
        },
        {
          path: '/index/printer',
          component: '@/pages/printers/index',
          routes: [
            {
              path: '/index/printer/',
              component: '@/pages/printers/list',
            },
            {
              path: '/index/printer/card',
              component: '@/pages/printers/card',
            },
          ]
        },
        {
          path: '/index/bill',
          component: '@/pages/bill/index',
          routes: [
            {
              path: '/index/bill/',
              component: '@/pages/bill/list',
            },
            {
              path: '/index/bill/card',
              component: '@/pages/bill/card',
            },
          ]
        },
        {
          path: '/index/ad',
          component: '@/pages/ad/index',
          routes: [
            {
              path: '/index/ad/',
              component: '@/pages/ad/list',
            },
            {
              path: '/index/ad/card',
              component: '@/pages/ad/card',
            },
          ]
        },
        {
          path: '/index/user',
          component: '@/pages/user/index',
          routes: [
            {
              path: '/index/user/',
              component: '@/pages/user/list',
            },
            {
              path: '/index/user/card',
              component: '@/pages/user/card',
            },
          ]
        },
      ]
    },
  ],
  fastRefresh: {},
});
