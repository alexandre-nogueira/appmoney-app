import { UserService } from 'src/app/core/auth/user/user.service';
import {
  Directive,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[loggedOnly]',
})
export class LoggedOnlyDirective implements OnChanges {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private userService: UserService
  ) {
    console.log('passei no construtor');
    !this.userService.isLogged() &&
      this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
  }

  ngOnChanges(): void {
    console.log('passei no onChanges');
    !this.userService.isLogged() &&
      this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
  }
}
