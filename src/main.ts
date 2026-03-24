import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// @ts-ignore - Vercel type missing
import { VercelRequest, VercelResponse } from '@vercel/node';
import { json, urlencoded } from 'express';

let cachedApp: NestExpressApplication;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

// Only listen locally, Vercel will use the exported handler
if (process.env.VERCEL !== '1' && process.env.NODE_ENV !== 'production') {
  bootstrap().then(async (app) => {
    const port = process.env.PORT || 5001;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}

// Export the handler for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap();
  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
}
