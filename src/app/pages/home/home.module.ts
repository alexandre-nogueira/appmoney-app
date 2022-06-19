import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './../home/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, HomeRoutingModule, RouterModule],
  exports: [HomepageComponent],
})
export class HomeModule {}
