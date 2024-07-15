import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  getNotifications(): Observable<Request[]> {
    const notifications: Request[] = JSON.parse(localStorage.getItem('notifications') || '[]');
    return of(notifications);
  }
  
  clearNotifications(): void {
    localStorage.removeItem('notifications');
  }

}
