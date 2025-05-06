

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-multi-form',
  standalone: false,
  templateUrl: './multi-form.component.html',
  styleUrl: './multi-form.component.css'
})

export class MultiFormComponent implements OnInit {
  step: number = 1;
  form!: FormGroup;
  submittedStep1 = false;
  submittedStep2 = false;
  submittedStep3 = false;
  isFileUploaded= false;
  selectedFile: any ;
  selectedMethod: 'upload' | 'manual' | null = null;

  constructor(private fb: FormBuilder,private router:Router,private toastr:ToastrService) {}
  

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form =new FormGroup({
      personal: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
        confirmPassword: ['', Validators.required],
        jobTitle: ['', Validators.required]
      }),
      jobInfo: this.fb.group({
        
        method: [null, Validators.required],
        manual: this.fb.group({
          country: ['', Validators.required],
          city: ['', Validators.required],
          education: ['', Validators.required],
          field: ['', Validators.required],
          type:[[], Validators.required],

        }),
        cvFile: [null]
      }),
      workPreferences: this.fb.group({
        type: [null, Validators.required],
        workplace: [null, Validators.required],
        category: ['', Validators.required]
      })
    });
  }

  checkPasswordMatch(): void {
    const password = this.form.get('personal.password')?.value;
    const confirmPassword = this.form.get('personal.confirmPassword')?.value;
  
    if (password && confirmPassword && password !== confirmPassword) {
      this.form.get('personal.confirmPassword')?.setErrors({ 'passwordMismatch': true });
    }
  }

  nextStep() {
    if (this.step === 1) {
      this.submittedStep1 = true;
      const personal = this.form.get('personal') as FormGroup;
      this.checkPasswordMatch();
      if (personal.valid && !personal.hasError('passwordMismatch')) {
        this.step++;
      } else {
        personal.markAllAsTouched();
      }
    } else if (this.step === 2) {
      this.submittedStep2 = true;
      const jobInfo = this.form.get('jobInfo') as FormGroup;
      
      if (!jobInfo.get('method')?.value) {
        jobInfo.get('method')?.setErrors({ 'required': true });
        return;
      }
    
      if (jobInfo.get('method')?.value == 'manual') {
        const manual = jobInfo.get('manual') as FormGroup;
        if (manual.invalid) {
          manual.markAllAsTouched();
          return;
        }
      } else if (jobInfo.get('method')?.value === 'upload') {
        if (!this.selectedFile) {
          this.form.get('jobInfo.cvFile')?.setErrors({ 'required': true });
          return;
        }

        this.form.get('jobInfo.cvFile')?.setErrors(null);
      }
      
      this.step++;
    }else  if (this.step === 3) {
      this.submittedStep3 = true;
      const preferences = this.form.get('workPreferences') as FormGroup;

      if (!preferences.get('type')?.value || preferences.get('type')?.value.length === 0) {
        preferences.get('type')?.setErrors({ 'required': true });
      }
  
      if (!preferences.get('workplace')?.value || preferences.get('workplace')?.value.length === 0) {
        preferences.get('workplace')?.setErrors({ 'required': true });
      }
  
      if (!preferences.get('category')?.value) {
        preferences.get('category')?.setErrors({ 'required': true });
      }
  
      if (preferences.invalid) {
        preferences.markAllAsTouched();
        return;
      }
      this.step++;
    }
  }
  
  validateSkills() {
    const manual = this.form.get('jobInfo.manual') as FormGroup;
    const skills = manual.get('type')?.value;
    if (!skills || skills.length === 0) {
      manual.get('type')?.setErrors({ 'required': true });
    } else {
      manual.get('type')?.setErrors(null);
    }
  }
  
  
  
  selectUploadMethod(): void {
    const jobInfo = this.form.get('jobInfo') as FormGroup;
    jobInfo.get('method')?.setValue('upload');
    jobInfo.get('manual')?.disable();
    jobInfo.get('cvFile')?.setValidators(Validators.required);
    this.selectedMethod = 'upload';
  }
  
  selectManualMethod(): void {
    const jobInfo = this.form.get('jobInfo') as FormGroup;
    jobInfo.get('method')?.setValue('manual');
    jobInfo.get('manual')?.enable();
    jobInfo.get('cvFile')?.clearValidators();
    this.selectedMethod = 'manual';
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.form.get('jobInfo.cvFile')?.setValue(file);
      this.form.get('jobInfo.cvFile')?.updateValueAndValidity();
      this.isFileUploaded = true;
    }
  }
  
  prevStep() {
    if (this.step > 1) this.step--;
  }

  jobTypes = [
    { label: 'Full-time', value: 'full-time' },
    { label: 'Part-time', value: 'part-time' },
    { label: 'Freelancing', value: 'freelancing' }
  ];

  workplaces = [
    { label: 'On-site', value: 'on-site' },
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' }
  ];

  skills=[
    {label: 'HTML' ,value:'html'},
    {label: 'CSS', value:'css'},
    {label: 'JavaScript', value:'JS'}
  ]

  submit(): void {
    this.submittedStep1 = true;
    this.submittedStep2 = true;
    this.submittedStep3 = true;
  
    this.checkPasswordMatch();
  
    console.log('Form Status:', this.form.status);
    console.log('Form Value:', JSON.stringify(this.form.value));
    console.log('Form Errors:', {
      personal: this.form.get('personal')?.errors,
      jobInfo: this.form.get('jobInfo')?.errors,
      workPreferences: this.form.get('workPreferences')?.errors
    });
  
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.error('Form is invalid. Please check all fields.');
      return;
    }
  
    console.log('Form submitted successfully!');
    this.router.navigate(['/']);
    this.toastr.info('Sign in using ur account');
  }

}

