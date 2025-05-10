

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../services/global.service';


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
  selectedMethod: 'upload' | 'manual_data' | null = null;
  role: string = 'job_seeker';

  constructor(private fb: FormBuilder,private router:Router,private toastr:ToastrService,public global:GlobalService) {}
  

  ngOnInit(): void {
    console.log(this.role);
    
    this.role = history.state.role || 'job_seeker';
    console.log(history.state.role);
    
    this.initForm();
  }

  initForm(): void {
    this.form =new FormGroup({
      personal: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone:['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
        confirmPassword: ['', Validators.required],
        // Job_Title: ['', Validators.required]
        country: ['', Validators.required],

      }),
      jobInfo: this.fb.group({
        
        method: [null, Validators.required],
        manual_data: this.fb.group({
          // country: ['', Validators.required],
          Job_Title: ['', Validators.required],
          University: ['', Validators.required],
          Field_Study: ['', Validators.required],
          skills:[[], Validators.required],
          Experience_Level:[null,Validators.required]

        }),
        cv: [null]
      }),
      workPreferences: this.fb.group({
        Job_Type: [null, Validators.required],
        Job_Workplace: [null, Validators.required],
        // category: ['', Validators.required]
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
    
      if (jobInfo.get('method')?.value == 'manual_data') {
        const manual = jobInfo.get('manual_data') as FormGroup;
        if (manual.invalid) {
          manual.markAllAsTouched();
          return;
        }
      } else if (jobInfo.get('method')?.value === 'upload') {
        if (!this.selectedFile) {
          this.form.get('jobInfo.cv')?.setErrors({ 'required': true });
          return;
        }

        this.form.get('jobInfo.cv')?.setErrors(null);
      }
      
      this.step++;
    }else  if (this.step === 3) {
      this.submittedStep3 = true;
      const preferences = this.form.get('workPreferences') as FormGroup;

      if (!preferences.get('Job_Type')?.value || preferences.get('Job_Type')?.value.length === 0) {
        preferences.get('Job_Type')?.setErrors({ 'required': true });
      }
  
      if (!preferences.get('Job_Workplace')?.value || preferences.get('Job_Workplace')?.value.length === 0) {
        preferences.get('Job_Workplace')?.setErrors({ 'required': true });
      }
  
      // if (!preferences.get('category')?.value) {
      //   preferences.get('category')?.setErrors({ 'required': true });
      // }
  
      if (preferences.invalid) {
        preferences.markAllAsTouched();
        return;
      }
      this.step++;

    }
  }
  
  validateSkills() {
    const manual = this.form.get('jobInfo.manual_data') as FormGroup;
    const skills = manual.get('skills')?.value;
    if (!skills || skills.length === 0) {
      manual.get('skills')?.setErrors({ 'required': true });
    } else {
      manual.get('skills')?.setErrors(null);
    }
  }
  
  validateLevel() {
    const manual = this.form.get('jobInfo.manual_data') as FormGroup;
    const level = manual.get('Experience_Level')?.value;
    if (!level || level.length === 0) {
      manual.get('Experience_Level')?.setErrors({ 'required': true });
    } else {
      manual.get('Experience_Level')?.setErrors(null);
    }
  }
  
  
  selectUploadMethod(): void {
    const jobInfo = this.form.get('jobInfo') as FormGroup;
    jobInfo.get('method')?.setValue('upload');
    jobInfo.get('manual_data')?.disable();
    jobInfo.get('cv')?.setValidators(Validators.required);
    this.selectedMethod = 'upload';
  }
  
  selectManualMethod(): void {
    const jobInfo = this.form.get('jobInfo') as FormGroup;
    jobInfo.get('method')?.setValue('manual_data');
    jobInfo.get('manual_data')?.enable();
    jobInfo.get('cv')?.clearValidators();
    this.selectedMethod = 'manual_data';
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.form.get('jobInfo.cv')?.setValue(file);
      this.form.get('jobInfo.cv')?.updateValueAndValidity();
      this.isFileUploaded = true;
    }
  }
  
  prevStep() {
    if (this.step > 1) this.step--;
  }

  jobTypes = [
    { label: 'Full-time', value: 'Full-Time' },
    { label: 'Part-time', value: 'Part-Time' },
    { label: 'Freelancing', value: 'Freelance' }
  ];

  workplaces = [
    { label: 'On-site', value: 'On-site' },
    { label: 'Remote', value: 'Remote' },
    { label: 'Hybrid', value: 'Hybrid' }
  ];

skills= [
    {label: "Active Directory", value: "activedirectory"},
    {label: "Adobe XD", value: "adobexd"},
    {label: "Agile", value: "agile"},
    {label: "AI Governance", value: "aigovernance"},
    {label: "AI/ML", value: "aiml"},
    {label: "Airflow", value: "airflow"},
    {label: "Android", value: "android"},
    {label: "Ansible", value: "ansible"},
    {label: "Architecture", value: "architecture"},
    {label: "Audit", value: "audit"},
    {label: "AWS", value: "aws"},
    {label: "Azure", value: "azure"},
    {label: "Big Data", value: "bigdata"},
    {label: "Blockchain", value: "blockchain"},
    {label: "Budgeting", value: "budgeting"},
    {label: "Bug Tracking", value: "bugtracking"},
    {label: "Business Analysis", value: "businessanalysis"},
    {label: "Business Development", value: "businessdev"},
    {label: "CCNA", value: "ccna"},
    {label: "CISA", value: "cisa"},
    {label: "Cisco", value: "cisco"},
    {label: "CIPP/E", value: "cippe"},
    {label: "Cloud Analysis", value: "cloudanalysis"},
    {label: "Cloud Computing", value: "cloudcomputing"},
    {label: "Cloud Design", value: "clouddesign"},
    {label: "Cloud Security", value: "cloudsecurity"},
    {label: "Cloud Services", value: "cloudservices"},
    {label: "COBIT", value: "cobit"},
    {label: "Compliance", value: "compliance"},
    {label: "Consulting", value: "consulting"},
    {label: "Contract Management", value: "contractmgmt"},
    {label: "Contract Negotiation", value: "contractnegotiation"},
    {label: "Cost Analysis", value: "costanalysis"},
    {label: "Cost Optimization", value: "costoptimization"},
    {label: "CRM", value: "crm"},
    {label: "CRISC", value: "crisc"},
    {label: "Cryptography", value: "cryptography"},
    {label: "CSS", value: "css"},
    {label: "Customer Service", value: "customerservice"},
    {label: "Cybersecurity", value: "cybersecurity"},
    {label: "Data Analysis", value: "dataanalysis"},
    {label: "Data Analytics", value: "dataanalytics"},
    {label: "Data Modeling", value: "datamodeling"},
    {label: "Data Privacy", value: "dataprivacy"},
    {label: "Data Protection", value: "dataprotection"},
    {label: "Data Science", value: "datascience"},
    {label: "Database Management", value: "databasemgmt"},
    {label: "Design Patterns", value: "designpatterns"},
    {label: "DevOps", value: "devops"},
    {label: "Django", value: "django"},
    {label: "Docker", value: "docker"},
    {label: "E-learning", value: "elearning"},
    {label: "Encryption", value: "encryption"},
    {label: "ERP Systems", value: "erpsystems"},
    {label: "ETL", value: "etl"},
    {label: "Ethics", value: "ethics"},
    {label: "Ethereum", value: "ethereum"},
    {label: "Excel", value: "excel"},
    {label: "Express", value: "express"},
    {label: "Figma", value: "figma"},
    {label: "Flutter", value: "flutter"},
    {label: "GDPR", value: "gdpr"},
    {label: "Git", value: "git"},
    {label: "Hadoop", value: "hadoop"},
    {label: "HTML", value: "html"},
    {label: "Hyperledger", value: "hyperledger"},
    {label: "IAM", value: "iam"},
    {label: "Incident Response", value: "incidentresponse"},
    {label: "Instructional Design", value: "instructionaldesign"},
    {label: "iOS", value: "ios"},
    {label: "ISO 27001", value: "iso27001"},
    {label: "IT Education", value: "iteducation"},
    {label: "IT Governance", value: "itgovernance"},
    {label: "IT Sales", value: "itsales"},
    {label: "IT Strategy", value: "itstrategy"},
    {label: "ITIL", value: "itil"},
    {label: "Java", value: "java"},
    {label: "JavaScript", value: "js"},
    {label: "Jenkins", value: "jenkins"},
    {label: "JIRA", value: "jira"},
    {label: "Kotlin", value: "kotlin"},
    {label: "Kubernetes", value: "kubernetes"},
    {label: "Linux", value: "linux"},
    {label: "Machine Learning", value: "machinelearning"},
    {label: "Manual Testing", value: "manualtesting"},
    {label: "Microservices", value: "microservices"},
    {label: "Microsoft Office", value: "microsoftoffice"},
    {label: "Mobile Development", value: "mobiledev"},
    {label: "MongoDB", value: "mongodb"},
    {label: "MS Project", value: "msproject"},
    {label: "MySQL", value: "mysql"},
    {label: "Networking", value: "networking"},
    {label: "Node.js", value: "nodejs"},
    {label: "Oracle", value: "oracle"},
    {label: "Pandas", value: "pandas"},
    {label: "Penetration Testing", value: "pentesting"},
    {label: "PMP", value: "pmp"},
    {label: "Policy Development", value: "policydev"},
    {label: "PostgreSQL", value: "postgresql"},
    {label: "Power BI", value: "powerbi"},
    {label: "Presentation Skills", value: "presentationskills"},
    {label: "Privacy Law", value: "privacylaw"},
    {label: "Procurement", value: "procurement"},
    {label: "Project Coordination", value: "projectcoord"},
    {label: "Project Management", value: "projectmgmt"},
    {label: "Prototyping", value: "prototyping"},
    {label: "PyTorch", value: "pytorch"},
    {label: "Python", value: "python"},
    {label: "QA", value: "qa"},
    {label: "Qualitative Analysis", value: "qualitativeanalysis"},
    {label: "R", value: "r"},
    {label: "React", value: "react"},
    {label: "Regulations", value: "regulations"},
    {label: "Risk Assessment", value: "riskassessment"},
    {label: "Risk Management", value: "riskmgmt"},
    {label: "Routing Protocols", value: "routingprotocols"},
    {label: "SASS", value: "sass"},
    {label: "Scikit-learn", value: "scikitlearn"},
    {label: "Scrum", value: "scrum"},
    {label: "Security", value: "security"},
    {label: "Selenium", value: "selenium"},
    {label: "SIEM", value: "siem"},
    {label: "Smart Contracts", value: "smartcontracts"},
    {label: "Software Development", value: "softwaredev"},
    {label: "Solidity", value: "solidity"},
    {label: "Spark", value: "spark"},
    {label: "Splunk", value: "splunk"},
    {label: "Spring Boot", value: "springboot"},
    {label: "SQL", value: "sql"},
    {label: "Stakeholder Communication", value: "stakeholdercomm"},
    {label: "Stakeholder Engagement", value: "stakeholderengage"},
    {label: "Stakeholder Management", value: "stakeholdermgmt"},
    {label: "Supply Chain", value: "supplychain"},
    {label: "Survey Design", value: "surveydesign"},
    {label: "Swift", value: "swift"},
    {label: "Tableau", value: "tableau"},
    {label: "Team Management", value: "teammanagement"},
    {label: "TensorFlow", value: "tensorflow"},
    {label: "Terraform", value: "terraform"},
    {label: "Test Automation", value: "testautomation"},
    {label: "Testing", value: "testing"},
    {label: "Threat Analysis", value: "threatanalysis"},
    {label: "Threat Detection", value: "threatdetection"},
    {label: "Training", value: "training"},
    {label: "Troubleshooting", value: "troubleshooting"},
    {label: "UML", value: "uml"},
    {label: "Usability Testing", value: "usabilitytesting"},
    {label: "User Research", value: "userresearch"},
    {label: "User Testing", value: "usertesting"},
    {label: "UX Design", value: "uxdesign"},
    {label: "Vendor Management", value: "vendormgmt"},
    {label: "VPN", value: "vpn"},
    {label: "Vue.js", value: "vuejs"},
    {label: "Windows", value: "windows"},
    {label: "Wireframing", value: "wireframing"},
    {label: "Wireshark", value: "wireshark"}
  ]
  Experience_Level=[
    {label: 'Senior' ,value:'Senior'},
    {label: 'Junior', value:'Junior'},
    {label: 'Mid-Level', value:'Mid-Level'},
    {label: 'Entry-Level', value:'Entry-Level'},
    {label: 'Internship', value:'Internship'},
  ]

  submit(): void {
    this.submittedStep1 = true;
    this.submittedStep2 = true;
    this.submittedStep3 = true;
  
    this.checkPasswordMatch();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.error('Form is invalid. Please check all fields.');
      return;
    }
  
    console.log('Form submitted successfully!');
    this.toastr.info('Sign in using ur account');

    if (this.form.valid) {
      console.log(this.form.get('jobInfo')?.value);
      console.log(this.form.get('personal.country')?.value);
      console.log("LEVEL => ",this.form.get('jobInfo.manual_data.Experience_Level')?.errors)

      
      const personal = this.form.get('personal')?.value;
      personal.email = personal.email.trim().toLowerCase();
      const jobInfo = this.form.get('jobInfo')?.value;
      const workPreferences = this.form.get('workPreferences')?.value;
      delete personal.confirmPassword;
      console.log((this.role));
      let manual_data = jobInfo.manual_data;

    const finalData = {

        ...this.form.get('personal')?.value,
        role: 'job_seeker',
        job_seeker_data: {
          cv: this.selectedMethod === 'upload' ? 'some-name' : null,
          manual_data: this.selectedMethod === 'manual_data' ? {
            ...this.form.get('jobInfo.manual_data')?.value,
            ...this.form.get('workPreferences')?.value
          } : null
        }

      
    };


    if (jobInfo.method === 'upload' && this.selectedFile) {

      const formData = new FormData();
      formData.append('cv', this.selectedFile);
      formData.append('data', JSON.stringify(finalData));

      this.global.register(formData).subscribe({
        next: (res: any) => {
          console.log(res);
          
          this.toastr.success(res.message);
          this.form.reset();
          this.step = 1;
          this.selectedMethod = null;
          this.isFileUploaded = false;
          this.router.navigateByUrl('/login')
        },
        error: (err: any) => {
          this.toastr.error(err.error?.message || 'حدث خطأ أثناء التسجيل');
          console.error(err);
        }
      });

    } else {
      console.log(finalData);
      
      // حالة مفيش ملف: نرسل JSON مباشر
      this.global.register(finalData).subscribe({
        next: (res: any) => {
          console.log(res);
          
          this.toastr.success(res.message || 'تم التسجيل بنجاح');
          this.form.reset();
          this.step = 1;
          this.selectedMethod = null;
          this.isFileUploaded = false;
          this.router.navigateByUrl('/login')
        },
        error: (err: any) => {
          this.toastr.error(err.error?.message || 'حدث خطأ أثناء التسجيل');
          console.error(err);
        }
      });
    }
    } else {
      this.toastr.error('برجاء ملء جميع الحقول المطلوبة');
      this.form.markAllAsTouched();
    }
}

}
  



