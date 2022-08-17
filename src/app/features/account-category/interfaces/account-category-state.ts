import { UpdateState } from 'src/app/shared/enums/UpdateState';
import { AccountCategory } from './account-category';
export interface AccountCategoryState {
  accountCategory?: AccountCategory;
  state: UpdateState;
}
