import { Pagination } from './../../../shared/interfaces/pagination';
import { PostingGroup } from './../../posting-group/interfaces/posting-group';
import { PostingCategory } from './../../posting-category/interfaces/posting-category';
import { Account } from './../../account/interfaces/account';
export interface Posting {
  id?: number;
  accountId?: number;
  postingGroupId?: number;
  postingCategoryId?: number;
  description?: string;
  value?: number;
  dueDate?: Date;
  paymentDate?: Date;
  status?: string;
  account?: Account;
  postingCategory?: PostingCategory;
  postingGroup?: PostingGroup;
}

export type Postings = Array<Posting>;

export interface PostingsPaginated {
  meta?: Pagination;
  data?: Postings;
}

export interface MassPostings {
  postings?: Postings;
  ignoreDuplicated?: boolean;
}

export interface MassPostingsReturn {
  createdPostings?: Postings;
  duplicatedPostings?: Postings;
}

export interface PostingsGrouped {
  postingCategoryId?: number;
  postingCategory?: PostingCategory;
  total?: number;
}
