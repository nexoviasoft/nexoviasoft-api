"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSource = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = require("path");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true },
    entities: [(0, path_1.join)(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: [(0, path_1.join)(__dirname, '..', 'migration', '*.{ts,js}')],
    synchronize: false,
});
const getDataSource = async () => {
    if (!exports.AppDataSource.isInitialized) {
        await exports.AppDataSource.initialize();
    }
    return exports.AppDataSource;
};
exports.getDataSource = getDataSource;
//# sourceMappingURL=typeorm.config.js.map