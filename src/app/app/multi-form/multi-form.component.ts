

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-multi-form',
  standalone: false,
  templateUrl: './multi-form.component.html',
  styleUrl: './multi-form.component.css'
})

export class MultiFormComponent implements OnInit {
  step: number = 1;
  form!: FormGroup;
  showManualForm: boolean = false;

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

  nextStep() {
    if (this.step === 1 && this.form.get('personal.firstName')?.valid && this.form.get('personal.email')?.valid) {
      this.step++;
    } else if (this.step === 2 && this.form.get('jobInfo.jobTitle')?.valid && this.form.get('workPreferences.workplace')?.valid) {
      if (!this.showManualForm || (this.showManualForm && this.form.get('jobInfo.manual.country')?.valid)) {
        this.step++;
      } else {
        alert('Please fill in the manual CV field.');
      }
    } else {
      alert('Please fill all required fields.');
    }
  }
  

  prevStep() {
    if (this.step > 1) this.step--;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.form.get('jobInfo')?.get('cvFile')?.setValue(file);
    }
  }

  submit(): void {
    if (this.form.valid) {
      console.log( 'form sumbitted' , this.form.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all required fields!');
      this.form.markAllAsTouched();
    }
  }
}
