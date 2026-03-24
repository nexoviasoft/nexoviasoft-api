"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_1 = require("express");
let cachedApp;
async function bootstrap() {
    if (!cachedApp) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: true,
            credentials: false,
        });
        app.use((0, express_1.json)({ limit: '50mb' }));
        app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
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