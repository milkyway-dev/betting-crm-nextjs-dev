export interface Field { //Login Input Fields Type Interface
    type: string;
    placeholder: string;
    value?: string;
    Name: string;
  }
  
 export interface FormData { // Login Input Values Type
    username: string;
    password: string;
    [key: string]: string | undefined;
  }