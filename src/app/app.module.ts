import { NgModule } from '@angular/core';



import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { IndexComponent } from './pages/index/index.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MultiFormComponent } from './app/multi-form/multi-form.component';


@NgModule({
    declarations: [
      AppComponent,
      IndexComponent,
      NavbarComponent,
      MultiFormComponent,
    
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
        
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule {}
  

