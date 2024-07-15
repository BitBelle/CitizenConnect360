import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup
  forgotPasswordForm!: FormGroup;
  showForgotPassword = false;
  errorMessage: string | null = null


  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userEmail: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    })

    this.forgotPasswordForm = this.fb.group({
      resetEmail: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.auth.loginUser(loginData).subscribe(
        response => {
          if (response) {
            const user = response
            if(user?.userRole === 'Admin'){
              this.router.navigate(['/admin-dash'])
            } else if (user?.userRole === 'Government Official'){
              this.router.navigate(['/gov-dash'])
            } else {
              this.router.navigate([''])
            }
          } else {
            this.errorMessage = 'An error occured! Please try again!'
          }
        },
        error => {
          this.errorMessage = 'An error occured! Please try again!'
        }
      );
    }
  }

  toggleForgotPassword() {
    this.showForgotPassword = !this.showForgotPassword;
  }

  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.valid) {
      const resetEmail = this.forgotPasswordForm.value.resetEmail;
      // Handle password reset logic using local storage
      console.log('Reset link sent to:', resetEmail);
    }
  }

}
