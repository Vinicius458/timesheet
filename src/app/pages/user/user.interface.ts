import { Timestamp } from '@angular/fire/firestore';

export type ColumnKeys<T> = Array<keyof T>;

export interface User {
  id: number;
  name: string;
  cpf: string;
  email: string;
  userCode: string;
  action: string;
  created: Timestamp;
  updated: Timestamp;
}
