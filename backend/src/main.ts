import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
//	import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
	const app /*: NestExpressApplication*/ = await NestFactory.create(AppModule);
	const config: ConfigService = app.get(ConfigService);
	const port: number = config.get<number>('PORT');

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	await app.listen(port, () => {
	console.log('[WEB]', config.get<string>('BASE_URL'));
	});
}

bootstrap();
