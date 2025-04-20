import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/pages/multi-form/multi-form.component';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
