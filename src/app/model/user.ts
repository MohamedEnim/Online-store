


export class User{
   
    userId: number;
    constructor(
         public username: string,
         public password: string,
         public fname: string,
         public lname: string,
         public email: string,
         public  isEnabled: boolean,
         public  role: string,
         public permissions: string[]){}
}


