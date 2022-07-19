import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { LoggedOnlyDirective } from './directives/logged-only.directive';

@NgModule({
  declarations: [MainMenuComponent, PageNotFoundComponent, FooterComponent, LoggedOnlyDirective],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [MainMenuComponent, PageNotFoundComponent, FooterComponent],
})
export class CoreModule {}
