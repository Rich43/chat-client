const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/graphql',
        createProxyMiddleware({
            target: 'http://localhost:4000/graphql',
            changeOrigin: true,
            secure: false
        })
    );
};
