/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';

import { register } from 'swiper/element/bundle'

registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtfcXRWQ2RYUE1yV0s=");
register();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
