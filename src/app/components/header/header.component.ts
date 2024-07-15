import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SignupComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false
  currentUser: User | null = null
  userRole: string | null = null

  // defining navigation links
  navLinks: { path: string, label: string }[] = [];


  constructor(private router: Router, public auth:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.userRole = localStorage.getItem('userRole');

    // Set navLinks based on user role
    switch (this.userRole) {
      case 'Citizen':
        this.navLinks = [
          { path: '/home', label: 'Home' },
          { path: '/educate', label: 'Educate' },
          { path: '/views', label: 'Views' },
          { path: '/incidents', label: 'Report Incidents' },
          { path: '/polls', label: 'Polls' },
          { path: '/logout', label: 'Logout' }
        ];
        break;
      case 'Gov-Official':
        this.navLinks = [
          { path: '/gov-dash', label: 'Gov-Dashboard' },
          { path: '/viewsummary', label: 'Citizen Views' },
          { path: '/reported-incidents', label: 'Reported Incidents' },
          { path: '/create-polls', label: 'Create Polls' },
          { path: '/logout', label: 'Logout' }
        ];
        break;
      case 'Admin':
        this.navLinks = [
          { path: '/admin-dashboard', label: 'Admin Dashboard' },
          { path: '/user-management', label: 'User Management' },
          { path: '/logout', label: 'Logout' }
        ];
        break;
      default:
        this.navLinks = [
          { path: '/login', label: 'Login' },
          { path: '/signup', label: 'Signup' }
        ];
        break;
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
