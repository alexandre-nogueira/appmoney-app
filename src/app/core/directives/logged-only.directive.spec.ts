import { LoggedOnlyDirective } from './logged-only.directive';

describe('LoggedOnlyDirective', () => {
  it('should create an instance', () => {
    const directive = new LoggedOnlyDirective();
    expect(directive).toBeTruthy();
  });
});
