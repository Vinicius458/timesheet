import { Component, inject } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../shared/components/default-login-layout/default-login-layout.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrimaryInputComponent } from '../../shared/components/primary-input/primary-input.component';
import { AuthService } from '../../core/auth/auth.service';
import {} from '../../shared/forms/validator';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastrService);
  formBuilder = inject(FormBuilder);

  loginForm: FormGroup<LoginForm> = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  public async submit(): Promise<void> {
    if (this.loginForm.invalid) return;
    try {
      await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.toastService.success('Login feito com sucesso!');
      this.router.navigateByUrl('/home');
    } catch (err) {
      this.toastService.error(
        'Erro ao realizar o login! Tente novamente mais tarde'
      );
    }
  }

  navigate() {
    this.router.navigate(['auth/signup']);
  }
}
