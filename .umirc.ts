import { defineConfig } from "umi";

export default defineConfig({
  history: { type: 'hash' },
  proxy: {
    //axios跨域改造
    '/its': {
      target:'https://its.seu.edu.cn:15555', // 你请求的第三方接口
      changeOrigin:true
    }
  },
  routes: [
    { path: "/", redirect: "/view" },
    { path: "/view", component: "view", name: 'view' },
    { path: "/edit", component: "edit", name: 'edit' },
    { path: "/meeting", component: "meeting", name: 'meeting' },
    { path: "/revoked", component: "revoked", name: 'revoked' },
    { path: "/userManagement", component: "userManagement", name: 'userManagement' },
    { path: "/viewDetails/:type/:name", component: "institutionDetails", name: 'institutionDetails' },
    { path: "/editDetails/:type/:name", component: "institutionDetailEdit", name: 'institutionDetailEdit' },
    { path: "/export", component: "export", name: 'export ' },
  ],
  npmClient: 'npm',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  base: process.env.NODE_ENV === 'production' ? '/its/ins/front/' : '/',
  outputPath: 'front',
  chainWebpack(config) {
    config.module
      .rule('woff')
      .test(/.(woff|eot|woff2|ttf|otf)$/)
      .use('file-loader')
      .loader('file-loader');
  }
});