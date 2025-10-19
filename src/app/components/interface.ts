export interface User {
    name: string;
    age: number;
    password: string;
    email:  string;
    gender: string;
}

export interface Prediction {
  disease: string;
  probability: number;
}