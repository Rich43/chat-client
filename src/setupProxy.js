const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/graphql',
        createProxyMiddleware({
            target: 'http://localhost:6060',
            changeOrigin: true,
            secure: false
        })
    );
    app.use(
        '/subscriptions',
        createProxyMiddleware({
            target: 'http://localhost:6060',
            ws: true
        })
    );
};
