const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function (app) { 
    app.use(createProxyMiddleware('/web',{
        target:'http://127.0.0.1:3002/',
        secure:false,
        changeOrigin:true,
        pathRewrite:{
            "^/web":""
        }
    }))
 }