import { Natures } from '../../../shared/enums/Nature';

export interface PostingCategory {
  id?: number;
  familyId?: number;
  description?: string;
  nature?: Natures;
}

export type PostingCategories = Array<PostingCategory>;
