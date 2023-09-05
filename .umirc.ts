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
    { path: "/", component: "index" },
    { path: "/view", component: "view", name: 'view' },
    { path: "/edit", component: "edit", name: 'edit' },
    { path: "/meeting", component: "meeting", name: 'meeting' },
    { path: "/revoked", component: "revoked", name: 'revoked' },
    { path: "/userManagement", component: "userManagement", name: 'userManagement' },
  ],
  npmClient: 'npm',
  chainWebpack(config) {
    config.module
      .rule('otf')
      .test(/.otf$/)
      .use('file-loader')
      .loader('file-loader');
  },
});