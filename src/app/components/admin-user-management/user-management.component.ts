import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

export interface Request {
  user: User;
  requestedAt: Date;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  notifications: Request[] = [];
  governmentOfficialRequests: Request[] = [];

  activeUsers = [
    { id: 1, userName: 'John Doe', userEmail: 'john@gmail.com', password: 'Qwerty@123', userRole: 'Admin', violatedTerms: false },
    { id: 2, userName: 'Jane Smith', userEmail: 'jane@gmail.com', password: 'Qwerty@123', userRole: 'User', violatedTerms: false },
    { id: 3, userName: 'Michael Johnson', userEmail: 'mike@gmail.com', password: 'Qwerty@123', userRole: 'User', violatedTerms: false }
  ];

  deletedUsers = [
    { id: 4, userName: 'Emily Brown', userEmail: 'emily@gmail.com', password: 'Qwerty@123', userRole: 'User', violatedTerms: false },
    { id: 5, userName: 'David Lee', userEmail: 'david@gmail.com', password: 'Qwerty@123', userRole: 'User', violatedTerms: false }
  ];

  users: User[] = [
    { id: 1, userName: 'John Doe', userEmail: "john@gmail.com", password: "Qwerty@123", userRole: 'Admin', violatedTerms: false },
    { id: 2, userName: 'Jane Smith', userEmail: "jane@gmail.com", password: "Qwerty@123", userRole: 'User', violatedTerms: false },
  ]

  selectedUser!: number;
  selectedRole!: string;
  roles: string[] = ['Citizen', 'Government Official'];

  constructor(private notificationService: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((notifications: any[]) => {
      this.notifications = notifications;
      this.governmentOfficialRequests = notifications.filter(notification => notification.user.userRole === 'Government Official');
    });

    this.fetchActiveUsers();
    this.fetchDeletedUsers();
  }

  approveGovernmentOfficial(request: Request): void {
    console.log('Approving government official:', request.user.userName);
    this.governmentOfficialRequests = this.governmentOfficialRequests.filter(req => req !== request);
    this.notificationService.clearNotifications();
    localStorage.setItem('notifications', JSON.stringify(this.governmentOfficialRequests));
  }

  clearNotifications(): void {
    this.notificationService.clearNotifications();
    this.notifications = [];
  }

  assignRole(): void {
    console.log(`Assigned role ${this.selectedRole} to user with ID ${this.selectedUser}`);
  }

  fetchGovernmentOfficialRequests(): void {
    this.governmentOfficialRequests = [
      { user: { id: 1, userName: 'John Doe', userEmail: "john@gmail.com", password: "Qwerty@123", userRole: 'Government Official', violatedTerms: false }, requestedAt: new Date() }
    ];
  }

  fetchActiveUsers(): void {
    this.activeUsers = [
      { id: 1, userName: 'John Doe', userEmail: 'john@gmail.com', password: 'Qwerty@123', userRole: 'Admin', violatedTerms: false },
      { id: 2, userName: 'Jane Smith', userEmail: 'john@gmail.com', password: 'Qwerty@123', userRole: 'User', violatedTerms: false },
    ];
  }

  fetchDeletedUsers(): void {
    this.deletedUsers = [
      { id: 4, userName: 'Emily Brown', userEmail: 'emily@gmail.com', password: 'Qwerty@123', userRole: 'User', violatedTerms: false },
    ];
  }

  deleteUser(user: User): void {
    console.log('Deleting user:', user.userName);
    const index = this.activeUsers.indexOf(user);
    if (index !== -1) {
      this.activeUsers.splice(index, 1);
      this.deletedUsers.push(user);
    }
  }

  restoreUser(user: User): void {
    console.log('Restoring user:', user.userName);
    const index = this.deletedUsers.indexOf(user);
    if (index !== -1) {
      this.deletedUsers.splice(index, 1);
      this.activeUsers.push(user);
    }
  }
}
