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

export interface Prescription{
  _id: string;
  symptoms: string[];
  disease: string[];
  cure: string;
  name: string;
  age: number;
  gender: string;
  createdAt: Date;
}