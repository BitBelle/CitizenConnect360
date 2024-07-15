export interface User{
    id:number
    userName: string
    password: string
    userEmail: string
    userRole:string
    // userStatus:string
    violatedTerms: boolean;
  
  }
  


  export interface SignUpResponse{
    message: string
  }
  
  export interface LoginUser{
    userName: string
    userEmail: string,
    password: string

  }
  
  
  export interface LogInResponse{
    message: string,
    // user?: User,
    userRole: string,
    payload: Payload
  
  }

export interface Payload{
  Sub: string;
  id: number;
  userName: string;
  userRole: string;
}