import { User } from './../../../core/auth/user/user';
import { AccountCategory } from './../../account-category/interfaces/account-category';
export interface Account {
  id?: number;
  userId?: number;
  description?: string;
  accountCategoryId?: number;
  accountCategory?: AccountCategory;
  privateAccount?: boolean;
  active?: boolean;
  user?: User;
}

export type Accounts = Array<Account>;
