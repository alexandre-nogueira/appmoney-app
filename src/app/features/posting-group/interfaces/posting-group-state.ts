import { UpdateState } from 'src/app/shared/enums/UpdateState';
import { PostingGroup } from './posting-group';
export interface PostingGroupState {
  postingGroup?: PostingGroup;
  updateState: UpdateState;
}
