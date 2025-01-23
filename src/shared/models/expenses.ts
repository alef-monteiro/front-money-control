import {ModelBase} from './model-base';

export interface Expenses extends ModelBase {
  user: number;
  card: number;
  category: string;
  description: string;
  amount: number;
  payment_type: string;
  purchase_date: Date;
  payment_choice: string;
}
