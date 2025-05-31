import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-career',
  templateUrl: './carrer.component.html',
  styleUrls: ['./carrer.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule]
})
export class CarrerComponent {
  careerForm: FormGroup;
  resumeFile: File | null = null;
  submitSuccess = false;
  submitError: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.careerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.resumeFile = file;
    }
  }
  isLoading = false;

  onSubmit(): void {
    if (this.careerForm.invalid || !this.resumeFile) {
      this.submitError = this.resumeFile ? "Please fill all fields correctly." : "Resume file is required.";
      return;
    }

    const formData = new FormData();
    formData.append('email', this.careerForm.value.email);
    formData.append('username', this.careerForm.value.username);
    formData.append('phone', this.careerForm.value.phone);
    formData.append('city', this.careerForm.value.city);
    formData.append('state', this.careerForm.value.state);
    formData.append('resume', this.resumeFile);

    this.http.post<any>('https://backend45-p3hk.onrender.com/career', formData).subscribe({
      next: (res) => {
        this.submitSuccess = true;
        this.submitError = null;
        console.log('Career form submitted:', res);
        this.careerForm.reset();
        this.resumeFile = null;
        window.alert('Career form submitted successfully!'); 
      },
      error: (err) => {
        this.submitSuccess = false;
        this.submitError = err.error?.message || 'Submission failed';
        window.alert('Not submitted'); 
      }
    });
  }
}
