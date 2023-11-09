import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app: any) {
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://localhost:3004',
            changeOrigin: true,
        })
    );
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3005',
            changeOrigin: true,
        })
    );

}
