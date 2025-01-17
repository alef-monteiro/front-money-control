import {ModelBase} from './model-base';

export interface Expenses extends ModelBase {
  user: number;
  card: number;
  category: number;
  name: string;
  amount: number;
  currency: string;
  payment_type: string;
  purchase_date: Date;
  due_date: Date;
  status: string;
}
