"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
let cachedApp;
async function bootstrap() {
    if (!cachedApp) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: [
                'http://localhost:3000',
                'http://localhost:5173',
                'https://squadlog.up.railway.app',
                'https://squadlog-console.up.railway.app',
            ],
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'Accept',
                'X-Requested-With',
            ],
            credentials: true,
        });
        await app.init();
        cachedApp = app;
    }
    return cachedApp;
}
if (process.env.VERCEL !== '1' && process.env.NODE_ENV !== 'production') {
    bootstrap().then(async (app) => {
        const port = process.env.PORT || 5001;
        await app.listen(port, '0.0.0.0');
        console.log(`Application is running on: ${await app.getUrl()}`);
    });
}
async function handler(req, res) {
    const app = await bootstrap();
    const server = app.getHttpAdapter().getInstance();
    return server(req, res);
}
//# sourceMappingURL=main.js.map