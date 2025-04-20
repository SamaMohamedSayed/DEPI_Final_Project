import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { AppComponent } from '../../app.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-multi-form',
  templateUrl: './multi-form.component.html',
  styleUrls: ['./multi-form.component.css']
})
export class MultiFormComponent  {
  step: number = 1;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      personal: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }),
      jobInfo: this.fb.group({
        jobTitle: ['', Validators.required],
        method: ['upload', Validators.required], // or 'manual'
        manual: this.fb.group({
          country: [''],
          city: [''],
          education: [''],
          field: ['']
        }),
        cvFile: [null] // للرفع
      }),
      workPreferences: this.fb.group({
        type: ['', Validators.required],         // Full-time, Part-time, Freelancing
        workplace: ['', Validators.required],    // On-site, Remote, Hybrid
        category: ['', Validators.required]      // Job Category
      })
    });
  }

  prevStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  nextStep(): void {
    if (this.step < 3) {
      this.step++;
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.form.get('jobInfo')?.get('cvFile')?.setValue(file);
    }
  }

  submit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all required fields!');
      this.form.markAllAsTouched();
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MultiFormComponent
  ],
  providers: [],
  bootstrap:[AppComponent]
})
export class AppModule {
}