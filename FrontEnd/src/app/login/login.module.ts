import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { StylesModule } from '../styles.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    StyleClassModule,
    StylesModule,
  ]
})
export class LoginModule { }
