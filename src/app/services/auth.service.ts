import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LogInResponse, LoginUser, SignUpResponse, User } from "../models/user";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: LogInResponse | null = null
  
  private loggedIn = false
  private isUser = false
  public isAdmin = false

  users: User[] = [{
    id: 1,
    userName: "John Doe",
    userEmail: "john@gmail.com",
    password: "Qwerty@123",
    userRole: 'Admin',
    violatedTerms: false
  },
  {
    id: 2,
    userName: "Jane Smith",
    userEmail: "jane@gmail.com",
    password: "Qwerty@123",
    userRole: 'Citizen',
    violatedTerms: false
  }, {
    id: 3,
    userName: "Mercy",
    userEmail: "mercy@gmail.com",
    password: "Qwerty@123",
    userRole: 'Government Official',
    violatedTerms: false
  }]

  constructor(private router: Router) { }

  signUpUser(newUser: User): Observable<SignUpResponse> {


    // const userExists = users.some((user: User) => user.userEmail === newUser.userEmail);
    if (this.users.find(u => u.userEmail === newUser.userEmail)) {
      return of({ message: 'User already exists!' });
    }

    // now adding a user
    this.users.push(newUser);
    return of({ message: 'User signed up successfully!' });
  }

  loginUser(userCredentials: LoginUser): Observable<LogInResponse> {

    // checking credentials
    const user = this.users.find(u => u.userEmail === userCredentials.userEmail && u.password === userCredentials.password);
    if (user) {
      const loginResponse: LogInResponse = {
        message: "Login Successfull!",
        userRole: user.userRole,
        payload: {
          Sub: user.userEmail,
          id: this.users.indexOf(user),
          userName: user.userName,
          userRole: user.userRole
        }
      }
      this.currentUser = loginResponse
      localStorage.setItem('userRole', user.userRole)
      localStorage.setItem('Payload', JSON.stringify(loginResponse.payload))


      if (user.userRole === 'Admin') {
        console.log("User is an admin");
        this.router.navigate(['/admin-dashboard"']).then(() => {
          window.location.reload();
        });
      } else if (user.userRole === 'Government Official') {
        console.log("User is an official");
        this.router.navigate(['/gov-dash']).then(() => {
          window.location.reload();
        });
      } else {
        console.log("User is a citizen");
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      }

      return of(loginResponse)
    } else {
      return of(
        {
          message: 'Invalid Credentials',
          userRole: '',
          payload: {
            Sub: '',
            id: -1,
            userName: '',
            userRole: ''
          }
        }

      )
    }
  }

  isLoggedIn(): boolean {     
    const role = localStorage.getItem('userRole') as string;     
    return !!role; 
  }

  getUsers():User[] {
    return this.users;
  }


  login() {
    this.loggedIn = true
  }

  logout() {     
    localStorage.removeItem('userRole');     
    localStorage.removeItem('Payload');     
    this.router.navigate(['/home']);
   }

  }


//   showStatus() {
//     return this.loggedIn
//   }

//   showUserLinks() {
//     return !this.isUser
//   }

//   functionalityRole() {
//     let userEmail = localStorage.getItem("email")
//     if (userEmail) {
//       if (userEmail === "admin@gmail.com") {
//         console.log("Admin")

//         return !this.isAdmin
//       }
//       return this.isAdmin
//     }
//     return this.isAdmin
//   }
// }







