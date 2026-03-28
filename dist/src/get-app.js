"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = getApp;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_1 = require("express");
let cachedApp;
async function getApp() {
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
//# sourceMappingURL=get-app.js.map