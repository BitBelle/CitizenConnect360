import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isTermsModalVisible = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signUpForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
      ]],
      userRole: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  openTermsModal(event: Event): void {
    event.preventDefault();
    this.isTermsModalVisible = true;
  }

  closeTermsModal(): void {
    this.isTermsModalVisible = false;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const newUser: User = {
        userName: this.signUpForm.value.userName,
        userEmail: this.signUpForm.value.userEmail,
        password: this.signUpForm.value.password,
        userRole: this.signUpForm.value.userRole,
        id: 0,
        violatedTerms: false
      };

      this.authService.signUpUser(newUser).subscribe(response => {
        if (response.message === 'User signed up successfully!') {
          // console.log('Sign-up successful', response);
          this.router.navigate(['/login']);
        } else {
          console.log('Sign-up failed', response);
        }
      });
    }
  }
}
