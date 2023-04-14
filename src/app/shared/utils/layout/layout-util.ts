import { DefaultSizes } from './default-sizes';
export class LayoutUtil {
  public getClassForSelectSize(size: number) {
    switch (size) {
      case DefaultSizes.SMALL:
        return 'form-select form-select-sm';

      case DefaultSizes.MEDIUM:
        return 'form-select';

      case DefaultSizes.LARGE:
        return 'form-select form-select-lg';

      default:
        return 'form-select';
    }
  }

  public getClassForLabelSize(size: number) {
    switch (size) {
      case DefaultSizes.SMALL:
        return 'form-label col-form-label-sm';

      case DefaultSizes.MEDIUM:
        return 'form-label';

      case DefaultSizes.LARGE:
        return 'form-label col-form-label-lg';

      default:
        return 'form-label';
    }
  }
}
