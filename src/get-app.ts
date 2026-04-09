import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

let cachedApp: NestExpressApplication;

export async function getApp() {
  if (!cachedApp) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const expressApp = app.getHttpAdapter().getInstance();

    // Avoid 304 responses that can drop CORS headers on some clients/CDN paths.
    expressApp.set('etag', false);

    // Ensure CORS and cache headers exist on every response path.
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Cache-Control', 'no-store');
      next();
    });

    app.enableCors({
      origin: true, // ✅ সব domain allow
      credentials: false, // optional: cookie/credential নেই
    });

    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));


    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}
