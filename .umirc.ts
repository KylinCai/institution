import { defineConfig } from "umi";

export default defineConfig({
  proxy: {
    //axios跨域改造
    '/api': {
      target:'https://its.seu.edu.cn:15555', // 你请求的第三方接口
      changeOrigin:true,
      pathRewrite:{ 
        '^/api': '/its'  
      }
    }
  },
  routes: [
    { path: "/", component: "view" },
    { path: "/view", component: "view", name: 'view' },
    { path: "/edit", component: "edit", name: 'edit' },
    { path: "/meeting", component: "meeting", name: 'meeting' },
    { path: "/revoked", component: "revoked", name: 'revoked' },
    { path: "/userManagement", component: "userManagement", name: 'userManagement' },
    { path: "/viewDetails/:type/:name", component: "institutionDetails", name: 'institutionDetails' },
    { path: "/export", component: "export", name: 'export ' },
  ],
  npmClient: 'npm',
  chainWebpack(config) {
    config.module
      .rule('woff')
      .test(/.(woff|eot|woff2|ttf|otf)$/)
      .use('file-loader')
      .loader('file-loader');
  }
});