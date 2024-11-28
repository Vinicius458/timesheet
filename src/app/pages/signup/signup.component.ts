import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { PrimaryInputComponent } from '../../shared/components/primary-input/primary-input.component';
import { DefaultLoginLayoutComponent } from '../../shared/components/default-login-layout/default-login-layout.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-signup',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignUpComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastrService);
  formBuilder = inject(FormBuilder);

  signupForm: FormGroup<SignupForm> = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      this.validateSamePassword,
    ]),
  });

  public async submit(): Promise<void> {
    if (this.signupForm.invalid) return;
    try {
      await this.authService.signUp(
        this.signupForm.value.email,
        this.signupForm.value.password
      );
      this.toastService.success('Cadastro realizado com sucesso!');
      this.router.navigateByUrl('/home');
    } catch (err) {
      this.toastService.error('Erro ao cadastrar! Tente novamente mais tarde');
    }
  }

  private validateSamePassword(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('passwordConfirm');
    return password?.value == confirmPassword?.value ? null : { notSame: true };
  }

  navigate() {
    this.router.navigate(['auth/login']);
  }
}
