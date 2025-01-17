import {ModelBase} from './model-base';

export interface Cards extends ModelBase {
  user: number;
  name: string;
  balance: number;
  card_brand: string;
  
}
