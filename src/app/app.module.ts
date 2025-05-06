
import { NgModule } from '@angular/core';



import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { IndexComponent } from './pages/index/index.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MultiFormComponent } from './app/multi-form/multi-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginformComponent } from './pages/loginform/loginform.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
      AppComponent,
      IndexComponent,
      NavbarComponent,
      MultiFormComponent,
      LoginformComponent,
    
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      NgSelectModule,
      NgxPaginationModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        closeButton:true,
        // positionClass: 'custom-toast-position'
      })

    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule {}
  

